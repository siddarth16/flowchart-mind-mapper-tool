# FlowChart Mind Mapper Tool

🎨 **The Ultimate Free Lucidchart Alternative** – A powerful, open-source flowchart and mind map builder

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white)](https://vitejs.dev/)

## 🚀 Overview

FlowChart Mind Mapper is a comprehensive, free alternative to Lucidchart that runs entirely in your browser. Create stunning flowcharts, mind maps, and diagrams with professional-grade features, unlimited usage, and zero cost.

### ✨ Key Features

- 🎯 **Professional Diagramming**: Drag-and-drop interface with extensive shape library
- 🧠 **Mind Mapping**: Advanced mind mapping with auto-layout and unlimited nesting
- 🎨 **Dark Theme UI**: Modern, professional dark theme with glassmorphism effects
- 🔄 **Real-time Canvas**: Infinite canvas with smooth pan, zoom, and snap-to-grid
- 📁 **Template Library**: Ready-made templates for org charts, flowcharts, UML, ERDs
- 🎭 **Custom Shapes**: Rectangles, circles, diamonds, arrows, and more
- 🎨 **Rich Styling**: Colors, gradients, borders, shadows, and custom fonts
- 📤 **Export Options**: PDF, PNG, SVG, and JSON export capabilities
- 🔧 **No Login Required**: Use immediately without registration or paywalls
- 🌐 **Privacy First**: All data stays in your browser, no tracking

## 🛠️ Technology Stack

- **Frontend**: React 18 + TypeScript
- **Diagramming**: React Flow (infinite canvas, drag-and-drop)
- **UI Components**: Radix UI + Tailwind CSS
- **State Management**: Zustand
- **Styling**: Tailwind CSS with custom dark theme
- **Build Tool**: Vite
- **Icons**: Lucide React
- **Animations**: Framer Motion

## 📦 Installation

### Prerequisites

- Node.js 16+ and npm/yarn
- Modern web browser

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/flowchart-mind-mapper-tool.git
   cd flowchart-mind-mapper-tool
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

### Build for Production

```bash
npm run build
npm run preview
```

## 🎯 Usage

### Creating Your First Flowchart

1. **Select a Shape**: Choose from the sidebar shape library
2. **Drag to Canvas**: Drop shapes onto the infinite canvas
3. **Connect Elements**: Drag from connection points to create arrows
4. **Style Your Diagram**: Use the property panel to customize colors, text, and borders
5. **Export**: Save as PDF, PNG, SVG, or JSON

### Mind Mapping

1. **Start with Central Node**: Create your main topic
2. **Add Branches**: Use the mind map tool to create connected ideas
3. **Expand Ideas**: Add unlimited sub-branches and nested concepts
4. **Auto-Layout**: Let the system organize your mind map automatically

### Templates

- Access ready-made templates from the Template Library
- Categories include: Flowcharts, Mind Maps, Org Charts, UML, ERDs
- One-click template application with customization options

## 🎨 Features in Detail

### Shape Library
- **Basic Shapes**: Rectangle, Circle, Diamond, Triangle, Star, Hexagon
- **Arrows**: Directional arrows and connectors
- **Text Elements**: Rich text with formatting options
- **Custom Shapes**: Extensible shape system

### Canvas Features
- **Infinite Canvas**: Unlimited workspace with smooth navigation
- **Snap to Grid**: Precise alignment with optional grid snapping
- **Multi-Selection**: Select and manipulate multiple elements
- **Zoom Controls**: Smooth zoom from 10% to 200%
- **Mini Map**: Overview navigation for large diagrams

### Export & Import
- **Export Formats**: PDF, PNG, SVG, JSON
- **High Quality**: Vector and raster exports at custom resolutions
- **Batch Export**: Export multiple diagrams simultaneously
- **Import Support**: JSON format for saving and loading projects

## 🔧 Project Structure

```
src/
├── components/           # React components
│   ├── nodes/           # Custom node components
│   ├── edges/           # Custom edge components
│   ├── DiagramEditor.tsx # Main canvas component
│   ├── Header.tsx       # Top navigation bar
│   ├── Sidebar.tsx      # Shape library panel
│   ├── PropertyPanel.tsx # Properties editor
│   └── TemplateLibrary.tsx # Template selection
├── stores/              # Zustand state management
│   └── useAppStore.ts   # Main application store
├── styles/              # CSS and styling
│   └── globals.css      # Global styles and theme
├── types/               # TypeScript type definitions
├── utils/               # Utility functions
└── App.tsx             # Main application component
```

## 🎯 Roadmap

### Phase 1: Core Features ✅
- [x] Basic canvas with drag-and-drop
- [x] Shape library with customization
- [x] Dark theme UI
- [x] Template system foundation

### Phase 2: Advanced Features (In Progress)
- [ ] Advanced shape customization
- [ ] Layer management system
- [ ] Multi-page documents
- [ ] Enhanced export options

### Phase 3: AI Integration (Planned)
- [ ] AI-powered auto-layout
- [ ] Smart diagram suggestions
- [ ] Natural language to diagram conversion
- [ ] Automated diagram cleanup

### Phase 4: Collaboration (Future)
- [ ] Real-time collaboration
- [ ] Comments and annotations
- [ ] Version history
- [ ] Team workspaces

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Setup

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Run tests: `npm test`
5. Commit changes: `git commit -m 'Add amazing feature'`
6. Push to branch: `git push origin feature/amazing-feature`
7. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [React Flow](https://reactflow.dev/) for the amazing diagramming foundation
- [Radix UI](https://radix-ui.com/) for accessible UI components
- [Tailwind CSS](https://tailwindcss.com/) for utility-first styling
- [Lucide](https://lucide.dev/) for beautiful icons

## 🌟 Support

If you find this project useful, please consider:
- ⭐ Starring the repository
- 🐛 Reporting bugs
- 💡 Suggesting new features
- 🤝 Contributing code

---

**Built with ❤️ by the open-source community**

*Making professional diagramming accessible to everyone, everywhere.*