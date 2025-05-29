
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Shop by Category</h1>
        <p className="text-gray-600">Find the perfect cap or hat for your style</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <Link
            key={category.id}
            to={`/category/${category.id}`}
            className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="aspect-w-16 aspect-h-9">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{category.name}</h3>
              <p className="text-gray-600 mb-4">{category.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">{category.count} products</span>
                <span className="text-primary font-medium group-hover:text-primary-dark">
                  Shop now →
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;
