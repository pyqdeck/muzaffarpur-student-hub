
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Calendar, 
  MapPin, 
  BookOpen, 
  Users, 
  Phone, 
  FileText, 
  Wifi, 
  Utensils,
  Bus,
  Stethoscope,
  Library,
  Wrench
} from "lucide-react";

const QuickActions = () => {
  const quickActions = [
    {
      icon: Calendar,
      title: "View Full Schedule",
      description: "Complete timetable",
      color: "text-blue-600",
      bgColor: "bg-blue-50 hover:bg-blue-100"
    },
    {
      icon: MapPin,
      title: "Campus Map",
      description: "Navigate buildings",
      color: "text-green-600",
      bgColor: "bg-green-50 hover:bg-green-100"
    },
    {
      icon: BookOpen,
      title: "Digital Library",
      description: "Access e-books",
      color: "text-purple-600",
      bgColor: "bg-purple-50 hover:bg-purple-100"
    },
    {
      icon: Users,
      title: "Study Groups",
      description: "Find study partners",
      color: "text-orange-600",
      bgColor: "bg-orange-50 hover:bg-orange-100"
    },
    {
      icon: Phone,
      title: "Emergency Contacts",
      description: "Important numbers",
      color: "text-red-600",
      bgColor: "bg-red-50 hover:bg-red-100"
    },
    {
      icon: FileText,
      title: "Forms & Documents",
      description: "Download forms",
      color: "text-indigo-600",
      bgColor: "bg-indigo-50 hover:bg-indigo-100"
    },
    {
      icon: Wifi,
      title: "WiFi Access",
      description: "Network credentials",
      color: "text-cyan-600",
      bgColor: "bg-cyan-50 hover:bg-cyan-100"
    },
    {
      icon: Utensils,
      title: "Mess Menu",
      description: "Today's meals",
      color: "text-yellow-600",
      bgColor: "bg-yellow-50 hover:bg-yellow-100"
    },
    {
      icon: Bus,
      title: "Transport",
      description: "Bus schedules",
      color: "text-gray-600",
      bgColor: "bg-gray-50 hover:bg-gray-100"
    },
    {
      icon: Stethoscope,
      title: "Health Center",
      description: "Medical services",
      color: "text-pink-600",
      bgColor: "bg-pink-50 hover:bg-pink-100"
    },
    {
      icon: Library,
      title: "Book Catalog",
      description: "Search library",
      color: "text-teal-600",
      bgColor: "bg-teal-50 hover:bg-teal-100"
    },
    {
      icon: Wrench,
      title: "Maintenance",
      description: "Report issues",
      color: "text-amber-600",
      bgColor: "bg-amber-50 hover:bg-amber-100"
    }
  ];

  return (
    <Card className="bg-white/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-xl text-gray-900">Quick Actions</CardTitle>
        <p className="text-gray-600">Access campus services instantly</p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <Button
              key={index}
              variant="ghost"
              className={`h-auto p-4 flex flex-col items-center space-y-2 ${action.bgColor} border border-gray-200 transition-all duration-300 hover:shadow-md hover:-translate-y-1`}
            >
              <action.icon className={`w-6 h-6 ${action.color}`} />
              <div className="text-center">
                <p className="font-medium text-gray-900 text-sm">{action.title}</p>
                <p className="text-xs text-gray-600">{action.description}</p>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActions;
