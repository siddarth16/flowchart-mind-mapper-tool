import React, { useState } from 'react';
import { 
  Square, 
  Circle, 
  Diamond, 
  Triangle, 
  Star, 
  Hexagon, 
  Heart, 
  ArrowUp, 
  ArrowDown, 
  ArrowLeft, 
  ArrowRight,
  Type,
  Image,
  Palette,
  GitBranch,
  Layers,
  ChevronRight,
  ChevronDown,
  Search,
  Workflow,
  Network,
  Building,
  Zap,
  Package,
  Database,
  Cloud,
  Server,
  Smartphone,
  Monitor,
  Router,
  Shield,
  Activity,
  Settings,
  Users,
  FileText,
  Clock,
  Archive
} from 'lucide-react';
import { useAppStore } from '../stores/useAppStore';

// Comprehensive professional shape library
const SHAPE_GROUPS = [
  {
    name: 'Basic Flowchart',
    icon: Workflow,
    shapes: [
      { type: 'process', icon: Square, label: 'Process', emoji: '⬜' },
      { type: 'decision', icon: Diamond, label: 'Decision', emoji: '⬦' },
      { type: 'terminator', icon: Circle, label: 'Start/End', emoji: '⬭' },
      { type: 'data', icon: Hexagon, label: 'Data', emoji: '⬢' },
      { type: 'document', icon: FileText, label: 'Document', emoji: '📄' },
      { type: 'delay', icon: Clock, label: 'Delay', emoji: '⏳' },
      { type: 'database', icon: Database, label: 'Database', emoji: '🗄️' },
      { type: 'cloud', icon: Cloud, label: 'Cloud', emoji: '☁️' },
    ]
  },
  {
    name: 'UML Shapes',
    icon: Package,
    shapes: [
      { type: 'class', icon: Building, label: 'Class', emoji: '🏛️' },
      { type: 'interface', icon: Settings, label: 'Interface', emoji: '🔌' },
      { type: 'actor', icon: Users, label: 'Actor', emoji: '🎭' },
      { type: 'usecase', icon: Circle, label: 'Use Case', emoji: '⭕' },
      { type: 'package', icon: Package, label: 'Package', emoji: '📦' },
      { type: 'component', icon: Settings, label: 'Component', emoji: '🧩' },
    ]
  },
  {
    name: 'Network/System',
    icon: Network,
    shapes: [
      { type: 'server', icon: Server, label: 'Server', emoji: '🖥️' },
      { type: 'router', icon: Router, label: 'Router', emoji: '📡' },
      { type: 'switch', icon: Activity, label: 'Switch', emoji: '🔀' },
      { type: 'firewall', icon: Shield, label: 'Firewall', emoji: '🛡️' },
      { type: 'laptop', icon: Monitor, label: 'Laptop', emoji: '💻' },
      { type: 'mobile', icon: Smartphone, label: 'Mobile', emoji: '📱' },
    ]
  },
  {
    name: 'Business Process',
    icon: Zap,
    shapes: [
      { type: 'event', icon: Zap, label: 'Event', emoji: '⚡' },
      { type: 'gateway', icon: Diamond, label: 'Gateway', emoji: '◆' },
      { type: 'task', icon: FileText, label: 'Task', emoji: '📋' },
      { type: 'subprocess', icon: Archive, label: 'Subprocess', emoji: '🔄' },
      { type: 'annotation', icon: Type, label: 'Annotation', emoji: '📝' },
    ]
  },
  {
    name: 'Geometric Shapes',
    icon: Square,
    shapes: [
      { type: 'rectangle', icon: Square, label: 'Rectangle', emoji: '▭' },
      { type: 'circle', icon: Circle, label: 'Circle', emoji: '●' },
      { type: 'triangle', icon: Triangle, label: 'Triangle', emoji: '▲' },
      { type: 'diamond', icon: Diamond, label: 'Diamond', emoji: '◆' },
      { type: 'hexagon', icon: Hexagon, label: 'Hexagon', emoji: '⬡' },
      { type: 'star', icon: Star, label: 'Star', emoji: '⭐' },
      { type: 'pentagon', icon: Star, label: 'Pentagon', emoji: '⬟' },
      { type: 'parallelogram', icon: Square, label: 'Parallelogram', emoji: '▱' },
    ]
  },
  {
    name: 'Arrows & Connectors',
    icon: ArrowRight,
    shapes: [
      { type: 'arrow-up', icon: ArrowUp, label: 'Arrow Up', emoji: '↑' },
      { type: 'arrow-down', icon: ArrowDown, label: 'Arrow Down', emoji: '↓' },
      { type: 'arrow-left', icon: ArrowLeft, label: 'Arrow Left', emoji: '←' },
      { type: 'arrow-right', icon: ArrowRight, label: 'Arrow Right', emoji: '→' },
    ]
  },
  {
    name: 'Mind Map',
    icon: GitBranch,
    shapes: [
      { type: 'mindmap-node', icon: GitBranch, label: 'Mind Map Node', emoji: '🧠' },
      { type: 'central-topic', icon: Circle, label: 'Central Topic', emoji: '🎯' },
      { type: 'branch-topic', icon: Square, label: 'Branch Topic', emoji: '🌿' },
    ]
  },
  {
    name: 'Text & Media',
    icon: Type,
    shapes: [
      { type: 'text', icon: Type, label: 'Text', emoji: '📝' },
      { type: 'image', icon: Image, label: 'Image', emoji: '🖼️' },
      { type: 'note', icon: FileText, label: 'Note', emoji: '📄' },
    ]
  }
];

interface ShapeItemProps {
  shape: any;
  collapsed: boolean;
  searchTerm: string;
}

const ShapeItem: React.FC<ShapeItemProps> = ({ shape, collapsed, searchTerm }) => {
  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  const Icon = shape.icon;
  
  // Filter based on search
  if (searchTerm && !shape.label.toLowerCase().includes(searchTerm.toLowerCase())) {
    return null;
  }

  return (
    <div
      className={`
        group flex items-center p-2 rounded-lg cursor-grab active:cursor-grabbing
        hover:bg-accent transition-all duration-200 border border-transparent
        hover:border-border hover:shadow-sm hover:scale-105
        ${collapsed ? 'justify-center min-h-[40px]' : 'justify-start space-x-3'}
      `}
      draggable
      onDragStart={(event) => onDragStart(event, shape.type)}
      title={shape.label}
    >
      <div className="flex items-center justify-center w-8 h-8 bg-secondary rounded-md group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
        {shape.emoji ? (
          <span className="text-lg">{shape.emoji}</span>
        ) : (
          <Icon className="w-4 h-4" />
        )}
      </div>
      {!collapsed && (
        <div className="flex-1 min-w-0">
          <span className="text-sm font-medium text-foreground truncate block">{shape.label}</span>
        </div>
      )}
    </div>
  );
};

interface ShapeGroupProps {
  group: any;
  collapsed: boolean;
  searchTerm: string;
}

const ShapeGroup: React.FC<ShapeGroupProps> = ({ group, collapsed, searchTerm }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  // Filter shapes based on search
  const filteredShapes = searchTerm 
    ? group.shapes.filter((shape: any) => 
        shape.label.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : group.shapes;

  if (searchTerm && filteredShapes.length === 0) {
    return null;
  }

  if (collapsed) {
    return (
      <div className="space-y-1">
        {filteredShapes.map((shape: any) => (
          <ShapeItem key={shape.type} shape={shape} collapsed={true} searchTerm={searchTerm} />
        ))}
      </div>
    );
  }

  const GroupIcon = group.icon;

  return (
    <div className="space-y-2">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center w-full p-2 text-left rounded-lg hover:bg-accent transition-colors group"
      >
        <div className="flex items-center flex-1 space-x-2">
          <GroupIcon className="w-4 h-4 text-muted-foreground group-hover:text-foreground" />
          <span className="text-sm font-semibold text-foreground">{group.name}</span>
          <span className="text-xs text-muted-foreground">({filteredShapes.length})</span>
        </div>
        {isExpanded ? (
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        ) : (
          <ChevronRight className="w-4 h-4 text-muted-foreground" />
        )}
      </button>
      
      {isExpanded && (
        <div className="space-y-1 ml-2 pl-4 border-l border-border/50">
          {filteredShapes.map((shape: any) => (
            <ShapeItem key={shape.type} shape={shape} collapsed={false} searchTerm={searchTerm} />
          ))}
        </div>
      )}
    </div>
  );
};

export const Sidebar: React.FC = () => {
  const { sidebarCollapsed } = useAppStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'shapes' | 'colors'>('shapes');

  const colorPalette = [
    // Primary colors
    { color: '#ef4444', name: 'Red' },
    { color: '#f97316', name: 'Orange' },
    { color: '#eab308', name: 'Yellow' },
    { color: '#22c55e', name: 'Green' },
    { color: '#06b6d4', name: 'Cyan' },
    { color: '#3b82f6', name: 'Blue' },
    { color: '#8b5cf6', name: 'Purple' },
    { color: '#ec4899', name: 'Pink' },
    // Neutral colors
    { color: '#6b7280', name: 'Gray' },
    { color: '#1f2937', name: 'Dark Gray' },
    { color: '#ffffff', name: 'White' },
    { color: '#000000', name: 'Black' },
    // Professional colors
    { color: '#059669', name: 'Emerald' },
    { color: '#dc2626', name: 'Red 600' },
    { color: '#7c3aed', name: 'Violet' },
    { color: '#0891b2', name: 'Sky' },
  ];

  return (
    <div className={`
      h-full bg-card border-r border-border flex flex-col overflow-hidden
      ${sidebarCollapsed ? 'w-16' : 'w-full'}
      transition-all duration-300
    `}>
      {/* Header */}
      <div className="p-4 border-b border-border flex-shrink-0">
        {!sidebarCollapsed ? (
          <div className="space-y-3">
            <h2 className="text-lg font-bold text-foreground flex items-center space-x-2">
              <Layers className="w-5 h-5 text-blue-500" />
              <span>Shape Library</span>
            </h2>
            
            {/* Tab Navigation */}
            <div className="flex space-x-1 bg-secondary rounded-lg p-1">
              <button
                onClick={() => setActiveTab('shapes')}
                className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeTab === 'shapes' 
                    ? 'bg-primary text-primary-foreground shadow-sm' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Shapes
              </button>
              <button
                onClick={() => setActiveTab('colors')}
                className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeTab === 'colors' 
                    ? 'bg-primary text-primary-foreground shadow-sm' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Colors
              </button>
            </div>

            {/* Search Bar - only for shapes tab */}
            {activeTab === 'shapes' && (
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search shapes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-sm bg-secondary border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary placeholder-muted-foreground"
                />
              </div>
            )}
          </div>
        ) : (
          <div className="flex justify-center">
            <Layers className="w-6 h-6 text-muted-foreground" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden flex flex-col">
        {activeTab === 'shapes' ? (
          <>
            {/* Shape Groups */}
            <div className="flex-1 overflow-y-auto p-3 space-y-4">
              {SHAPE_GROUPS.map((group) => (
                <ShapeGroup 
                  key={group.name} 
                  group={group} 
                  collapsed={sidebarCollapsed}
                  searchTerm={searchTerm}
                />
              ))}
            </div>

            {/* Quick Actions */}
            {!sidebarCollapsed && (
              <div className="p-4 border-t border-border flex-shrink-0">
                <div className="space-y-2">
                  <h3 className="text-sm font-semibold text-foreground">Quick Actions</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <button className="p-2 text-xs bg-secondary hover:bg-accent rounded-lg transition-colors">
                      Clear All
                    </button>
                    <button className="p-2 text-xs bg-secondary hover:bg-accent rounded-lg transition-colors">
                      Auto Layout
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
          /* Color Palette */
          <div className="flex-1 overflow-y-auto p-4">
            {!sidebarCollapsed ? (
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-3">Color Palette</h3>
                  <div className="grid grid-cols-4 gap-3">
                    {colorPalette.map((item) => (
                      <div
                        key={item.color}
                        className="group flex flex-col items-center space-y-1 cursor-pointer"
                        title={item.name}
                      >
                        <div
                          className="w-8 h-8 rounded-lg border-2 border-border hover:border-primary hover:scale-110 transition-all duration-200 shadow-sm group-hover:shadow-md"
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="text-xs text-muted-foreground group-hover:text-foreground truncate">
                          {item.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-3">Gradients</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      'linear-gradient(45deg, #3b82f6, #8b5cf6)',
                      'linear-gradient(45deg, #ef4444, #f97316)',
                      'linear-gradient(45deg, #22c55e, #06b6d4)',
                      'linear-gradient(45deg, #8b5cf6, #ec4899)',
                    ].map((gradient, index) => (
                      <div
                        key={index}
                        className="h-8 rounded-lg border-2 border-border hover:border-primary hover:scale-105 transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md"
                        style={{ background: gradient }}
                        title={`Gradient ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex justify-center">
                <Palette className="w-6 h-6 text-muted-foreground" />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};