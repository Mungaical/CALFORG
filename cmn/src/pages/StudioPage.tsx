import React, { useState } from 'react';
import { 
  Upload, 
  Wand2, 
  Play, 
  Settings, 
  Download, 
  Camera, 
  Mic, 
  Layers,
  Plus,
  RotateCcw,
  Video
} from 'lucide-react';

const StudioPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'text-to-video' | 'image-to-video'>('text-to-video');
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showCameraControls, setShowCameraControls] = useState(false);

  const handleGenerate = async () => {
    setIsGenerating(true);
    // Simulate video generation
    setTimeout(() => {
      setIsGenerating(false);
    }, 3000);
  };

  const cameraControls = [
    { name: 'Pan Left', action: 'pan-left' },
    { name: 'Pan Right', action: 'pan-right' },
    { name: 'Tilt Up', action: 'tilt-up' },
    { name: 'Tilt Down', action: 'tilt-down' },
    { name: 'Zoom In', action: 'zoom-in' },
    { name: 'Zoom Out', action: 'zoom-out' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">CMN Studio</h1>
          <p className="text-gray-600">Create stunning videos with AI-powered tools</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Panel - Input Controls */}
          <div className="lg:col-span-1 space-y-6">
            {/* Mode Selection */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Generation Mode</h2>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setActiveTab('text-to-video')}
                  className={`p-3 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === 'text-to-video'
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Wand2 className="h-4 w-4 mx-auto mb-1" />
                  Text to Video
                </button>
                <button
                  onClick={() => setActiveTab('image-to-video')}
                  className={`p-3 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === 'image-to-video'
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Upload className="h-4 w-4 mx-auto mb-1" />
                  Image to Video
                </button>
              </div>
            </div>

            {/* Input Section */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                {activeTab === 'text-to-video' ? 'Describe Your Video' : 'Upload Image'}
              </h2>
              
              {activeTab === 'text-to-video' ? (
                <div>
                  <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="A cinematic shot of a woman walking through a busy street at sunset, with warm golden light..."
                    className="w-full p-3 border border-gray-300 rounded-lg resize-none h-32 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                  <p className="text-sm text-gray-500 mt-2">
                    Be specific about camera movements, lighting, and style for best results.
                  </p>
                </div>
              ) : (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary-400 transition-colors cursor-pointer">
                  <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600">Drop an image here or click to upload</p>
                  <p className="text-sm text-gray-500 mt-1">PNG, JPG up to 10MB</p>
                </div>
              )}
            </div>

            {/* Model Settings */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Model Settings</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Model
                  </label>
                  <select className="w-full p-2 border border-gray-300 rounded-lg">
                    <option>CMN Pro (Best Quality)</option>
                    <option>CMN Standard</option>
                    <option>CMN Fast</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Duration
                  </label>
                  <select className="w-full p-2 border border-gray-300 rounded-lg">
                    <option>8 seconds</option>
                    <option>5 seconds</option>
                    <option>3 seconds</option>
                  </select>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="audio" className="mr-2" />
                  <label htmlFor="audio" className="text-sm font-medium text-gray-700">
                    Generate Audio
                  </label>
                </div>
              </div>
            </div>

            {/* Generate Button */}
            <button
              onClick={handleGenerate}
              disabled={isGenerating || (activeTab === 'text-to-video' && !prompt.trim())}
              className="w-full bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
            >
              {isGenerating ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                  <span>Generating...</span>
                </>
              ) : (
                <>
                  <Play className="h-4 w-4" />
                  <span>Generate Video</span>
                </>
              )}
            </button>
          </div>

          {/* Center Panel - Video Preview */}
          <div className="lg:col-span-2 space-y-6">
            {/* Video Player */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Preview</h2>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setShowCameraControls(!showCameraControls)}
                    className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <Camera className="h-4 w-4" />
                  </button>
                  <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                    <Settings className="h-4 w-4" />
                  </button>
                  <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                    <Download className="h-4 w-4" />
                  </button>
                </div>
              </div>
              
              <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden relative">
                {isGenerating ? (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white">
                      <div className="animate-spin rounded-full h-8 w-8 border-2 border-white border-t-transparent mx-auto mb-2"></div>
                      <p>Generating your video...</p>
                    </div>
                  </div>
                ) : (
                  <div className="absolute inset-0 video-placeholder flex items-center justify-center">
                    <div className="text-center text-gray-500">
                      <Video className="h-16 w-16 mx-auto mb-4 opacity-50" />
                      <p>Your generated video will appear here</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Camera Controls */}
            {showCameraControls && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Camera Controls</h3>
                <div className="grid grid-cols-3 gap-3">
                  {cameraControls.map((control) => (
                    <button
                      key={control.action}
                      className="p-3 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition-colors"
                    >
                      {control.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Scene Builder */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Scene Builder</h3>
                <div className="flex space-x-2">
                  <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                    <Plus className="h-4 w-4" />
                  </button>
                  <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                    <Layers className="h-4 w-4" />
                  </button>
                  <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                    <RotateCcw className="h-4 w-4" />
                  </button>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                  <span className="text-sm font-medium">Scene 1</span>
                  <span className="text-xs text-gray-500">(0:00 - 0:08)</span>
                </div>
                <div className="h-12 bg-white rounded border border-gray-200 flex items-center px-3">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-primary-600 h-2 rounded-full" style={{ width: '45%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Asset Library */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Assets</h3>
              <div className="grid grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center">
                    <span className="text-gray-500 text-sm">Asset {i}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudioPage;