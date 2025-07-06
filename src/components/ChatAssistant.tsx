import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Send, 
  Bot, 
  User, 
  BookOpen, 
  Clock, 
  MapPin, 
  Phone,
  Lightbulb,
  Calendar,
  Key
} from "lucide-react";
import { GoogleGenerativeAI } from "@google/generative-ai";

interface Message {
  id: string;
  content: string;
  sender: "user" | "assistant";
  timestamp: Date;
  suggestions?: string[];
}

const ChatAssistant = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hi! I'm your Campus Companion AI assistant powered by Google Gemini. I'm here to help you with anything related to your college life at MIT Muzaffarpur. You can ask me about classes, syllabus, campus navigation, study help, events, and mental health support. To get started, please enter your Gemini API key below.",
      sender: "assistant",
      timestamp: new Date(),
      suggestions: [
        "Class schedules and timetables",
        "Syllabus and course information", 
        "Campus navigation and room locations",
        "Study help and explanations",
        "Event information and deadlines",
        "Mental health and wellness support"
      ]
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [showApiKeyInput, setShowApiKeyInput] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Check if API key is stored in localStorage
  useEffect(() => {
    const storedApiKey = "AIzaSyA1TaoY4-P39AVz3fBpg313LPg3QORhIXk";
    if (storedApiKey) {
      setApiKey(storedApiKey);
      setShowApiKeyInput(false);
    }
  }, []);

  const quickQuestions = [
    "What's my next class?",
    "Show me today's schedule",
    "Where is the library?",
    "How do I calculate GPA?",
    "What events are happening?",
    "I'm feeling stressed"
  ];

  const handleApiKeySubmit = () => {
    if (apiKey.trim()) {
      localStorage.setItem('gemini-api-key', apiKey);
      setShowApiKeyInput(false);
      
      const welcomeMessage: Message = {
        id: Date.now().toString(),
        content: "Great! I'm now connected to Gemini AI. I can help you with academic questions, campus information, study guidance, and provide mental health support. What would you like to know?",
        sender: "assistant",
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, welcomeMessage]);
    }
  };

  const generateGeminiResponse = async (userMessage: string): Promise<string> => {
    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemma-3-27b-it" });

      const prompt = `You are a helpful Campus Companion AI assistant for MIT Muzaffarpur (Muzaffarpur Institute of Technology) students. You should be knowledgeable, supportive, and provide practical guidance for college life.

Context about MIT Muzaffarpur:
- Located in Bihar, India
- Engineering college with various departments (CS, Electronics, Mechanical, etc.)
- Students face challenges with academics, campus navigation, mental health, and college life
- You should provide helpful, accurate information while being empathetic

Student question: ${userMessage}

Please provide a helpful, friendly response. If the question is about:
- Academics: Give study tips, explain concepts, suggest resources
- Campus life: Provide guidance about events, facilities, navigation
- Mental health: Be supportive, suggest coping strategies, encourage seeking help when needed
- General college advice: Share practical tips for success

Keep responses concise but informative (2-3 paragraphs max).`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Gemini API Error:', error);
      return "I'm sorry, I'm having trouble connecting to my AI service right now. Please check your API key or try again later. In the meantime, I'd recommend checking with your professors or campus resources for immediate help.";
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || showApiKeyInput) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: "user",
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    try {
      const response = await generateGeminiResponse(inputMessage);
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        sender: "assistant",
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "I'm sorry, I encountered an error while processing your request. Please try again or check your internet connection.",
        sender: "assistant",
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleQuickQuestion = (question: string) => {
    if (showApiKeyInput) return;
    setInputMessage(question);
    setTimeout(() => handleSendMessage(), 100);
  };

  const resetApiKey = () => {
    localStorage.removeItem('gemini-api-key');
    setApiKey("");
    setShowApiKeyInput(true);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-4">
      <Card className="bg-white/80 backdrop-blur-sm">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-t-lg">
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Bot className="w-6 h-6" />
              <span>AI Campus Assistant</span>
              <Badge className="bg-white/20 text-white">Powered by Gemini</Badge>
            </div>
            {!showApiKeyInput && (
              <Button
                variant="ghost"
                size="sm"
                onClick={resetApiKey}
                className="text-white hover:bg-white/20"
              >
                <Key className="w-4 h-4" />
              </Button>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {/* API Key Input */}
          {showApiKeyInput && (
            <div className="p-4 bg-yellow-50 border-b">
              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-sm text-yellow-800">
                  <Key className="w-4 h-4" />
                  <span>Enter your Gemini API Key to activate AI features</span>
                </div>
                <div className="flex space-x-2">
                  <Input
                    type="password"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="Paste your Google Gemini API key here..."
                    className="flex-1"
                  />
                  <Button 
                    onClick={handleApiKeySubmit}
                    disabled={!apiKey.trim()}
                    className="bg-gradient-to-r from-blue-600 to-green-600"
                  >
                    Connect
                  </Button>
                </div>
                <p className="text-xs text-gray-600">
                  Get your free API key from{" "}
                  <a 
                    href="https://makersuite.google.com/app/apikey" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Google AI Studio
                  </a>
                  . Your key is stored locally in your browser.
                </p>
              </div>
            </div>
          )}

          {/* Messages Area */}
          <div className="h-96 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start space-x-3 ${
                  message.sender === "user" ? "flex-row-reverse space-x-reverse" : ""
                }`}
              >
                <Avatar className="w-8 h-8">
                  <AvatarFallback className={
                    message.sender === "user" 
                      ? "bg-blue-100 text-blue-600" 
                      : "bg-green-100 text-green-600"
                  }>
                    {message.sender === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </AvatarFallback>
                </Avatar>
                <div className={`max-w-[70%] ${message.sender === "user" ? "text-right" : ""}`}>
                  <div
                    className={`rounded-lg p-3 ${
                      message.sender === "user"
                        ? "bg-blue-600 text-white ml-auto"
                        : "bg-gray-100 text-gray-900"
                    }`}
                  >
                    <p className="whitespace-pre-line">{message.content}</p>
                  </div>
                  {message.suggestions && (
                    <div className="mt-2 space-y-1">
                      {message.suggestions.map((suggestion, index) => (
                        <div key={index} className="flex items-center space-x-2 text-sm text-gray-600">
                          <Lightbulb className="w-3 h-3" />
                          <span>{suggestion}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  <p className="text-xs text-gray-500 mt-1">
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex items-start space-x-3">
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-green-100 text-green-600">
                    <Bot className="w-4 h-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="bg-gray-100 rounded-lg p-3">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions */}
          {!showApiKeyInput && (
            <div className="border-t p-4">
              <p className="text-sm text-gray-600 mb-3">Quick questions:</p>
              <div className="grid grid-cols-2 gap-2">
                {quickQuestions.map((question, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="text-left justify-start text-xs"
                    onClick={() => handleQuickQuestion(question)}
                  >
                    {question}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Input Area */}
          {!showApiKeyInput && (
            <div className="border-t p-4">
              <div className="flex space-x-2">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Ask me anything about college life..."
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  className="flex-1"
                />
                <Button 
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim() || isTyping}
                  className="bg-gradient-to-r from-blue-600 to-green-600"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ChatAssistant;
