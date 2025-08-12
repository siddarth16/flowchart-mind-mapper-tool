import React from 'react';
import { 
  Play, 
  Square, 
  Circle, 
  Diamond, 
  Type, 
  ArrowRight, 
  Minus, 
  Download, 
  Upload, 
  Undo, 
  Redo, 
  Settings, 
  Zap,
  Menu,
  X,
  FileText,
  Layers,
  Palette,
  GitBranch
} from 'lucide-react';
import { useAppStore } from '../stores/useAppStore';

export const Header: React.FC = () => {
  const { 
    currentTool, 
    setCurrentTool, 
    showTemplateLibrary, 
    setShowTemplateLibrary,
    showPropertyPanel,
    setShowPropertyPanel,
    sidebarCollapsed,
    setSidebarCollapsed
  } = useAppStore();

  const tools = [
    { id: 'select', icon: Play, label: 'Select' },
    { id: 'rectangle', icon: Square, label: 'Rectangle' },
    { id: 'circle', icon: Circle, label: 'Circle' },
    { id: 'diamond', icon: Diamond, label: 'Diamond' },
    { id: 'text', icon: Type, label: 'Text' },
    { id: 'arrow', icon: ArrowRight, label: 'Arrow' },
    { id: 'line', icon: Minus, label: 'Line' },
    { id: 'mindmap', icon: GitBranch, label: 'Mind Map' },
  ] as const;

  return (
    <header className="bg-card border-b border-border px-4 py-2 flex items-center justify-between">
      {/* Left Section - Logo and Tools */}
      <div className="flex items-center space-x-4">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <GitBranch className="w-5 h-5 text-white" />
          </div>
          <span className="text-lg font-semibold text-foreground">FlowChart</span>
        </div>

        {/* Sidebar Toggle */}
        <button
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className="p-2 rounded-lg hover:bg-accent transition-colors"
          title="Toggle Sidebar"
        >
          {sidebarCollapsed ? <Menu className="w-4 h-4" /> : <X className="w-4 h-4" />}
        </button>

        {/* Tool Palette */}
        <div className="flex items-center space-x-1 bg-secondary rounded-lg p-1">
          {tools.map((tool) => {
            const Icon = tool.icon;
            return (
              <button
                key={tool.id}
                onClick={() => setCurrentTool(tool.id as any)}
                className={`p-2 rounded-md transition-colors ${
                  currentTool === tool.id 
                    ? 'bg-primary text-primary-foreground shadow-sm' 
                    : 'hover:bg-accent'
                }`}
                title={tool.label}
              >
                <Icon className="w-4 h-4" />
              </button>
            );
          })}
        </div>
      </div>

      {/* Center Section - File Actions */}
      <div className="flex items-center space-x-2">
        <button
          onClick={() => setShowTemplateLibrary(!showTemplateLibrary)}
          className="px-3 py-2 rounded-lg hover:bg-accent transition-colors flex items-center space-x-2"
          title="Templates"
        >
          <FileText className="w-4 h-4" />
          <span className="text-sm">Templates</span>
        </button>

        <div className="flex items-center space-x-1 bg-secondary rounded-lg p-1">
          <button className="p-2 rounded-md hover:bg-accent transition-colors" title="Undo">
            <Undo className="w-4 h-4" />
          </button>
          <button className="p-2 rounded-md hover:bg-accent transition-colors" title="Redo">
            <Redo className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center space-x-1 bg-secondary rounded-lg p-1">
          <button className="p-2 rounded-md hover:bg-accent transition-colors" title="Import">
            <Upload className="w-4 h-4" />
          </button>
          <button className="p-2 rounded-md hover:bg-accent transition-colors" title="Export">
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Right Section - View Controls */}
      <div className="flex items-center space-x-2">
        <button
          onClick={() => setShowPropertyPanel(!showPropertyPanel)}
          className={`p-2 rounded-lg transition-colors ${
            showPropertyPanel 
              ? 'bg-primary text-primary-foreground' 
              : 'hover:bg-accent'
          }`}
          title="Properties Panel"
        >
          <Layers className="w-4 h-4" />
        </button>

        <button className="p-2 rounded-lg hover:bg-accent transition-colors" title="AI Assistant">
          <Zap className="w-4 h-4" />
        </button>

        <button className="p-2 rounded-lg hover:bg-accent transition-colors" title="Settings">
          <Settings className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
}; 