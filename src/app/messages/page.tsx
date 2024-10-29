"use client";

import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { useSession } from 'next-auth/react';
import { Accordion, AccordionSummary, AccordionDetails, Typography, TextField, Button } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useSearchParams } from 'next/navigation';

const socket = io('http://localhost:5001', { transports: ['websocket'] });

interface Message {
  id: number;
  sender_id: string;
  recipient_id: string;
  message_text: string;
  timestamp: string;
}

interface Conversation {
  userId: string;
  username: string;
  messages: Message[];
}

const MessagesPage = () => {
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const recipientId = searchParams.get('recipientId');
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const senderId = session?.user?.id;

  if (!session) {
    return <p>Please log in to view your messages.</p>;
  }

  // Fetch existing conversations if recipientId is not provided
  useEffect(() => {
    if (!recipientId) {
      const fetchConversations = async () => {
        try {
          const response = await fetch(`/api/messages/conversations?userId=${senderId}`);
          const data = await response.json();
          setConversations(data);
        } catch (error) {
          console.error("Error fetching conversations:", error);
        }
      };
      fetchConversations();
    }
  }, [session, recipientId]);

  // Start a new conversation if recipientId is provided
  useEffect(() => {
    if (recipientId) {
      const fetchOrCreateConversation = async () => {
        try {
          const response = await fetch(`/api/messages?senderId=${senderId}&recipientId=${recipientId}`);
          const data: Message[] = await response.json();
          
          setConversations([
            {
              userId: recipientId,
              username: "New User", // Replace with actual username if available
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
      setConversations((prevConversations) =>
        prevConversations.map((conversation) =>
          conversation.userId === messageData.sender_id || conversation.userId === messageData.recipient_id
            ? { ...conversation, messages: [...conversation.messages, messageData] }
            : conversation
        )
      );
    });

    return () => {
      socket.off('message');
    };
  }, []);

  const handleSendMessage = async (recipientId: string) => {
    if (newMessage.trim() && recipientId) {
      const messageData: Message = {
        id: Date.now(),
        sender_id: senderId,
        recipient_id: recipientId,
        message_text: newMessage,
        timestamp: new Date().toISOString(),
      };

      socket.emit('message', messageData);

      try {
        const response = await fetch('/api/messages', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(messageData),
        });
        const savedMessage = await response.json();

        setConversations((prevConversations) =>
          prevConversations.map((conversation) =>
            conversation.userId === recipientId
              ? { ...conversation, messages: [...conversation.messages, savedMessage] }
              : conversation
          )
        );
      } catch (error) {
        console.error("Error saving message:", error);
      }

      setNewMessage('');
    }
  };

  return (
    <div>
      <h1>Your Conversations</h1>
      {conversations.map((conversation) => (
        <Accordion 
          key={conversation.userId} 
          expanded={selectedConversation === conversation.userId} 
          onChange={() => setSelectedConversation(selectedConversation === conversation.userId ? null : conversation.userId)}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>{conversation.username}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div className="message-list">
              {conversation.messages.map((msg) => (
                <div key={msg.id}>
                  <p><strong>{msg.sender_id === senderId ? "You" : conversation.username}:</strong> {msg.message_text}</p>
                  <small>{new Date(msg.timestamp).toLocaleString()}</small>
                </div>
              ))}
            </div>
            <TextField
              label="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              fullWidth
              variant="outlined"
              margin="dense"
            />
            <Button onClick={() => handleSendMessage(conversation.userId)} variant="contained" color="primary">
              Send
            </Button>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

export default MessagesPage;
