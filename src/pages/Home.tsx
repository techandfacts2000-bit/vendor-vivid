import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShoppingCart, Search, User, Menu, Heart } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import CategorySection from "@/components/CategorySection";
import HeroBanner from "@/components/HeroBanner";
import { useToast } from "@/hooks/use-toast";

interface Product {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price: number;
  discount_percent: number;
  images: string[];
  is_featured: boolean;
  stock_quantity: number;
}

interface Category {
  id: string;
  name: string;
  slug: string;
  image_url: string | null;
}

interface Banner {
  id: string;
  title: string;
  image_url: string;
  link_url: string | null;
}

const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [banners, setBanners] = useState<Banner[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [cartCount, setCartCount] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    fetchData();
    fetchCartCount();
  }, []);

  const fetchData = async () => {
    try {
      const [productsRes, categoriesRes, bannersRes] = await Promise.all([
        supabase.from("products").select("*").eq("is_active", true).order("created_at", { ascending: false }).limit(12),
        supabase.from("categories").select("*").eq("is_active", true).order("display_order"),
        supabase.from("banners").select("*").eq("is_active", true).order("display_order")
      ]);

      if (productsRes.data) setProducts(productsRes.data);
      if (categoriesRes.data) setCategories(categoriesRes.data);
      if (bannersRes.data) setBanners(bannersRes.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchCartCount = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data } = await supabase
        .from("cart_items")
        .select("quantity")
        .eq("user_id", user.id);
      
      if (data) {
        const total = data.reduce((sum, item) => sum + item.quantity, 0);
        setCartCount(total);
      }
    }
  };

  const featuredProducts = products.filter(p => p.is_featured);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <h1 className="text-2xl font-bold text-primary">CosterBox</h1>
            </Link>

            <div className="hidden md:flex flex-1 max-w-2xl mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search for handcrafted products..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Link to="/account">
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </Link>
              <Link to="/wishlist">
                <Button variant="ghost" size="icon">
                  <Heart className="h-5 w-5" />
                </Button>
              </Link>
              <Link to="/cart">
                <Button variant="ghost" size="icon" className="relative">
                  <ShoppingCart className="h-5 w-5" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </Button>
              </Link>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Mobile Search */}
          <div className="md:hidden pb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Hero Banner */}
      {banners.length > 0 && <HeroBanner banners={banners} />}

      {/* Categories */}
      {categories.length > 0 && (
        <section className="py-8 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-6">Shop by Category</h2>
            <CategorySection categories={categories} />
          </div>
        </section>
      )}

      {/* Featured Products */}
      {featuredProducts.length > 0 && (
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold">Featured Products</h2>
              <Link to="/products">
                <Button variant="outline">View All</Button>
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} onCartUpdate={fetchCartCount} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Latest Products */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6">Latest Handcrafted Items</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.slice(0, 8).map((product) => (
              <ProductCard key={product.id} product={product} onCartUpdate={fetchCartCount} />
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Handcrafted with Love</h2>
          <p className="max-w-2xl mx-auto text-lg opacity-90">
            CosterBox brings you authentic handcrafted products that celebrate traditional Indian craftsmanship. 
            Each piece is made with care by skilled artisans, blending heritage with modern design.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">CosterBox</h3>
              <p className="text-sm text-muted-foreground">
                Handcrafted eco-friendly fashion and lifestyle products from India.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/products" className="text-muted-foreground hover:text-foreground">Products</Link></li>
                <li><Link to="/about" className="text-muted-foreground hover:text-foreground">About Us</Link></li>
                <li><Link to="/contact" className="text-muted-foreground hover:text-foreground">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Customer Service</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/account/orders" className="text-muted-foreground hover:text-foreground">Track Order</Link></li>
                <li><Link to="/returns" className="text-muted-foreground hover:text-foreground">Returns</Link></li>
                <li><Link to="/faq" className="text-muted-foreground hover:text-foreground">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Contact Us</h4>
              <p className="text-sm text-muted-foreground">Tonk, Rajasthan, India</p>
              <p className="text-sm text-muted-foreground mt-2">Email: contact@costerbox.com</p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
            <p>&copy; 2024 CosterBox. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
