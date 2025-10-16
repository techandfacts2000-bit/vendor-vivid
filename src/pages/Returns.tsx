import Navigation from "@/components/Navigation";
import { Link } from "react-router-dom";

const Returns = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Returns & Refunds Policy</h1>
          
          <div className="prose prose-lg max-w-none space-y-8">
            <section>
              <h2 className="text-3xl font-bold mb-4">Return Window</h2>
              <p className="text-muted-foreground leading-relaxed">
                We accept returns within <strong>7 days</strong> of delivery. To be eligible for a return, your item must be 
                unused, in the same condition that you received it, and in the original packaging with all tags attached.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-4">How to Return</h2>
              <div className="bg-card p-6 rounded-lg border space-y-4">
                <div>
                  <h3 className="text-xl font-semibold mb-2">Step 1: Request Return Authorization</h3>
                  <p className="text-muted-foreground">
                    Contact our customer service at support@costerbox.com or call +91 98765 43210 with your order number 
                    and reason for return.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Step 2: Pack the Item</h3>
                  <p className="text-muted-foreground">
                    Securely pack the item in its original packaging with all tags and accessories included.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Step 3: Ship the Return</h3>
                  <p className="text-muted-foreground">
                    Ship the package to the address provided by our customer service team. We recommend using a trackable 
                    shipping service.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Step 4: Refund Processing</h3>
                  <p className="text-muted-foreground">
                    Once we receive and inspect your return, we'll process your refund within 5-7 business days.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-4">Non-Returnable Items</h2>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Items marked as final sale or clearance</li>
                <li>Personalized or custom-made products</li>
                <li>Items without original tags or packaging</li>
                <li>Products showing signs of use or wear</li>
                <li>Gift cards and vouchers</li>
              </ul>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-4">Refund Process</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Once your return is received and inspected, we will send you an email to notify you of the approval or 
                rejection of your refund. If approved, your refund will be processed and a credit will be automatically 
                applied to your original method of payment.
              </p>
              <div className="bg-primary/10 border border-primary/20 p-4 rounded-lg">
                <p className="text-sm">
                  <strong>Note:</strong> Refunds may take 5-10 business days to reflect in your account depending on 
                  your bank or card issuer.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-4">Exchanges</h2>
              <p className="text-muted-foreground leading-relaxed">
                We only replace items if they are defective or damaged. If you need to exchange an item for the same product, 
                please contact our customer service team. For size or color exchanges, you may need to return the original 
                item and place a new order.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-4">Damaged or Defective Items</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                If you receive a damaged or defective item, please contact us immediately with photos of the damage. We will 
                arrange for a replacement or full refund, including return shipping costs.
              </p>
              <div className="bg-card p-4 rounded-lg border">
                <p className="text-sm text-muted-foreground">
                  Please note that due to the handcrafted nature of our products, slight variations in color, texture, or 
                  pattern are normal and not considered defects.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-4">Return Shipping Costs</h2>
              <p className="text-muted-foreground leading-relaxed">
                Return shipping costs are the responsibility of the customer unless the return is due to our error (wrong item 
                sent, defective product, etc.). We recommend using a trackable shipping method and purchasing shipping insurance 
                for valuable items.
              </p>
            </section>

            <section className="bg-card p-6 rounded-lg border">
              <h2 className="text-2xl font-bold mb-4">Need Help?</h2>
              <p className="text-muted-foreground mb-4">
                If you have any questions about our returns and refunds policy, please don't hesitate to contact us.
              </p>
              <div className="flex gap-4">
                <Link 
                  to="/contact" 
                  className="inline-block bg-primary text-primary-foreground px-6 py-2 rounded-lg font-semibold hover:opacity-90 transition"
                >
                  Contact Support
                </Link>
                <Link 
                  to="/faq" 
                  className="inline-block border border-border px-6 py-2 rounded-lg font-semibold hover:bg-accent transition"
                >
                  View FAQ
                </Link>
              </div>
            </section>
          </div>
        </div>
      </main>

      <footer className="bg-card border-t py-8 mt-12">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>&copy; 2024 CosterBox. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Returns;