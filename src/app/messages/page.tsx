"use client";

import { useEffect, useState } from 'react';
import { io } from "socket.io-client";
import { useSession } from 'next-auth/react';
import { Accordion, AccordionSummary, AccordionDetails, Typography, TextField, Button } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useSearchParams } from 'next/navigation';

// Initialize socket connection once
const socket = io('http://localhost:5001', { transports: ['websocket'] });

interface Message {
  sender_id: string;
  recipient_id: string;
  message_text: string;
  timestamp: string;
  recipient_name?: string; 
}

interface Conversation {
  conversation_partner_name: string; 
  conversation_partner_id: string;
  messages: Message[];
}

const MessagesPage = () => {
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const recipientId = searchParams.get('recipientId');
  const senderId = searchParams.get('sellerId');
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);

  if (!session) {
    return <p>Please log in to view your messages.</p>;
  } 

  useEffect(() => {
    if (session) {
      const fetchConversations = async () => {
        try {
          const response = await fetch(`http://localhost:5001/api/message/conversations?userId=${session.user.id}`);
          const data: Conversation[] = await response.json();

          
          const updatedConversations = data.map(conversation => ({
            ...conversation,
            conversation_partner_name: conversation.conversation_partner_name 
          }));

          setConversations(updatedConversations);
        } catch (error) {
          console.error("Error fetching conversations:", error);
        }
      };
      fetchConversations();
    }
  }, [session]);



  useEffect(() => {
    socket.on('message', (messageData: Message) => {
      console.log('Message received:', messageData); // Debugging log
  
      setConversations((prevConversations) => {
        return prevConversations.map((conversation) => {
          const messages = Array.isArray(conversation.messages) ? conversation.messages : [];
  
          // Update the conversation if it matches the recipient or sender
          if (
            conversation.conversation_partner_id === messageData.sender_id || 
            conversation.conversation_partner_id === messageData.recipient_id
          ) {
            return { 
              ...conversation, 
              messages: [...messages, messageData] 
            };
          }
          return conversation;
        });
      });
    });
  
    // Cleanup function to prevent memory leaks
    return () => {
      socket.off('message'); // Unsubscribe from the message event
    };
  }, []);

  const handleSendMessage = async (recipientId: string, recipient_name: string) => {
    if (newMessage.trim() && recipientId) {
      const messageData: Message = {
        sender_id: session.user.id,
        recipient_id: recipientId,
        message_text: newMessage,
        timestamp: new Date().toISOString(),
        recipient_name: recipient_name // This is optional
      };
  
      console.log('Sending message:', messageData); // Debugging log
      socket.emit('message', messageData); // Send through socket
  
      try {
        const response = await fetch('http://localhost:5001/api/message', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(messageData),
        });
        const savedMessage = await response.json();
  
        setConversations((prevConversations) =>
          prevConversations.map((conversation) =>
            conversation.conversation_partner_id === recipientId 
              ? {
                  ...conversation,
                  messages: [...(conversation.messages || []), savedMessage], 
                }
              : conversation
          )
        );
      } catch (error) {
        console.error("Error saving message:", error);
      }
  
      setNewMessage(''); // Clear the input
    }
  };
  


  useEffect(() => {
    if (recipientId && senderId) {
      const fetchOrCreateConversation = async () => {
        try {
          const response = await fetch(`http://localhost:5001/api/message?senderId=${senderId}&recipientId=${recipientId}`);
          const data: Message[] = await response.json();
          setConversations([
            {
              conversation_partner_name: data[0]?.recipient_name || 'Unknown', 
              conversation_partner_id: recipientId,
              messages: data,
            },
          ]);
          setSelectedConversation(recipientId);
        } catch (error) {
          console.error("Error initializing conversation:", error);
        }
      };
      fetchOrCreateConversation();
    }
  }, [recipientId, senderId]);



  return (
    <div>
      <h1>Your Conversations</h1>
      {conversations.map((conversation) => (
        <Accordion
          key={conversation.conversation_partner_id}
          expanded={selectedConversation === conversation.conversation_partner_id} 
          onChange={() => setSelectedConversation(
            selectedConversation === conversation.conversation_partner_id ? null : conversation.conversation_partner_id 
          )}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>{conversation.conversation_partner_name}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div className="message-list">
              {conversation.messages && conversation.messages.length > 0 ? (
                conversation.messages.map((msg) => (
                  <div key={`${msg.sender_id}-${msg.timestamp}`}>
                    <p>
                      <strong>{msg.sender_id === session.user.id ? "You" : conversation.conversation_partner_name}:</strong> {msg.message_text}
                    </p>
                    <small>{new Date(msg.timestamp).toLocaleString()}</small>
                  </div>
                ))
              ) : (
                <p>No messages to display</p>
              )}
            </div>
            <TextField
              label="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              fullWidth
              variant="outlined"
              margin="dense"
            />
            <Button onClick={() => handleSendMessage(conversation.conversation_partner_id, conversation.conversation_partner_name)} variant="contained" color="primary">
              Send
            </Button>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

export default MessagesPage;
