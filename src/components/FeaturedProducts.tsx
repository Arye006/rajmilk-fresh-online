import ProductCard from "./ProductCard";
import wholeMilkImage from "@/assets/whole-milk.jpg";
import yogurtImage from "@/assets/yogurt.jpg";
import cheeseImage from "@/assets/cheese.jpg";
import butterImage from "@/assets/butter.jpg";
import creamImage from "@/assets/cream.jpg";
import paneerImage from "@/assets/paneer.jpg";

const FeaturedProducts = () => {
  const products = [
    {
      id: 1,
      image: wholeMilkImage,
      name: "Fresh Whole Milk",
      price: "₹60/L",
      description: "Pure, farm-fresh whole milk delivered daily"
    },
    {
      id: 2,
      image: yogurtImage,
      name: "Creamy Yogurt",
      price: "₹45/500g",
      description: "Rich, creamy yogurt made from fresh milk"
    },
    {
      id: 3,
      image: cheeseImage,
      name: "Artisan Cheese",
      price: "₹120/200g",
      description: "Handcrafted cheese with authentic taste"
    },
    {
      id: 4,
      image: butterImage,
      name: "Fresh Butter",
      price: "₹80/100g",
      description: "Creamy butter made from pure cream"
    },
    {
      id: 5,
      image: creamImage,
      name: "Heavy Cream",
      price: "₹90/250ml",
      description: "Rich cream perfect for cooking and desserts"
    },
    {
      id: 6,
      image: paneerImage,
      name: "Fresh Paneer",
      price: "₹150/250g",
      description: "Soft, fresh paneer made daily"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Featured Products
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our premium selection of fresh dairy products, 
            carefully sourced and delivered with love.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {products.map((product, index) => (
            <ProductCard key={index} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;