import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ShoppingCart, User, LogOut } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const { getItemCount } = useCart();
  const { user, signOut, loading } = useAuth();

  if (loading) {
    return (
      <div className="absolute top-0 left-0 right-0 z-20 p-6">
        <div className="container mx-auto flex justify-between items-center">
          <h2 className="text-2xl font-bold text-primary">Raj Milk Center</h2>
          <div className="flex items-center gap-4">
            <div className="h-9 w-16 bg-white/20 rounded animate-pulse"></div>
            <div className="h-9 w-16 bg-white/20 rounded animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="absolute top-0 left-0 right-0 z-20 p-6">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/">
          <h2 className="text-2xl font-bold text-primary">Raj Milk Center</h2>
        </Link>
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <Link to="/cart" className="relative">
                <Button variant="outline" size="sm" className="gap-2 bg-white/90 hover:bg-white">
                  <ShoppingCart className="w-4 h-4" />
                  Cart
                  {getItemCount() > 0 && (
                    <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full w-5 h-5 text-xs flex items-center justify-center">
                      {getItemCount()}
                    </span>
                  )}
                </Button>
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-2 bg-white/90 hover:bg-white">
                    <User className="w-4 h-4" />
                    {user.email}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="cursor-pointer">
                      <User className="w-4 h-4 mr-2" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={signOut} className="cursor-pointer">
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <Link to="/auth">
              <Button variant="outline" size="sm" className="bg-white/90 hover:bg-white">
                Login / Sign Up
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;