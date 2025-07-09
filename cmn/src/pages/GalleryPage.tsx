import React, { useState } from 'react';
import { Play, Heart, Share, Download, Eye } from 'lucide-react';

const GalleryPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Videos' },
    { id: 'cinematic', name: 'Cinematic' },
    { id: 'animation', name: 'Animation' },
    { id: 'nature', name: 'Nature' },
    { id: 'portrait', name: 'Portrait' },
    { id: 'abstract', name: 'Abstract' },
  ];

  const videos = [
    {
      id: 1,
      title: 'Sunset in the City',
      prompt: 'A cinematic shot of a bustling city street at golden hour, with warm light streaming through tall buildings',
      category: 'cinematic',
      views: 1234,
      likes: 89,
      duration: '8s',
      thumbnail: 'https://via.placeholder.com/400x225',
    },
    {
      id: 2,
      title: 'Forest Animation',
      prompt: 'Animated trees swaying in the wind with magical particles floating through the air',
      category: 'animation',
      views: 2156,
      likes: 156,
      duration: '5s',
      thumbnail: 'https://via.placeholder.com/400x225',
    },
    {
      id: 3,
      title: 'Ocean Waves',
      prompt: 'Peaceful ocean waves crashing against rocky cliffs during sunrise',
      category: 'nature',
      views: 3421,
      likes: 234,
      duration: '8s',
      thumbnail: 'https://via.placeholder.com/400x225',
    },
    {
      id: 4,
      title: 'Portrait Study',
      prompt: 'Close-up portrait of a person with dramatic lighting and emotional expression',
      category: 'portrait',
      views: 987,
      likes: 67,
      duration: '6s',
      thumbnail: 'https://via.placeholder.com/400x225',
    },
    {
      id: 5,
      title: 'Abstract Motion',
      prompt: 'Flowing abstract shapes with vibrant colors morphing and transforming',
      category: 'abstract',
      views: 1876,
      likes: 123,
      duration: '7s',
      thumbnail: 'https://via.placeholder.com/400x225',
    },
    {
      id: 6,
      title: 'Space Journey',
      prompt: 'A spacecraft traveling through a nebula with colorful cosmic dust and stars',
      category: 'cinematic',
      views: 4567,
      likes: 345,
      duration: '8s',
      thumbnail: 'https://via.placeholder.com/400x225',
    },
  ];

  const filteredVideos = selectedCategory === 'all' 
    ? videos 
    : videos.filter(video => video.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50 pt-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">CMN Gallery</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover amazing videos created by our community of filmmakers and artists
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category.id
                  ? 'bg-primary-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVideos.map((video) => (
            <div
              key={video.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow group"
            >
              {/* Video Thumbnail */}
              <div className="relative aspect-video bg-gray-200 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-400 to-purple-500 opacity-20"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-black bg-opacity-50 rounded-full p-4 group-hover:bg-opacity-70 transition-colors">
                    <Play className="h-8 w-8 text-white" />
                  </div>
                </div>
                <div className="absolute top-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                  {video.duration}
                </div>
              </div>

              {/* Video Info */}
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-1">
                  {video.title}
                </h3>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {video.prompt}
                </p>

                {/* Stats and Actions */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Eye className="h-4 w-4" />
                      <span>{video.views}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Heart className="h-4 w-4" />
                      <span>{video.likes}</span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="p-1 text-gray-400 hover:text-red-500 transition-colors">
                      <Heart className="h-4 w-4" />
                    </button>
                    <button className="p-1 text-gray-400 hover:text-primary-600 transition-colors">
                      <Share className="h-4 w-4" />
                    </button>
                    <button className="p-1 text-gray-400 hover:text-green-600 transition-colors">
                      <Download className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <button className="bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors">
            Load More Videos
          </button>
        </div>
      </div>
    </div>
  );
};

export default GalleryPage;