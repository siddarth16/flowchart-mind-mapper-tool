import { CustomNode, CustomEdge, ShapeType } from '../types';

// Generate unique ID
export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

// Create a new node with default properties
export const createNode = (
  type: ShapeType,
  position: { x: number; y: number },
  label = 'New Node'
): CustomNode => {
  const shapeDefaults: Record<ShapeType, Partial<CustomNode['data']>> = {
    rectangle: { color: '#3b82f6', borderColor: '#1e40af', textColor: '#ffffff' },
    circle: { color: '#10b981', borderColor: '#059669', textColor: '#ffffff' },
    diamond: { color: '#f59e0b', borderColor: '#d97706', textColor: '#ffffff' },
    triangle: { color: '#ef4444', borderColor: '#dc2626', textColor: '#ffffff' },
    star: { color: '#8b5cf6', borderColor: '#7c3aed', textColor: '#ffffff' },
    hexagon: { color: '#06b6d4', borderColor: '#0891b2', textColor: '#ffffff' },
    heart: { color: '#ec4899', borderColor: '#db2777', textColor: '#ffffff' },
    'arrow-up': { color: '#6b7280', borderColor: '#4b5563', textColor: '#ffffff' },
    'arrow-down': { color: '#6b7280', borderColor: '#4b5563', textColor: '#ffffff' },
    'arrow-left': { color: '#6b7280', borderColor: '#4b5563', textColor: '#ffffff' },
    'arrow-right': { color: '#6b7280', borderColor: '#4b5563', textColor: '#ffffff' },
    text: { color: 'transparent', borderColor: 'transparent', textColor: '#000000' },
    image: { color: '#f3f4f6', borderColor: '#d1d5db', textColor: '#000000' },
    'mindmap-node': { color: '#fbbf24', borderColor: '#f59e0b', textColor: '#000000' },
  };

  const defaults = shapeDefaults[type] || shapeDefaults.rectangle;

  return {
    id: generateId(),
    type: 'custom',
    position,
    data: {
      label,
      shape: type,
      ...defaults,
    },
  };
};

// Create a new edge with default properties
export const createEdge = (
  source: string,
  target: string,
  label?: string
): CustomEdge => {
  return {
    id: `edge-${source}-${target}`,
    source,
    target,
    type: 'custom',
    data: {
      label,
      color: '#6b7280',
      strokeWidth: 2,
      strokeType: 'solid',
    },
  };
};

// Color utilities
export const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
};

export const rgbToHex = (r: number, g: number, b: number): string => {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
};

// Get contrasting text color
export const getContrastingColor = (backgroundColor: string): string => {
  const rgb = hexToRgb(backgroundColor);
  if (!rgb) return '#000000';
  
  const brightness = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
  return brightness > 128 ? '#000000' : '#ffffff';
};

// Format date
export const formatDate = (date: Date): string => {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

// Download file
export const downloadFile = (content: string, filename: string, contentType: string): void => {
  const blob = new Blob([content], { type: contentType });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};

// Deep clone object
export const deepClone = <T>(obj: T): T => {
  if (obj === null || typeof obj !== 'object') return obj;
  if (obj instanceof Date) return new Date(obj.getTime()) as unknown as T;
  if (obj instanceof Array) return obj.map(item => deepClone(item)) as unknown as T;
  if (typeof obj === 'object') {
    const clonedObj = {} as T;
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        clonedObj[key] = deepClone(obj[key]);
      }
    }
    return clonedObj;
  }
  return obj;
};

// Debounce function
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout | null = null;
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// Throttle function
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// Calculate distance between two points
export const calculateDistance = (
  point1: { x: number; y: number },
  point2: { x: number; y: number }
): number => {
  const dx = point2.x - point1.x;
  const dy = point2.y - point1.y;
  return Math.sqrt(dx * dx + dy * dy);
};

// Check if point is inside rectangle
export const isPointInRectangle = (
  point: { x: number; y: number },
  rect: { x: number; y: number; width: number; height: number }
): boolean => {
  return point.x >= rect.x && 
         point.x <= rect.x + rect.width &&
         point.y >= rect.y && 
         point.y <= rect.y + rect.height;
};

// Generate random color
export const generateRandomColor = (): string => {
  const colors = [
    '#ef4444', '#f97316', '#eab308', '#22c55e', 
    '#06b6d4', '#3b82f6', '#8b5cf6', '#ec4899'
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

// Validate email
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Local storage helpers
export const storage = {
  get: <T>(key: string): T | null => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch {
      return null;
    }
  },
  set: <T>(key: string, value: T): void => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Handle storage errors silently
    }
  },
  remove: (key: string): void => {
    try {
      localStorage.removeItem(key);
    } catch {
      // Handle storage errors silently
    }
  },
  clear: (): void => {
    try {
      localStorage.clear();
    } catch {
      // Handle storage errors silently
    }
  }
};

// Keyboard shortcuts helper
export const isKeyboardShortcut = (
  event: KeyboardEvent,
  shortcut: { key: string; ctrlKey?: boolean; shiftKey?: boolean; altKey?: boolean }
): boolean => {
  return event.key === shortcut.key &&
         event.ctrlKey === (shortcut.ctrlKey || false) &&
         event.shiftKey === (shortcut.shiftKey || false) &&
         event.altKey === (shortcut.altKey || false);
};

// Performance monitoring
export const performance = {
  measure: (name: string, fn: () => void): number => {
    const start = Date.now();
    fn();
    const end = Date.now();
    const duration = end - start;
    console.log(`${name}: ${duration}ms`);
    return duration;
  },
  
  measureAsync: async (name: string, fn: () => Promise<void>): Promise<number> => {
    const start = Date.now();
    await fn();
    const end = Date.now();
    const duration = end - start;
    console.log(`${name}: ${duration}ms`);
    return duration;
  }
};

// Error handling
export const handleError = (error: Error, context?: string): void => {
  console.error(`Error${context ? ` in ${context}` : ''}:`, error);
  // Here you could send to error tracking service
};

// Canvas utilities
export const canvas = {
  // Convert canvas coordinates to screen coordinates
  canvasToScreen: (
    canvasPoint: { x: number; y: number },
    viewport: { x: number; y: number; zoom: number }
  ): { x: number; y: number } => {
    return {
      x: canvasPoint.x * viewport.zoom + viewport.x,
      y: canvasPoint.y * viewport.zoom + viewport.y,
    };
  },

  // Convert screen coordinates to canvas coordinates
  screenToCanvas: (
    screenPoint: { x: number; y: number },
    viewport: { x: number; y: number; zoom: number }
  ): { x: number; y: number } => {
    return {
      x: (screenPoint.x - viewport.x) / viewport.zoom,
      y: (screenPoint.y - viewport.y) / viewport.zoom,
    };
  },

  // Snap point to grid
  snapToGrid: (point: { x: number; y: number }, gridSize: number): { x: number; y: number } => {
    return {
      x: Math.round(point.x / gridSize) * gridSize,
      y: Math.round(point.y / gridSize) * gridSize,
    };
  },

  // Get bounding box of multiple nodes
  getBoundingBox: (nodes: CustomNode[]): { x: number; y: number; width: number; height: number } => {
    if (nodes.length === 0) return { x: 0, y: 0, width: 0, height: 0 };

    const positions = nodes.map(node => ({
      x: node.position.x,
      y: node.position.y,
      width: node.data.width || 100,
      height: node.data.height || 40,
    }));

    const minX = Math.min(...positions.map(p => p.x));
    const minY = Math.min(...positions.map(p => p.y));
    const maxX = Math.max(...positions.map(p => p.x + p.width));
    const maxY = Math.max(...positions.map(p => p.y + p.height));

    return {
      x: minX,
      y: minY,
      width: maxX - minX,
      height: maxY - minY,
    };
  },
}; 