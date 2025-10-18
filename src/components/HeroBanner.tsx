import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Banner {
  id: string;
  title: string;
  image_url: string;
  link_url: string | null;
}

interface HeroBannerProps {
  banners: Banner[];
}

const HeroBanner = ({ banners }: HeroBannerProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (banners.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [banners.length]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + banners.length) % banners.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % banners.length);
  };

  if (banners.length === 0) return null;

  return (
    <div className="relative w-full bg-gradient-to-br from-primary/5 via-background to-accent/5 overflow-hidden mt-8">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      
      <div className="container mx-auto">
        <div className="relative aspect-[21/9] md:aspect-[16/6] overflow-hidden rounded-lg">
          {banners.map((banner, index) => (
            <div
              key={banner.id}
              className={`absolute inset-0 transition-all duration-700 ${
                index === currentIndex ? "opacity-100 scale-100" : "opacity-0 scale-105"
              }`}
            >
              <img
                src={banner.image_url}
                alt={banner.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent flex items-center">
                <div className="container mx-auto px-8 md:px-12">
                  <div className="max-w-2xl animate-fade-in">
                    <h2 className="text-3xl md:text-6xl font-bold text-white mb-4 leading-tight">
                      {banner.title}
                    </h2>
                    <p className="text-lg md:text-xl text-white/90 mb-6">
                      Authentic handcrafted treasures from Indian artisans
                    </p>
                    <Button size="lg" className="bg-white text-primary hover:bg-white/90 shadow-lg">
                      Explore Collection
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {banners.length > 1 && (
            <>
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white"
                onClick={goToPrevious}
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white"
                onClick={goToNext}
              >
                <ChevronRight className="h-6 w-6" />
              </Button>

              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {banners.map((_, index) => (
                  <button
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentIndex
                        ? "bg-white w-8"
                        : "bg-white/50"
                    }`}
                    onClick={() => setCurrentIndex(index)}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
