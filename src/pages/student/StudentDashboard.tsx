import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Calendar, 
  MapPin, 
  Users, 
  Clock, 
  Star, 
  Search,
  Filter,
  LogOut,
  GraduationCap,
  Heart,
  CheckCircle,
  QrCode,
  MessageSquare
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const StudentDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");

  const handleLogout = () => {
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of the student portal",
    });
    navigate('/');
  };

  const upcomingEvents = [
    {
      id: 1,
      title: "Tech Innovation Summit",
      description: "Explore the latest trends in technology and innovation with industry leaders.",
      date: "2024-01-15",
      time: "10:00 AM",
      location: "Main Auditorium",
      capacity: 200,
      registered: 145,
      type: "conference",
      rating: 4.8,
      isRegistered: false,
      isFavorite: true
    },
    {
      id: 2,
      title: "Career Fair 2024",
      description: "Meet top employers and explore career opportunities across various industries.",
      date: "2024-01-20",
      time: "9:00 AM",
      location: "Student Center",
      capacity: 150,
      registered: 89,
      type: "career",
      rating: 4.6,
      isRegistered: true,
      isFavorite: false
    },
    {
      id: 3,
      title: "Campus Cultural Festival",
      description: "Celebrate diversity with performances, food, and cultural exhibitions.",
      date: "2024-01-25",
      time: "2:00 PM",
      location: "Central Quad",
      capacity: 300,
      registered: 267,
      type: "cultural",
      rating: 4.9,
      isRegistered: false,
      isFavorite: true
    },
    {
      id: 4,
      title: "Research Symposium",
      description: "Present and discover cutting-edge research from students and faculty.",
      date: "2024-01-28",
      time: "1:00 PM",
      location: "Science Building",
      capacity: 100,
      registered: 45,
      type: "academic",
      rating: 4.7,
      isRegistered: false,
      isFavorite: false
    }
  ];

  const registeredEvents = upcomingEvents.filter(event => event.isRegistered);

  const getEventTypeColor = (type: string) => {
    const colors = {
      conference: "bg-primary/10 text-primary",
      cultural: "bg-campus-secondary/10 text-campus-secondary", 
      career: "bg-warning/10 text-warning",
      academic: "bg-success/10 text-success",
      sports: "bg-info/10 text-info"
    };
    return colors[type as keyof typeof colors] || "bg-muted text-muted-foreground";
  };

  const handleRegister = (eventId: number) => {
    toast({
      title: "Registration successful!",
      description: "You have been registered for this event. Check your email for confirmation.",
    });
  };

  const handleCheckIn = (eventId: number) => {
    toast({
      title: "Feature coming soon",
      description: "QR code check-in functionality will be available soon",
    });
  };

  const toggleFavorite = (eventId: number) => {
    toast({
      title: "Feature coming soon",
      description: "Event favoriting will be available soon",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <GraduationCap className="h-6 w-6 text-campus-secondary" />
                <h1 className="text-xl font-bold">Student Portal</h1>
              </div>
              <Badge variant="secondary" className="bg-campus-secondary/10 text-campus-secondary">
                Campus Events
              </Badge>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Welcome back!</h2>
          <p className="text-muted-foreground">Discover and register for exciting campus events</p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-background/50"
            />
          </div>
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filter Events
          </Button>
        </div>

        {/* My Registrations */}
        {registeredEvents.length > 0 && (
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">My Registered Events</h3>
            <div className="grid gap-4 md:grid-cols-2">
              {registeredEvents.map((event) => (
                <Card key={event.id} className="border-0 bg-gradient-card shadow-card border-l-4 border-l-success">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-1">{event.title}</h3>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-2">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            {new Date(event.date).toLocaleDateString()}
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {event.time}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className="bg-success/10 text-success">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Registered
                          </Badge>
                          <Badge variant="secondary" className={getEventTypeColor(event.type)}>
                            {event.type}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button 
                        size="sm" 
                        className="bg-campus-secondary hover:bg-campus-secondary/90 text-white"
                        onClick={() => handleCheckIn(event.id)}
                      >
                        <QrCode className="h-4 w-4 mr-2" />
                        Check In
                      </Button>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Upcoming Events */}
        <div>
          <h3 className="text-xl font-semibold mb-6">Upcoming Events</h3>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {upcomingEvents.map((event) => (
              <Card key={event.id} className="border-0 bg-gradient-card shadow-card group hover:shadow-elevated transition-all hover:scale-105">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="font-semibold text-lg">{event.title}</h3>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="p-1 h-auto"
                          onClick={() => toggleFavorite(event.id)}
                        >
                          <Heart className={`h-4 w-4 ${event.isFavorite ? 'fill-red-500 text-red-500' : 'text-muted-foreground'}`} />
                        </Button>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                        {event.description}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4 mr-2" />
                      {new Date(event.date).toLocaleDateString()} at {event.time}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4 mr-2" />
                      {event.location}
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center text-muted-foreground">
                        <Users className="h-4 w-4 mr-2" />
                        {event.registered}/{event.capacity} registered
                      </div>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 mr-1 text-warning fill-warning" />
                        <span className="text-sm font-medium">{event.rating}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <Badge variant="secondary" className={getEventTypeColor(event.type)}>
                      {event.type}
                    </Badge>
                    <div className="text-right">
                      <div className="text-xs text-muted-foreground">
                        {Math.round((event.registered / event.capacity) * 100)}% filled
                      </div>
                      <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary rounded-full transition-all"
                          style={{ width: `${(event.registered / event.capacity) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    {event.isRegistered ? (
                      <Button variant="outline" className="flex-1" disabled>
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Registered
                      </Button>
                    ) : (
                      <Button 
                        className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
                        onClick={() => handleRegister(event.id)}
                        disabled={event.registered >= event.capacity}
                      >
                        {event.registered >= event.capacity ? "Full" : "Register"}
                      </Button>
                    )}
                    <Button variant="ghost" size="sm">
                      <MessageSquare className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;