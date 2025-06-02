
import React from 'react';
import { Link } from 'react-router-dom';

const Categories: React.FC = () => {
  const categories = [
    {
      id: 'baseball',
      name: 'Baseball Caps',
      description: 'Classic baseball caps for everyday wear',
      image: '/placeholder.svg',
      count: 24
    },
    {
      id: 'snapback',
      name: 'Snapback',
      description: 'Adjustable snapback caps with street style',
      image: '/placeholder.svg',
      count: 18
    },
    {
      id: 'bucket',
      name: 'Bucket Hats',
      description: 'Trendy bucket hats for sun protection',
      image: '/placeholder.svg',
      count: 12
    },
    {
      id: 'beanie',
      name: 'Beanies',
      description: 'Warm and cozy beanies for cold weather',
      image: '/placeholder.svg',
      count: 15
    },
    {
      id: 'trucker',
      name: 'Trucker Hats',
      description: 'Mesh back trucker hats with classic style',
      image: '/placeholder.svg',
      count: 20
    },
    {
      id: 'fedora',
      name: 'Fedoras',
      description: 'Elegant fedoras for sophisticated style',
      image: '/placeholder.svg',
      count: 8
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent mb-4 animate-fade-in">
            Shop by Category
          </h1>
          <p className="text-gray-300 text-lg animate-fade-in animation-delay-300">
            Find the perfect cap or hat for your style
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-orange-500 mx-auto mt-4 rounded-full animate-fade-in animation-delay-500"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <Link
              key={category.id}
              to={`/category/${category.id}`}
              className="group bg-gray-800/50 backdrop-blur-md rounded-lg shadow-2xl overflow-hidden hover:shadow-amber-500/20 transition-all duration-500 border border-gray-700 hover:border-amber-500/50 animate-fade-in hover-lift"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="aspect-w-16 aspect-h-9">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-75 group-hover:brightness-90"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-amber-400 transition-colors duration-300">{category.name}</h3>
                <p className="text-gray-300 mb-4 group-hover:text-gray-200 transition-colors duration-300">{category.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">{category.count} products</span>
                  <span className="text-amber-400 font-medium group-hover:text-amber-300 transition-colors duration-300">
                    Shop now →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;
