import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Heart } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  discount_percent: number;
  images: string[];
  stock_quantity: number;
}

interface ProductCardProps {
  product: Product;
  onCartUpdate?: () => void;
}

const ProductCard = ({ product, onCartUpdate }: ProductCardProps) => {
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const { toast } = useToast();

  const finalPrice = product.discount_percent > 0
    ? product.price * (1 - product.discount_percent / 100)
    : product.price;

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      toast({
        title: "Please login",
        description: "You need to be logged in to add items to cart",
        variant: "destructive"
      });
      return;
    }

    if (product.stock_quantity <= 0) {
      toast({
        title: "Out of stock",
        description: "This product is currently unavailable",
        variant: "destructive"
      });
      return;
    }

    setIsAddingToCart(true);

    try {
      const { data: existing } = await supabase
        .from("cart_items")
        .select("*")
        .eq("user_id", user.id)
        .eq("product_id", product.id)
        .single();

      if (existing) {
        await supabase
          .from("cart_items")
          .update({ quantity: existing.quantity + 1 })
          .eq("id", existing.id);
      } else {
        await supabase
          .from("cart_items")
          .insert({
            user_id: user.id,
            product_id: product.id,
            quantity: 1
          });
      }

      toast({
        title: "Added to cart",
        description: `${product.name} has been added to your cart`
      });

      if (onCartUpdate) onCartUpdate();
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast({
        title: "Error",
        description: "Failed to add item to cart",
        variant: "destructive"
      });
    } finally {
      setIsAddingToCart(false);
    }
  };

  return (
    <Link to={`/product/${product.slug}`}>
      <Card className="group overflow-hidden hover:shadow-lg transition-shadow">
        <div className="relative aspect-square overflow-hidden bg-muted">
          {product.images.length > 0 ? (
            <img
              src={product.images[0]}
              alt={product.name}
              className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
              No image
            </div>
          )}
          {product.discount_percent > 0 && (
            <div className="absolute top-2 left-2 bg-destructive text-destructive-foreground px-2 py-1 rounded text-sm font-semibold">
              {product.discount_percent}% OFF
            </div>
          )}
          <Button
            size="icon"
            variant="secondary"
            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            <Heart className="h-4 w-4" />
          </Button>
        </div>
        <CardContent className="p-4">
          <h3 className="font-semibold line-clamp-2 mb-2">{product.name}</h3>
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold">₹{finalPrice.toFixed(2)}</span>
            {product.discount_percent > 0 && (
              <span className="text-sm text-muted-foreground line-through">
                ₹{product.price.toFixed(2)}
              </span>
            )}
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <Button
            className="w-full"
            onClick={handleAddToCart}
            disabled={isAddingToCart || product.stock_quantity <= 0}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            {product.stock_quantity <= 0 ? "Out of Stock" : "Add to Cart"}
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default ProductCard;
