import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { ArrowLeft, User, Mail, MapPin } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useState, useEffect } from "react";

const Profile = () => {
  const { user } = useAuth();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    if (user?.user_metadata?.full_name) {
      setName(user.user_metadata.full_name);
    }
  }, [user]);

  const handleSaveProfile = () => {
    // This would typically save to a profiles table in Supabase
    console.log("Saving profile:", { name, address });
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-md mx-auto text-center p-8">
          <CardContent className="space-y-4">
            <div className="text-6xl mb-4">👤</div>
            <h3 className="text-xl font-semibold text-foreground">Please log in</h3>
            <p className="text-muted-foreground">You need to be logged in to view your profile</p>
            <Link to="/auth">
              <Button className="mt-4">Login</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-4 mb-4">
            <Link to="/">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </Button>
            </Link>
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-2">Profile</h1>
          <p className="text-muted-foreground">Manage your account information</p>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Account Information
              </CardTitle>
              <CardDescription>
                Your profile details and delivery preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={user.email || ""}
                  disabled
                  className="bg-muted"
                />
                <p className="text-sm text-muted-foreground">
                  Email cannot be changed. Contact support if needed.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="name" className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Full Name
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address" className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Delivery Address
                </Label>
                <Input
                  id="address"
                  type="text"
                  placeholder="Enter your delivery address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
                <p className="text-sm text-muted-foreground">
                  This address will be used for milk deliveries.
                </p>
              </div>

              <div className="flex gap-4">
                <Button onClick={handleSaveProfile} className="flex-1">
                  Save Changes
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/cart">View Cart</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;