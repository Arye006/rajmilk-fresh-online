import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";

interface ProductCardProps {
  id: number;
  image: string;
  name: string;
  price: string;
  description?: string;
}

const ProductCard = ({ id, image, name, price, description }: ProductCardProps) => {
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = () => {
    addToCart({ id, name, price, image });
    toast({
      title: "Added to cart",
      description: `${name} has been added to your cart`,
    });
  };
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden border-0 shadow-md">
      <div className="aspect-square overflow-hidden bg-warm-white">
        <img 
          src={image} 
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <CardContent className="p-6 bg-gradient-to-b from-warm-white to-cream">
        <h3 className="text-xl font-semibold mb-2 text-card-foreground">{name}</h3>
        {description && (
          <p className="text-sm text-muted-foreground mb-3">{description}</p>
        )}
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-primary">{price}</span>
          <Button 
            size="sm" 
            onClick={handleAddToCart}
            className="rounded-full px-6 shadow-md hover:shadow-lg transition-all"
          >
            Add to Cart
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;