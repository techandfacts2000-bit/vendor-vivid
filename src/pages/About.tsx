import Navigation from "@/components/Navigation";
import { Link } from "react-router-dom";
import { Award, Heart, Leaf, Users } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 via-accent/5 to-background py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">About CosterBox</h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
            Celebrating Traditional Indian Craftsmanship, One Handcrafted Product at a Time
          </p>
        </div>
      </section>
      
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          
          {/* Mission Statement */}
          <section className="mb-16 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Mission</h2>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              We believe in preserving traditional art forms while empowering local artisans. Each product in our collection 
              is carefully crafted by skilled artisans from across India, blending heritage techniques with contemporary design.
            </p>
          </section>

          {/* Core Values */}
          <section className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center">What We Stand For</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-card p-6 rounded-lg border hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Award className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Authentic Craftsmanship</h3>
                <p className="text-muted-foreground text-sm">
                  Every product is 100% handcrafted by skilled artisans using traditional techniques passed down through generations.
                </p>
              </div>
              <div className="bg-card p-6 rounded-lg border hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mb-4">
                  <Leaf className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Sustainable Practices</h3>
                <p className="text-muted-foreground text-sm">
                  We use eco-friendly materials and sustainable production methods to minimize our environmental impact.
                </p>
              </div>
              <div className="bg-card p-6 rounded-lg border hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Artisan Empowerment</h3>
                <p className="text-muted-foreground text-sm">
                  We work directly with artisan communities, ensuring fair wages and supporting their economic independence.
                </p>
              </div>
              <div className="bg-card p-6 rounded-lg border hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mb-4">
                  <Heart className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Quality Assurance</h3>
                <p className="text-muted-foreground text-sm">
                  Each product undergoes rigorous quality checks to ensure you receive only the finest handcrafted items.
                </p>
              </div>
            </div>
          </section>

          {/* Impact Stats */}
          <section className="mb-16">
            <div className="bg-gradient-to-br from-primary to-accent text-primary-foreground p-10 rounded-2xl shadow-xl">
              <h2 className="text-3xl font-bold mb-8 text-center">Our Impact</h2>
              <div className="grid md:grid-cols-3 gap-8 text-center">
                <div className="space-y-2">
                  <div className="text-5xl md:text-6xl font-bold mb-2">500+</div>
                  <div className="text-lg md:text-xl opacity-95">Artisans Supported</div>
                  <p className="text-sm opacity-80 mt-2">Across India</p>
                </div>
                <div className="space-y-2">
                  <div className="text-5xl md:text-6xl font-bold mb-2">50+</div>
                  <div className="text-lg md:text-xl opacity-95">Villages Reached</div>
                  <p className="text-sm opacity-80 mt-2">In rural areas</p>
                </div>
                <div className="space-y-2">
                  <div className="text-5xl md:text-6xl font-bold mb-2">10K+</div>
                  <div className="text-lg md:text-xl opacity-95">Products Created</div>
                  <p className="text-sm opacity-80 mt-2">Handcrafted with love</p>
                </div>
              </div>
            </div>
          </section>

          {/* Our Story */}
          <section className="mb-16">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Story</h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    CosterBox was born from a simple idea: to create a bridge between traditional Indian artisans and modern consumers 
                    who appreciate authentic, handcrafted products.
                  </p>
                  <p>
                    Based in <span className="font-semibold text-foreground">Tonk, Rajasthan</span>, we started our journey by partnering 
                    with local craftspeople who were struggling to reach wider markets. What began as a small initiative has grown into 
                    a movement celebrating India's rich cultural heritage.
                  </p>
                  <p>
                    Today, we work with over <span className="font-semibold text-foreground">500 artisans</span> across{" "}
                    <span className="font-semibold text-foreground">50+ villages</span> in India, bringing their beautiful creations to 
                    customers who value quality, sustainability, and the human touch in every product they own.
                  </p>
                </div>
              </div>
              <div className="bg-card p-8 rounded-2xl border shadow-lg">
                <h3 className="text-2xl font-bold mb-6">Why Choose Us?</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 bg-primary rounded-full" />
                    </div>
                    <div>
                      <p className="font-semibold">Direct from Artisans</p>
                      <p className="text-sm text-muted-foreground">No middlemen, ensuring fair prices and wages</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 bg-primary rounded-full" />
                    </div>
                    <div>
                      <p className="font-semibold">Eco-Friendly</p>
                      <p className="text-sm text-muted-foreground">Sustainable materials and ethical practices</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 bg-primary rounded-full" />
                    </div>
                    <div>
                      <p className="font-semibold">Unique Designs</p>
                      <p className="text-sm text-muted-foreground">Each piece tells a story of tradition</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 bg-primary rounded-full" />
                    </div>
                    <div>
                      <p className="font-semibold">Quality Guaranteed</p>
                      <p className="text-sm text-muted-foreground">Rigorous quality checks on every product</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="text-center py-12 bg-gradient-to-br from-accent/10 to-primary/10 rounded-2xl">
            <h2 className="text-3xl font-bold mb-4">Let's Connect</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Have questions or want to learn more about our artisan partners? We'd love to hear from you.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link to="/contact" className="inline-block bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition shadow-lg hover:shadow-xl">
                Get in Touch
              </Link>
              <Link to="/" className="inline-block bg-background border-2 border-primary text-primary px-8 py-3 rounded-lg font-semibold hover:bg-primary/5 transition">
                Shop Now
              </Link>
            </div>
          </section>
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

export default About;