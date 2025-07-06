
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  GraduationCap, 
  Users, 
  Bell, 
  Calendar, 
  BookOpen,
  MessageCircle,
  TrendingUp,
  Heart,
  Shield,
  Sparkles,
  Coffee,
  Target,
  LogOut,
  User
} from "lucide-react";
import { useAuth } from "@/components/auth/AuthProvider";
import LoginForm from "@/components/auth/LoginForm";
import RegisterForm from "@/components/auth/RegisterForm";
import ChatAssistant from "@/components/ChatAssistant";
import AnnouncementBoard from "@/components/AnnouncementBoard";
import QuickActions from "@/components/QuickActions";
import MentalHealthSupport from "@/components/MentalHealthSupport";
import ReportingSystem from "@/components/ReportingSystem";
import CommunityPosts from "@/components/community/CommunityPosts";
import AdminDashboard from "@/components/admin/AdminDashboard";

interface Announcement {
  id: number;
  title: string;
  content: string;
  priority: "high" | "medium" | "low";
  timestamp: string;
  department: string;
}

const Index = () => {
  const { user, logout, isLoading } = useAuth();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showLogin, setShowLogin] = useState(true);

  // Mock data for announcements with correct priority types
  const announcements: Announcement[] = [
    {
      id: 1,
      title: "Mid-Semester Exam Schedule Released",
      content: "The examination schedule for mid-semester tests has been published. Check your department notice board for detailed timings.",
      priority: "high" as const,
      timestamp: "2 hours ago",
      department: "Academic Office"
    },
    {
      id: 2,
      title: "Cultural Fest 2024 - Technovanza",
      content: "Get ready for the biggest cultural celebration of the year! Registration opens next week.",
      priority: "medium" as const,
      timestamp: "5 hours ago",
      department: "Student Affairs"
    },
    {
      id: 3,
      title: "Library Hours Extended",
      content: "The central library will now remain open until 10 PM during exam weeks.",
      priority: "low" as const,
      timestamp: "1 day ago",
      department: "Library"
    }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Show authentication forms if user is not logged in
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center p-4">
        {showLogin ? (
          <LoginForm 
            onSuccess={() => {}} 
            onSwitchToRegister={() => setShowLogin(false)} 
          />
        ) : (
          <RegisterForm 
            onSuccess={() => {}} 
            onSwitchToLogin={() => setShowLogin(true)} 
          />
        )}
      </div>
    );
  }

  const stats = [
    { label: "Active Students", value: "2,450", icon: Users, color: "text-blue-600" },
    { label: "Today's Classes", value: "28", icon: Calendar, color: "text-green-600" },
    { label: "Announcements", value: "12", icon: Bell, color: "text-orange-600" },
    { label: "Resources", value: "156", icon: BookOpen, color: "text-purple-600" }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "chat":
        return <ChatAssistant />;
      case "announcements":
        return <AnnouncementBoard announcements={announcements} />;
      case "actions":
        return <QuickActions />;
      case "support":
        return <MentalHealthSupport />;
      case "report":
        return <ReportingSystem />;
      case "community":
        return <CommunityPosts />;
      case "admin":
        return user.role === 'admin' ? <AdminDashboard /> : <div>Access Denied</div>;
      default:
        return (
          <div className="space-y-6">
            {/* Welcome Section */}
            <Card className="bg-gradient-to-r from-blue-600 to-green-600 text-white overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
              <CardHeader className="relative z-10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-3 bg-white/20 rounded-full">
                      <GraduationCap className="w-8 h-8" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl mb-1">Welcome back, {user.name}!</CardTitle>
                      <p className="text-blue-100">
                        {user.branch?.toUpperCase()} • Semester {user.semester} • MIT Muzaffarpur
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Badge className="bg-white/20 text-white border-white/30 hover:bg-white/30">
                    <Sparkles className="w-3 h-3 mr-1" />
                    Smart Campus
                  </Badge>
                  <Badge className="bg-white/20 text-white border-white/30 hover:bg-white/30">
                    <Shield className="w-3 h-3 mr-1" />
                    Safe & Secure
                  </Badge>
                  <Badge className="bg-white/20 text-white border-white/30 hover:bg-white/30">
                    <Heart className="w-3 h-3 mr-1" />
                    Student First
                  </Badge>
                </div>
              </CardHeader>
            </Card>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <Card key={index} className="bg-white/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                        <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                      </div>
                      <div className={`p-3 rounded-full bg-gray-50 ${stat.color}`}>
                        <stat.icon className="w-6 h-6" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Quick Highlights */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-lg">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                    <span>Recent Activity</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                      <MessageCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">New discussion in CS Community</p>
                        <p className="text-xs text-gray-600">Machine Learning study group forming</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                      <Target className="w-5 h-5 text-green-600 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">Internship opportunity posted</p>
                        <p className="text-xs text-gray-600">Software Development role at local startup</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3 p-3 bg-orange-50 rounded-lg">
                      <Coffee className="w-5 h-5 text-orange-600 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">Campus event reminder</p>
                        <p className="text-xs text-gray-600">Tech talk tomorrow at 2 PM</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-lg">Getting Started</CardTitle>
                  <p className="text-gray-600 text-sm">Explore what our campus network has to offer</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Button 
                      variant="outline" 
                      className="w-full justify-start h-auto p-4 bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200 hover:from-blue-100 hover:to-cyan-100"
                      onClick={() => setActiveTab("chat")}
                    >
                      <MessageCircle className="w-5 h-5 text-blue-600 mr-3" />
                      <div className="text-left">
                        <p className="font-medium text-gray-900">Chat with AI Assistant</p>
                        <p className="text-xs text-gray-600">Get instant help with academics and campus info</p>
                      </div>
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start h-auto p-4 bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 hover:from-green-100 hover:to-emerald-100"
                      onClick={() => setActiveTab("announcements")}
                    >
                      <Bell className="w-5 h-5 text-green-600 mr-3" />
                      <div className="text-left">
                        <p className="font-medium text-gray-900">View Announcements</p>
                        <p className="text-xs text-gray-600">Stay updated with latest campus news</p>
                      </div>
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start h-auto p-4 bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200 hover:from-purple-100 hover:to-pink-100"
                      onClick={() => setActiveTab("support")}
                    >
                      <Heart className="w-5 h-5 text-purple-600 mr-3" />
                      <div className="text-left">
                        <p className="font-medium text-gray-900">Mental Health Support</p>
                        <p className="text-xs text-gray-600">Access wellness resources and support</p>
                      </div>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );
    }
  };

  const navigationTabs = [
    { id: "dashboard", label: "Dashboard", icon: TrendingUp },
    { id: "community", label: "Community", icon: Users },
    { id: "chat", label: "AI Assistant", icon: MessageCircle },
    { id: "announcements", label: "Updates", icon: Bell },
    { id: "actions", label: "Quick Actions", icon: Target },
    { id: "support", label: "Support", icon: Heart },
    { id: "report", label: "Report", icon: Shield },
    ...(user.role === 'admin' ? [{ id: "admin", label: "Admin", icon: Shield }] : [])
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">MIT Campus</h1>
              </div>
            </div>
            
            <div className="flex items-center space-x-1">
              {navigationTabs.map((tab) => (
                <Button
                  key={tab.id}
                  variant={activeTab === tab.id ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setActiveTab(tab.id)}
                  className={`h-8 px-3 ${
                    activeTab === tab.id 
                      ? "bg-gradient-to-r from-blue-600 to-green-600 text-white" 
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <tab.icon className="w-4 h-4 mr-1.5" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </Button>
              ))}
              
              <div className="ml-4 flex items-center space-x-2">
                <Button variant="ghost" size="sm" className="text-gray-600">
                  <User className="w-4 h-4 mr-1" />
                  {user.name}
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={logout}
                  className="text-red-600 hover:text-red-700"
                >
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderContent()}
      </main>
    </div>
  );
};

export default Index;
