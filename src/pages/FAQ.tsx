import Navigation from "@/components/Navigation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-muted-foreground text-center mb-12">
            Find answers to common questions about our products and services.
          </p>

          <Accordion type="single" collapsible className="w-full space-y-4">
            <AccordionItem value="item-1" className="bg-card border rounded-lg px-6">
              <AccordionTrigger className="text-left font-semibold">
                What is CosterBox?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                CosterBox is an e-commerce platform dedicated to handcrafted, eco-friendly fashion and lifestyle products 
                made by skilled artisans from across India. We connect traditional craftspeople with customers who appreciate 
                authentic, sustainable products.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="bg-card border rounded-lg px-6">
              <AccordionTrigger className="text-left font-semibold">
                How do I track my order?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Once your order is shipped, you'll receive a tracking number via email. You can also track your order by 
                logging into your account and visiting the Orders section. Click on any order to see its current status and 
                tracking information.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="bg-card border rounded-lg px-6">
              <AccordionTrigger className="text-left font-semibold">
                What is your shipping policy?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                We offer free shipping on all orders above ₹999. Orders are typically processed within 2-3 business days and 
                delivered within 5-7 business days across India. Express shipping options are available at checkout for faster delivery.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="bg-card border rounded-lg px-6">
              <AccordionTrigger className="text-left font-semibold">
                What is your return policy?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                We accept returns within 7 days of delivery for most products. Items must be unused, in original condition, 
                and with all tags attached. Handcrafted items may have slight variations, which are not considered defects. 
                Please contact our customer service for return authorization before shipping items back.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5" className="bg-card border rounded-lg px-6">
              <AccordionTrigger className="text-left font-semibold">
                Are the products really handcrafted?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Yes! Every product on CosterBox is 100% handcrafted by skilled artisans using traditional techniques. 
                Each item is unique and may have slight variations, which is the beauty of handmade products. We work directly 
                with artisan communities to ensure authenticity and fair trade practices.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6" className="bg-card border rounded-lg px-6">
              <AccordionTrigger className="text-left font-semibold">
                What payment methods do you accept?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                We accept various payment methods including Credit/Debit Cards, Net Banking, UPI, and popular digital wallets. 
                All payments are processed securely through our payment gateway partner. We also offer Cash on Delivery (COD) 
                for select pincodes.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-7" className="bg-card border rounded-lg px-6">
              <AccordionTrigger className="text-left font-semibold">
                How do I care for handcrafted products?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Each product comes with specific care instructions. Generally, handcrafted items require gentle care: 
                hand wash or dry clean fabrics, avoid harsh chemicals, store in cool dry places, and keep away from direct 
                sunlight. Detailed care instructions are included with every product.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-8" className="bg-card border rounded-lg px-6">
              <AccordionTrigger className="text-left font-semibold">
                Do you ship internationally?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Currently, we only ship within India. We're working on expanding our shipping to international destinations. 
                Sign up for our newsletter to be notified when international shipping becomes available.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-9" className="bg-card border rounded-lg px-6">
              <AccordionTrigger className="text-left font-semibold">
                How can I become an artisan partner?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                We're always looking to collaborate with talented artisans. If you're interested in selling your handcrafted 
                products through CosterBox, please contact us at contact@costerbox.com with details about your craft, 
                sample images, and your location. Our team will review your application and get back to you.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-10" className="bg-card border rounded-lg px-6">
              <AccordionTrigger className="text-left font-semibold">
                How can I contact customer support?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                You can reach our customer support team via email at support@costerbox.com or call us at +91 98765 43210 
                during business hours (Mon-Sat, 9:00 AM - 6:00 PM IST). You can also use the contact form on our Contact page.
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div className="mt-12 bg-primary text-primary-foreground p-8 rounded-lg text-center">
            <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
            <p className="mb-6 opacity-90">
              Our customer support team is here to help you.
            </p>
            <a 
              href="/contact" 
              className="inline-block bg-background text-foreground px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition"
            >
              Contact Us
            </a>
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

export default FAQ;