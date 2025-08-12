import { Node, Edge } from 'reactflow';

// Shape types
export type ShapeType = 
  | 'rectangle' 
  | 'circle' 
  | 'diamond' 
  | 'triangle' 
  | 'star' 
  | 'hexagon' 
  | 'heart'
  | 'arrow-up'
  | 'arrow-down'
  | 'arrow-left'
  | 'arrow-right'
  | 'text'
  | 'image'
  | 'mindmap-node';

// Node data interface
export interface NodeData {
  label: string;
  shape: ShapeType;
  color: string;
  borderColor: string;
  textColor: string;
  fontSize?: number;
  fontWeight?: 'normal' | 'bold';
  width?: number;
  height?: number;
  borderWidth?: number;
  borderRadius?: number;
  opacity?: number;
  rotation?: number;
  locked?: boolean;
  layer?: number;
}

// Edge data interface
export interface EdgeData {
  label?: string;
  color?: string;
  strokeWidth?: number;
  strokeType?: 'solid' | 'dashed' | 'dotted';
  animated?: boolean;
  markerStart?: string;
  markerEnd?: string;
  locked?: boolean;
  layer?: number;
}

// Custom node and edge types
export type CustomNode = Node<NodeData>;
export type CustomEdge = Edge<EdgeData>;

// Template interface
export interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  thumbnail?: string;
  nodes: CustomNode[];
  edges: CustomEdge[];
  viewport?: {
    x: number;
    y: number;
    zoom: number;
  };
}

// Document interface
export interface Document {
  id: string;
  name: string;
  type: 'flowchart' | 'mindmap';
  createdAt: Date;
  lastModified: Date;
  nodes: CustomNode[];
  edges: CustomEdge[];
  viewport?: {
    x: number;
    y: number;
    zoom: number;
  };
  settings?: {
    snapToGrid: boolean;
    gridSize: number;
    showGrid: boolean;
    showMiniMap: boolean;
    autoSave: boolean;
  };
}

// Tool types
export type Tool = 
  | 'select' 
  | 'rectangle' 
  | 'circle' 
  | 'diamond' 
  | 'text' 
  | 'arrow' 
  | 'line' 
  | 'mindmap'
  | 'pan'
  | 'zoom';

// Export formats
export type ExportFormat = 'pdf' | 'png' | 'svg' | 'json';

// Theme interface
export interface Theme {
  name: string;
  colors: {
    background: string;
    foreground: string;
    primary: string;
    secondary: string;
    accent: string;
    muted: string;
    border: string;
    canvas: string;
    node: string;
    edge: string;
    glow: {
      blue: string;
      purple: string;
      green: string;
      orange: string;
    };
  };
}

// Shape library item
export interface ShapeLibraryItem {
  type: ShapeType;
  label: string;
  icon: React.ComponentType<any>;
  category: string;
  defaultData: Partial<NodeData>;
}

// Property panel section
export interface PropertySection {
  id: string;
  title: string;
  icon: React.ComponentType<any>;
  component: React.ComponentType<any>;
  isCollapsed?: boolean;
}

// Keyboard shortcut
export interface KeyboardShortcut {
  key: string;
  ctrlKey?: boolean;
  shiftKey?: boolean;
  altKey?: boolean;
  description: string;
  action: () => void;
}

// History state for undo/redo
export interface HistoryState {
  nodes: CustomNode[];
  edges: CustomEdge[];
  timestamp: number;
}

// Canvas settings
export interface CanvasSettings {
  snapToGrid: boolean;
  gridSize: number;
  showGrid: boolean;
  showMiniMap: boolean;
  showControls: boolean;
  panOnDrag: boolean;
  zoomOnDoubleClick: boolean;
  zoomOnScroll: boolean;
  selectNodesOnDrag: boolean;
  multiSelectionKeyCode: string;
  deleteKeyCode: string;
}

// AI features
export interface AIFeature {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<any>;
  action: (context: any) => Promise<void>;
  enabled: boolean;
}

// Collaboration types
export interface CollaborationUser {
  id: string;
  name: string;
  avatar?: string;
  color: string;
  cursor?: {
    x: number;
    y: number;
  };
  selection?: {
    nodes: string[];
    edges: string[];
  };
}

// Error types
export interface AppError {
  id: string;
  message: string;
  type: 'error' | 'warning' | 'info';
  timestamp: Date;
  dismissible: boolean;
}

// Performance metrics
export interface PerformanceMetrics {
  renderTime: number;
  nodeCount: number;
  edgeCount: number;
  memoryUsage: number;
  frameRate: number;
}

// Export types for external use
export * from 'reactflow'; 