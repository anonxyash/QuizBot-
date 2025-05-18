import { useState } from 'react';
import { Send, MessageSquare } from 'lucide-react';
import { chatService, ChatMessage } from '../services/ChatService';

export default function Chat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await chatService.generateResponse(userMessage);
      setMessages(prev => [...prev, { role: 'bot', content: response }]);
    } catch (error) {
      setMessages(prev => [...prev, { 
        role: 'bot', 
        content: error instanceof Error ? error.message : 'An unexpected error occurred. Please try again.' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-12rem)] flex flex-col bg-black/30 rounded-xl border border-white/10">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center">
            <MessageSquare className="w-12 h-12 text-primary mb-4" />
            <h2 className="text-2xl font-semibold mb-2">Welcome to QuizBot Chat</h2>
            <p className="text-gray-400">Ask any question about your studies!</p>
          </div>
        ) : (
          <div className="space-y-6">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex gap-4 ${
                  message.role === 'bot' ? 'bg-white/5 -mx-6 p-6' : ''
                }`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  message.role === 'bot' ? 'bg-primary/20' : 'bg-white/20'
                }`}>
                  {message.role === 'bot' ? (
                    <MessageSquare className="w-4 h-4 text-primary" />
                  ) : (
                    <span className="text-sm">You</span>
                  )}
                </div>
                <div className="flex-1 prose prose-invert max-w-none">
                  {message.content}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Input Form */}
      <div className="border-t border-white/10 p-4">
        <form onSubmit={handleSubmit} className="flex gap-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask anything..."
            className="flex-1 bg-white/5 rounded-lg px-4 py-3 focus:outline-none focus:ring-1 focus:ring-primary"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="bg-primary hover:bg-primary-hover text-black px-6 py-3 rounded-lg font-medium transition-colors disabled:opacity-50"
          >
            {isLoading ? 'Sending...' : 'Send'}
            <Send className="w-4 h-4 ml-2 inline-block" />
          </button>
        </form>
      </div>
    </div>
  );
}