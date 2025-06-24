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
  Tablet,
  Sparkles,
  Zap,
  Star
} from 'lucide-react';

// Sample video URLs for demo
const SAMPLE_VIDEOS = [
  'https://www.youtube.com/embed/K4TOrB7at0Y',
  'https://www.youtube.com/embed/W7qWa52k-nE', 
  'https://www.youtube.com/embed/8LXVhSbHo5Y',
  'https://www.youtube.com/embed/dQw4w9WgXcQ'
];

// Sample thumbnails for demo
const SAMPLE_THUMBNAILS = [
  'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=300&h=200&fit=crop',
  'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=300&h=200&fit=crop',
  'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=300&h=200&fit=crop',
  'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=300&h=200&fit=crop'
];

// Main Cal Forge Component
const CalForge = () => {
  const [activeTab, setActiveTab] = useState('create');
  const [selectedProject, setSelectedProject] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [generatedVideos, setGeneratedVideos] = useState([
    {
      id: 1,
      prompt: 'A futuristic city at sunset with flying cars and neon lights',
      url: SAMPLE_VIDEOS[0],
      thumbnail: SAMPLE_THUMBNAILS[0],
      duration: '0:15',
      created: '2 hours ago'
    },
    {
      id: 2,
      prompt: 'A majestic dragon soaring through cloudy mountains',
      url: SAMPLE_VIDEOS[1],
      thumbnail: SAMPLE_THUMBNAILS[1],
      duration: '0:12',
      created: '5 hours ago'
    }
  ]);
  const [assets, setAssets] = useState([]);

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans">
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
    <header className="bg-gray-800 border-b border-gray-700 h-16 flex items-center justify-between px-6 shadow-lg">
      <div className="flex items-center space-x-8">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
            <Sparkles className="w-5 h-5" />
          </div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Cal Forge
          </h1>
          <span className="px-2 py-1 bg-purple-600 text-xs rounded-full">AI</span>
        </div>
        
        <nav className="flex space-x-1">
          {[
            { id: 'create', label: 'Create', icon: Wand2 },
            { id: 'scenes', label: 'Scenes', icon: Film },
            { id: 'assets', label: 'Assets', icon: Layers },
            { id: 'projects', label: 'Projects', icon: Grid3X3 }
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`px-4 py-2 rounded-lg flex items-center space-x-2 transition-all duration-200 ${
                activeTab === id
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
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
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="p-2 rounded-lg hover:bg-gray-700 transition-colors"
        >
          <Settings className="w-5 h-5" />
        </motion.button>
        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
          <span className="text-sm font-medium">CF</span>
        </div>
      </div>
    </header>
  );
};

// Sidebar Component
const Sidebar = ({ activeTab, assets, setAssets }) => {
  const [expandedSections, setExpandedSections] = useState(['recent', 'ingredients', 'camera']);

  const toggleSection = (section) => {
    setExpandedSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  return (
    <div className="w-64 bg-gray-800 border-r border-gray-700 overflow-y-auto shadow-xl">
      <div className="p-4">
        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search assets..."
            className="w-full bg-gray-700 text-white pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
        </div>

        {/* Recent Projects */}
        <SidebarSection
          title="Recent Projects"
          isExpanded={expandedSections.includes('recent')}
          onToggle={() => toggleSection('recent')}
        >
          <div className="space-y-2">
            {[
              { name: 'Cinematic Scene', icon: Film, status: 'active' },
              { name: 'Product Demo', icon: Video, status: 'completed' },
              { name: 'Character Animation', icon: Sparkles, status: 'draft' }
            ].map((project, index) => (
              <motion.div 
                key={index} 
                whileHover={{ x: 4 }}
                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-700 cursor-pointer transition-all"
              >
                <div className="w-8 h-8 bg-gray-600 rounded-lg flex items-center justify-center">
                  <project.icon className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <span className="text-sm font-medium">{project.name}</span>
                  <div className={`w-2 h-2 rounded-full ${
                    project.status === 'active' ? 'bg-green-400' :
                    project.status === 'completed' ? 'bg-blue-400' : 'bg-gray-400'
                  } inline-block ml-2`}></div>
                </div>
              </motion.div>
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
                { type: 'character', name: 'Hero', color: 'from-green-500 to-emerald-600' },
                { type: 'environment', name: 'Forest', color: 'from-amber-500 to-orange-600' },
                { type: 'object', name: 'Sword', color: 'from-red-500 to-rose-600' },
                { type: 'effect', name: 'Magic', color: 'from-purple-500 to-violet-600' }
              ].map((ingredient, index) => (
                <motion.div 
                  key={index} 
                  whileHover={{ scale: 1.05 }}
                  className="aspect-square bg-gray-700 rounded-lg p-3 hover:bg-gray-600 cursor-pointer transition-all shadow-lg"
                >
                  <div className={`w-full h-2/3 bg-gradient-to-br ${ingredient.color} rounded-sm mb-2 shadow-inner`}></div>
                  <p className="text-xs truncate font-medium">{ingredient.name}</p>
                </motion.div>
              ))}
            </div>
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full p-3 border-2 border-dashed border-gray-500 rounded-lg text-gray-400 hover:text-white hover:border-gray-400 transition-all"
            >
              <Plus className="w-4 h-4 mx-auto" />
            </motion.button>
          </div>
        </SidebarSection>

        {/* Camera Presets */}
        <SidebarSection
          title="Camera Presets"
          isExpanded={expandedSections.includes('camera')}
          onToggle={() => toggleSection('camera')}
        >
          <div className="space-y-2">
            {[
              { name: 'Wide Shot', icon: Monitor },
              { name: 'Close-up', icon: Camera },
              { name: 'Dolly In', icon: Zap },
              { name: 'Pan Left', icon: RotateCcw },
              { name: 'Zoom Out', icon: Maximize }
            ].map((preset, index) => (
              <motion.button
                key={index}
                whileHover={{ x: 4 }}
                className="w-full text-left p-2 rounded-lg hover:bg-gray-700 transition-all flex items-center space-x-2"
              >
                <preset.icon className="w-4 h-4 text-blue-400" />
                <span className="text-sm">{preset.name}</span>
              </motion.button>
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
      <motion.button
        onClick={onToggle}
        whileHover={{ x: 2 }}
        className="w-full flex items-center justify-between p-2 hover:bg-gray-700 rounded-lg transition-all"
      >
        <span className="font-medium text-sm">{title}</span>
        <motion.div
          animate={{ rotate: isExpanded ? 90 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronRight className="w-4 h-4" />
        </motion.div>
      </motion.button>
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="mt-3">
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
    <div className="flex-1 flex flex-col bg-gray-900">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="flex-1"
        >
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
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

// Create Tab Component
const CreateTab = ({ prompt, setPrompt, isGenerating, setIsGenerating, generatedVideos, setGeneratedVideos }) => {
  const [selectedVideo, setSelectedVideo] = useState(generatedVideos[0] || null);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    
    // Simulate video generation
    setTimeout(() => {
      const randomVideoIndex = Math.floor(Math.random() * SAMPLE_VIDEOS.length);
      const randomThumbnailIndex = Math.floor(Math.random() * SAMPLE_THUMBNAILS.length);
      
      const newVideo = {
        id: Date.now(),
        prompt: prompt,
        url: SAMPLE_VIDEOS[randomVideoIndex],
        thumbnail: SAMPLE_THUMBNAILS[randomThumbnailIndex],
        duration: `0:${Math.floor(Math.random() * 20) + 10}`,
        created: 'Just now'
      };
      
      setGeneratedVideos(prev => [newVideo, ...prev]);
      setSelectedVideo(newVideo);
      setIsGenerating(false);
      setPrompt('');
    }, 3000);
  };

  const suggestedPrompts = [
    "A cinematic drone shot of a futuristic city at sunset",
    "A magical forest with glowing mushrooms and floating particles",
    "An epic space battle with starships and laser beams",
    "A cozy coffee shop scene with warm lighting and steam"
  ];

  return (
    <div className="flex-1 p-6">
      {/* Prompt Input Section */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <label className="text-lg font-semibold">Describe your scene</label>
          <div className="flex items-center space-x-2 text-sm text-gray-400">
            <Sparkles className="w-4 h-4" />
            <span>AI-Powered</span>
          </div>
        </div>
        
        <div className="relative">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="A cinematic shot of a futuristic city at sunset with flying cars and neon lights..."
            className="w-full h-32 bg-gray-800 text-white p-4 rounded-xl border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none transition-all shadow-inner"
          />
          <motion.button
            onClick={handleGenerate}
            disabled={isGenerating || !prompt.trim()}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`absolute bottom-4 right-4 px-6 py-3 rounded-lg transition-all flex items-center space-x-2 shadow-lg ${
              isGenerating || !prompt.trim()
                ? 'bg-gray-600 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
            }`}
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
          </motion.button>
        </div>

        {/* Suggested Prompts */}
        <div className="mt-4">
          <p className="text-sm text-gray-400 mb-2">Try these prompts:</p>
          <div className="flex flex-wrap gap-2">
            {suggestedPrompts.map((suggestion, index) => (
              <motion.button
                key={index}
                onClick={() => setPrompt(suggestion)}
                whileHover={{ scale: 1.02 }}
                className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded-full text-sm transition-all"
              >
                {suggestion}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Video Preview */}
      <div className="mb-6">
        <div className="aspect-video bg-gray-800 rounded-xl overflow-hidden border border-gray-600 shadow-2xl">
          {selectedVideo ? (
            <VideoPlayer video={selectedVideo} />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-center">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Video className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                </motion.div>
                <p className="text-gray-400 text-lg">Your generated video will appear here</p>
                <p className="text-gray-500 text-sm mt-2">Start by describing your scene above</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Generation History */}
      {generatedVideos.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
            <Star className="w-5 h-5 text-yellow-400" />
            <span>Recent Generations</span>
          </h3>
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
      <div className="absolute bottom-4 left-4 bg-black bg-opacity-70 px-3 py-2 rounded-lg backdrop-blur-sm">
        <p className="text-sm font-medium">{video.duration}</p>
      </div>
      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="flex space-x-2">
          <motion.button 
            whileHover={{ scale: 1.1 }}
            className="bg-black bg-opacity-70 p-2 rounded-lg hover:bg-opacity-90 transition-all backdrop-blur-sm"
          >
            <Download className="w-4 h-4" />
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.1 }}
            className="bg-black bg-opacity-70 p-2 rounded-lg hover:bg-opacity-90 transition-all backdrop-blur-sm"
          >
            <Share2 className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </div>
  );
};

// Video Thumbnail Component
const VideoThumbnail = ({ video, isSelected, onClick }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      className={`cursor-pointer rounded-xl overflow-hidden border-2 transition-all shadow-lg ${
        isSelected ? 'border-blue-500 shadow-blue-500/20' : 'border-gray-600 hover:border-gray-500'
      }`}
      onClick={onClick}
    >
      <div className="aspect-video bg-gray-700 relative">
        <img 
          src={video.thumbnail} 
          alt="Video thumbnail"
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 px-2 py-1 rounded text-xs font-medium">
          {video.duration}
        </div>
        <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-10 transition-all flex items-center justify-center">
          <Play className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </div>
      <div className="p-3 bg-gray-800">
        <p className="text-sm truncate mb-1 font-medium">{video.prompt}</p>
        <p className="text-xs text-gray-400">{video.created}</p>
      </div>
    </motion.div>
  );
};

// Other tab components remain similar but with enhanced styling...
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
        <h2 className="text-2xl font-bold mb-2 flex items-center space-x-3">
          <Film className="w-7 h-7 text-blue-400" />
          <span>SceneBuilder</span>
        </h2>
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
    completed: 'bg-green-500',
    'in-progress': 'bg-yellow-500',
    pending: 'bg-gray-500'
  };

  return (
    <motion.div 
      whileHover={{ y: -2 }}
      className="bg-gray-800 rounded-xl p-4 border border-gray-700 shadow-lg"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className={`w-3 h-3 rounded-full ${statusColors[scene.status]}`}></div>
          <h3 className="font-medium">{scene.name}</h3>
          <span className="text-sm text-gray-400">{scene.duration}</span>
        </div>
        <div className="flex space-x-2">
          <motion.button 
            whileHover={{ scale: 1.1 }}
            className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
          >
            <Edit3 className="w-4 h-4" />
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.1 }}
            className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
          >
            <Copy className="w-4 h-4" />
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.1 }}
            className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
          >
            <MoreVertical className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
      
      <div className="aspect-video bg-gray-700 rounded-lg mb-3 overflow-hidden">
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-700 to-gray-800">
          <Play className="w-12 h-12 text-gray-400" />
        </div>
      </div>
      
      <div className="flex space-x-2">
        <motion.button 
          whileHover={{ scale: 1.02 }}
          className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-4 py-2 rounded-lg transition-all"
        >
          Extend Scene
        </motion.button>
        <motion.button 
          whileHover={{ scale: 1.02 }}
          className="px-4 py-2 border border-gray-600 hover:border-gray-500 rounded-lg transition-colors"
        >
          Edit
        </motion.button>
      </div>
    </motion.div>
  );
};

// Assets Tab Component
const AssetsTab = () => {
  return (
    <div className="flex-1 p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2 flex items-center space-x-3">
          <Layers className="w-7 h-7 text-purple-400" />
          <span>Asset Management</span>
        </h2>
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
    Effects: Sparkles
  };
  
  const colors = {
    Characters: 'text-green-400',
    Environments: 'text-blue-400',
    Objects: 'text-yellow-400',
    Effects: 'text-purple-400'
  };
  
  const Icon = icons[category];

  return (
    <motion.div 
      whileHover={{ y: -4 }}
      className="bg-gray-800 rounded-xl p-4 border border-gray-700 shadow-lg"
    >
      <div className="flex items-center space-x-3 mb-4">
        <Icon className={`w-5 h-5 ${colors[category]}`} />
        <h3 className="font-medium">{category}</h3>
      </div>
      
      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-2">
          {[1, 2, 3, 4].map((i) => (
            <motion.div 
              key={i} 
              whileHover={{ scale: 1.05 }}
              className="aspect-square bg-gray-700 rounded-lg hover:bg-gray-600 cursor-pointer transition-all"
            />
          ))}
        </div>
        <motion.button 
          whileHover={{ scale: 1.02 }}
          className="w-full p-2 border-2 border-dashed border-gray-600 hover:border-gray-500 rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4 mx-auto" />
        </motion.button>
      </div>
    </motion.div>
  );
};

// Projects Tab Component
const ProjectsTab = () => {
  return (
    <div className="flex-1 p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2 flex items-center space-x-3">
          <Grid3X3 className="w-7 h-7 text-cyan-400" />
          <span>Projects</span>
        </h2>
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
      whileHover={{ y: -4, scale: 1.02 }}
      className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-gray-600 transition-all cursor-pointer shadow-lg"
    >
      <div className="aspect-video bg-gradient-to-br from-gray-700 to-gray-800 relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <Video className="w-12 h-12 text-gray-500" />
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-medium mb-2">Project {projectId}</h3>
        <p className="text-sm text-gray-400 mb-3">Created 2 days ago</p>
        <div className="flex space-x-2">
          <motion.button 
            whileHover={{ scale: 1.02 }}
            className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-3 py-2 rounded-lg text-sm transition-all"
          >
            Open
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.1 }}
            className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
          >
            <MoreVertical className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

// Properties Panel Component
const PropertiesPanel = ({ activeTab }) => {
  return (
    <div className="w-80 bg-gray-800 border-l border-gray-700 overflow-y-auto shadow-xl">
      <div className="p-4">
        <h3 className="font-semibold mb-4 text-lg">Properties</h3>
        
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
          <Camera className="w-4 h-4 text-blue-400" />
          <span>Camera Controls</span>
        </h4>
        <div className="space-y-4">
          <div>
            <label className="block text-sm mb-2 font-medium">Movement</label>
            <select className="w-full bg-gray-700 text-white p-2 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
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
            <label className="block text-sm mb-2 font-medium">Angle</label>
            <select className="w-full bg-gray-700 text-white p-2 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Eye Level</option>
              <option>Low Angle</option>
              <option>High Angle</option>
              <option>Bird's Eye</option>
              <option>Worm's Eye</option>
            </select>
          </div>
          <div>
            <label className="block text-sm mb-2 font-medium">Shot Type</label>
            <select className="w-full bg-gray-700 text-white p-2 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
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
          <Sliders className="w-4 h-4 text-purple-400" />
          <span>Video Settings</span>
        </h4>
        <div className="space-y-4">
          <div>
            <label className="block text-sm mb-2 font-medium">Duration</label>
            <select className="w-full bg-gray-700 text-white p-2 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>3 seconds</option>
              <option>5 seconds</option>
              <option>10 seconds</option>
              <option>15 seconds</option>
              <option>30 seconds</option>
            </select>
          </div>
          <div>
            <label className="block text-sm mb-2 font-medium">Aspect Ratio</label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { ratio: '16:9', icon: Monitor },
                { ratio: '9:16', icon: Smartphone },
                { ratio: '4:3', icon: Tablet }
              ].map(({ ratio, icon: Icon }) => (
                <motion.button
                  key={ratio}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex flex-col items-center p-2 bg-gray-700 hover:bg-blue-600 rounded-lg transition-all"
                >
                  <Icon className="w-4 h-4 mb-1" />
                  <span className="text-xs">{ratio}</span>
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Style Settings */}
      <div>
        <h4 className="font-medium mb-3 flex items-center space-x-2">
          <Sparkles className="w-4 h-4 text-yellow-400" />
          <span>Style</span>
        </h4>
        <div className="space-y-3">
          <div>
            <label className="block text-sm mb-2 font-medium">Mood</label>
            <div className="flex flex-wrap gap-2">
              {['Cinematic', 'Dramatic', 'Bright', 'Dark', 'Vintage'].map((mood) => (
                <motion.button
                  key={mood}
                  whileHover={{ scale: 1.05 }}
                  className="px-3 py-1 bg-gray-700 hover:bg-blue-600 rounded-full text-sm transition-all"
                >
                  {mood}
                </motion.button>
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
            <label className="block text-sm mb-2 font-medium">Transition</label>
            <select className="w-full bg-gray-700 text-white p-2 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
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