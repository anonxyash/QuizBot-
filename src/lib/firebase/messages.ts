import { 
  collection, 
  addDoc, 
  query, 
  orderBy, 
  getDocs, 
  Timestamp, 
  limit 
} from 'firebase/firestore';
import { db } from './config';
import type { Message } from './types';

const MESSAGES_COLLECTION = 'messages';
const MAX_MESSAGES = 100;

export const saveMessage = async (message: Message): Promise<void> => {
  try {
    await addDoc(collection(db, MESSAGES_COLLECTION), {
      role: message.role,
      content: message.content,
      timestamp: Timestamp.now()
    });
  } catch (error) {
    console.error('Error saving message:', error);
    throw new Error('Failed to save message to database');
  }
};

export const loadMessages = async (): Promise<Message[]> => {
  try {
    const q = query(
      collection(db, MESSAGES_COLLECTION),
      orderBy('timestamp', 'desc'),
      limit(MAX_MESSAGES)
    );
    
    const snapshot = await getDocs(q);
    return snapshot.docs
      .map(doc => ({
        id: doc.id,
        role: doc.data().role as 'user' | 'bot',
        content: doc.data().content,
        timestamp: doc.data().timestamp.toMillis()
      }))
      .reverse();
  } catch (error) {
    console.error('Error loading messages:', error);
    return [];
  }
};