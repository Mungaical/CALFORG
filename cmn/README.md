# CMN - AI Video Generation Platform

CMN is a next-generation AI filmmaking platform inspired by Google Flow/Veo 3. Transform text and images into stunning, professional-quality videos with native audio generation.

## 🚀 Features

### Core Functionality
- **Text-to-Video Generation**: Transform text prompts into cinematic videos
- **Image-to-Video**: Animate static images with realistic motion
- **Camera Controls**: Direct control over camera movements, angles, and perspectives
- **Scene Builder**: Edit and extend shots with continuous motion
- **Native Audio Generation**: Synchronized audio including sound effects and dialogue
- **Asset Management**: Organize and reuse video ingredients

### User Experience
- **Modern UI**: Clean, responsive design similar to Google Flow
- **Gallery Showcase**: Discover community-created videos with visible prompts
- **Flexible Pricing**: Free, Pro, and Ultra subscription tiers
- **Authentication**: Complete sign-up/sign-in system
- **Responsive Design**: Works seamlessly on desktop and mobile

## 🛠 Tech Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom animations
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **Forms**: React Hook Form
- **Animations**: Framer Motion
- **File Upload**: React Dropzone

## 📁 Project Structure

```
cmn/
├── src/
│   ├── components/
│   │   └── Navbar.tsx          # Navigation component
│   ├── pages/
│   │   ├── HomePage.tsx        # Landing page with hero section
│   │   ├── StudioPage.tsx      # Main video generation interface
│   │   ├── GalleryPage.tsx     # Video showcase (CMN TV)
│   │   ├── PricingPage.tsx     # Subscription plans
│   │   └── AuthPage.tsx        # Authentication forms
│   ├── App.tsx                 # Main app with routing
│   ├── index.css               # Global styles and Tailwind
│   └── index.tsx               # App entry point
├── tailwind.config.js          # Tailwind configuration
├── postcss.config.js           # PostCSS configuration
└── package.json                # Dependencies and scripts
```

## 🎨 Key Components

### Studio Page
The main video generation interface featuring:
- Mode selection (Text-to-Video / Image-to-Video)
- Prompt input with guidance
- Model and duration settings
- Real-time video preview
- Camera controls panel
- Scene builder timeline
- Asset library management

### Gallery Page
Community showcase with:
- Category filtering
- Video cards with metadata
- Engagement metrics (views, likes)
- Social sharing options
- Prompt visibility for learning

### Pricing Page
Subscription tiers:
- **Free**: 5 generations/month, basic quality
- **CMN Pro**: 100 generations/month, high quality, camera controls
- **CMN Ultra**: Unlimited generations, 4K quality, advanced features

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd cmn
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm start
   ```

4. **Open in browser**
   Navigate to `http://localhost:3000`

## 🎯 Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run test suite
- `npm run eject` - Eject from Create React App

## 🎨 Design Features

### Visual Elements
- **Gradient Backgrounds**: Modern gradient designs
- **Glass Effects**: Backdrop blur for modern aesthetics
- **Custom Animations**: Smooth transitions and loading states
- **Video Placeholders**: Animated placeholders for video content
- **Responsive Grid**: Adaptive layouts for all screen sizes

### Color Scheme
- **Primary**: Blue tones (#0ea5e9, #0284c7, #0369a1)
- **Accents**: Purple gradients for premium features
- **Neutrals**: Carefully selected grays for content hierarchy

## 🔧 Customization

### Tailwind Configuration
The `tailwind.config.js` includes:
- Custom color palette
- Extended animations
- Custom keyframes
- Content paths configuration

### Custom CSS
The `index.css` includes:
- Tailwind directives
- Custom component styles
- Animation definitions
- Video placeholder effects

## 🚧 Development Notes

### Simulated Features
Since this is a frontend-only demonstration:
- Video generation is simulated with loading states
- Authentication forms are functional but don't connect to backend
- File uploads show UI but don't process files
- Payment integration is UI-only

### Potential Enhancements
- Backend integration for real video generation
- User authentication system
- Payment processing
- Real file upload and storage
- Video player with playback controls
- Advanced camera control implementations

## 📱 Responsive Design

The application is fully responsive with:
- Mobile-first approach
- Collapsible navigation
- Adaptive grid layouts
- Touch-friendly interactions
- Optimized typography scaling

## 🎬 Inspiration

CMN is inspired by Google Flow and Veo 3, featuring:
- Similar UI/UX patterns
- Comparable feature set
- Professional video generation workflow
- Community-driven gallery concept
- Tiered subscription model

## 📄 License

This project is for demonstration purposes. Please respect the inspiration sources and use responsibly.

---

**CMN** - Create Cinematic Videos with AI Magic ✨
