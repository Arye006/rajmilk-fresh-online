import { Phone, Mail, MapPin, Facebook, Twitter, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-secondary py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold mb-4 text-secondary-foreground">
              Raj Milk Center
            </h3>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Your trusted source for fresh, premium dairy products. 
              Serving the community with quality and care for over 20 years.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-secondary-foreground">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Home</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Products</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">About Us</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Contact</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Delivery</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-secondary-foreground">
              Contact Info
            </h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-primary flex-shrink-0" />
                <span className="text-muted-foreground">+91 98765 43210</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-primary flex-shrink-0" />
                <span className="text-muted-foreground">info@rajmilkcenter.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
                <span className="text-muted-foreground">123 Dairy Lane, Fresh City</span>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-secondary-foreground">
              Follow Us
            </h4>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="p-2 bg-cream rounded-full hover:bg-primary hover:text-white transition-all shadow-md hover:shadow-lg"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="p-2 bg-cream rounded-full hover:bg-primary hover:text-white transition-all shadow-md hover:shadow-lg"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="p-2 bg-cream rounded-full hover:bg-primary hover:text-white transition-all shadow-md hover:shadow-lg"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              Stay updated with our latest products and offers!
            </p>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border pt-8 text-center">
          <p className="text-muted-foreground">
            © 2024 Raj Milk Center. All rights reserved. | Made with ❤️ for fresh dairy lovers.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;