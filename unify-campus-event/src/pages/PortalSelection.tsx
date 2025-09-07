import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GraduationCap, Shield, Calendar, Users, BarChart3, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PortalSelection = () => {
  const navigate = useNavigate();

  const features = [
    { icon: Calendar, text: "Event Management" },
    { icon: Users, text: "Student Registration" },
    { icon: CheckCircle, text: "QR Check-in System" },
    { icon: BarChart3, text: "Analytics & Reports" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-hero">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative container mx-auto px-4 py-20 text-center">
          <div className="mb-8 inline-flex items-center space-x-2 rounded-full bg-white/10 px-4 py-2 text-sm text-white backdrop-blur-sm">
            <GraduationCap className="h-4 w-4" />
            <span>Campus Event Management System</span>
          </div>
          
          <h1 className="mb-6 text-5xl font-bold text-white">
            Streamline Your
            <span className="block bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
              Campus Events
            </span>
          </h1>
          
          <p className="mx-auto mb-12 max-w-2xl text-xl text-white/90">
            Comprehensive event management platform designed for educational institutions. 
            Manage events, track attendance, and engage students seamlessly.
          </p>

          {/* Features Grid */}
          <div className="mb-16 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {features.map((feature, index) => (
              <div key={index} className="flex flex-col items-center space-y-2">
                <div className="rounded-full bg-white/10 p-3 backdrop-blur-sm">
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <span className="text-sm text-white/80">{feature.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Portal Selection */}
      <div className="container mx-auto px-4 py-16">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold">Choose Your Portal</h2>
          <p className="text-lg text-muted-foreground">
            Select the appropriate portal based on your role
          </p>
        </div>

        <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2">
          {/* Admin Portal Card */}
          <Card className="group relative overflow-hidden border-0 bg-gradient-card p-8 shadow-card transition-all hover:shadow-elevated hover:scale-105">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
            <div className="relative">
              <div className="mb-6 inline-flex items-center justify-center rounded-full bg-primary/10 p-4">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              
              <h3 className="mb-4 text-2xl font-bold">Admin Portal</h3>
              <p className="mb-6 text-muted-foreground">
                Complete control over event management, student oversight, and comprehensive analytics.
              </p>
              
              <div className="mb-8 space-y-2">
                <div className="flex items-center text-sm">
                  <CheckCircle className="mr-2 h-4 w-4 text-success" />
                  Create & manage events
                </div>
                <div className="flex items-center text-sm">
                  <CheckCircle className="mr-2 h-4 w-4 text-success" />
                  Monitor registrations & attendance
                </div>
                <div className="flex items-center text-sm">
                  <CheckCircle className="mr-2 h-4 w-4 text-success" />
                  Generate detailed reports
                </div>
                <div className="flex items-center text-sm">
                  <CheckCircle className="mr-2 h-4 w-4 text-success" />
                  Manage student feedback
                </div>
              </div>
              
              <Button 
                onClick={() => navigate('/admin/login')}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-glow"
                size="lg"
              >
                Access Admin Portal
              </Button>
            </div>
          </Card>

          {/* Student Portal Card */}
          <Card className="group relative overflow-hidden border-0 bg-gradient-card p-8 shadow-card transition-all hover:shadow-elevated hover:scale-105">
            <div className="absolute inset-0 bg-gradient-to-br from-campus-secondary/5 to-transparent" />
            <div className="relative">
              <div className="mb-6 inline-flex items-center justify-center rounded-full bg-campus-secondary/10 p-4">
                <GraduationCap className="h-8 w-8 text-campus-secondary" />
              </div>
              
              <h3 className="mb-4 text-2xl font-bold">Student Portal</h3>
              <p className="mb-6 text-muted-foreground">
                Discover events, register seamlessly, check-in with QR codes, and provide feedback.
              </p>
              
              <div className="mb-8 space-y-2">
                <div className="flex items-center text-sm">
                  <CheckCircle className="mr-2 h-4 w-4 text-success" />
                  Browse upcoming events
                </div>
                <div className="flex items-center text-sm">
                  <CheckCircle className="mr-2 h-4 w-4 text-success" />
                  Quick event registration
                </div>
                <div className="flex items-center text-sm">
                  <CheckCircle className="mr-2 h-4 w-4 text-success" />
                  QR code check-in
                </div>
                <div className="flex items-center text-sm">
                  <CheckCircle className="mr-2 h-4 w-4 text-success" />
                  Rate & review events
                </div>
              </div>
              
              <Button 
                onClick={() => navigate('/student/login')}
                variant="outline"
                className="w-full border-campus-secondary text-campus-secondary hover:bg-campus-secondary hover:text-white"
                size="lg"
              >
                Access Student Portal
              </Button>
            </div>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t bg-muted/30 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            Campus Event Management Platform © 2024. Streamlining campus life one event at a time.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default PortalSelection;