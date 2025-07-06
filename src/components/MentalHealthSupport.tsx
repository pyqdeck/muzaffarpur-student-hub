
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Heart, 
  Phone, 
  Calendar, 
  MessageCircle, 
  Book, 
  Users,
  Clock,
  Shield,
  Star,
  HeartHandshake,
  Brain,
  Smile
} from "lucide-react";

const MentalHealthSupport = () => {
  const resources = [
    {
      title: "Campus Counselor",
      description: "Dr. Priya Sharma - Professional counseling services",
      availability: "Mon-Fri, 10 AM - 4 PM",
      contact: "Extension: 2547",
      type: "professional",
      urgent: false
    },
    {
      title: "24/7 Crisis Helpline",
      description: "Bihar Mental Health Helpline",
      availability: "Available 24/7",
      contact: "1800-123-4567",
      type: "emergency",
      urgent: true
    },
    {
      title: "Peer Support Group",
      description: "Student-led support meetings",
      availability: "Wednesdays, 6 PM",
      contact: "Room 204, Student Center",
      type: "peer",
      urgent: false
    },
    {
      title: "Online Counseling",
      description: "Video/chat sessions with licensed therapists",
      availability: "Book online anytime",
      contact: "campus.counseling@mit.edu",
      type: "online",
      urgent: false
    }
  ];

  const selfCareActivities = [
    {
      icon: Brain,
      title: "Mindfulness",
      description: "5-minute guided meditation",
      action: "Start Session"
    },
    {
      icon: Heart,
      title: "Breathing Exercise",
      description: "4-7-8 relaxation technique",
      action: "Begin Exercise"
    },
    {
      icon: Smile,
      title: "Mood Tracker",
      description: "Track your daily emotions",
      action: "Log Mood"
    },
    {
      icon: Book,
      title: "Mental Health Tips",
      description: "Daily wellness articles",
      action: "Read More"
    }
  ];

  const emergencyProtocol = [
    "If you're having thoughts of self-harm, please reach out immediately",
    "Call 1800-123-4567 (24/7 Crisis Helpline)",
    "Visit the campus medical center",
    "Contact a trusted friend, family member, or counselor",
    "Remember: You are not alone, and help is available"
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-pink-500 to-purple-600 text-white">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-2xl">
            <Heart className="w-7 h-7" />
            <span>Mental Health & Wellness Support</span>
          </CardTitle>
          <p className="text-pink-100">Your mental health matters. We're here to support you.</p>
        </CardHeader>
      </Card>

      {/* Emergency Alert */}
      <Card className="border-red-200 bg-red-50">
        <CardContent className="p-4">
          <div className="flex items-start space-x-3">
            <Shield className="w-6 h-6 text-red-600 mt-1" />
            <div>
              <h3 className="font-bold text-red-800 mb-2">Crisis Support Available 24/7</h3>
              <p className="text-red-700 mb-3">
                If you're experiencing a mental health crisis or having thoughts of self-harm, 
                please reach out for immediate help.
              </p>
              <div className="flex flex-wrap gap-2">
                <Button className="bg-red-600 hover:bg-red-700 text-white">
                  <Phone className="w-4 h-4 mr-2" />
                  Call Crisis Helpline
                </Button>
                <Button variant="outline" className="border-red-300 text-red-700">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Chat Support
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Professional Resources */}
        <Card className="bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <HeartHandshake className="w-5 h-5 text-blue-600" />
              <span>Professional Resources</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {resources.map((resource, index) => (
              <div key={index} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-gray-900">{resource.title}</h4>
                  {resource.urgent && (
                    <Badge className="bg-red-100 text-red-800">Urgent</Badge>
                  )}
                </div>
                <p className="text-gray-700 text-sm mb-2">{resource.description}</p>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>{resource.availability}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Phone className="w-3 h-3" />
                    <span>{resource.contact}</span>
                  </div>
                </div>
                <Button 
                  size="sm" 
                  className="mt-3 bg-blue-600 hover:bg-blue-700"
                >
                  {resource.type === "emergency" ? "Call Now" : 
                   resource.type === "online" ? "Book Session" : "Schedule Appointment"}
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Self-Care Tools */}
        <Card className="bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Star className="w-5 h-5 text-green-600" />
              <span>Self-Care Tools</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {selfCareActivities.map((activity, index) => (
              <div key={index} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-3 mb-2">
                  <activity.icon className="w-6 h-6 text-green-600" />
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{activity.title}</h4>
                    <p className="text-sm text-gray-600">{activity.description}</p>
                  </div>
                </div>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="mt-2 border-green-300 text-green-700 hover:bg-green-50"
                >
                  {activity.action}
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Additional Resources */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-purple-600" />
              <span>Support Groups</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 bg-purple-50 rounded-lg">
                <h4 className="font-medium text-purple-900">Anxiety Support Circle</h4>
                <p className="text-sm text-purple-700">Mondays, 5 PM - Student Center</p>
              </div>
              <div className="p-3 bg-purple-50 rounded-lg">
                <h4 className="font-medium text-purple-900">Academic Stress Management</h4>
                <p className="text-sm text-purple-700">Thursdays, 4 PM - Library Room 3</p>
              </div>
              <div className="p-3 bg-purple-50 rounded-lg">
                <h4 className="font-medium text-purple-900">Peer Mentorship Program</h4>
                <p className="text-sm text-purple-700">Sign up for senior student guidance</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Book className="w-5 h-5 text-indigo-600" />
              <span>Wellness Resources</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <Calendar className="w-4 h-4 mr-2" />
                Stress Management Workshops
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Book className="w-4 h-4 mr-2" />
                Mental Health Awareness Materials
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <MessageCircle className="w-4 h-4 mr-2" />
                Anonymous Support Chat
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Heart className="w-4 h-4 mr-2" />
                Wellness Check-in Survey
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Encouraging Message */}
      <Card className="bg-gradient-to-r from-green-100 to-blue-100 border-green-200">
        <CardContent className="p-6 text-center">
          <Heart className="w-8 h-8 text-green-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Remember: Seeking help is a sign of strength
          </h3>
          <p className="text-gray-700 max-w-2xl mx-auto">
            Your mental health is just as important as your physical health. MIT Muzaffarpur is 
            committed to supporting every student's wellbeing. You're not alone in this journey.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default MentalHealthSupport;
