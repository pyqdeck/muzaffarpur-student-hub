
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Shield, 
  Users, 
  MessageSquare, 
  Bell, 
  Settings,
  Plus,
  Eye,
  Edit,
  Trash2,
  BarChart3
} from 'lucide-react';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showCreateAnnouncement, setShowCreateAnnouncement] = useState(false);
  const [announcement, setAnnouncement] = useState({
    title: '',
    content: '',
    priority: 'medium',
    targetBranch: 'all',
    targetSemester: 'all'
  });

  const stats = [
    { label: 'Total Students', value: '2,450', icon: Users, color: 'text-blue-600' },
    { label: 'Active Posts', value: '156', icon: MessageSquare, color: 'text-green-600' },
    { label: 'Announcements', value: '28', icon: Bell, color: 'text-orange-600' },
    { label: 'Reported Content', value: '3', icon: Shield, color: 'text-red-600' }
  ];

  const recentActivity = [
    { user: 'Priya Sharma', action: 'Created post in Academics', time: '2 hours ago' },
    { user: 'Rahul Kumar', action: 'Shared internship opportunity', time: '4 hours ago' },
    { user: 'Admin', action: 'Posted exam schedule announcement', time: '6 hours ago' },
  ];

  const handleCreateAnnouncement = () => {
    console.log('Creating announcement:', announcement);
    setShowCreateAnnouncement(false);
    setAnnouncement({ title: '', content: '', priority: 'medium', targetBranch: 'all', targetSemester: 'all' });
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="bg-white/80 backdrop-blur-sm">
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

      {/* Recent Activity */}
      <Card className="bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BarChart3 className="w-5 h-5" />
            <span>Recent Activity</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{activity.user}</p>
                  <p className="text-sm text-gray-600">{activity.action}</p>
                </div>
                <span className="text-xs text-gray-500">{activity.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderAnnouncements = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Manage Announcements</h2>
        <Button
          onClick={() => setShowCreateAnnouncement(true)}
          className="bg-gradient-to-r from-blue-600 to-green-600"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Announcement
        </Button>
      </div>

      {showCreateAnnouncement && (
        <Card className="bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Create New Announcement</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              placeholder="Announcement title..."
              value={announcement.title}
              onChange={(e) => setAnnouncement(prev => ({ ...prev, title: e.target.value }))}
            />
            <Textarea
              placeholder="Announcement content..."
              value={announcement.content}
              onChange={(e) => setAnnouncement(prev => ({ ...prev, content: e.target.value }))}
              rows={4}
            />
            <div className="grid grid-cols-3 gap-4">
              <Select 
                value={announcement.priority} 
                onValueChange={(value) => setAnnouncement(prev => ({ ...prev, priority: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low Priority</SelectItem>
                  <SelectItem value="medium">Medium Priority</SelectItem>
                  <SelectItem value="high">High Priority</SelectItem>
                </SelectContent>
              </Select>
              <Select 
                value={announcement.targetBranch} 
                onValueChange={(value) => setAnnouncement(prev => ({ ...prev, targetBranch: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Target Branch" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Branches</SelectItem>
                  <SelectItem value="computer_science">Computer Science</SelectItem>
                  <SelectItem value="electronics">Electronics</SelectItem>
                  <SelectItem value="mechanical">Mechanical</SelectItem>
                  <SelectItem value="civil">Civil</SelectItem>
                </SelectContent>
              </Select>
              <Select 
                value={announcement.targetSemester} 
                onValueChange={(value) => setAnnouncement(prev => ({ ...prev, targetSemester: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Target Semester" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Semesters</SelectItem>
                  {[1,2,3,4,5,6,7,8].map(sem => (
                    <SelectItem key={sem} value={sem.toString()}>Semester {sem}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowCreateAnnouncement(false)}>
                Cancel
              </Button>
              <Button 
                onClick={handleCreateAnnouncement}
                className="bg-gradient-to-r from-blue-600 to-green-600"
              >
                Publish
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-red-600 to-orange-600 text-white">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-2xl">
            <Shield className="w-7 h-7" />
            <span>Admin Dashboard</span>
          </CardTitle>
          <p className="text-red-100">Manage campus network and student activities</p>
        </CardHeader>
      </Card>

      {/* Tab Navigation */}
      <Card className="bg-white/80 backdrop-blur-sm">
        <CardContent className="p-4">
          <div className="flex space-x-1">
            {[
              { id: 'overview', label: 'Overview', icon: BarChart3 },
              { id: 'announcements', label: 'Announcements', icon: Bell },
              { id: 'users', label: 'Users', icon: Users },
              { id: 'content', label: 'Content', icon: MessageSquare },
              { id: 'settings', label: 'Settings', icon: Settings }
            ].map((tab) => (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? "default" : "ghost"}
                size="sm"
                onClick={() => setActiveTab(tab.id)}
                className={`${
                  activeTab === tab.id 
                    ? "bg-gradient-to-r from-red-600 to-orange-600 text-white" 
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <tab.icon className="w-4 h-4 mr-2" />
                {tab.label}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Tab Content */}
      {activeTab === 'overview' && renderOverview()}
      {activeTab === 'announcements' && renderAnnouncements()}
      {activeTab === 'users' && (
        <Card className="bg-white/80 backdrop-blur-sm">
          <CardContent className="p-8 text-center">
            <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">User Management</h3>
            <p className="text-gray-600">User management features coming soon...</p>
          </CardContent>
        </Card>
      )}
      {activeTab === 'content' && (
        <Card className="bg-white/80 backdrop-blur-sm">
          <CardContent className="p-8 text-center">
            <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Content Moderation</h3>
            <p className="text-gray-600">Content moderation tools coming soon...</p>
          </CardContent>
        </Card>
      )}
      {activeTab === 'settings' && (
        <Card className="bg-white/80 backdrop-blur-sm">
          <CardContent className="p-8 text-center">
            <Settings className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">System Settings</h3>
            <p className="text-gray-600">System configuration options coming soon...</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AdminDashboard;
