
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  AlertTriangle, 
  Shield, 
  Camera, 
  Phone, 
  Lock, 
  CheckCircle,
  Upload,
  MessageSquare,
  UserX,
  Wrench,
  Heart
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ReportingSystem = () => {
  const [reportType, setReportType] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const reportCategories = [
    { value: "harassment", label: "Harassment/Ragging", icon: UserX, color: "text-red-600", urgent: true },
    { value: "safety", label: "Safety Concern", icon: Shield, color: "text-orange-600", urgent: true },
    { value: "maintenance", label: "Infrastructure Issue", icon: Wrench, color: "text-blue-600", urgent: false },
    { value: "mental_health", label: "Mental Health Support", icon: Heart, color: "text-purple-600", urgent: true },
    { value: "academic", label: "Academic Issue", icon: MessageSquare, color: "text-green-600", urgent: false },
    { value: "other", label: "Other", icon: AlertTriangle, color: "text-gray-600", urgent: false }
  ];

  const handleSubmit = async () => {
    if (!reportType || !description) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Report Submitted Successfully",
        description: `Your report has been received. Reference ID: MIT-${Date.now().toString().slice(-6)}`,
      });
      
      // Reset form
      setReportType("");
      setDescription("");
      setLocation("");
    }, 2000);
  };

  const selectedCategory = reportCategories.find(cat => cat.value === reportType);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-red-500 to-orange-600 text-white">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-2xl">
            <AlertTriangle className="w-7 h-7" />
            <span>Anonymous Reporting System</span>
          </CardTitle>
          <p className="text-red-100">Report concerns safely and confidentially. Your identity is protected.</p>
        </CardHeader>
      </Card>

      {/* Privacy Notice */}
      <Card className="border-green-200 bg-green-50">
        <CardContent className="p-4">
          <div className="flex items-start space-x-3">
            <Lock className="w-6 h-6 text-green-600 mt-1" />
            <div>
              <h3 className="font-bold text-green-800 mb-2">Your Privacy is Protected</h3>
              <ul className="text-green-700 space-y-1 text-sm">
                <li>• All reports are handled confidentially by trained staff</li>
                <li>• Anonymous reporting ensures your identity remains hidden</li>
                <li>• Reports go directly to campus safety and administration</li>
                <li>• Emergency situations receive immediate attention</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Emergency Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-4 text-center">
            <Phone className="w-8 h-8 text-red-600 mx-auto mb-2" />
            <h3 className="font-semibold text-red-800 mb-1">Emergency</h3>
            <p className="text-sm text-red-700 mb-3">Immediate danger or crisis</p>
            <Button className="bg-red-600 hover:bg-red-700 w-full">
              Call Emergency: 100
            </Button>
          </CardContent>
        </Card>
        
        <Card className="border-orange-200 bg-orange-50">
          <CardContent className="p-4 text-center">
            <Shield className="w-8 h-8 text-orange-600 mx-auto mb-2" />
            <h3 className="font-semibold text-orange-800 mb-1">Campus Security</h3>
            <p className="text-sm text-orange-700 mb-3">Safety concerns on campus</p>
            <Button className="bg-orange-600 hover:bg-orange-700 w-full">
              Call Security: 2500
            </Button>
          </CardContent>
        </Card>
        
        <Card className="border-purple-200 bg-purple-50">
          <CardContent className="p-4 text-center">
            <Heart className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <h3 className="font-semibold text-purple-800 mb-1">Crisis Helpline</h3>
            <p className="text-sm text-purple-700 mb-3">Mental health support</p>
            <Button className="bg-purple-600 hover:bg-purple-700 w-full">
              Call: 1800-123-4567
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Reporting Form */}
      <Card className="bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MessageSquare className="w-5 h-5 text-blue-600" />
            <span>Submit a Report</span>
          </CardTitle>
          <p className="text-gray-600">Provide details about your concern. All information is kept confidential.</p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Report Type Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Type of Report <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {reportCategories.map((category) => (
                <Button
                  key={category.value}
                  variant={reportType === category.value ? "default" : "outline"}
                  className={`h-auto p-4 justify-start ${
                    reportType === category.value 
                      ? "bg-blue-600 text-white" 
                      : "hover:bg-gray-50"
                  }`}
                  onClick={() => setReportType(category.value)}
                >
                  <div className="flex items-center space-x-3">
                    <category.icon className={`w-5 h-5 ${
                      reportType === category.value ? "text-white" : category.color
                    }`} />
                    <div className="text-left">
                      <p className="font-medium">{category.label}</p>
                      {category.urgent && (
                        <Badge className="mt-1 bg-red-100 text-red-800 text-xs">
                          Urgent
                        </Badge>
                      )}
                    </div>
                  </div>
                </Button>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description <span className="text-red-500">*</span>
            </label>
            <Textarea
              placeholder="Please provide detailed information about the incident or concern. Include when it happened, who was involved (if applicable), and any other relevant details."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={5}
              className="resize-none"
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Location (Optional)
            </label>
            <Input
              placeholder="e.g., CS Department, Hostel Block A, Library..."
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>

          {/* File Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Attach Evidence (Optional)
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600 mb-1">Click to upload photos or documents</p>
              <p className="text-xs text-gray-500">PNG, JPG, PDF up to 10MB</p>
            </div>
          </div>

          {/* Privacy Options */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Lock className="w-4 h-4 text-gray-600" />
              <span className="font-medium text-gray-900">Privacy Settings</span>
            </div>
            <div className="space-y-2 text-sm">
              <label className="flex items-center space-x-2">
                <input 
                  type="radio" 
                  name="privacy"
                  checked={isAnonymous}
                  onChange={() => setIsAnonymous(true)}
                  className="text-blue-600"
                />
                <span>Submit anonymously (recommended for sensitive reports)</span>
              </label>
              <label className="flex items-center space-x-2">
                <input 
                  type="radio" 
                  name="privacy"
                  checked={!isAnonymous}
                  onChange={() => setIsAnonymous(false)}
                  className="text-blue-600"
                />
                <span>Include my contact information (for follow-up)</span>
              </label>
            </div>
          </div>

          {/* Urgent Notice */}
          {selectedCategory?.urgent && (
            <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="w-5 h-5 text-amber-600" />
                <span className="font-medium text-amber-800">Urgent Report</span>
              </div>
              <p className="text-amber-700 text-sm mt-1">
                This type of report will be prioritized and reviewed immediately by our response team.
              </p>
            </div>
          )}

          {/* Submit Button */}
          <div className="flex space-x-4">
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="flex-1 bg-blue-600 hover:bg-blue-700"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Submitting...
                </>
              ) : (
                <>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Submit Report
                </>
              )}
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setReportType("");
                setDescription("");
                setLocation("");
              }}
            >
              Clear Form
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Support Information */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-4">
          <h3 className="font-semibold text-blue-800 mb-2">Need immediate support?</h3>
          <p className="text-blue-700 text-sm mb-3">
            If you're in immediate danger or need urgent assistance, don't wait to submit a report. 
            Contact our emergency services directly.
          </p>
          <div className="flex flex-wrap gap-2">
            <Badge className="bg-blue-600 text-white">Campus Security: Ext. 2500</Badge>
            <Badge className="bg-green-600 text-white">Counseling: Ext. 2547</Badge>
            <Badge className="bg-purple-600 text-white">Emergency: 100</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportingSystem;
