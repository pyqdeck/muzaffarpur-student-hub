
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { 
  Bell, 
  MessageCircle, 
  Calendar, 
  MapPin, 
  Heart, 
  AlertTriangle,
  BookOpen,
  Users,
  Clock,
  Star
} from "lucide-react";
import ChatAssistant from "@/components/ChatAssistant";
import AnnouncementBoard from "@/components/AnnouncementBoard";
import QuickActions from "@/components/QuickActions";
import MentalHealthSupport from "@/components/MentalHealthSupport";
import ReportingSystem from "@/components/ReportingSystem";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [unreadNotifications, setUnreadNotifications] = useState(3);

  const quickStats = [
    { icon: Calendar, label: "Today's Classes", value: "4", color: "text-blue-600" },
    { icon: Bell, label: "New Notifications", value: unreadNotifications.toString(), color: "text-orange-600" },
    { icon: Users, label: "Club Events", value: "2", color: "text-green-600" },
    { icon: Clock, label: "Next Class", value: "2:30 PM", color: "text-purple-600" }
  ];

  const recentAnnouncements = [
    {
      id: 1,
      title: "Mid-term Exam Schedule Released",
      content: "Check your dashboard for updated exam timetables",
      priority: "high",
      timestamp: "2 hours ago",
      department: "Academic Office"
    },
    {
      id: 2,
      title: "Library Extended Hours",
      content: "Library will remain open until 10 PM during exam week",
      priority: "medium",
      timestamp: "5 hours ago",
      department: "Library"
    },
    {
      id: 3,
      title: "Technical Fest Registration Open",
      content: "Register for TechnoMIT 2024 - Bihar's largest tech fest",
      priority: "low",
      timestamp: "1 day ago",
      department: "Student Activities"
    }
  ];

  const todaySchedule = [
    { time: "9:00 AM", subject: "Data Structures", room: "CS-201", type: "Lecture" },
    { time: "11:00 AM", subject: "Digital Electronics", room: "EE-105", type: "Lab" },
    { time: "2:30 PM", subject: "Engineering Mathematics", room: "GH-301", type: "Tutorial" },
    { time: "4:00 PM", subject: "Programming Lab", room: "CS-Lab-2", type: "Practical" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Campus Companion</h1>
                <p className="text-sm text-gray-600">MIT Muzaffarpur</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5" />
                {unreadNotifications > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-xs flex items-center justify-center">
                    {unreadNotifications}
                  </Badge>
                )}
              </Button>
              <Avatar>
                <AvatarFallback className="bg-blue-100 text-blue-600">ST</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex space-x-1 bg-white/60 backdrop-blur-sm rounded-lg p-1 mb-6">
          {[
            { id: "dashboard", label: "Dashboard", icon: Calendar },
            { id: "chat", label: "AI Assistant", icon: MessageCircle },
            { id: "announcements", label: "Announcements", icon: Bell },
            { id: "support", label: "Support", icon: Heart },
            { id: "report", label: "Report", icon: AlertTriangle }
          ].map((tab) => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? "default" : "ghost"}
              className={`flex items-center space-x-2 ${
                activeTab === tab.id 
                  ? "bg-gradient-to-r from-blue-600 to-green-600 text-white shadow-lg" 
                  : ""
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </Button>
          ))}
        </div>

        {/* Content Area */}
        {activeTab === "dashboard" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {quickStats.map((stat, index) => (
                <Card key={index} className="bg-white/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                        <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                      </div>
                      <stat.icon className={`w-8 h-8 ${stat.color}`} />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Today's Schedule */}
              <Card className="lg:col-span-2 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5 text-blue-600" />
                    <span>Today's Schedule</span>
                  </CardTitle>
                  <CardDescription>Your classes and activities for today</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {todaySchedule.map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                        <div className="flex items-center space-x-3">
                          <div className="text-sm font-medium text-blue-600 min-w-[70px]">
                            {item.time}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{item.subject}</p>
                            <p className="text-sm text-gray-600 flex items-center">
                              <MapPin className="w-3 h-3 mr-1" />
                              {item.room}
                            </p>
                          </div>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {item.type}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Announcements */}
              <Card className="bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Bell className="w-5 h-5 text-orange-600" />
                    <span>Recent Updates</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {recentAnnouncements.slice(0, 3).map((announcement) => (
                      <div key={announcement.id} className="p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-medium text-sm text-gray-900 line-clamp-2">
                            {announcement.title}
                          </h4>
                          <Badge 
                            variant={announcement.priority === "high" ? "destructive" : 
                                   announcement.priority === "medium" ? "default" : "secondary"}
                            className="text-xs ml-2"
                          >
                            {announcement.priority}
                          </Badge>
                        </div>
                        <p className="text-xs text-gray-600 mb-1">{announcement.content}</p>
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-blue-600">{announcement.department}</span>
                          <span className="text-xs text-gray-500">{announcement.timestamp}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <QuickActions />
          </div>
        )}

        {activeTab === "chat" && <ChatAssistant />}
        {activeTab === "announcements" && <AnnouncementBoard announcements={recentAnnouncements} />}
        {activeTab === "support" && <MentalHealthSupport />}
        {activeTab === "report" && <ReportingSystem />}
      </div>
    </div>
  );
};

export default Index;
