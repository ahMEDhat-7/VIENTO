import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronRight, Star, Truck, Shield, Headphones } from 'lucide-react';
import { useProductsStore } from '../../stores/useProductsStore';
import ProductCard from '../../components/shared/ProductCard';
import Footer from '../../components/layout/Footer';

const Index: React.FC = () => {
  const { products, fetchProducts } = useProductsStore();
  useEffect(() => {
    fetchProducts();
  }, []);
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary to-background ">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8  bg-[url('/logo.png')] bg-cover bg-center flex flex-col justify-between h-[400px]">
        <div className="max-w-7xl mx-auto text-center">
          {/* <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
            VIENTO
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-muted-foreground max-w-3xl mx-auto">
            Where style meets the wind. Discover premium headwear that defines your unique character.
          </p> */}
        </div>
      </section>

      {/* Featured Products */}
      < section className="py-16 px-4 sm:px-6 lg:px-8" >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent mb-4">
              Featured Products
            </h2>
            <p className="text-muted-foreground text-lg">Discover our most popular styles</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center">
            <Link to="/products">
              <Button variant="outline" size="lg" className="border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-black">
                View All Products
              </Button>
            </Link>
          </div>
        </div>
      </section >

      <Footer />
    </div >
  );
};

export default Index;