
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  MessageCircle, 
  ThumbsUp, 
  ThumbsDown, 
  Plus, 
  Search,
  Filter,
  Users,
  Clock,
  Tag
} from 'lucide-react';
import { useAuth } from '../auth/AuthProvider';

interface Post {
  id: string;
  title: string;
  content: string;
  author: {
    name: string;
    branch: string;
    semester: number;
  };
  community: string;
  tags: string[];
  upvotes: number;
  downvotes: number;
  comments: number;
  timestamp: Date;
  userVote?: 'up' | 'down' | null;
}

const CommunityPosts = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCommunity, setSelectedCommunity] = useState('all');
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    community: '',
    tags: ''
  });

  const communities = [
    'general',
    'coding',
    'placements',
    'academics',
    'projects',
    'internships',
    'doubts',
    'events'
  ];

  // Mock initial posts
  useEffect(() => {
    const mockPosts: Post[] = [
      {
        id: '1',
        title: 'Looking for study group for Data Structures',
        content: 'Hey everyone! I\'m struggling with DSA concepts. Anyone interested in forming a study group? We can meet regularly and solve problems together.',
        author: { name: 'Priya Sharma', branch: 'CSE', semester: 3 },
        community: 'academics',
        tags: ['DSA', 'StudyGroup', 'CSE'],
        upvotes: 12,
        downvotes: 1,
        comments: 8,
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000)
      },
      {
        id: '2',
        title: 'Internship opportunity at local startup',
        content: 'Found this great internship opportunity for web development. They\'re looking for React developers. DM me if interested!',
        author: { name: 'Rahul Kumar', branch: 'CSE', semester: 6 },
        community: 'internships',
        tags: ['Internship', 'WebDev', 'React'],
        upvotes: 25,
        downvotes: 0,
        comments: 15,
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000)
      },
      {
        id: '3',
        title: 'Anyone working on IoT projects?',
        content: 'I\'m building a smart home automation system using Arduino. Would love to collaborate or get some advice from seniors.',
        author: { name: 'Amit Singh', branch: 'ECE', semester: 4 },
        community: 'projects',
        tags: ['IoT', 'Arduino', 'Collaboration'],
        upvotes: 8,
        downvotes: 0,
        comments: 5,
        timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000)
      }
    ];
    setPosts(mockPosts);
  }, []);

  const handleCreatePost = () => {
    if (!newPost.title || !newPost.content || !newPost.community) return;

    const post: Post = {
      id: Date.now().toString(),
      title: newPost.title,
      content: newPost.content,
      author: {
        name: user?.name || 'Anonymous',
        branch: user?.branch?.toUpperCase() || 'Unknown',
        semester: user?.semester || 0
      },
      community: newPost.community,
      tags: newPost.tags.split(',').map(tag => tag.trim()).filter(Boolean),
      upvotes: 0,
      downvotes: 0,
      comments: 0,
      timestamp: new Date(),
      userVote: null
    };

    setPosts(prev => [post, ...prev]);
    setNewPost({ title: '', content: '', community: '', tags: '' });
    setShowCreatePost(false);
  };

  const handleVote = (postId: string, voteType: 'up' | 'down') => {
    setPosts(prev => prev.map(post => {
      if (post.id === postId) {
        const currentVote = post.userVote;
        let upvotes = post.upvotes;
        let downvotes = post.downvotes;

        // Remove previous vote if exists
        if (currentVote === 'up') upvotes--;
        if (currentVote === 'down') downvotes--;

        // Apply new vote if different
        let newVote: 'up' | 'down' | null = null;
        if (currentVote !== voteType) {
          if (voteType === 'up') {
            upvotes++;
            newVote = 'up';
          } else {
            downvotes++;
            newVote = 'down';
          }
        }

        return { ...post, upvotes, downvotes, userVote: newVote };
      }
      return post;
    }));
  };

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCommunity = selectedCommunity === 'all' || post.community === selectedCommunity;
    
    return matchesSearch && matchesCommunity;
  });

  const getTimeAgo = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    
    if (hours < 1) return 'Just now';
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <CardHeader>
          <CardTitle className="flex items-center justify-between text-2xl">
            <div className="flex items-center space-x-2">
              <Users className="w-7 h-7" />
              <span>Community Posts</span>
            </div>
            <Button
              onClick={() => setShowCreatePost(!showCreatePost)}
              className="bg-white/20 hover:bg-white/30 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Post
            </Button>
          </CardTitle>
          <p className="text-purple-100">Share knowledge, ask questions, and connect with your peers</p>
        </CardHeader>
      </Card>

      {/* Create Post Form */}
      {showCreatePost && (
        <Card className="bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-lg">Create New Post</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              placeholder="Post title..."
              value={newPost.title}
              onChange={(e) => setNewPost(prev => ({ ...prev, title: e.target.value }))}
            />
            <Textarea
              placeholder="Share your thoughts, questions, or resources..."
              value={newPost.content}
              onChange={(e) => setNewPost(prev => ({ ...prev, content: e.target.value }))}
              rows={4}
            />
            <div className="grid grid-cols-2 gap-4">
              <Select 
                value={newPost.community} 
                onValueChange={(value) => setNewPost(prev => ({ ...prev, community: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select community" />
                </SelectTrigger>
                <SelectContent>
                  {communities.map(community => (
                    <SelectItem key={community} value={community}>
                      {community.charAt(0).toUpperCase() + community.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input
                placeholder="Tags (comma separated)"
                value={newPost.tags}
                onChange={(e) => setNewPost(prev => ({ ...prev, tags: e.target.value }))}
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowCreatePost(false)}>
                Cancel
              </Button>
              <Button 
                onClick={handleCreatePost}
                className="bg-gradient-to-r from-purple-600 to-pink-600"
              >
                Post
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Search and Filter */}
      <Card className="bg-white/80 backdrop-blur-sm">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedCommunity} onValueChange={setSelectedCommunity}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="All Communities" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Communities</SelectItem>
                {communities.map(community => (
                  <SelectItem key={community} value={community}>
                    {community.charAt(0).toUpperCase() + community.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Posts List */}
      <div className="space-y-4">
        {filteredPosts.map((post) => (
          <Card key={post.id} className="bg-white/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="flex flex-col items-center space-y-2 min-w-0">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleVote(post.id, 'up')}
                    className={`p-1 ${post.userVote === 'up' ? 'text-green-600' : 'text-gray-400'}`}
                  >
                    <ThumbsUp className="w-4 h-4" />
                  </Button>
                  <span className="text-sm font-medium">{post.upvotes - post.downvotes}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleVote(post.id, 'down')}
                    className={`p-1 ${post.userVote === 'down' ? 'text-red-600' : 'text-gray-400'}`}
                  >
                    <ThumbsDown className="w-4 h-4" />
                  </Button>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-2">
                    <Badge variant="secondary" className="text-xs">
                      {post.community}
                    </Badge>
                    <span className="text-sm text-gray-600">
                      by {post.author.name} • {post.author.branch} Sem {post.author.semester}
                    </span>
                    <div className="flex items-center space-x-1 text-xs text-gray-500">
                      <Clock className="w-3 h-3" />
                      <span>{getTimeAgo(post.timestamp)}</span>
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{post.title}</h3>
                  <p className="text-gray-700 mb-3 leading-relaxed">{post.content}</p>

                  {post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {post.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          <Tag className="w-2 h-2 mr-1" />
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <button className="flex items-center space-x-1 hover:text-blue-600">
                      <MessageCircle className="w-4 h-4" />
                      <span>{post.comments} comments</span>
                    </button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <Card className="bg-white/80 backdrop-blur-sm">
          <CardContent className="p-8 text-center">
            <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No posts found</h3>
            <p className="text-gray-600">Be the first to start a discussion!</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CommunityPosts;
