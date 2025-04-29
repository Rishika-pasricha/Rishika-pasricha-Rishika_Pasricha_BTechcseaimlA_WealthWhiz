
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { X, MessageCircle, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Basic FAQ database for the chatbot
const faqDatabase = {
  "hello": "Hello! I'm WealthWhiz Assistant. How can I help you today?",
  "hi": "Hi there! How can I assist you with your financial planning?",
  "help": "I can help you navigate the website, explain financial terms, or answer frequently asked questions about investing and financial planning.",
  "dashboard": "The Dashboard shows your financial overview. You can access it from the main navigation menu.",
  "calculator": "Our financial calculators can help you plan for retirement, calculate loan payments, and more. Access them from the 'Calculator' section in the main menu.",
  "resources": "Our Resources section includes guides, regulations, and financial news to help you make informed decisions.",
  "invest": "There are many investment options including stocks, bonds, mutual funds, and real estate. Check our 'Resources' section for detailed investment guides.",
  "stocks": "Stocks represent ownership in a company. When you buy a stock, you're buying a small piece of that company.",
  "bonds": "Bonds are loans investors make to corporations or governments. They typically provide fixed income through regular interest payments.",
  "mutual funds": "Mutual funds pool money from many investors to purchase a diversified portfolio of stocks, bonds, or other securities.",
  "sip": "Systematic Investment Plan (SIP) is a method to invest a fixed amount in mutual funds at regular intervals, benefiting from rupee cost averaging.",
  "retirement": "Retirement planning should start early. Use our calculators to determine how much you need to save and explore various retirement investment options in our guides.",
  "tax": "For tax-related information, check our 'Regulations' tab in the Resources section for the latest updates on tax laws and strategies.",
  "market": "For the latest market updates, visit our 'Indian News' section under Resources.",
};

// Common financial terms for suggestions
const commonQueries = [
  "What is SIP?", 
  "Help me understand stocks", 
  "How to plan for retirement?", 
  "Where can I find investment guides?", 
  "Latest tax regulations"
];

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [conversation, setConversation] = useState<{type: 'user' | 'bot', message: string}[]>([
    {type: 'bot', message: "Hi! I'm your WealthWhiz Assistant. How can I help you today?"}
  ]);
  const { toast } = useToast();

  // Function to process user queries
  const processQuery = (userQuery: string) => {
    // Add user message to conversation
    setConversation(prev => [...prev, {type: 'user', message: userQuery}]);
    
    // Normalize the query
    const normalizedQuery = userQuery.toLowerCase().trim();
    
    // Simple response logic based on keywords
    let botResponse = "I'm not sure about that. Try asking about investments, retirement planning, or website navigation.";
    
    // Check if the query contains any of our known keywords
    Object.keys(faqDatabase).forEach(keyword => {
      if (normalizedQuery.includes(keyword)) {
        botResponse = faqDatabase[keyword as keyof typeof faqDatabase];
      }
    });
    
    // Add bot response to conversation
    setTimeout(() => {
      setConversation(prev => [...prev, {type: 'bot', message: botResponse}]);
    }, 500); // Small delay to make it feel more natural
    
    // Clear the input
    setQuery('');
  };

  // Submit handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      processQuery(query);
    }
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    processQuery(suggestion);
  };

  return (
    <>
      {/* Chat button fixed at bottom right */}
      <Button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-5 right-5 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-105 z-40 ${isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
        variant="default"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>

      {/* Chat window */}
      <Card 
        className={`fixed bottom-5 right-5 w-80 sm:w-96 max-h-[500px] shadow-xl rounded-lg overflow-hidden z-50 transition-all duration-300 transform ${isOpen ? 'scale-100' : 'scale-0 opacity-0 pointer-events-none'}`}
      >
        {/* Chat header */}
        <div className="bg-finance-primary text-white p-3 flex justify-between items-center">
          <h3 className="font-medium">WealthWhiz Assistant</h3>
          <Button size="icon" variant="ghost" onClick={() => setIsOpen(false)} className="h-8 w-8 text-white hover:text-white hover:bg-finance-tertiary rounded-full p-1">
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Chat conversation */}
        <div className="p-3 overflow-y-auto h-80 bg-background">
          {conversation.map((item, index) => (
            <div key={index} className={`mb-3 ${item.type === 'user' ? 'text-right' : ''}`}>
              <div className={`inline-block rounded-lg px-3 py-2 max-w-[80%] ${item.type === 'user' ? 'bg-finance-tertiary text-white' : 'bg-muted'}`}>
                {item.message}
              </div>
            </div>
          ))}
        </div>

        {/* Suggestions */}
        <div className="p-2 border-t bg-background">
          <div className="flex flex-wrap gap-1">
            {commonQueries.map((suggestion, index) => (
              <button 
                key={index}
                className="text-xs px-2 py-1 bg-muted rounded-full hover:bg-finance-primary hover:text-white transition-colors text-left truncate max-w-[150px]"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>

        {/* Chat input */}
        <form onSubmit={handleSubmit} className="p-2 border-t flex items-center gap-2 bg-background">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type your question..."
            className="flex-grow rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-finance-primary"
          />
          <Button type="submit" size="icon" className="rounded-full h-8 w-8 p-1">
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </Card>
    </>
  );
};

export default ChatBot;
