import { useState } from "react";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ProductCard";
import { Link } from "react-router-dom";
import { ArrowLeft, ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import wholeMilkImage from "@/assets/whole-milk.jpg";
import yogurtImage from "@/assets/yogurt.jpg";
import cheeseImage from "@/assets/cheese.jpg";
import butterImage from "@/assets/butter.jpg";
import creamImage from "@/assets/cream.jpg";
import paneerImage from "@/assets/paneer.jpg";

const Products = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const { getItemCount } = useCart();

  const allProducts = [
    {
      id: 1,
      image: wholeMilkImage,
      name: "Fresh Whole Milk",
      price: "₹60/L",
      description: "Pure, farm-fresh whole milk delivered daily",
      category: "milk"
    },
    {
      id: 2,
      image: wholeMilkImage,
      name: "Toned Milk",
      price: "₹55/L",
      description: "Low-fat milk for health-conscious families",
      category: "milk"
    },
    {
      id: 3,
      image: wholeMilkImage,
      name: "Double Toned Milk",
      price: "₹50/L",
      description: "Ultra-low fat milk with essential nutrients",
      category: "milk"
    },
    {
      id: 4,
      image: yogurtImage,
      name: "Fresh Curd",
      price: "₹40/500g",
      description: "Thick, creamy curd made from fresh milk",
      category: "curd"
    },
    {
      id: 5,
      image: yogurtImage,
      name: "Greek Yogurt",
      price: "₹80/400g",
      description: "Rich, protein-packed Greek-style yogurt",
      category: "curd"
    },
    {
      id: 6,
      image: yogurtImage,
      name: "Flavored Yogurt",
      price: "₹60/200g",
      description: "Delicious fruit-flavored yogurt for kids",
      category: "curd"
    },
    {
      id: 7,
      image: butterImage,
      name: "Fresh Butter",
      price: "₹80/100g",
      description: "Creamy butter made from pure cream",
      category: "butter"
    },
    {
      id: 8,
      image: butterImage,
      name: "Salted Butter",
      price: "₹85/100g",
      description: "Premium salted butter for cooking",
      category: "butter"
    },
    {
      id: 9,
      image: butterImage,
      name: "Garlic Butter",
      price: "₹120/100g",
      description: "Herb-infused garlic butter spread",
      category: "butter"
    },
    {
      id: 10,
      image: paneerImage,
      name: "Fresh Paneer",
      price: "₹150/250g",
      description: "Soft, fresh paneer made daily",
      category: "paneer"
    },
    {
      id: 11,
      image: paneerImage,
      name: "Malai Paneer",
      price: "₹180/250g",
      description: "Rich, creamy malai paneer for special dishes",
      category: "paneer"
    },
    {
      id: 12,
      image: paneerImage,
      name: "Low-Fat Paneer",
      price: "₹160/250g",
      description: "Health-conscious low-fat paneer option",
      category: "paneer"
    }
  ];

  const categories = [
    { id: "all", name: "All Products" },
    { id: "milk", name: "Milk" },
    { id: "curd", name: "Curd & Yogurt" },
    { id: "butter", name: "Butter" },
    { id: "paneer", name: "Paneer" }
  ];

  const filteredProducts = activeCategory === "all" 
    ? allProducts 
    : allProducts.filter(product => product.category === activeCategory);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-4">
            <Link to="/">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </Button>
            </Link>
            <Link to="/cart" className="relative">
              <Button variant="outline" size="sm" className="gap-2">
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
          <h1 className="text-4xl font-bold text-foreground mb-2">Our Products</h1>
          <p className="text-muted-foreground">Fresh dairy products delivered to your doorstep</p>
        </div>
      </header>

      {/* Category Filter */}
      <section className="py-8 bg-card">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={activeCategory === category.id ? "default" : "outline"}
                onClick={() => setActiveCategory(category.id)}
                className="rounded-full px-6"
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-8xl mx-auto">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
          
          {filteredProducts.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">No products found in this category.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Products;