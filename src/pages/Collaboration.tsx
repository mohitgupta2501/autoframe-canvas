import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Users, 
  MessageCircle, 
  Bell, 
  UserPlus, 
  Settings,
  Activity,
  Star,
  Clock,
  FolderOpen,
  Share2
} from "lucide-react";

const Collaboration = () => {
  const [newComment, setNewComment] = useState("");

  const projects = [
    { 
      id: 1, 
      name: "Customer Analytics Pipeline", 
      description: "End-to-end customer behavior analysis",
      members: 4, 
      models: 3, 
      datasets: 2, 
      status: "active",
      lastActivity: "2 hours ago",
      owner: "John Doe"
    },
    { 
      id: 2, 
      name: "Sales Forecasting Initiative", 
      description: "Quarterly sales prediction models",
      members: 3, 
      models: 2, 
      datasets: 1, 
      status: "active",
      lastActivity: "1 day ago",
      owner: "Jane Smith"
    },
    { 
      id: 3, 
      name: "Fraud Detection Research", 
      description: "Advanced fraud prevention algorithms",
      members: 5, 
      models: 4, 
      datasets: 3, 
      status: "completed",
      lastActivity: "1 week ago",
      owner: "Mike Johnson"
    },
  ];

  const teamMembers = [
    { 
      id: 1, 
      name: "John Doe", 
      email: "john.doe@company.com", 
      role: "Admin", 
      avatar: "JD",
      status: "online",
      lastSeen: "Active now",
      projects: 3
    },
    { 
      id: 2, 
      name: "Jane Smith", 
      email: "jane.smith@company.com", 
      role: "Analyst", 
      avatar: "JS",
      status: "online",
      lastSeen: "5 minutes ago",
      projects: 2
    },
    { 
      id: 3, 
      name: "Mike Johnson", 
      email: "mike.johnson@company.com", 
      role: "Engineer", 
      avatar: "MJ",
      status: "offline",
      lastSeen: "2 hours ago",
      projects: 4
    },
    { 
      id: 4, 
      name: "Sarah Wilson", 
      email: "sarah.wilson@company.com", 
      role: "Viewer", 
      avatar: "SW",
      status: "away",
      lastSeen: "30 minutes ago",
      projects: 1
    },
  ];

  const comments = [
    {
      id: 1,
      author: "John Doe",
      avatar: "JD",
      content: "Great results on the XGBoost model! The accuracy improvement is significant.",
      timestamp: "2 hours ago",
      model: "Customer Churn XGBoost v2.1",
      likes: 3
    },
    {
      id: 2,
      author: "Jane Smith",
      avatar: "JS",
      content: "I've updated the feature engineering pipeline. The new categorical encoding is showing promising results.",
      timestamp: "4 hours ago",
      model: "Sales Forecast LightGBM v1.3",
      likes: 5
    },
    {
      id: 3,
      author: "Mike Johnson",
      avatar: "MJ",
      content: "Should we consider ensemble methods for the fraud detection model? I think we can push the F1 score higher.",
      timestamp: "1 day ago",
      model: "Fraud Detection CatBoost v1.0",
      likes: 2
    },
  ];

  const notifications = [
    {
      id: 1,
      type: "model_completed",
      title: "Model training completed",
      description: "XGBoost training finished with 94.2% accuracy",
      timestamp: "5 minutes ago",
      read: false
    },
    {
      id: 2,
      type: "comment",
      title: "New comment on your model",
      description: "Jane Smith commented on Sales Forecast Model",
      timestamp: "1 hour ago",
      read: false
    },
    {
      id: 3,
      type: "member_added",
      title: "New team member added",
      description: "Sarah Wilson joined Customer Analytics Pipeline",
      timestamp: "2 hours ago",
      read: true
    },
    {
      id: 4,
      type: "deployment",
      title: "Model deployed successfully",
      description: "Customer Churn API is now live in production",
      timestamp: "3 hours ago",
      read: true
    },
  ];

  const activityFeed = [
    {
      id: 1,
      user: "John Doe",
      action: "deployed model",
      target: "Customer Churn XGBoost v2.1",
      timestamp: "2 hours ago",
      avatar: "JD"
    },
    {
      id: 2,
      user: "Jane Smith",
      action: "updated dataset",
      target: "Sales Historical Data",
      timestamp: "4 hours ago",
      avatar: "JS"
    },
    {
      id: 3,
      user: "Mike Johnson",
      action: "started training",
      target: "Fraud Detection Model v2.0",
      timestamp: "6 hours ago",
      avatar: "MJ"
    },
    {
      id: 4,
      user: "Sarah Wilson",
      action: "joined project",
      target: "Customer Analytics Pipeline",
      timestamp: "8 hours ago",
      avatar: "SW"
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Collaboration Hub
          </h1>
          <p className="text-muted-foreground mt-2">
            Collaborate with your team on ML projects and models
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Share2 className="w-4 h-4 mr-2" />
            Share Project
          </Button>
          <Button className="bg-gradient-primary">
            <UserPlus className="w-4 h-4 mr-2" />
            Invite Team Member
          </Button>
        </div>
      </div>

      <Tabs defaultValue="projects" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="team">Team Members</TabsTrigger>
          <TabsTrigger value="comments">Comments</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="activity">Activity Feed</TabsTrigger>
        </TabsList>

        <TabsContent value="projects" className="space-y-6">
          <Card className="bg-card shadow-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FolderOpen className="w-5 h-5" />
                Project Spaces
              </CardTitle>
              <CardDescription>
                Collaborative workspaces for your ML projects
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
                  <Card key={project.id} className="bg-muted/30 border-border hover:shadow-glow transition-all cursor-pointer">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{project.name}</CardTitle>
                        <Badge 
                          variant="outline"
                          className={
                            project.status === 'active' ? 'border-success text-success' :
                            'border-muted-foreground text-muted-foreground'
                          }
                        >
                          {project.status}
                        </Badge>
                      </div>
                      <CardDescription>{project.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="grid grid-cols-3 gap-2 text-center">
                          <div className="p-2 rounded bg-muted/50">
                            <p className="text-sm font-medium">{project.members}</p>
                            <p className="text-xs text-muted-foreground">Members</p>
                          </div>
                          <div className="p-2 rounded bg-muted/50">
                            <p className="text-sm font-medium">{project.models}</p>
                            <p className="text-xs text-muted-foreground">Models</p>
                          </div>
                          <div className="p-2 rounded bg-muted/50">
                            <p className="text-sm font-medium">{project.datasets}</p>
                            <p className="text-xs text-muted-foreground">Datasets</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Owner: {project.owner}</span>
                          <span className="text-muted-foreground">{project.lastActivity}</span>
                        </div>
                        
                        <Button className="w-full" variant="outline">
                          <FolderOpen className="w-4 h-4 mr-2" />
                          Open Project
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="team" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Team Members */}
            <Card className="bg-card shadow-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Team Members
                </CardTitle>
                <CardDescription>
                  Manage team members and their roles
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {teamMembers.map((member) => (
                  <div key={member.id} className="flex items-center justify-between p-3 rounded-lg border border-border bg-muted/30">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <Avatar>
                          <AvatarImage src="" />
                          <AvatarFallback className="bg-gradient-primary text-primary-foreground">
                            {member.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-background ${
                          member.status === 'online' ? 'bg-success' :
                          member.status === 'away' ? 'bg-warning' :
                          'bg-muted-foreground'
                        }`} />
                      </div>
                      <div>
                        <h4 className="font-medium">{member.name}</h4>
                        <p className="text-sm text-muted-foreground">{member.email}</p>
                        <p className="text-xs text-muted-foreground">{member.lastSeen}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <Badge variant="outline">{member.role}</Badge>
                        <p className="text-xs text-muted-foreground mt-1">
                          {member.projects} projects
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        <Settings className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Add New Member */}
            <Card className="bg-card shadow-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserPlus className="w-5 h-5" />
                  Invite Team Member
                </CardTitle>
                <CardDescription>
                  Add new members to your team
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="member-email">Email Address</Label>
                  <Input
                    id="member-email"
                    type="email"
                    placeholder="john.doe@company.com"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="member-role">Role</Label>
                  <Select defaultValue="viewer">
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Admin - Full access</SelectItem>
                      <SelectItem value="analyst">Analyst - Can train models</SelectItem>
                      <SelectItem value="engineer">Engineer - Can deploy models</SelectItem>
                      <SelectItem value="viewer">Viewer - Read-only access</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="invitation-message">Invitation Message</Label>
                  <Textarea
                    id="invitation-message"
                    placeholder="Welcome to our ML team! We're excited to collaborate with you."
                    className="mt-1"
                  />
                </div>

                <Button className="w-full bg-gradient-primary">
                  <UserPlus className="w-4 h-4 mr-2" />
                  Send Invitation
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="comments" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Comments Feed */}
            <Card className="bg-card shadow-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="w-5 h-5" />
                  Recent Comments
                </CardTitle>
                <CardDescription>
                  Latest comments on models and results
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {comments.map((comment) => (
                  <div key={comment.id} className="p-4 rounded-lg border border-border bg-muted/30">
                    <div className="flex items-start gap-3">
                      <Avatar>
                        <AvatarImage src="" />
                        <AvatarFallback className="bg-gradient-primary text-primary-foreground">
                          {comment.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium">{comment.author}</span>
                          <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
                        </div>
                        <p className="text-sm mb-2">{comment.content}</p>
                        <div className="flex items-center justify-between">
                          <Badge variant="outline" className="text-xs">
                            {comment.model}
                          </Badge>
                          <div className="flex items-center gap-1">
                            <Button variant="ghost" size="sm">
                              <Star className="w-3 h-3" />
                              {comment.likes}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Add Comment */}
            <Card className="bg-card shadow-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="w-5 h-5" />
                  Add Comment
                </CardTitle>
                <CardDescription>
                  Share your thoughts on models and results
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="comment-model">Select Model</Label>
                  <Select defaultValue="1">
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Customer Churn XGBoost v2.1</SelectItem>
                      <SelectItem value="2">Sales Forecast LightGBM v1.3</SelectItem>
                      <SelectItem value="3">Fraud Detection CatBoost v1.0</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="comment-text">Comment</Label>
                  <Textarea
                    id="comment-text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Share your insights, suggestions, or questions..."
                    className="mt-1 min-h-[100px]"
                  />
                </div>

                <Button 
                  className="w-full bg-gradient-primary"
                  disabled={!newComment.trim()}
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Post Comment
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card className="bg-card shadow-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Notifications
              </CardTitle>
              <CardDescription>
                Stay updated with team activities and system events
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {notifications.map((notification) => (
                  <div 
                    key={notification.id} 
                    className={`p-4 rounded-lg border transition-colors ${
                      notification.read 
                        ? 'border-border bg-muted/30' 
                        : 'border-primary/20 bg-primary/5'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          {notification.type === 'model_completed' && <Activity className="w-4 h-4 text-success" />}
                          {notification.type === 'comment' && <MessageCircle className="w-4 h-4 text-primary" />}
                          {notification.type === 'member_added' && <UserPlus className="w-4 h-4 text-accent" />}
                          {notification.type === 'deployment' && <Activity className="w-4 h-4 text-warning" />}
                          <span className="font-medium">{notification.title}</span>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-primary rounded-full" />
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">
                          {notification.description}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {notification.timestamp}
                        </p>
                      </div>
                      <Button variant="ghost" size="sm">
                        Mark as read
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity" className="space-y-6">
          <Card className="bg-card shadow-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5" />
                Activity Feed
              </CardTitle>
              <CardDescription>
                Real-time feed of team activities and system events
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activityFeed.map((activity) => (
                  <div key={activity.id} className="flex items-center gap-4 p-3 rounded-lg bg-muted/30">
                    <Avatar>
                      <AvatarImage src="" />
                      <AvatarFallback className="bg-gradient-primary text-primary-foreground">
                        {activity.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm">
                        <span className="font-medium">{activity.user}</span>
                        {' '}{activity.action}{' '}
                        <span className="font-medium">{activity.target}</span>
                      </p>
                      <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
                    </div>
                    <Clock className="w-4 h-4 text-muted-foreground" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Collaboration;