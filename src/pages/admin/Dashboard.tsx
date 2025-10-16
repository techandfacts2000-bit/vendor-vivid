import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Plus, Edit, Trash2, Package, ShoppingCart, DollarSign, Users } from "lucide-react";
import Navigation from "@/components/Navigation";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    totalProducts: 0,
    totalUsers: 0
  });
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [isProductDialogOpen, setIsProductDialogOpen] = useState(false);
  const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [editingCategory, setEditingCategory] = useState<any>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const [productForm, setProductForm] = useState({
    name: "", slug: "", description: "", price: "", discount_percent: "0",
    stock_quantity: "", category_id: "", images: "", is_featured: false, is_active: true
  });
  const [categoryForm, setCategoryForm] = useState({
    name: "", slug: "", description: "", image_url: "", is_active: true, display_order: "0"
  });

  useEffect(() => {
    checkAdmin();
    fetchStats();
  }, []);

  const checkAdmin = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      navigate("/auth");
      return;
    }

    const { data: roles } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", user.id)
      .eq("role", "admin")
      .single();

    if (!roles) {
      navigate("/");
      return;
    }
  };

  const fetchStats = async () => {
    const [ordersRes, productsRes, usersRes, categoriesRes] = await Promise.all([
      supabase.from("orders").select("*, order_items(*)"),
      supabase.from("products").select("*"),
      supabase.from("profiles").select("id", { count: "exact" }),
      supabase.from("categories").select("*")
    ]);

    const totalRevenue = ordersRes.data?.reduce((sum, order) => sum + Number(order.total_amount), 0) || 0;

    setStats({
      totalOrders: ordersRes.data?.length || 0,
      totalRevenue,
      totalProducts: productsRes.data?.length || 0,
      totalUsers: usersRes.count || 0
    });

    if (productsRes.data) setProducts(productsRes.data);
    if (categoriesRes.data) setCategories(categoriesRes.data);
    if (ordersRes.data) setOrders(ordersRes.data);
  };

  const handleProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const productData = {
        ...productForm,
        price: parseFloat(productForm.price),
        discount_percent: parseInt(productForm.discount_percent),
        stock_quantity: parseInt(productForm.stock_quantity),
        images: productForm.images.split(',').map(url => url.trim()).filter(Boolean),
      };

      if (editingProduct) {
        await supabase.from("products").update(productData).eq("id", editingProduct.id);
        toast({ title: "Product updated successfully" });
      } else {
        await supabase.from("products").insert(productData);
        toast({ title: "Product created successfully" });
      }

      setIsProductDialogOpen(false);
      setEditingProduct(null);
      setProductForm({ name: "", slug: "", description: "", price: "", discount_percent: "0",
        stock_quantity: "", category_id: "", images: "", is_featured: false, is_active: true });
      fetchStats();
    } catch (error) {
      toast({ title: "Error saving product", variant: "destructive" });
    }
  };

  const handleCategorySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const categoryData = {
        ...categoryForm,
        display_order: parseInt(categoryForm.display_order),
      };

      if (editingCategory) {
        await supabase.from("categories").update(categoryData).eq("id", editingCategory.id);
        toast({ title: "Category updated successfully" });
      } else {
        await supabase.from("categories").insert(categoryData);
        toast({ title: "Category created successfully" });
      }

      setIsCategoryDialogOpen(false);
      setEditingCategory(null);
      setCategoryForm({ name: "", slug: "", description: "", image_url: "", is_active: true, display_order: "0" });
      fetchStats();
    } catch (error) {
      toast({ title: "Error saving category", variant: "destructive" });
    }
  };

  const deleteProduct = async (id: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      await supabase.from("products").delete().eq("id", id);
      toast({ title: "Product deleted" });
      fetchStats();
    }
  };

  const deleteCategory = async (id: string) => {
    if (confirm("Are you sure you want to delete this category?")) {
      await supabase.from("categories").delete().eq("id", id);
      toast({ title: "Category deleted" });
      fetchStats();
    }
  };

  const editProduct = (product: any) => {
    setEditingProduct(product);
    setProductForm({
      name: product.name,
      slug: product.slug,
      description: product.description || "",
      price: product.price.toString(),
      discount_percent: product.discount_percent.toString(),
      stock_quantity: product.stock_quantity.toString(),
      category_id: product.category_id || "",
      images: product.images?.join(', ') || "",
      is_featured: product.is_featured,
      is_active: product.is_active,
    });
    setIsProductDialogOpen(true);
  };

  const editCategory = (category: any) => {
    setEditingCategory(category);
    setCategoryForm({
      name: category.name,
      slug: category.slug,
      description: category.description || "",
      image_url: category.image_url || "",
      is_active: category.is_active,
      display_order: category.display_order.toString(),
    });
    setIsCategoryDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <ShoppingCart className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Orders</p>
                <p className="text-2xl font-bold">{stats.totalOrders}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-500/10 rounded-lg">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Revenue</p>
                <p className="text-2xl font-bold">₹{stats.totalRevenue.toFixed(2)}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-500/10 rounded-lg">
                <Package className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Products</p>
                <p className="text-2xl font-bold">{stats.totalProducts}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-500/10 rounded-lg">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Users</p>
                <p className="text-2xl font-bold">{stats.totalUsers}</p>
              </div>
            </div>
          </Card>
        </div>

        <Tabs defaultValue="products" className="w-full">
          <TabsList>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
          </TabsList>

          <TabsContent value="products" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Products Management</h3>
              <Dialog open={isProductDialogOpen} onOpenChange={setIsProductDialogOpen}>
                <DialogTrigger asChild>
                  <Button onClick={() => { setEditingProduct(null); setProductForm({ name: "", slug: "", description: "", price: "", discount_percent: "0", stock_quantity: "", category_id: "", images: "", is_featured: false, is_active: true }); }}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Product
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>{editingProduct ? "Edit Product" : "Add New Product"}</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleProductSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Name</Label>
                        <Input required value={productForm.name} onChange={(e) => setProductForm({...productForm, name: e.target.value})} />
                      </div>
                      <div>
                        <Label>Slug</Label>
                        <Input required value={productForm.slug} onChange={(e) => setProductForm({...productForm, slug: e.target.value})} />
                      </div>
                    </div>
                    <div>
                      <Label>Description</Label>
                      <Textarea value={productForm.description} onChange={(e) => setProductForm({...productForm, description: e.target.value})} />
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label>Price</Label>
                        <Input required type="number" step="0.01" value={productForm.price} onChange={(e) => setProductForm({...productForm, price: e.target.value})} />
                      </div>
                      <div>
                        <Label>Discount %</Label>
                        <Input type="number" value={productForm.discount_percent} onChange={(e) => setProductForm({...productForm, discount_percent: e.target.value})} />
                      </div>
                      <div>
                        <Label>Stock</Label>
                        <Input required type="number" value={productForm.stock_quantity} onChange={(e) => setProductForm({...productForm, stock_quantity: e.target.value})} />
                      </div>
                    </div>
                    <div>
                      <Label>Category</Label>
                      <Select value={productForm.category_id} onValueChange={(value) => setProductForm({...productForm, category_id: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((cat) => (
                            <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Images (comma-separated URLs)</Label>
                      <Textarea value={productForm.images} onChange={(e) => setProductForm({...productForm, images: e.target.value})} placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg" />
                    </div>
                    <div className="flex gap-6">
                      <div className="flex items-center space-x-2">
                        <Switch checked={productForm.is_featured} onCheckedChange={(checked) => setProductForm({...productForm, is_featured: checked})} />
                        <Label>Featured</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch checked={productForm.is_active} onCheckedChange={(checked) => setProductForm({...productForm, is_active: checked})} />
                        <Label>Active</Label>
                      </div>
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button type="button" variant="outline" onClick={() => setIsProductDialogOpen(false)}>Cancel</Button>
                      <Button type="submit">Save Product</Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
            <div className="grid gap-4">
              {products.map((product) => (
                <Card key={product.id}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex gap-4">
                        {product.images?.[0] && (
                          <img src={product.images[0]} alt={product.name} className="w-16 h-16 object-cover rounded" />
                        )}
                        <div>
                          <h4 className="font-semibold">{product.name}</h4>
                          <p className="text-sm text-muted-foreground">₹{product.price} • Stock: {product.stock_quantity}</p>
                          <div className="flex gap-2 mt-1">
                            {product.is_featured && <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">Featured</span>}
                            {product.is_active ? <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Active</span> : <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">Inactive</span>}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => editProduct(product)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="destructive" size="sm" onClick={() => deleteProduct(product.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="categories" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Categories Management</h3>
              <Dialog open={isCategoryDialogOpen} onOpenChange={setIsCategoryDialogOpen}>
                <DialogTrigger asChild>
                  <Button onClick={() => { setEditingCategory(null); setCategoryForm({ name: "", slug: "", description: "", image_url: "", is_active: true, display_order: "0" }); }}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Category
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-lg">
                  <DialogHeader>
                    <DialogTitle>{editingCategory ? "Edit Category" : "Add New Category"}</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleCategorySubmit} className="space-y-4">
                    <div>
                      <Label>Name</Label>
                      <Input required value={categoryForm.name} onChange={(e) => setCategoryForm({...categoryForm, name: e.target.value})} />
                    </div>
                    <div>
                      <Label>Slug</Label>
                      <Input required value={categoryForm.slug} onChange={(e) => setCategoryForm({...categoryForm, slug: e.target.value})} />
                    </div>
                    <div>
                      <Label>Description</Label>
                      <Textarea value={categoryForm.description} onChange={(e) => setCategoryForm({...categoryForm, description: e.target.value})} />
                    </div>
                    <div>
                      <Label>Image URL</Label>
                      <Input value={categoryForm.image_url} onChange={(e) => setCategoryForm({...categoryForm, image_url: e.target.value})} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Display Order</Label>
                        <Input type="number" value={categoryForm.display_order} onChange={(e) => setCategoryForm({...categoryForm, display_order: e.target.value})} />
                      </div>
                      <div className="flex items-center space-x-2 pt-6">
                        <Switch checked={categoryForm.is_active} onCheckedChange={(checked) => setCategoryForm({...categoryForm, is_active: checked})} />
                        <Label>Active</Label>
                      </div>
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button type="button" variant="outline" onClick={() => setIsCategoryDialogOpen(false)}>Cancel</Button>
                      <Button type="submit">Save Category</Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
            <div className="grid gap-4">
              {categories.map((category) => (
                <Card key={category.id}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex gap-4">
                        {category.image_url && (
                          <img src={category.image_url} alt={category.name} className="w-16 h-16 object-cover rounded" />
                        )}
                        <div>
                          <h4 className="font-semibold">{category.name}</h4>
                          <p className="text-sm text-muted-foreground">{category.slug}</p>
                          {category.is_active ? <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded mt-1 inline-block">Active</span> : <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded mt-1 inline-block">Inactive</span>}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => editCategory(category)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="destructive" size="sm" onClick={() => deleteCategory(category.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="orders" className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Orders Management</h3>
            </div>
            <div className="grid gap-4">
              {orders.map((order) => (
                <Card key={order.id}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="font-semibold text-lg mb-1">Order #{order.order_number}</h4>
                        <p className="text-sm text-muted-foreground">
                          Placed on {new Date(order.created_at).toLocaleDateString()} at {new Date(order.created_at).toLocaleTimeString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-xl">₹{order.total_amount.toFixed(2)}</p>
                        <Select
                          value={order.status}
                          onValueChange={async (value) => {
                            await supabase.from("orders").update({ status: value }).eq("id", order.id);
                            toast({ title: "Status updated" });
                            fetchStats();
                          }}
                        >
                          <SelectTrigger className="w-40 mt-2">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="processing">Processing</SelectItem>
                            <SelectItem value="shipped">Shipped</SelectItem>
                            <SelectItem value="delivered">Delivered</SelectItem>
                            <SelectItem value="cancelled">Cancelled</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    {order.order_items && order.order_items.length > 0 && (
                      <div className="border-t pt-4 mt-4">
                        <h5 className="font-semibold mb-3">Order Items</h5>
                        <div className="space-y-2">
                          {order.order_items.map((item: any, idx: number) => (
                            <div key={idx} className="flex justify-between text-sm">
                              <span className="text-muted-foreground">
                                {item.product_name} × {item.quantity}
                              </span>
                              <span className="font-medium">₹{item.subtotal.toFixed(2)}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <div className="border-t pt-4 mt-4 grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Payment Status</p>
                        <p className="font-medium capitalize">{order.payment_status}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Payment Method</p>
                        <p className="font-medium uppercase">{order.payment_method || 'COD'}</p>
                      </div>
                      {order.shipping_address && (
                        <div className="col-span-2">
                          <p className="text-muted-foreground">Shipping Address</p>
                          <p className="font-medium">
                            {order.shipping_address.full_name}, {order.shipping_address.phone}
                            <br />
                            {order.shipping_address.address_line1}, {order.shipping_address.city}
                            <br />
                            {order.shipping_address.state} - {order.shipping_address.pincode}
                          </p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
