import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  Users, 
  BarChart3, 
  Settings, 
  Plus, 
  Filter, 
  Search,
  LogOut,
  Shield,
  TrendingUp,
  CheckCircle,
  Clock,
  UserCheck
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");

  const handleLogout = () => {
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of the admin portal",
    });
    navigate('/');
  };

  const stats = [
    {
      title: "Total Events",
      value: "24",
      change: "+12%",
      trend: "up",
      icon: Calendar,
      color: "text-primary"
    },
    {
      title: "Active Students",
      value: "1,543",
      change: "+8%", 
      trend: "up",
      icon: Users,
      color: "text-campus-secondary"
    },
    {
      title: "Event Attendance",
      value: "87%",
      change: "+3%",
      trend: "up", 
      icon: UserCheck,
      color: "text-success"
    },
    {
      title: "Avg. Rating",
      value: "4.6",
      change: "+0.2",
      trend: "up",
      icon: BarChart3,
      color: "text-warning"
    }
  ];

  const recentEvents = [
    {
      id: 1,
      title: "Tech Innovation Summit",
      date: "2024-01-15",
      registrations: 145,
      capacity: 200,
      status: "upcoming",
      type: "conference"
    },
    {
      id: 2,
      title: "Campus Cultural Festival",
      date: "2024-01-12",
      registrations: 320,
      capacity: 300,
      status: "completed",
      type: "cultural"
    },
    {
      id: 3,
      title: "Career Fair 2024",
      date: "2024-01-20",
      registrations: 89,
      capacity: 150,
      status: "upcoming",
      type: "career"
    },
    {
      id: 4,
      title: "Sports Tournament",
      date: "2024-01-10",
      registrations: 67,
      capacity: 80,
      status: "completed",
      type: "sports"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "upcoming":
        return <Badge variant="secondary" className="bg-primary/10 text-primary">Upcoming</Badge>;
      case "completed":
        return <Badge variant="secondary" className="bg-success/10 text-success">Completed</Badge>;
      case "cancelled":
        return <Badge variant="secondary" className="bg-destructive/10 text-destructive">Cancelled</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const getEventTypeColor = (type: string) => {
    const colors = {
      conference: "bg-primary/10 text-primary",
      cultural: "bg-campus-secondary/10 text-campus-secondary", 
      career: "bg-warning/10 text-warning",
      sports: "bg-success/10 text-success"
    };
    return colors[type as keyof typeof colors] || "bg-muted text-muted-foreground";
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Shield className="h-6 w-6 text-primary" />
                <h1 className="text-xl font-bold">Admin Portal</h1>
              </div>
              <Badge variant="secondary" className="bg-primary/10 text-primary">
                Campus Event Management
              </Badge>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Overview */}
        <div className="mb-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Card key={index} className="border-0 bg-gradient-card shadow-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <div className="flex items-center mt-1">
                      <TrendingUp className="h-3 w-3 text-success mr-1" />
                      <span className="text-xs text-success">{stat.change}</span>
                    </div>
                  </div>
                  <div className={`p-3 rounded-full bg-background/50 ${stat.color}`}>
                    <stat.icon className="h-5 w-5" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Quick Actions</h2>
          <div className="grid gap-4 md:grid-cols-3">
            <Button 
              size="lg" 
              className="h-auto p-6 bg-primary hover:bg-primary/90 text-primary-foreground shadow-glow"
              onClick={() => {
                toast({
                  title: "Feature coming soon",
                  description: "Event creation will be available in the next update"
                });
              }}
            >
              <div className="text-center">
                <Plus className="h-6 w-6 mx-auto mb-2" />
                <div className="font-semibold">Create New Event</div>
                <div className="text-sm opacity-90">Set up a new campus event</div>
              </div>
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              className="h-auto p-6 border-campus-secondary text-campus-secondary hover:bg-campus-secondary hover:text-white"
              onClick={() => {
                toast({
                  title: "Feature coming soon", 
                  description: "Student management will be available soon"
                });
              }}
            >
              <div className="text-center">
                <Users className="h-6 w-6 mx-auto mb-2" />
                <div className="font-semibold">Manage Students</div>
                <div className="text-sm opacity-90">View and manage student accounts</div>
              </div>
            </Button>
            
            <Button 
              variant="outline"
              size="lg" 
              className="h-auto p-6"
              onClick={() => {
                toast({
                  title: "Feature coming soon",
                  description: "Advanced reports will be available soon"
                });
              }}
            >
              <div className="text-center">
                <BarChart3 className="h-6 w-6 mx-auto mb-2" />
                <div className="font-semibold">Generate Reports</div>
                <div className="text-sm opacity-90">Create detailed analytics reports</div>
              </div>
            </Button>
          </div>
        </div>

        {/* Recent Events */}
        <Card className="border-0 bg-gradient-card shadow-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Recent Events</CardTitle>
                <CardDescription>Latest events and their registration status</CardDescription>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
                <Button variant="outline" size="sm">
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentEvents.map((event) => (
                <div key={event.id} className="flex items-center justify-between p-4 rounded-lg bg-background/50 border">
                  <div className="flex items-center space-x-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="font-semibold">{event.title}</h3>
                        {getStatusBadge(event.status)}
                        <Badge variant="secondary" className={getEventTypeColor(event.type)}>
                          {event.type}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {new Date(event.date).toLocaleDateString()}
                        </div>
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-1" />
                          {event.registrations}/{event.capacity} registered
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="text-right">
                      <div className="text-sm font-medium">
                        {Math.round((event.registrations / event.capacity) * 100)}% filled
                      </div>
                      <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary rounded-full transition-all"
                          style={{ width: `${(event.registrations / event.capacity) * 100}%` }}
                        />
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      View Details
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;