import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heart, ShoppingCart, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Navigation from "@/components/Navigation";
import { Badge } from "@/components/ui/badge";

interface WishlistItem {
  id: string;
  product_id: string;
  created_at: string;
}

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  discount_percent: number;
  images: string[];
  stock_quantity: number;
}

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [products, setProducts] = useState<{ [key: string]: Product }>({});
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      navigate("/auth");
      return;
    }

    try {
      const { data: wishlistData, error: wishlistError } = await supabase
        .from("wishlist")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (wishlistError) throw wishlistError;
      setWishlistItems(wishlistData || []);

      // Fetch product details
      if (wishlistData && wishlistData.length > 0) {
        const productIds = wishlistData.map(item => item.product_id);
        const { data: productsData, error: productsError } = await supabase
          .from("products")
          .select("*")
          .in("id", productIds);

        if (productsError) throw productsError;
        
        const productsMap: { [key: string]: Product } = {};
        productsData?.forEach(product => {
          productsMap[product.id] = product;
        });
        setProducts(productsMap);
      }
    } catch (error) {
      console.error("Error fetching wishlist:", error);
      toast({
        title: "Error",
        description: "Failed to load wishlist",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const removeFromWishlist = async (wishlistId: string, productName: string) => {
    try {
      const { error } = await supabase
        .from("wishlist")
        .delete()
        .eq("id", wishlistId);

      if (error) throw error;
      
      fetchWishlist();
      toast({
        title: "Removed from wishlist",
        description: `${productName} has been removed from your wishlist`
      });
    } catch (error) {
      console.error("Error removing from wishlist:", error);
      toast({
        title: "Error",
        description: "Failed to remove item",
        variant: "destructive"
      });
    }
  };

  const addToCart = async (product: Product) => {
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

    try {
      const { data: existing } = await supabase
        .from("cart_items")
        .select("*")
        .eq("user_id", user.id)
        .eq("product_id", product.id)
        .maybeSingle();

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
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast({
        title: "Error",
        description: "Failed to add item to cart",
        variant: "destructive"
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="flex items-center justify-center h-96">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-8">
          <Heart className="h-8 w-8 text-primary fill-primary" />
          <h1 className="text-4xl font-bold">My Wishlist</h1>
        </div>

        {wishlistItems.length === 0 ? (
          <div className="text-center py-16 bg-card rounded-2xl border">
            <Heart className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <h2 className="text-2xl font-bold mb-2">Your wishlist is empty</h2>
            <p className="text-muted-foreground mb-6">Save items you love and shop them later!</p>
            <Link to="/">
              <Button size="lg">Start Shopping</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlistItems.map((item) => {
              const product = products[item.product_id];
              if (!product) return null;

              const finalPrice = product.discount_percent > 0
                ? product.price * (1 - product.discount_percent / 100)
                : product.price;

              return (
                <Card key={item.id} className="overflow-hidden group hover:shadow-xl transition-all">
                  <div className="relative aspect-square bg-muted">
                    <Link to={`/product/${product.slug}`}>
                      {product.images.length > 0 ? (
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                          No image
                        </div>
                      )}
                    </Link>
                    <Button
                      size="icon"
                      variant="destructive"
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => removeFromWishlist(item.id, product.name)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="p-4 space-y-3">
                    <Link to={`/product/${product.slug}`}>
                      <h3 className="font-semibold line-clamp-2 hover:text-primary transition-colors">
                        {product.name}
                      </h3>
                    </Link>

                    <div className="flex items-baseline gap-2">
                      <span className="text-xl font-bold">₹{finalPrice.toFixed(2)}</span>
                      {product.discount_percent > 0 && (
                        <>
                          <span className="text-sm text-muted-foreground line-through">
                            ₹{product.price.toFixed(2)}
                          </span>
                          <Badge variant="destructive" className="text-xs">
                            {product.discount_percent}% OFF
                          </Badge>
                        </>
                      )}
                    </div>

                    {product.stock_quantity > 0 ? (
                      <Button
                        className="w-full"
                        onClick={() => addToCart(product)}
                      >
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Add to Cart
                      </Button>
                    ) : (
                      <Button className="w-full" variant="outline" disabled>
                        Out of Stock
                      </Button>
                    )}
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
