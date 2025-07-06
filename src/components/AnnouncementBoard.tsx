
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Bell, 
  Search, 
  Calendar, 
  MapPin, 
  ExternalLink,
  Filter,
  Clock
} from "lucide-react";
import { useState } from "react";

interface Announcement {
  id: number;
  title: string;
  content: string;
  priority: "high" | "medium" | "low";
  timestamp: string;
  department: string;
  category?: string;
  location?: string;
  deadline?: string;
}

interface AnnouncementBoardProps {
  announcements: Announcement[];
}

const AnnouncementBoard = ({ announcements: initialAnnouncements }: AnnouncementBoardProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");

  const extendedAnnouncements: Announcement[] = [
    ...initialAnnouncements,
    {
      id: 4,
      title: "Placement Drive - TCS",
      content: "Tata Consultancy Services campus recruitment for final year students. Eligibility: 60% and above in all semesters.",
      priority: "high",
      timestamp: "3 hours ago",
      department: "Placement Cell",
      category: "placement",
      location: "Auditorium",
      deadline: "Tomorrow 5:00 PM"
    },
    {
      id: 5,
      title: "Workshop: Machine Learning Fundamentals",
      content: "3-day intensive workshop on ML basics, Python programming, and hands-on projects. Limited seats available.",
      priority: "medium",
      timestamp: "6 hours ago",
      department: "Computer Science",
      category: "workshop",
      location: "CS Lab 1",
      deadline: "Registration closes today"
    },
    {
      id: 6,
      title: "Hostel Mess Menu Change",
      content: "New weekly menu introduced with more variety. Special diet options available on request.",
      priority: "low",
      timestamp: "12 hours ago",
      department: "Hostel Administration",
      category: "hostel"
    },
    {
      id: 7,
      title: "Anti-Ragging Committee Meeting",
      content: "Monthly meeting to review campus safety. Students can submit anonymous feedback through the companion app.",
      priority: "medium",
      timestamp: "1 day ago",
      department: "Student Welfare",
      category: "safety"
    },
    {
      id: 8,
      title: "Blood Donation Camp",
      content: "Annual blood donation drive in collaboration with AIIMS Patna. All healthy students welcome to participate.",
      priority: "medium",
      timestamp: "2 days ago",
      department: "NSS",
      category: "social",
      location: "Medical Center",
      deadline: "This Friday"
    }
  ];

  const filteredAnnouncements = extendedAnnouncements.filter(announcement => {
    const matchesSearch = announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         announcement.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         announcement.department.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = selectedFilter === "all" || 
                         announcement.priority === selectedFilter ||
                         announcement.category === selectedFilter;
    
    return matchesSearch && matchesFilter;
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-100 text-red-800 border-red-200";
      case "medium": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "low": return "bg-green-100 text-green-800 border-green-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getCategoryIcon = (category?: string) => {
    switch (category) {
      case "placement": return "💼";
      case "workshop": return "🔧";
      case "hostel": return "🏠";
      case "safety": return "🛡️";
      case "social": return "🤝";
      default: return "📢";
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-blue-600 to-green-600 text-white">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-2xl">
            <Bell className="w-7 h-7" />
            <span>Campus Announcements</span>
          </CardTitle>
          <p className="text-blue-100">Stay updated with the latest news and events</p>
        </CardHeader>
      </Card>

      {/* Search and Filter */}
      <Card className="bg-white/80 backdrop-blur-sm">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search announcements..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              <Button
                variant={selectedFilter === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedFilter("all")}
              >
                All
              </Button>
              <Button
                variant={selectedFilter === "high" ? "destructive" : "outline"}
                size="sm"
                onClick={() => setSelectedFilter("high")}
              >
                High Priority
              </Button>
              <Button
                variant={selectedFilter === "placement" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedFilter("placement")}
              >
                Placements
              </Button>
              <Button
                variant={selectedFilter === "workshop" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedFilter("workshop")}
              >
                Workshops
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Announcements List */}
      <div className="space-y-4">
        {filteredAnnouncements.map((announcement) => (
          <Card 
            key={announcement.id} 
            className="bg-white/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-3 flex-1">
                  <div className="text-2xl">{getCategoryIcon(announcement.category)}</div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {announcement.title}
                      </h3>
                      <Badge className={getPriorityColor(announcement.priority)}>
                        {announcement.priority}
                      </Badge>
                    </div>
                    <p className="text-gray-700 mb-3 leading-relaxed">
                      {announcement.content}
                    </p>
                    
                    {/* Meta Information */}
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <Badge variant="outline" className="text-xs">
                          {announcement.department}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>{announcement.timestamp}</span>
                      </div>
                      {announcement.location && (
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-3 h-3" />
                          <span>{announcement.location}</span>
                        </div>
                      )}
                      {announcement.deadline && (
                        <div className="flex items-center space-x-1 text-red-600 font-medium">
                          <Calendar className="w-3 h-3" />
                          <span>Deadline: {announcement.deadline}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                <Button variant="ghost" size="sm" className="ml-4">
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredAnnouncements.length === 0 && (
        <Card className="bg-white/80 backdrop-blur-sm">
          <CardContent className="p-8 text-center">
            <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No announcements found</h3>
            <p className="text-gray-600">Try adjusting your search terms or filters.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AnnouncementBoard;
