import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import heroImage from "@/assets/hero-milk-bottles.jpg";

const Hero = () => {
  const { getItemCount } = useCart();
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Navigation */}
      <div className="absolute top-0 left-0 right-0 z-20 p-6">
        <div className="container mx-auto flex justify-between items-center">
          <h2 className="text-2xl font-bold text-primary">Raj Milk Center</h2>
          <div className="flex items-center gap-4">
            <Link to="/auth">
              <Button variant="outline" size="sm" className="bg-white/90 hover:bg-white">
                Login
              </Button>
            </Link>
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
          </div>
        </div>
      </div>

      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-milk/90 via-cream/80 to-transparent"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center max-w-4xl">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-foreground">
          Raj Milk Center
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-cream-foreground font-medium">
          Fresh Milk, Daily Delivered.
        </p>
        <p className="text-lg mb-10 text-muted-foreground max-w-2xl mx-auto">
          Experience the pure taste of farm-fresh dairy products delivered straight to your doorstep. Quality you can trust, freshness you can taste.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all" asChild>
            <Link to="/products">Shop Now</Link>
          </Button>
          <Button variant="outline" size="lg" className="text-lg px-8 py-6 rounded-full">
            Learn More
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;