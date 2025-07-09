import React from 'react';
import { Link } from 'react-router-dom';
import { Play, Sparkles, Camera, Wand2, Globe, Zap } from 'lucide-react';

const HomePage: React.FC = () => {
  const features = [
    {
      icon: <Wand2 className="h-8 w-8 text-primary-600" />,
      title: 'Text to Video',
      description: 'Transform your ideas into stunning videos with simple text prompts. Powered by advanced AI models.',
    },
    {
      icon: <Camera className="h-8 w-8 text-primary-600" />,
      title: 'Image to Video',
      description: 'Bring your photos to life with cinematic animations and realistic motion effects.',
    },
    {
      icon: <Globe className="h-8 w-8 text-primary-600" />,
      title: 'Scene Builder',
      description: 'Create complex scenes with our intuitive editor. Extend shots and build narratives.',
    },
    {
      icon: <Zap className="h-8 w-8 text-primary-600" />,
      title: 'Native Audio',
      description: 'Generate synchronized audio including sound effects, ambient noise, and dialogue.',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <Sparkles className="h-16 w-16 text-primary-600 animate-pulse-slow" />
                <div className="absolute inset-0 bg-primary-600 opacity-20 rounded-full blur-xl"></div>
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Create Cinematic Videos with
              <span className="text-primary-600"> AI Magic</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              CMN is the next-generation AI filmmaking platform. Transform text and images into 
              stunning, professional-quality videos with native audio generation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/studio"
                className="bg-primary-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-primary-700 transition-colors flex items-center justify-center space-x-2"
              >
                <Play className="h-5 w-5" />
                <span>Start Creating</span>
              </Link>
              <Link
                to="/gallery"
                className="border border-gray-300 text-gray-700 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                Explore Gallery
              </Link>
            </div>
          </div>

          {/* Video Preview */}
          <div className="mt-16 relative">
            <div className="relative max-w-4xl mx-auto">
              <div className="aspect-video bg-gradient-to-br from-gray-900 to-gray-700 rounded-xl overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <div className="text-center text-white">
                    <Play className="h-16 w-16 mx-auto mb-4 opacity-80" />
                    <p className="text-lg">Watch CMN in Action</p>
                  </div>
                </div>
              </div>
              <div className="absolute -inset-4 bg-gradient-to-r from-primary-600 to-purple-600 rounded-xl blur-lg opacity-30"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Powerful Features for Creative Storytelling
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to create professional videos, powered by cutting-edge AI technology.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-xl hover:shadow-lg transition-shadow bg-gray-50 hover:bg-white"
              >
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Ideas?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Join thousands of creators who are already using CMN to bring their visions to life.
          </p>
          <Link
            to="/studio"
            className="bg-white text-primary-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center space-x-2"
          >
            <Sparkles className="h-5 w-5" />
            <span>Get Started Free</span>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;