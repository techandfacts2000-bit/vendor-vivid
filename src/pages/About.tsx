import Navigation from "@/components/Navigation";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About CosterBox</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-muted-foreground mb-8">
              CosterBox is your destination for authentic handcrafted products that celebrate traditional Indian craftsmanship.
            </p>

            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
              <p className="text-muted-foreground leading-relaxed">
                We believe in preserving traditional art forms while empowering local artisans. Each product in our collection 
                is carefully crafted by skilled artisans from across India, blending heritage techniques with contemporary design.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-4">What We Stand For</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-card p-6 rounded-lg border">
                  <h3 className="text-xl font-semibold mb-3">🎨 Authentic Craftsmanship</h3>
                  <p className="text-muted-foreground">
                    Every product is 100% handcrafted by skilled artisans using traditional techniques passed down through generations.
                  </p>
                </div>
                <div className="bg-card p-6 rounded-lg border">
                  <h3 className="text-xl font-semibold mb-3">🌿 Sustainable Practices</h3>
                  <p className="text-muted-foreground">
                    We use eco-friendly materials and sustainable production methods to minimize our environmental impact.
                  </p>
                </div>
                <div className="bg-card p-6 rounded-lg border">
                  <h3 className="text-xl font-semibold mb-3">🤝 Artisan Empowerment</h3>
                  <p className="text-muted-foreground">
                    We work directly with artisan communities, ensuring fair wages and supporting their economic independence.
                  </p>
                </div>
                <div className="bg-card p-6 rounded-lg border">
                  <h3 className="text-xl font-semibold mb-3">💚 Quality Assurance</h3>
                  <p className="text-muted-foreground">
                    Each product undergoes rigorous quality checks to ensure you receive only the finest handcrafted items.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Impact</h2>
              <div className="bg-primary text-primary-foreground p-8 rounded-lg">
                <div className="grid grid-cols-3 gap-8 text-center">
                  <div>
                    <div className="text-4xl font-bold mb-2">500+</div>
                    <div className="text-lg opacity-90">Artisans Supported</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold mb-2">50+</div>
                    <div className="text-lg opacity-90">Villages Reached</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold mb-2">1000+</div>
                    <div className="text-lg opacity-90">Products Created</div>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Story</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                CosterBox was born from a simple idea: to create a bridge between traditional Indian artisans and modern consumers 
                who appreciate authentic, handcrafted products. Based in Tonk, Rajasthan, we started our journey by partnering 
                with local craftspeople who were struggling to reach wider markets.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Today, we work with over 500 artisans across 50+ villages in India, bringing their beautiful creations to 
                customers who value quality, sustainability, and the human touch in every product they own.
              </p>
            </section>

            <div className="text-center py-8">
              <Link to="/contact" className="inline-block bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition">
                Get in Touch
              </Link>
            </div>
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

export default About;