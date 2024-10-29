"use client";

import { useEffect, useState } from 'react';
import { io } from "socket.io-client";
import { useSession } from 'next-auth/react';
import { Accordion, AccordionSummary, AccordionDetails, Typography, TextField, Button } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useSearchParams } from 'next/navigation';
import Script from 'next/script';

const socket = io('http://localhost:5001', { transports: ['websocket'] });

interface Message {
  sender_id: string;
  recipient_id: string;
  message_text: string;
  timestamp: string;
}

interface Conversation {
  conversation_partner: string; // Change userId to conversation_partner
  messages: Message[]; // An array of messages within a single conversation
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
    socket.on("connect", () => {
      console.log("socket: ",socket.id); 
    });

    socket.on('message', (messageData) => {
      console.log('New message received:', messageData);
  });
    if (!recipientId) {
      const fetchConversations = async () => {
        try {
          if (session) {
            const response = await fetch(`http://localhost:5001/api/message/conversations?userId=${session.user.id}`);
            const data = await response.json();
            
            console.log("Fetched data:", data);
      
            // Initialize `messages` using `message_text` as an array with a single item
            const initializedConversations = data.map((conversation) => ({
              ...conversation,
              messages: Array.isArray(conversation.messages) ? conversation.messages : [{ 
                sender_id: conversation.sender_id, 
                recipient_id: conversation.recipient_id, 
                message_text: conversation.message_text, 
                timestamp: conversation.timestamp 
              }]
            }));
            
            setConversations(initializedConversations);
            console.log("Conversations state updated:", initializedConversations);
          }
        } catch (error) {
          console.error("Error fetching conversations:", error);
        }
      };
      fetchConversations();
    }
  }, [session, recipientId]);

  useEffect(() => {
    if (recipientId && senderId) {
      const fetchOrCreateConversation = async () => {
        try {
          const response = await fetch(`http://localhost:5001/api/message?senderId=${senderId}&recipientId=${recipientId}`);
          const data: Message[] = await response.json();
          
          setConversations([
            {
              conversation_partner: recipientId, // Updated to use conversation_partner
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
  }, [recipientId, session]);

  // Handle real-time messages
  useEffect(() => {
    socket.on('message', (messageData: Message) => {
      console.log("messageData",messageData);
      setConversations((prevConversations) =>
        prevConversations.map((conversation) => {
          // Make sure messages is always an array
          const messages = Array.isArray(conversation.messages) ? conversation.messages : [];
          
          return conversation.conversation_partner === messageData.sender_id || conversation.conversation_partner === messageData.recipient_id
            ? { ...conversation, messages: [...messages, messageData] } // Use the initialized messages
            : conversation;
        })
      );
    });

    return () => {
      socket.off('message');
    };
  }, []);

  const handleSendMessage = async (recipientId: string) => {
    if (newMessage.trim() && recipientId) {
      const messageData: Message = {
        sender_id: session.user.id,
        recipient_id: recipientId,
        message_text: newMessage,
        timestamp: new Date().toISOString(),
      };
  
      socket.emit('message', messageData);
      console.log(messageData);
      try {
        const response = await fetch('http://localhost:5001/api/message', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(messageData),
        });
        const savedMessage = await response.json();
  
        setConversations((prevConversations) =>
          prevConversations.map((conversation) =>
            conversation.conversation_partner === recipientId
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
  
      setNewMessage('');
    }
  };
  
console.log();
  return (
    
    <div>
      
      <h1>Your Conversations</h1>
      {conversations.map((conversation) => (
        <Accordion
          key={conversation.conversation_partner} // Use conversation_partner as the key
          expanded={selectedConversation === conversation.conversation_partner}
          onChange={() => setSelectedConversation(selectedConversation === conversation.conversation_partner ? null : conversation.conversation_partner)}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>{conversation.conversation_partner}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div className="message-list">
              {Array.isArray(conversation.messages) && conversation.messages.length > 0 ? (
                conversation.messages.map((msg) => (
                  <div key={`${msg.sender_id}-${msg.timestamp}`}>
                    <p>
                      <strong>{msg.sender_id === session.user.id ? "You" : conversation.conversation_partner}:</strong> {msg.message_text}
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
            <Button onClick={() => handleSendMessage(conversation.conversation_partner)} variant="contained" color="primary">
              Send
            </Button>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

export default MessagesPage;
