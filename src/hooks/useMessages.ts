
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';

interface Message {
  id: string;
  from: string;
  subject: string;
  content?: string;
  date: string;
  unread: boolean;
}

export const useMessages = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const { currentUser } = useAuth();
  
  useEffect(() => {
    if (!currentUser) return;
    loadMessages();
  }, [currentUser]);
  
  const loadMessages = () => {
    const storedMessages = localStorage.getItem(`bookbay_messages_${currentUser?.id}`);
    if (storedMessages) {
      setMessages(JSON.parse(storedMessages));
    } else {
      // Initialize with empty array if no messages exist
      localStorage.setItem(`bookbay_messages_${currentUser?.id}`, JSON.stringify([]));
      setMessages([]);
    }
  };
  
  const sendMessage = (to: string, subject: string, content: string) => {
    if (!currentUser) return false;
    
    // Create message for recipient
    const newMessage = {
      id: `msg_${Date.now()}`,
      from: currentUser.name,
      subject,
      content,
      date: new Date().toISOString().split('T')[0],
      unread: true
    };
    
    // Get recipient's messages
    const recipientMessages = JSON.parse(
      localStorage.getItem(`bookbay_messages_${to}`) || '[]'
    );
    
    // Add message to recipient's inbox
    recipientMessages.push(newMessage);
    localStorage.setItem(`bookbay_messages_${to}`, JSON.stringify(recipientMessages));
    
    return true;
  };
  
  const markAsRead = (messageId: string) => {
    const updatedMessages = messages.map(msg => 
      msg.id === messageId ? { ...msg, unread: false } : msg
    );
    setMessages(updatedMessages);
    
    if (currentUser) {
      localStorage.setItem(
        `bookbay_messages_${currentUser.id}`, 
        JSON.stringify(updatedMessages)
      );
    }
  };
  
  const deleteMessage = (messageId: string) => {
    const updatedMessages = messages.filter(msg => msg.id !== messageId);
    setMessages(updatedMessages);
    
    if (currentUser) {
      localStorage.setItem(
        `bookbay_messages_${currentUser.id}`, 
        JSON.stringify(updatedMessages)
      );
    }
  };
  
  return {
    messages,
    loadMessages,
    sendMessage,
    markAsRead,
    deleteMessage,
    unreadCount: messages.filter(m => m.unread).length
  };
};
