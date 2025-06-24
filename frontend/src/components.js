import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, 
  Pause, 
  Upload, 
  Settings, 
  Camera, 
  Film, 
  Layers, 
  Download, 
  Share2, 
  Plus, 
  Search,
  Video,
  Image as ImageIcon,
  Wand2,
  RotateCcw,
  Volume2,
  Maximize,
  Minimize,
  ChevronDown,
  ChevronRight,
  Trash2,
  Edit3,
  Copy,
  MoreVertical,
  Grid3X3,
  Sliders,
  Monitor,
  Smartphone,
  Tablet
} from 'lucide-react';

// Main Cal Forge Component
const CalForge = () => {
  const [activeTab, setActiveTab] = useState('create');
  const [selectedProject, setSelectedProject] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [generatedVideos, setGeneratedVideos] = useState([]);
  const [assets, setAssets] = useState([]);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      
      {/* Main Content */}
      <div className="flex h-[calc(100vh-4rem)]">
        {/* Sidebar */}
        <Sidebar 
          activeTab={activeTab}
          assets={assets}
          setAssets={setAssets}
        />
        
        {/* Main Working Area */}
        <MainWorkspace 
          activeTab={activeTab}
          prompt={prompt}
          setPrompt={setPrompt}
          isGenerating={isGenerating}
          setIsGenerating={setIsGenerating}
          generatedVideos={generatedVideos}
          setGeneratedVideos={setGeneratedVideos}
          selectedProject={selectedProject}
          setSelectedProject={setSelectedProject}
        />
        
        {/* Properties Panel */}
        <PropertiesPanel activeTab={activeTab} />
      </div>
    </div>
  );
};

// Header Component
const Header = ({ activeTab, setActiveTab }) => {
  return (
    <header className="bg-gray-800 border-b border-gray-700 h-16 flex items-center justify-between px-6">
      <div className="flex items-center space-x-8">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <Wand2 className="w-5 h-5" />
          </div>
          <h1 className="text-xl font-bold">Cal Forge</h1>
        </div>
        
        <nav className="flex space-x-1">
          {[
            { id: 'create', label: 'Create', icon: Plus },
            { id: 'scenes', label: 'Scenes', icon: Film },
            { id: 'assets', label: 'Assets', icon: Layers },
            { id: 'projects', label: 'Projects', icon: Grid3X3 }
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`px-4 py-2 rounded-md flex items-center space-x-2 transition-all ${
                activeTab === id
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:text-white hover:bg-gray-700'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{label}</span>
            </button>
          ))}
        </nav>
      </div>
      
      <div className="flex items-center space-x-4">
        <button className="p-2 rounded-md hover:bg-gray-700 transition-colors">
          <Settings className="w-5 h-5" />
        </button>
        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
          <span className="text-sm font-medium">CF</span>
        </div>
      </div>
    </header>
  );
};

// Sidebar Component
const Sidebar = ({ activeTab, assets, setAssets }) => {
  const [expandedSections, setExpandedSections] = useState(['recent', 'ingredients']);

  const toggleSection = (section) => {
    setExpandedSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  return (
    <div className="w-64 bg-gray-800 border-r border-gray-700 overflow-y-auto">
      <div className="p-4">
        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search assets..."
            className="w-full bg-gray-700 text-white pl-10 pr-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Recent Projects */}
        <SidebarSection
          title="Recent Projects"
          isExpanded={expandedSections.includes('recent')}
          onToggle={() => toggleSection('recent')}
        >
          <div className="space-y-2">
            {['Cinematic Scene', 'Product Demo', 'Character Animation'].map((project, index) => (
              <div key={index} className="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-700 cursor-pointer">
                <div className="w-8 h-8 bg-gray-600 rounded-md flex items-center justify-center">
                  <Video className="w-4 h-4" />
                </div>
                <span className="text-sm">{project}</span>
              </div>
            ))}
          </div>
        </SidebarSection>

        {/* Ingredients */}
        <SidebarSection
          title="Ingredients"
          isExpanded={expandedSections.includes('ingredients')}
          onToggle={() => toggleSection('ingredients')}
        >
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-2">
              {[
                { type: 'character', name: 'Hero', color: 'bg-green-600' },
                { type: 'environment', name: 'Forest', color: 'bg-amber-600' },
                { type: 'object', name: 'Sword', color: 'bg-red-600' },
                { type: 'effect', name: 'Magic', color: 'bg-purple-600' }
              ].map((ingredient, index) => (
                <div key={index} className="aspect-square bg-gray-700 rounded-md p-3 hover:bg-gray-600 cursor-pointer transition-colors">
                  <div className={`w-full h-2/3 ${ingredient.color} rounded-sm mb-2`}></div>
                  <p className="text-xs truncate">{ingredient.name}</p>
                </div>
              ))}
            </div>
            <button className="w-full p-2 border-2 border-dashed border-gray-500 rounded-md text-gray-400 hover:text-white hover:border-gray-400 transition-colors">
              <Plus className="w-4 h-4 mx-auto" />
            </button>
          </div>
        </SidebarSection>

        {/* Camera Presets */}
        <SidebarSection
          title="Camera Presets"
          isExpanded={expandedSections.includes('camera')}
          onToggle={() => toggleSection('camera')}
        >
          <div className="space-y-2">
            {['Wide Shot', 'Close-up', 'Dolly In', 'Pan Left', 'Zoom Out'].map((preset, index) => (
              <button
                key={index}
                className="w-full text-left p-2 rounded-md hover:bg-gray-700 transition-colors flex items-center space-x-2"
              >
                <Camera className="w-4 h-4" />
                <span className="text-sm">{preset}</span>
              </button>
            ))}
          </div>
        </SidebarSection>
      </div>
    </div>
  );
};

// Sidebar Section Component
const SidebarSection = ({ title, isExpanded, onToggle, children }) => {
  return (
    <div className="mb-6">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-2 hover:bg-gray-700 rounded-md transition-colors"
      >
        <span className="font-medium text-sm">{title}</span>
        {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
      </button>
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="mt-2">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Main Workspace Component
const MainWorkspace = ({ 
  activeTab, 
  prompt, 
  setPrompt, 
  isGenerating, 
  setIsGenerating, 
  generatedVideos, 
  setGeneratedVideos,
  selectedProject,
  setSelectedProject 
}) => {
  return (
    <div className="flex-1 flex flex-col">
      {activeTab === 'create' && (
        <CreateTab 
          prompt={prompt}
          setPrompt={setPrompt}
          isGenerating={isGenerating}
          setIsGenerating={setIsGenerating}
          generatedVideos={generatedVideos}
          setGeneratedVideos={setGeneratedVideos}
        />
      )}
      {activeTab === 'scenes' && <ScenesTab />}
      {activeTab === 'assets' && <AssetsTab />}
      {activeTab === 'projects' && <ProjectsTab />}
    </div>
  );
};

// Create Tab Component
const CreateTab = ({ prompt, setPrompt, isGenerating, setIsGenerating, generatedVideos, setGeneratedVideos }) => {
  const [selectedVideo, setSelectedVideo] = useState(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    
    // Simulate video generation
    setTimeout(() => {
      const newVideo = {
        id: Date.now(),
        prompt: prompt,
        url: `https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1&controls=0&showinfo=0&modestbranding=1&loop=1&playlist=dQw4w9WgXcQ`,
        thumbnail: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=300&h=200&fit=crop',
        duration: '0:15',
        created: new Date().toLocaleString()
      };
      
      setGeneratedVideos(prev => [newVideo, ...prev]);
      setSelectedVideo(newVideo);
      setIsGenerating(false);
      setPrompt('');
    }, 3000);
  };

  return (
    <div className="flex-1 flex">
      {/* Video Generation Area */}
      <div className="flex-1 p-6">
        {/* Prompt Input */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Describe your scene</label>
          <div className="relative">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="A cinematic shot of a futuristic city at sunset with flying cars and neon lights..."
              className="w-full h-24 bg-gray-800 text-white p-4 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
            <button
              onClick={handleGenerate}
              disabled={isGenerating || !prompt.trim()}
              className="absolute bottom-3 right-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 px-4 py-2 rounded-md transition-colors flex items-center space-x-2"
            >
              {isGenerating ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Generating...</span>
                </>
              ) : (
                <>
                  <Wand2 className="w-4 h-4" />
                  <span>Generate</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Video Preview */}
        <div className="mb-6">
          <div className="aspect-video bg-gray-800 rounded-lg overflow-hidden border border-gray-600">
            {selectedVideo ? (
              <VideoPlayer video={selectedVideo} />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center">
                  <Video className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                  <p className="text-gray-400">Your generated video will appear here</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Generation History */}
        {generatedVideos.length > 0 && (
          <div>
            <h3 className="text-lg font-medium mb-4">Recent Generations</h3>
            <div className="grid grid-cols-3 gap-4">
              {generatedVideos.map((video) => (
                <VideoThumbnail 
                  key={video.id} 
                  video={video} 
                  isSelected={selectedVideo?.id === video.id}
                  onClick={() => setSelectedVideo(video)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Video Player Component
const VideoPlayer = ({ video }) => {
  return (
    <div className="w-full h-full relative group">
      <iframe
        src={video.url}
        className="w-full h-full"
        frameBorder="0"
        allowFullScreen
      />
      <div className="absolute bottom-4 left-4 bg-black bg-opacity-70 px-3 py-1 rounded-md">
        <p className="text-sm font-medium">{video.duration}</p>
      </div>
      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="flex space-x-2">
          <button className="bg-black bg-opacity-70 p-2 rounded-md hover:bg-opacity-90 transition-colors">
            <Download className="w-4 h-4" />
          </button>
          <button className="bg-black bg-opacity-70 p-2 rounded-md hover:bg-opacity-90 transition-colors">
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

// Video Thumbnail Component
const VideoThumbnail = ({ video, isSelected, onClick }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`cursor-pointer rounded-lg overflow-hidden border-2 transition-colors ${
        isSelected ? 'border-blue-500' : 'border-gray-600 hover:border-gray-500'
      }`}
      onClick={onClick}
    >
      <div className="aspect-video bg-gray-700 relative">
        <img 
          src={video.thumbnail} 
          alt="Video thumbnail"
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 px-2 py-1 rounded text-xs">
          {video.duration}
        </div>
      </div>
      <div className="p-3 bg-gray-800">
        <p className="text-sm truncate mb-1">{video.prompt}</p>
        <p className="text-xs text-gray-400">{video.created}</p>
      </div>
    </motion.div>
  );
};

// Scenes Tab Component
const ScenesTab = () => {
  const [scenes, setScenes] = useState([
    { id: 1, name: 'Opening Scene', duration: '0:30', status: 'completed' },
    { id: 2, name: 'Character Introduction', duration: '0:45', status: 'in-progress' },
    { id: 3, name: 'Climax Scene', duration: '1:20', status: 'pending' }
  ]);

  return (
    <div className="flex-1 p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">SceneBuilder</h2>
        <p className="text-gray-400">Edit and extend your scenes with continuous motion</p>
      </div>

      <div className="space-y-4">
        {scenes.map((scene) => (
          <SceneCard key={scene.id} scene={scene} />
        ))}
      </div>
    </div>
  );
};

// Scene Card Component
const SceneCard = ({ scene }) => {
  const statusColors = {
    completed: 'bg-green-600',
    'in-progress': 'bg-yellow-600',
    pending: 'bg-gray-600'
  };

  return (
    <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className={`w-3 h-3 rounded-full ${statusColors[scene.status]}`}></div>
          <h3 className="font-medium">{scene.name}</h3>
          <span className="text-sm text-gray-400">{scene.duration}</span>
        </div>
        <div className="flex space-x-2">
          <button className="p-2 hover:bg-gray-700 rounded-md transition-colors">
            <Edit3 className="w-4 h-4" />
          </button>
          <button className="p-2 hover:bg-gray-700 rounded-md transition-colors">
            <Copy className="w-4 h-4" />
          </button>
          <button className="p-2 hover:bg-gray-700 rounded-md transition-colors">
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      <div className="aspect-video bg-gray-700 rounded-md mb-3">
        <div className="w-full h-full flex items-center justify-center">
          <Play className="w-12 h-12 text-gray-400" />
        </div>
      </div>
      
      <div className="flex space-x-2">
        <button className="flex-1 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md transition-colors">
          Extend Scene
        </button>
        <button className="px-4 py-2 border border-gray-600 hover:border-gray-500 rounded-md transition-colors">
          Edit
        </button>
      </div>
    </div>
  );
};

// Assets Tab Component
const AssetsTab = () => {
  return (
    <div className="flex-1 p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Asset Management</h2>
        <p className="text-gray-400">Organize your characters, environments, and props</p>
      </div>

      <div className="grid grid-cols-4 gap-6">
        {['Characters', 'Environments', 'Objects', 'Effects'].map((category) => (
          <AssetCategory key={category} category={category} />
        ))}
      </div>
    </div>
  );
};

// Asset Category Component
const AssetCategory = ({ category }) => {
  const icons = {
    Characters: ImageIcon,
    Environments: Monitor,
    Objects: Layers,
    Effects: Wand2
  };
  
  const Icon = icons[category];

  return (
    <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
      <div className="flex items-center space-x-3 mb-4">
        <Icon className="w-5 h-5 text-blue-400" />
        <h3 className="font-medium">{category}</h3>
      </div>
      
      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="aspect-square bg-gray-700 rounded-md hover:bg-gray-600 cursor-pointer transition-colors"></div>
          ))}
        </div>
        <button className="w-full p-2 border-2 border-dashed border-gray-600 hover:border-gray-500 rounded-md transition-colors">
          <Plus className="w-4 h-4 mx-auto" />
        </button>
      </div>
    </div>
  );
};

// Projects Tab Component
const ProjectsTab = () => {
  return (
    <div className="flex-1 p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Projects</h2>
        <p className="text-gray-400">Manage your creative projects</p>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <ProjectCard key={i} projectId={i} />
        ))}
      </div>
    </div>
  );
};

// Project Card Component
const ProjectCard = ({ projectId }) => {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 hover:border-gray-600 transition-colors cursor-pointer"
    >
      <div className="aspect-video bg-gray-700"></div>
      <div className="p-4">
        <h3 className="font-medium mb-2">Project {projectId}</h3>
        <p className="text-sm text-gray-400 mb-3">Created 2 days ago</p>
        <div className="flex space-x-2">
          <button className="flex-1 bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded-md text-sm transition-colors">
            Open
          </button>
          <button className="p-2 hover:bg-gray-700 rounded-md transition-colors">
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

// Properties Panel Component
const PropertiesPanel = ({ activeTab }) => {
  return (
    <div className="w-80 bg-gray-800 border-l border-gray-700 overflow-y-auto">
      <div className="p-4">
        <h3 className="font-medium mb-4">Properties</h3>
        
        {activeTab === 'create' && <CreateProperties />}
        {activeTab === 'scenes' && <SceneProperties />}
        {activeTab === 'assets' && <AssetProperties />}
      </div>
    </div>
  );
};

// Create Properties Component
const CreateProperties = () => {
  return (
    <div className="space-y-6">
      {/* Camera Controls */}
      <div>
        <h4 className="font-medium mb-3 flex items-center space-x-2">
          <Camera className="w-4 h-4" />
          <span>Camera Controls</span>
        </h4>
        <div className="space-y-4">
          <div>
            <label className="block text-sm mb-2">Movement</label>
            <select className="w-full bg-gray-700 text-white p-2 rounded-md border border-gray-600">
              <option>Static</option>
              <option>Dolly In</option>
              <option>Dolly Out</option>
              <option>Pan Left</option>
              <option>Pan Right</option>
              <option>Tilt Up</option>
              <option>Tilt Down</option>
            </select>
          </div>
          <div>
            <label className="block text-sm mb-2">Angle</label>
            <select className="w-full bg-gray-700 text-white p-2 rounded-md border border-gray-600">
              <option>Eye Level</option>
              <option>Low Angle</option>
              <option>High Angle</option>
              <option>Bird's Eye</option>
              <option>Worm's Eye</option>
            </select>
          </div>
          <div>
            <label className="block text-sm mb-2">Shot Type</label>
            <select className="w-full bg-gray-700 text-white p-2 rounded-md border border-gray-600">
              <option>Wide Shot</option>
              <option>Medium Shot</option>
              <option>Close-up</option>
              <option>Extreme Close-up</option>
              <option>Over Shoulder</option>
            </select>
          </div>
        </div>
      </div>

      {/* Video Settings */}
      <div>
        <h4 className="font-medium mb-3 flex items-center space-x-2">
          <Sliders className="w-4 h-4" />
          <span>Video Settings</span>
        </h4>
        <div className="space-y-4">
          <div>
            <label className="block text-sm mb-2">Duration</label>
            <select className="w-full bg-gray-700 text-white p-2 rounded-md border border-gray-600">
              <option>3 seconds</option>
              <option>5 seconds</option>
              <option>10 seconds</option>
              <option>15 seconds</option>
              <option>30 seconds</option>
            </select>
          </div>
          <div>
            <label className="block text-sm mb-2">Aspect Ratio</label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { ratio: '16:9', icon: Monitor },
                { ratio: '9:16', icon: Smartphone },
                { ratio: '4:3', icon: Tablet }
              ].map(({ ratio, icon: Icon }) => (
                <button
                  key={ratio}
                  className="flex flex-col items-center p-2 bg-gray-700 hover:bg-blue-600 rounded-md transition-colors"
                >
                  <Icon className="w-4 h-4 mb-1" />
                  <span className="text-xs">{ratio}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Style Settings */}
      <div>
        <h4 className="font-medium mb-3">Style</h4>
        <div className="space-y-3">
          <div>
            <label className="block text-sm mb-2">Mood</label>
            <div className="flex flex-wrap gap-2">
              {['Cinematic', 'Dramatic', 'Bright', 'Dark', 'Vintage'].map((mood) => (
                <button
                  key={mood}
                  className="px-3 py-1 bg-gray-700 hover:bg-blue-600 rounded-full text-sm transition-colors"
                >
                  {mood}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Scene Properties Component
const SceneProperties = () => {
  return (
    <div className="space-y-6">
      <div>
        <h4 className="font-medium mb-3">Scene Settings</h4>
        <div className="space-y-4">
          <div>
            <label className="block text-sm mb-2">Transition</label>
            <select className="w-full bg-gray-700 text-white p-2 rounded-md border border-gray-600">
              <option>Cut</option>
              <option>Fade</option>
              <option>Dissolve</option>
              <option>Wipe</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

// Asset Properties Component
const AssetProperties = () => {
  return (
    <div className="space-y-6">
      <div>
        <h4 className="font-medium mb-3">Asset Details</h4>
        <p className="text-sm text-gray-400">Select an asset to view its properties</p>
      </div>
    </div>
  );
};

export default CalForge;