import React, { useState } from 'react';
import { 
  Settings, 
  Palette, 
  Type, 
  MousePointer, 
  Move, 
  RotateCw,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  Trash2,
  Copy,
  Layers,
  ChevronDown,
  ChevronRight,
  Brush,
  Square,
  Circle,
  Triangle,
  Diamond,
  Star,
  Hexagon,
  Minus,
  Plus,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Bold,
  Italic,
  Underline
} from 'lucide-react';
import { useAppStore } from '../stores/useAppStore';

interface PropertyPanelProps {}

const ColorPicker: React.FC<{
  label: string;
  value: string;
  onChange: (value: string) => void;
}> = ({ label, value, onChange }) => {
  const [showPalette, setShowPalette] = useState(false);
  
  const colors = [
    '#ef4444', '#f97316', '#eab308', '#22c55e', '#06b6d4', '#3b82f6', '#8b5cf6', '#ec4899',
    '#dc2626', '#ea580c', '#ca8a04', '#16a34a', '#0891b2', '#2563eb', '#7c3aed', '#c2185b',
    '#991b1b', '#c2410c', '#a16207', '#15803d', '#0e7490', '#1d4ed8', '#6d28d9', '#9d174d',
    '#6b7280', '#374151', '#1f2937', '#111827', '#ffffff', '#f9fafb', '#f3f4f6', '#e5e7eb'
  ];

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-foreground">{label}</label>
      <div className="relative">
        <button
          onClick={() => setShowPalette(!showPalette)}
          className="flex items-center space-x-2 w-full p-2 bg-secondary rounded-lg border border-border hover:border-primary transition-colors"
        >
          <div 
            className="w-5 h-5 rounded border border-border"
            style={{ backgroundColor: value }}
          />
          <span className="text-sm text-muted-foreground flex-1 text-left">{value}</span>
        </button>
        
        {showPalette && (
          <div className="absolute top-full left-0 mt-1 p-3 bg-card border border-border rounded-lg shadow-lg z-50 w-full">
            <div className="grid grid-cols-8 gap-1 mb-3">
              {colors.map((color) => (
                <button
                  key={color}
                  onClick={() => {
                    onChange(color);
                    setShowPalette(false);
                  }}
                  className="w-6 h-6 rounded border border-border hover:scale-110 transition-transform"
                  style={{ backgroundColor: color }}
                  title={color}
                />
              ))}
            </div>
            <input
              type="color"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              className="w-full h-8 rounded border border-border cursor-pointer"
            />
          </div>
        )}
      </div>
    </div>
  );
};

const SliderInput: React.FC<{
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  onChange: (value: number) => void;
}> = ({ label, value, min, max, step = 1, unit = '', onChange }) => {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <label className="text-sm font-medium text-foreground">{label}</label>
        <span className="text-sm text-muted-foreground">{value}{unit}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer slider"
      />
    </div>
  );
};

const SelectInput: React.FC<{
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
}> = ({ label, value, options, onChange }) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-foreground">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-2 bg-secondary border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

const CollapsibleSection: React.FC<{
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
  defaultOpen?: boolean;
}> = ({ title, icon: Icon, children, defaultOpen = true }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border border-border rounded-lg overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center space-x-2 p-3 bg-secondary hover:bg-accent transition-colors text-left"
      >
        <Icon className="w-4 h-4 text-muted-foreground" />
        <span className="font-medium text-foreground flex-1">{title}</span>
        {isOpen ? (
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        ) : (
          <ChevronRight className="w-4 h-4 text-muted-foreground" />
        )}
      </button>
      {isOpen && (
        <div className="p-3 bg-card border-t border-border">
          <div className="space-y-4">
            {children}
          </div>
        </div>
      )}
    </div>
  );
};

export const PropertyPanel: React.FC<PropertyPanelProps> = () => {
  const { selectedNodes, selectedEdges } = useAppStore();
  
  // Mock data for demonstration - in real app, this would come from React Flow
  const selectedNode = selectedNodes.length > 0 ? {
    id: selectedNodes[0],
    label: 'Selected Node',
    shape: 'rectangle',
    color: '#3b82f6',
    borderColor: '#1e40af',
    textColor: '#ffffff',
    fontSize: '14px',
    fontWeight: '500',
    opacity: 1,
    rotation: 0,
    width: 120,
    height: 60
  } : null;

  const selectedEdge = selectedEdges.length > 0 ? {
    id: selectedEdges[0],
    strokeColor: '#6366f1',
    strokeWidth: 2,
    strokeStyle: 'solid',
    animated: false,
    label: '',
    markerStart: 'none',
    markerEnd: 'arrow'
  } : null;

  const shapeOptions = [
    { value: 'rectangle', label: 'Rectangle' },
    { value: 'circle', label: 'Circle' },
    { value: 'diamond', label: 'Diamond' },
    { value: 'triangle', label: 'Triangle' },
    { value: 'hexagon', label: 'Hexagon' },
    { value: 'star', label: 'Star' },
    { value: 'parallelogram', label: 'Parallelogram' },
    { value: 'cloud', label: 'Cloud' },
    { value: 'database', label: 'Database' },
    { value: 'document', label: 'Document' },
  ];

  const fontFamilies = [
    { value: 'Inter', label: 'Inter' },
    { value: 'Arial', label: 'Arial' },
    { value: 'Helvetica', label: 'Helvetica' },
    { value: 'Georgia', label: 'Georgia' },
    { value: 'Times New Roman', label: 'Times New Roman' },
    { value: 'Courier New', label: 'Courier New' },
  ];

  const strokeStyles = [
    { value: 'solid', label: 'Solid' },
    { value: 'dashed', label: 'Dashed' },
    { value: 'dotted', label: 'Dotted' },
  ];

  const markerOptions = [
    { value: 'none', label: 'None' },
    { value: 'arrow', label: 'Arrow' },
    { value: 'circle', label: 'Circle' },
    { value: 'square', label: 'Square' },
  ];

  if (!selectedNode && !selectedEdge) {
    return (
      <div className="h-full bg-card border-l border-border flex flex-col">
        <div className="p-4 border-b border-border">
          <h2 className="text-lg font-bold text-foreground flex items-center space-x-2">
            <Settings className="w-5 h-5 text-blue-500" />
            <span>Properties</span>
          </h2>
        </div>
        
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="text-center space-y-3">
            <MousePointer className="w-12 h-12 text-muted-foreground mx-auto" />
            <p className="text-sm text-muted-foreground">
              Select a node or edge to view properties
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full bg-card border-l border-border flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <h2 className="text-lg font-bold text-foreground flex items-center space-x-2">
          <Settings className="w-5 h-5 text-blue-500" />
          <span>Properties</span>
        </h2>
        {selectedNode && (
          <p className="text-sm text-muted-foreground mt-1">
            Node: {selectedNode.id}
          </p>
        )}
        {selectedEdge && (
          <p className="text-sm text-muted-foreground mt-1">
            Edge: {selectedEdge.id}
          </p>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {selectedNode && (
          <>
            {/* Shape & Layout */}
            <CollapsibleSection title="Shape & Layout" icon={Square}>
              <SelectInput
                label="Shape"
                value={selectedNode.shape}
                options={shapeOptions}
                onChange={() => {}} // TODO: Implement
              />
              
              <div className="grid grid-cols-2 gap-3">
                <SliderInput
                  label="Width"
                  value={selectedNode.width}
                  min={50}
                  max={300}
                  unit="px"
                  onChange={() => {}} // TODO: Implement
                />
                <SliderInput
                  label="Height"
                  value={selectedNode.height}
                  min={30}
                  max={200}
                  unit="px"
                  onChange={() => {}} // TODO: Implement
                />
              </div>

              <SliderInput
                label="Rotation"
                value={selectedNode.rotation}
                min={0}
                max={360}
                unit="°"
                onChange={() => {}} // TODO: Implement
              />
            </CollapsibleSection>

            {/* Appearance */}
            <CollapsibleSection title="Appearance" icon={Palette}>
              <ColorPicker
                label="Fill Color"
                value={selectedNode.color}
                onChange={() => {}} // TODO: Implement
              />
              
              <ColorPicker
                label="Border Color"
                value={selectedNode.borderColor}
                onChange={() => {}} // TODO: Implement
              />

              <SliderInput
                label="Opacity"
                value={selectedNode.opacity}
                min={0}
                max={1}
                step={0.1}
                onChange={() => {}} // TODO: Implement
              />
            </CollapsibleSection>

            {/* Typography */}
            <CollapsibleSection title="Typography" icon={Type}>
              <ColorPicker
                label="Text Color"
                value={selectedNode.textColor}
                onChange={() => {}} // TODO: Implement
              />

              <SelectInput
                label="Font Family"
                value="Inter"
                options={fontFamilies}
                onChange={() => {}} // TODO: Implement
              />

              <SliderInput
                label="Font Size"
                value={parseInt(selectedNode.fontSize)}
                min={8}
                max={48}
                unit="px"
                onChange={() => {}} // TODO: Implement
              />

              <div className="flex space-x-2">
                <button className="flex-1 p-2 bg-secondary hover:bg-accent rounded-lg transition-colors">
                  <Bold className="w-4 h-4 mx-auto" />
                </button>
                <button className="flex-1 p-2 bg-secondary hover:bg-accent rounded-lg transition-colors">
                  <Italic className="w-4 h-4 mx-auto" />
                </button>
                <button className="flex-1 p-2 bg-secondary hover:bg-accent rounded-lg transition-colors">
                  <Underline className="w-4 h-4 mx-auto" />
                </button>
              </div>

              <div className="flex space-x-2">
                <button className="flex-1 p-2 bg-secondary hover:bg-accent rounded-lg transition-colors">
                  <AlignLeft className="w-4 h-4 mx-auto" />
                </button>
                <button className="flex-1 p-2 bg-secondary hover:bg-accent rounded-lg transition-colors">
                  <AlignCenter className="w-4 h-4 mx-auto" />
                </button>
                <button className="flex-1 p-2 bg-secondary hover:bg-accent rounded-lg transition-colors">
                  <AlignRight className="w-4 h-4 mx-auto" />
                </button>
              </div>
            </CollapsibleSection>

            {/* Actions */}
            <CollapsibleSection title="Actions" icon={Move}>
              <div className="grid grid-cols-2 gap-2">
                <button className="flex items-center space-x-2 p-2 bg-secondary hover:bg-accent rounded-lg transition-colors">
                  <Eye className="w-4 h-4" />
                  <span className="text-sm">Visible</span>
                </button>
                <button className="flex items-center space-x-2 p-2 bg-secondary hover:bg-accent rounded-lg transition-colors">
                  <Unlock className="w-4 h-4" />
                  <span className="text-sm">Unlocked</span>
                </button>
                <button className="flex items-center space-x-2 p-2 bg-secondary hover:bg-accent rounded-lg transition-colors">
                  <Copy className="w-4 h-4" />
                  <span className="text-sm">Duplicate</span>
                </button>
                <button className="flex items-center space-x-2 p-2 bg-destructive text-destructive-foreground hover:bg-destructive/90 rounded-lg transition-colors">
                  <Trash2 className="w-4 h-4" />
                  <span className="text-sm">Delete</span>
                </button>
              </div>
            </CollapsibleSection>
          </>
        )}

        {selectedEdge && (
          <>
            {/* Edge Style */}
            <CollapsibleSection title="Edge Style" icon={Minus}>
              <ColorPicker
                label="Stroke Color"
                value={selectedEdge.strokeColor}
                onChange={() => {}} // TODO: Implement
              />

              <SliderInput
                label="Stroke Width"
                value={selectedEdge.strokeWidth}
                min={1}
                max={10}
                unit="px"
                onChange={() => {}} // TODO: Implement
              />

              <SelectInput
                label="Stroke Style"
                value={selectedEdge.strokeStyle}
                options={strokeStyles}
                onChange={() => {}} // TODO: Implement
              />

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="animated"
                  checked={selectedEdge.animated}
                  onChange={() => {}} // TODO: Implement
                  className="rounded border-border"
                />
                <label htmlFor="animated" className="text-sm text-foreground">
                  Animated
                </label>
              </div>
            </CollapsibleSection>

            {/* Markers */}
            <CollapsibleSection title="Markers" icon={Triangle}>
              <SelectInput
                label="Start Marker"
                value={selectedEdge.markerStart}
                options={markerOptions}
                onChange={() => {}} // TODO: Implement
              />

              <SelectInput
                label="End Marker"
                value={selectedEdge.markerEnd}
                options={markerOptions}
                onChange={() => {}} // TODO: Implement
              />
            </CollapsibleSection>

            {/* Edge Actions */}
            <CollapsibleSection title="Actions" icon={Move}>
              <div className="grid grid-cols-2 gap-2">
                <button className="flex items-center space-x-2 p-2 bg-secondary hover:bg-accent rounded-lg transition-colors">
                  <Copy className="w-4 h-4" />
                  <span className="text-sm">Duplicate</span>
                </button>
                <button className="flex items-center space-x-2 p-2 bg-destructive text-destructive-foreground hover:bg-destructive/90 rounded-lg transition-colors">
                  <Trash2 className="w-4 h-4" />
                  <span className="text-sm">Delete</span>
                </button>
              </div>
            </CollapsibleSection>
          </>
        )}

        {/* Layer Management */}
        <CollapsibleSection title="Layers" icon={Layers}>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-2 bg-secondary rounded-lg">
              <span className="text-sm text-foreground">Layer 1</span>
              <div className="flex space-x-1">
                <button className="p-1 hover:bg-accent rounded">
                  <Eye className="w-3 h-3" />
                </button>
                <button className="p-1 hover:bg-accent rounded">
                  <Lock className="w-3 h-3" />
                </button>
              </div>
            </div>
            
            <div className="flex space-x-2">
              <button className="flex items-center space-x-1 px-3 py-1 bg-primary text-primary-foreground rounded text-xs">
                <Plus className="w-3 h-3" />
                <span>Add Layer</span>
              </button>
            </div>
          </div>
        </CollapsibleSection>
      </div>
    </div>
  );
};