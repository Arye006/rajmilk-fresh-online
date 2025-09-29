import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, CreditCard } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import type { Profile, Order, OrderItem } from "@/types/database";

const checkoutSchema = z.object({
  name: z.string()
    .trim()
    .min(2, { message: "Name must be at least 2 characters" })
    .max(100, { message: "Name must be less than 100 characters" })
    .regex(/^[a-zA-Z\s]+$/, { message: "Name can only contain letters and spaces" }),
  email: z.string()
    .trim()
    .email({ message: "Invalid email address" })
    .max(255, { message: "Email must be less than 255 characters" }),
  phone: z.string()
    .trim()
    .min(10, { message: "Phone number must be at least 10 digits" })
    .max(15, { message: "Phone number must be less than 15 digits" })
    .regex(/^[0-9+\-\s()]+$/, { message: "Invalid phone number format" }),
  address: z.string()
    .trim()
    .min(10, { message: "Address must be at least 10 characters" })
    .max(500, { message: "Address must be less than 500 characters" }),
  city: z.string()
    .trim()
    .min(2, { message: "City must be at least 2 characters" })
    .max(100, { message: "City must be less than 100 characters" }),
  zipCode: z.string()
    .trim()
    .min(5, { message: "ZIP code must be at least 5 characters" })
    .max(10, { message: "ZIP code must be less than 10 characters" })
    .regex(/^[0-9]+$/, { message: "ZIP code can only contain numbers" }),
  notes: z.string()
    .max(500, { message: "Notes must be less than 500 characters" })
    .optional()
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

const Checkout = () => {
  const { items, getTotalPrice } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
  });

  // Load user profile data to pre-fill form
  useEffect(() => {
    const loadProfile = async () => {
      if (!user) return;
      
      try {
        const { data, error } = await (supabase as any)
          .from('profiles')
          .select('*')
          .eq('user_id', user.id)
          .single();

        if (data) {
          setValue('name', data.full_name || '');
          setValue('email', data.email || '');
          setValue('phone', data.phone || '');
          setValue('address', data.delivery_address || '');
        } else {
          // Fallback to user metadata
          setValue('name', user.user_metadata?.full_name || '');
          setValue('email', user.email || '');
        }
      } catch (error) {
        console.error('Error loading profile:', error);
      }
    };

    loadProfile();
  }, [user, setValue]);

  // Redirect to cart if empty
  if (items.length === 0) {
    navigate("/cart");
    return null;
  }

  const onSubmit = async (data: CheckoutFormData) => {
    if (!user) {
      toast({
        title: "Please log in",
        description: "You need to be logged in to place an order.",
        variant: "destructive",
      });
      navigate("/auth");
      return;
    }

    setIsProcessing(true);
    
    try {
      // Save order to Supabase
      const deliveryFee = 20;
      const subtotal = getTotalPrice();
      const total = subtotal + deliveryFee;

      // Create order
      const { data: orderData, error: orderError } = await (supabase as any)
        .from('orders')
        .insert({
          user_id: user.id,
          customer_name: data.name,
          customer_email: data.email,
          customer_phone: data.phone,
          delivery_address: `${data.address}, ${data.city} - ${data.zipCode}`,
          delivery_notes: data.notes || null,
          subtotal: subtotal,
          delivery_fee: deliveryFee,
          total_amount: total,
          status: 'pending',
        })
        .select()
        .single();

      if (orderError) {
        throw orderError;
      }

      if (!orderData?.id) {
        throw new Error('Order creation failed');
      }

      // Create order items
      const orderItems = items.map(item => ({
        order_id: orderData.id,
        product_name: item.name,
        quantity: item.quantity,
        unit_price: parseFloat(item.price.replace('₹', '').replace(/\/.*/, '')),
        total_price: parseFloat(item.price.replace('₹', '').replace(/\/.*/, '')) * item.quantity,
      }));

      const { error: itemsError } = await (supabase as any)
        .from('order_items')
        .insert(orderItems);

      if (itemsError) {
        throw itemsError;
      }

      // Update user profile with delivery info if not already set
      await (supabase as any)
        .from('profiles')
        .upsert({
          user_id: user.id,
          email: data.email,
          full_name: data.name,
          phone: data.phone,
          delivery_address: `${data.address}, ${data.city} - ${data.zipCode}`,
        });

      toast({
        title: "Order placed successfully!",
        description: `Order #${orderData.id} has been received. We'll deliver your fresh dairy products soon!`,
      });
      
      // Clear cart and navigate
      navigate("/");
    } catch (error) {
      console.error('Error placing order:', error);
      toast({
        title: "Order failed",
        description: "Please try again or contact support.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const deliveryFee = 20;
  const subtotal = getTotalPrice();
  const total = subtotal + deliveryFee;

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-4 mb-4">
            <Link to="/cart">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Cart
              </Button>
            </Link>
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-2">Checkout</h1>
          <p className="text-muted-foreground">Complete your order</p>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Delivery Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          {...register("name")}
                          className={errors.name ? "border-destructive" : ""}
                        />
                        {errors.name && (
                          <p className="text-sm text-destructive">{errors.name.message}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          {...register("email")}
                          className={errors.email ? "border-destructive" : ""}
                        />
                        {errors.email && (
                          <p className="text-sm text-destructive">{errors.email.message}</p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        {...register("phone")}
                        placeholder="+91 9876543210"
                        className={errors.phone ? "border-destructive" : ""}
                      />
                      {errors.phone && (
                        <p className="text-sm text-destructive">{errors.phone.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address">Delivery Address *</Label>
                      <Textarea
                        id="address"
                        {...register("address")}
                        placeholder="House/Flat No, Street, Area"
                        rows={3}
                        className={errors.address ? "border-destructive" : ""}
                      />
                      {errors.address && (
                        <p className="text-sm text-destructive">{errors.address.message}</p>
                      )}
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="city">City *</Label>
                        <Input
                          id="city"
                          {...register("city")}
                          className={errors.city ? "border-destructive" : ""}
                        />
                        {errors.city && (
                          <p className="text-sm text-destructive">{errors.city.message}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="zipCode">ZIP Code *</Label>
                        <Input
                          id="zipCode"
                          {...register("zipCode")}
                          className={errors.zipCode ? "border-destructive" : ""}
                        />
                        {errors.zipCode && (
                          <p className="text-sm text-destructive">{errors.zipCode.message}</p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="notes">Delivery Notes (Optional)</Label>
                      <Textarea
                        id="notes"
                        {...register("notes")}
                        placeholder="Any special instructions for delivery"
                        rows={2}
                        className={errors.notes ? "border-destructive" : ""}
                      />
                      {errors.notes && (
                        <p className="text-sm text-destructive">{errors.notes.message}</p>
                      )}
                    </div>

                    <Button
                      type="submit"
                      className="w-full text-lg py-6 gap-2"
                      size="lg"
                      disabled={isProcessing}
                    >
                      <CreditCard className="w-5 h-5" />
                      {isProcessing ? "Processing..." : `Pay Now - ₹${total}`}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-8">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Items */}
                  <div className="space-y-3">
                    {items.map((item) => (
                      <div key={item.id} className="flex gap-3">
                        <div className="w-12 h-12 rounded-lg overflow-hidden bg-warm-white flex-shrink-0">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-grow">
                          <h4 className="font-medium text-sm">{item.name}</h4>
                          <p className="text-xs text-muted-foreground">
                            Qty: {item.quantity}
                          </p>
                        </div>
                        <div className="text-sm font-medium">
                          ₹{(parseFloat(item.price.replace('₹', '').replace(/\/.*/, '')) * item.quantity).toFixed(0)}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-border pt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Subtotal</span>
                      <span>₹{subtotal.toFixed(0)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Delivery Fee</span>
                      <span>₹{deliveryFee}</span>
                    </div>
                    <div className="flex justify-between font-semibold text-lg border-t border-border pt-2">
                      <span>Total</span>
                      <span className="text-primary">₹{total.toFixed(0)}</span>
                    </div>
                  </div>

                  <div className="text-xs text-muted-foreground mt-4 p-3 bg-muted/50 rounded-lg">
                    <p>💳 Secure payment processing</p>
                    <p>🚚 Free delivery on orders over ₹500</p>
                    <p>📞 24/7 customer support</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;