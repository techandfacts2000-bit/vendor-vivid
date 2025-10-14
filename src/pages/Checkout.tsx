import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";

interface Address {
  id: string;
  full_name: string;
  phone: string;
  address_line1: string;
  address_line2: string | null;
  city: string;
  state: string;
  pincode: string;
  is_default: boolean;
}

const Checkout = () => {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [newAddress, setNewAddress] = useState({
    full_name: "",
    phone: "",
    address_line1: "",
    address_line2: "",
    city: "",
    state: "",
    pincode: ""
  });
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      navigate("/auth");
      return;
    }

    const { data } = await supabase
      .from("addresses")
      .select("*")
      .eq("user_id", user.id)
      .order("is_default", { ascending: false });

    if (data) {
      setAddresses(data);
      if (data.length > 0) {
        setSelectedAddress(data[0].id);
      } else {
        setShowAddressForm(true);
      }
    }
  };

  const handleAddAddress = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from("addresses")
        .insert([{ ...newAddress, user_id: user.id }])
        .select()
        .single();

      if (error) throw error;

      setAddresses([...addresses, data]);
      setSelectedAddress(data.id);
      setShowAddressForm(false);
      setNewAddress({
        full_name: "",
        phone: "",
        address_line1: "",
        address_line2: "",
        city: "",
        state: "",
        pincode: ""
      });

      toast({
        title: "Address added",
        description: "Your address has been saved"
      });
    } catch (error) {
      console.error("Error adding address:", error);
      toast({
        title: "Error",
        description: "Failed to add address",
        variant: "destructive"
      });
    }
  };

  const handlePlaceOrder = async () => {
    if (!selectedAddress) {
      toast({
        title: "Select address",
        description: "Please select a delivery address",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    try {
      // Fetch cart items
      const { data: cartItems } = await supabase
        .from("cart_items")
        .select(`
          *,
          products (*)
        `)
        .eq("user_id", user.id);

      if (!cartItems || cartItems.length === 0) {
        toast({
          title: "Cart is empty",
          description: "Add items to cart before checkout",
          variant: "destructive"
        });
        return;
      }

      // Calculate total
      const subtotal = cartItems.reduce((total, item) => {
        const price = item.products.discount_percent > 0
          ? item.products.price * (1 - item.products.discount_percent / 100)
          : item.products.price;
        return total + (price * item.quantity);
      }, 0);

      // Get address
      const address = addresses.find(a => a.id === selectedAddress);

      // Create order
      const { data: order, error: orderError } = await supabase
        .from("orders")
        .insert([{
          user_id: user.id,
          subtotal: subtotal,
          total_amount: subtotal,
          shipping_address: address as any,
          payment_method: "cod",
          order_number: `CB${Date.now()}`
        }])
        .select()
        .single();

      if (orderError) throw orderError;

      // Create order items
      const orderItems = cartItems.map(item => ({
        order_id: order.id,
        product_id: item.product_id,
        product_name: item.products.name,
        product_price: item.products.discount_percent > 0
          ? item.products.price * (1 - item.products.discount_percent / 100)
          : item.products.price,
        quantity: item.quantity,
        subtotal: (item.products.discount_percent > 0
          ? item.products.price * (1 - item.products.discount_percent / 100)
          : item.products.price) * item.quantity
      }));

      const { error: itemsError } = await supabase
        .from("order_items")
        .insert(orderItems);

      if (itemsError) throw itemsError;

      // Clear cart
      await supabase
        .from("cart_items")
        .delete()
        .eq("user_id", user.id);

      toast({
        title: "Order placed!",
        description: "Your order has been placed successfully"
      });

      navigate("/account/orders");
    } catch (error) {
      console.error("Error placing order:", error);
      toast({
        title: "Error",
        description: "Failed to place order",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Delivery Address</h2>
                <Button variant="outline" onClick={() => setShowAddressForm(!showAddressForm)}>
                  {showAddressForm ? "Cancel" : "Add New"}
                </Button>
              </div>

              {showAddressForm && (
                <div className="space-y-4 mb-6 p-4 border rounded-lg">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Full Name</Label>
                      <Input
                        value={newAddress.full_name}
                        onChange={(e) => setNewAddress({...newAddress, full_name: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label>Phone</Label>
                      <Input
                        value={newAddress.phone}
                        onChange={(e) => setNewAddress({...newAddress, phone: e.target.value})}
                      />
                    </div>
                  </div>
                  <div>
                    <Label>Address Line 1</Label>
                    <Input
                      value={newAddress.address_line1}
                      onChange={(e) => setNewAddress({...newAddress, address_line1: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label>Address Line 2</Label>
                    <Input
                      value={newAddress.address_line2}
                      onChange={(e) => setNewAddress({...newAddress, address_line2: e.target.value})}
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label>City</Label>
                      <Input
                        value={newAddress.city}
                        onChange={(e) => setNewAddress({...newAddress, city: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label>State</Label>
                      <Input
                        value={newAddress.state}
                        onChange={(e) => setNewAddress({...newAddress, state: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label>Pincode</Label>
                      <Input
                        value={newAddress.pincode}
                        onChange={(e) => setNewAddress({...newAddress, pincode: e.target.value})}
                      />
                    </div>
                  </div>
                  <Button onClick={handleAddAddress}>Save Address</Button>
                </div>
              )}

              {addresses.length > 0 && (
                <RadioGroup value={selectedAddress} onValueChange={setSelectedAddress}>
                  {addresses.map((address) => (
                    <div key={address.id} className="flex items-start gap-3 p-4 border rounded-lg">
                      <RadioGroupItem value={address.id} id={address.id} />
                      <Label htmlFor={address.id} className="flex-1 cursor-pointer">
                        <p className="font-semibold">{address.full_name}</p>
                        <p className="text-sm text-muted-foreground">{address.phone}</p>
                        <p className="text-sm text-muted-foreground">
                          {address.address_line1}, {address.address_line2}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {address.city}, {address.state} - {address.pincode}
                        </p>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              )}
            </Card>

            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">Payment Method</h2>
              <RadioGroup defaultValue="cod">
                <div className="flex items-center gap-3 p-4 border rounded-lg">
                  <RadioGroupItem value="cod" id="cod" />
                  <Label htmlFor="cod" className="cursor-pointer">Cash on Delivery</Label>
                </div>
              </RadioGroup>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-4">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              <Button 
                className="w-full" 
                size="lg"
                onClick={handlePlaceOrder}
                disabled={isLoading}
              >
                {isLoading ? "Placing Order..." : "Place Order"}
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
