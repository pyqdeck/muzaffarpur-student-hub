
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
  Calendar
} from "lucide-react";

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
      content: "Hi! I'm your Campus Companion AI assistant. I'm here to help you with anything related to your college life at MIT Muzaffarpur. You can ask me about:",
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
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const quickQuestions = [
    "What's my next class?",
    "Show me today's schedule",
    "Where is the library?",
    "How do I calculate GPA?",
    "What events are happening?",
    "I'm feeling stressed"
  ];

  const generateResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes("schedule") || lowerMessage.includes("class") || lowerMessage.includes("timetable")) {
      return "Based on your current semester, your next class is Engineering Mathematics at 2:30 PM in room GH-301. Here's your schedule for today:\n\n• 9:00 AM - Data Structures (CS-201)\n• 11:00 AM - Digital Electronics Lab (EE-105)\n• 2:30 PM - Engineering Mathematics (GH-301)\n• 4:00 PM - Programming Lab (CS-Lab-2)\n\nWould you like me to set reminders for any of these classes?";
    }
    
    if (lowerMessage.includes("library") || lowerMessage.includes("where")) {
      return "The Central Library is located in the main academic block, Ground Floor, Section A. It's currently open from 8:00 AM to 8:00 PM (extended hours during exams). \n\nKey facilities:\n• Study halls with 200+ seats\n• Computer lab with internet access\n• Digital library with e-books\n• Group study rooms (bookable)\n\nNeed directions to get there from your current location?";
    }
    
    if (lowerMessage.includes("gpa") || lowerMessage.includes("marks") || lowerMessage.includes("grade")) {
      return "To calculate your GPA at MIT Muzaffarpur:\n\n1. Each subject has credit points (usually 3-4 credits)\n2. Grade points: A=10, B=8, C=6, D=4, F=0\n3. Formula: GPA = (Sum of Grade Points × Credits) / Total Credits\n\nExample:\n• Math (4 credits, A grade): 4×10 = 40\n• Physics (3 credits, B grade): 3×8 = 24\n• Total: 64 points ÷ 7 credits = 9.14 GPA\n\nWant help calculating your specific GPA?";
    }
    
    if (lowerMessage.includes("stress") || lowerMessage.includes("anxiety") || lowerMessage.includes("help") || lowerMessage.includes("mental")) {
      return "I understand you're going through a tough time. Your mental health matters, and it's okay to seek support. Here are some immediate resources:\n\n🌟 Campus Counselor: Dr. Priya Sharma (Available Mon-Fri, 10 AM-4 PM)\n📞 24/7 Helpline: 1800-123-4567\n🧘 Relaxation techniques: Try the 4-7-8 breathing method\n\nImmediate steps:\n1. Take slow, deep breaths\n2. Talk to a trusted friend or family member\n3. Consider scheduling a counseling session\n\nRemember: You're not alone, and seeking help is a sign of strength. Would you like me to help you schedule a counseling appointment?";
    }
    
    if (lowerMessage.includes("event") || lowerMessage.includes("fest") || lowerMessage.includes("activity")) {
      return "Here are the upcoming events at MIT Muzaffarpur:\n\n🎓 **This Week:**\n• TechnoMIT 2024 Registration (Deadline: Friday)\n• Inter-branch Cricket Tournament (Starts Monday)\n• Guest Lecture: AI in Engineering (Wednesday, 3 PM)\n\n🎨 **Next Week:**\n• Cultural Night (Saturday, 7 PM)\n• Robotics Workshop (3-day workshop)\n• Career Fair (Multiple companies participating)\n\nWould you like more details about any specific event or help with registration?";
    }
    
    if (lowerMessage.includes("syllabus") || lowerMessage.includes("course") || lowerMessage.includes("subject")) {
      return "I can help you with syllabus information! Which subject are you asking about? Here are some popular ones:\n\n📚 **Current Semester Subjects:**\n• Data Structures & Algorithms\n• Digital Electronics\n• Engineering Mathematics-III\n• Computer Programming\n• Engineering Graphics\n\nFor detailed syllabus, previous year papers, and reference books, please specify the subject. I can also help you create a study plan!";
    }
    
    return "Thank you for your question! I'm here to help with all aspects of your college life at MIT Muzaffarpur. I can assist with academic queries, campus navigation, event information, study support, and mental health resources. Could you please provide more details about what you'd like to know?";
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: "user",
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    // Simulate AI processing time
    setTimeout(() => {
      const response = generateResponse(inputMessage);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        sender: "assistant",
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleQuickQuestion = (question: string) => {
    setInputMessage(question);
    setTimeout(() => handleSendMessage(), 100);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-4">
      <Card className="bg-white/80 backdrop-blur-sm">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-t-lg">
          <CardTitle className="flex items-center space-x-2">
            <Bot className="w-6 h-6" />
            <span>AI Campus Assistant</span>
            <Badge className="bg-white/20 text-white">Powered by Gemini</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
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

          {/* Input Area */}
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
        </CardContent>
      </Card>
    </div>
  );
};

export default ChatAssistant;
