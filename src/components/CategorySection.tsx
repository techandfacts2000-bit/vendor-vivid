import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";

interface Category {
  id: string;
  name: string;
  slug: string;
  image_url: string | null;
}

interface CategorySectionProps {
  categories: Category[];
}

const CategorySection = ({ categories }: CategorySectionProps) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
      {categories.map((category) => (
        <Link key={category.id} to={`/products?category=${category.slug}`}>
          <Card className="group overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
            <div className="aspect-square relative overflow-hidden bg-muted">
              {category.image_url ? (
                <img
                  src={category.image_url}
                  alt={category.name}
                  className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-3xl sm:text-4xl">🎨</span>
                </div>
              )}
            </div>
            <div className="p-2 sm:p-3 text-center">
              <h3 className="font-semibold text-xs sm:text-sm">{category.name}</h3>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default CategorySection;
