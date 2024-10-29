"use client";

import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { useSession } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';

const socket = io('http://localhost:5001', { transports: ['websocket'] });

socket.on('connect_error', (err) => {
  console.error('Socket connection error:', err);
});

interface Message {
  id: number;
  sender_id: string;
  recipient_id: string;
  message_text: string;
  timestamp: string;
}

const MessagesPage = () => {
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const recipientId = searchParams.get('recipientId');
  console.log("recepient", recipientId);
  console.log("sender id", session?.user?.id);

  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');

  if (!session) {
    return <p>Please log in to view your messages.</p>;
  }

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(
          `/api/messages?senderId=${session?.user?.id}&recipientId=${recipientId}`
        );
        const data: Message[] = await response.json();
        setMessages(data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    if (recipientId) fetchMessages();
  }, [session, recipientId]);

  useEffect(() => {
    socket.on('message', (messageData: Message) => {
      setMessages((prevMessages) => [...prevMessages, messageData]);
    });

    return () => {
      socket.off('message');
    };
  }, []);

  const handleSendMessage = async () => {
    if (newMessage.trim() && recipientId) {
      const messageData: Message = {
        id: Date.now(), // Temporary ID
        sender_id: session?.user?.id,
        recipient_id: recipientId,
        message_text: newMessage,
        timestamp: new Date().toISOString(),
      };

      // Emit message to server for real-time update
      socket.emit('message', messageData);

      // Save message in database
      try {
        const response = await fetch('/api/messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            sender_id: session?.user?.id,
            recipient_id: recipientId,
            message_text: newMessage,
          }),
        });
        const savedMessage = await response.json();

        setMessages((prevMessages) => [...prevMessages, savedMessage]);
      } catch (error) {
        console.error("Error saving message:", error);
      }

      setNewMessage('');
    }
  };

  return (
    <div>
      <h1>Messages</h1>
      <div className="message-list">
        {messages.map((msg) => (
          <div key={msg.id}>
            <p><strong>{msg.sender_id === session?.user?.id ? "You" : "Lister"}:</strong> {msg.message_text}</p>
            <small>{new Date(msg.timestamp).toLocaleString()}</small>
          </div>
        ))}
      </div>
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Type a message..."
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
};

export default MessagesPage;
