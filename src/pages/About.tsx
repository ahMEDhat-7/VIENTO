
import React from 'react';

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About CapStore</h1>
          <p className="text-xl text-gray-600">Your premier destination for quality caps and hats</p>
        </div>

        <div className="prose prose-lg mx-auto">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Story</h2>
            <p className="text-gray-600 mb-4">
              Founded with a passion for quality headwear, CapStore has been serving customers 
              worldwide with the finest selection of caps and hats. We believe that the right 
              headwear can complete any outfit and express your unique personality.
            </p>
            <p className="text-gray-600">
              From classic baseball caps to trendy bucket hats, we curate our collection 
              to ensure every piece meets our high standards for quality, comfort, and style.
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-gray-600">
              To provide exceptional headwear that combines style, comfort, and durability. 
              We're committed to offering our customers the best shopping experience with 
              fast shipping, easy returns, and outstanding customer service.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">👑</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Premium Quality</h3>
              <p className="text-gray-600 text-sm">Only the finest materials and craftsmanship</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">🚚</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Fast Shipping</h3>
              <p className="text-gray-600 text-sm">Quick delivery to your doorstep</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">💯</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">100% Satisfaction</h3>
              <p className="text-gray-600 text-sm">Your happiness is our guarantee</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
