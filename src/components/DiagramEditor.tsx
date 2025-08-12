import React, { useCallback, useRef, useState, useMemo } from 'react';
import ReactFlow, {
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  MiniMap,
  Background,
  BackgroundVariant,
  Connection,
  Edge,
  Node,
  ReactFlowInstance,
  MarkerType,
  useReactFlow,
  getRectOfNodes,
  getTransformForBounds
} from 'reactflow';

import { useAppStore } from '../stores/useAppStore';
import { CustomNode } from './nodes/CustomNode';
import { CustomEdge } from './edges/CustomEdge';

const nodeTypes = {
  custom: CustomNode,
};

const edgeTypes = {
  custom: CustomEdge,
};

// Professional shape library with comprehensive coverage
const SHAPE_LIBRARY: Record<string, Record<string, { icon: string; label: string; color: string; category: string }>> = {
  'Basic Flowchart': {
    'process': { icon: '⬜', label: 'Process', color: '#3b82f6', category: 'flowchart' },
    'decision': { icon: '⬦', label: 'Decision', color: '#f59e0b', category: 'flowchart' },
    'terminator': { icon: '⬭', label: 'Start/End', color: '#10b981', category: 'flowchart' },
    'data': { icon: '⬢', label: 'Data', color: '#8b5cf6', category: 'flowchart' },
    'document': { icon: '📄', label: 'Document', color: '#06b6d4', category: 'flowchart' },
    'delay': { icon: '⏳', label: 'Delay', color: '#f97316', category: 'flowchart' },
    'database': { icon: '🗄️', label: 'Database', color: '#84cc16', category: 'flowchart' },
    'cloud': { icon: '☁️', label: 'Cloud', color: '#06b6d4', category: 'flowchart' },
  },
  'UML Shapes': {
    'class': { icon: '🏛️', label: 'Class', color: '#ef4444', category: 'uml' },
    'interface': { icon: '🔌', label: 'Interface', color: '#ec4899', category: 'uml' },
    'actor': { icon: '🎭', label: 'Actor', color: '#14b8a6', category: 'uml' },
    'usecase': { icon: '⭕', label: 'Use Case', color: '#f59e0b', category: 'uml' },
    'package': { icon: '📦', label: 'Package', color: '#8b5cf6', category: 'uml' },
    'component': { icon: '🧩', label: 'Component', color: '#06b6d4', category: 'uml' },
  },
  'Network/System': {
    'server': { icon: '🖥️', label: 'Server', color: '#374151', category: 'network' },
    'router': { icon: '📡', label: 'Router', color: '#4338ca', category: 'network' },
    'switch': { icon: '🔀', label: 'Switch', color: '#059669', category: 'network' },
    'firewall': { icon: '🛡️', label: 'Firewall', color: '#dc2626', category: 'network' },
    'laptop': { icon: '💻', label: 'Laptop', color: '#6b7280', category: 'network' },
    'mobile': { icon: '📱', label: 'Mobile', color: '#7c3aed', category: 'network' },
  },
  'Business Process': {
    'event': { icon: '⚡', label: 'Event', color: '#eab308', category: 'bpmn' },
    'gateway': { icon: '◆', label: 'Gateway', color: '#f97316', category: 'bpmn' },
    'task': { icon: '📋', label: 'Task', color: '#3b82f6', category: 'bpmn' },
    'subprocess': { icon: '🔄', label: 'Subprocess', color: '#06b6d4', category: 'bpmn' },
    'annotation': { icon: '📝', label: 'Annotation', color: '#64748b', category: 'bpmn' },
  },
  'Geometric': {
    'rectangle': { icon: '▭', label: 'Rectangle', color: '#3b82f6', category: 'geometric' },
    'circle': { icon: '●', label: 'Circle', color: '#10b981', category: 'geometric' },
    'triangle': { icon: '▲', label: 'Triangle', color: '#f59e0b', category: 'geometric' },
    'diamond': { icon: '◆', label: 'Diamond', color: '#ef4444', category: 'geometric' },
    'hexagon': { icon: '⬡', label: 'Hexagon', color: '#8b5cf6', category: 'geometric' },
    'star': { icon: '⭐', label: 'Star', color: '#f59e0b', category: 'geometric' },
    'pentagon': { icon: '⬟', label: 'Pentagon', color: '#06b6d4', category: 'geometric' },
    'parallelogram': { icon: '▱', label: 'Parallelogram', color: '#84cc16', category: 'geometric' },
  }
};

// Sample initial nodes for demonstration
const initialNodes: Node[] = [
  {
    id: '1',
    type: 'custom',
    position: { x: 100, y: 100 },
    data: {
      label: 'Start',
      shape: 'circle',
      color: '#10b981',
      borderColor: '#059669',
      textColor: '#ffffff',
    },
  },
  {
    id: '2',
    type: 'custom',
    position: { x: 300, y: 100 },
    data: {
      label: 'Process',
      shape: 'rectangle',
      color: '#3b82f6',
      borderColor: '#1e40af',
      textColor: '#ffffff',
    },
  },
];

const initialEdges: Edge[] = [
  {
    id: 'e1-2',
    source: '1',
    target: '2',
    type: 'custom',
    style: { stroke: '#6366f1', strokeWidth: 2 },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: '#6366f1',
    },
  },
];

export const DiagramEditor: React.FC = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null);
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const { getViewport } = useReactFlow();

  const { 
    currentTool, 
    setSelectedNodes, 
    setSelectedEdges,
    selectedNodes,
    selectedEdges 
  } = useAppStore();

  // Connection handling
  const onConnect = useCallback(
    (params: Connection) => {
      const newEdge: Edge = {
        ...params,
        id: `e${params.source}-${params.target}-${Date.now()}`,
        type: 'custom',
        style: { stroke: '#6366f1', strokeWidth: 2 },
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color: '#6366f1',
        },
      };
      setEdges((eds) => addEdge(newEdge, eds));
    },
    [setEdges]
  );

  // React Flow instance initialization
  const onInit = useCallback((instance: ReactFlowInstance) => {
    setReactFlowInstance(instance);
  }, []);

  // Selection handling
  const onSelectionChange = useCallback(
    ({ nodes: selectedNodes, edges: selectedEdges }: { nodes: Node[]; edges: Edge[] }) => {
      setSelectedNodes(selectedNodes.map((node) => node.id));
      setSelectedEdges(selectedEdges.map((edge) => edge.id));
    },
    [setSelectedNodes, setSelectedEdges]
  );

  // Drag and drop handling
  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current?.getBoundingClientRect();
      const type = event.dataTransfer.getData('application/reactflow');

      if (typeof type === 'undefined' || !type || !reactFlowInstance || !reactFlowBounds) {
        return;
      }

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      // Get shape configuration from library
      const shapeConfig = Object.values(SHAPE_LIBRARY)
        .flatMap(category => Object.entries(category))
        .find(([key]) => key === type)?.[1] || {
          color: '#6366f1',
          label: 'New Node',
        };

      const newNode: Node = {
        id: `node_${Date.now()}`,
        type: 'custom',
        position,
        data: {
          label: shapeConfig.label,
          shape: type === 'rectangle' ? 'rectangle' : 
                 type === 'circle' ? 'circle' : 
                 type === 'diamond' ? 'diamond' : 'rectangle',
          color: shapeConfig.color,
          borderColor: shapeConfig.color,
          textColor: '#ffffff',
        },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, setNodes]
  );

  // Node editing functionality
  const onLabelChange = useCallback((nodeId: string, newLabel: string) => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === nodeId) {
          return { ...node, data: { ...node.data, label: newLabel } };
        }
        return node;
      })
    );
  }, [setNodes]);

  // Apply label change callback to all nodes
  const enhancedNodes = useMemo(() => 
    nodes.map(node => ({
      ...node,
      data: {
        ...node.data,
        onLabelChange,
      }
    }))
  , [nodes, onLabelChange]);

  // Export functionality
  const exportDiagram = useCallback(async (format: 'png' | 'svg' | 'pdf' | 'json') => {
    if (!reactFlowInstance) return;

    switch (format) {
      case 'json': {
        const data = { nodes, edges, viewport: getViewport() };
        const dataStr = JSON.stringify(data, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', `diagram-${Date.now()}.json`);
        linkElement.click();
        break;
      }
      
      case 'png': {
        const nodesBounds = getRectOfNodes(nodes);
        const transform = getTransformForBounds(nodesBounds, 1024, 768, 0.5, 2);
        
        // Use html2canvas for high-quality PNG export
        const { default: html2canvas } = await import('html2canvas');
        const canvas = await html2canvas(reactFlowWrapper.current!, {
          backgroundColor: '#ffffff',
          width: 1024,
          height: 768,
          scale: 2,
        });
        
        const dataUrl = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = `diagram-${Date.now()}.png`;
        link.click();
        break;
      }
      
      case 'svg': {
        // Generate SVG representation
        const svgContent = `
          <svg width="1024" height="768" xmlns="http://www.w3.org/2000/svg">
            <rect width="100%" height="100%" fill="#ffffff"/>
            ${nodes.map(node => `
              <rect x="${node.position.x}" y="${node.position.y}" width="120" height="50" 
                    fill="${node.data.color}" stroke="${node.data.borderColor}" stroke-width="2" rx="8"/>
              <text x="${node.position.x + 60}" y="${node.position.y + 30}" text-anchor="middle" 
                    fill="${node.data.textColor || '#ffffff'}" font-size="14">${node.data.label}</text>
            `).join('')}
            ${edges.map(edge => {
              const sourceNode = nodes.find(n => n.id === edge.source);
              const targetNode = nodes.find(n => n.id === edge.target);
              if (sourceNode && targetNode) {
                return `<line x1="${sourceNode.position.x + 60}" y1="${sourceNode.position.y + 50}" 
                              x2="${targetNode.position.x + 60}" y2="${targetNode.position.y}" 
                              stroke="#6366f1" stroke-width="2" marker-end="url(#arrowhead)"/>`;
              }
              return '';
            }).join('')}
            <defs>
              <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#6366f1"/>
              </marker>
            </defs>
          </svg>
        `;
        
        const blob = new Blob([svgContent], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `diagram-${Date.now()}.svg`;
        link.click();
        URL.revokeObjectURL(url);
        break;
      }
      
      case 'pdf': {
        // Use jsPDF for PDF export
        const { default: html2canvas } = await import('html2canvas');
        const { default: jsPDF } = await import('jspdf');
        
        const canvas = await html2canvas(reactFlowWrapper.current!, {
          backgroundColor: '#ffffff',
          scale: 2,
        });
        
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({
          orientation: 'landscape',
          unit: 'mm',
          format: 'a4'
        });
        
        const imgWidth = 297;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        
        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
        pdf.save(`diagram-${Date.now()}.pdf`);
        break;
      }
    }
  }, [nodes, edges, reactFlowInstance, getViewport]);

  // Keyboard shortcuts
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey || event.metaKey) {
        switch (event.key) {
          case 's':
            event.preventDefault();
            exportDiagram('json');
            break;
          case 'e':
            event.preventDefault();
            exportDiagram('png');
            break;
          case 'Delete':
          case 'Backspace':
            // Delete selected nodes and edges
            if (selectedNodes.length > 0 || selectedEdges.length > 0) {
              setNodes(nds => nds.filter(n => !selectedNodes.includes(n.id)));
              setEdges(eds => eds.filter(e => !selectedEdges.includes(e.id)));
            }
            break;
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [exportDiagram, selectedNodes, selectedEdges, setNodes, setEdges]);

  return (
    <div className="h-full w-full relative" ref={reactFlowWrapper}>
      <ReactFlow
        nodes={enhancedNodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onInit={onInit}
        onSelectionChange={onSelectionChange}
        onDrop={onDrop}
        onDragOver={onDragOver}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        fitView
        attributionPosition="bottom-left"
        defaultViewport={{ x: 0, y: 0, zoom: 1 }}
        minZoom={0.1}
        maxZoom={3}
        snapToGrid
        snapGrid={[20, 20]}
        connectionLineType="smoothstep"
        connectionLineStyle={{
          stroke: '#6366f1',
          strokeWidth: 2,
          strokeDasharray: '5,5',
        }}
        defaultEdgeOptions={{
          style: {
            stroke: '#6366f1',
            strokeWidth: 2,
          },
          markerEnd: {
            type: MarkerType.ArrowClosed,
            color: '#6366f1',
          },
        }}
        className="canvas-container"
        deleteKeyCode={['Backspace', 'Delete']}
        multiSelectionKeyCode={['Control', 'Meta']}
        selectionKeyCode={['Shift']}
        panOnScroll
        selectionOnDrag
        panOnDrag={currentTool === 'select'}
      >
        <Controls
          position="top-left"
          showZoom={true}
          showFitView={true}
          showInteractive={true}
          className="bg-card border border-border rounded-lg shadow-lg"
        />
        
        <MiniMap
          nodeColor={(node) => node.data?.color || '#6366f1'}
          position="bottom-right"
          className="bg-card border border-border rounded-lg shadow-lg"
          pannable
          zoomable
        />
        
        <Background
          variant={BackgroundVariant.Dots}
          gap={20}
          size={1}
          color="hsl(var(--muted-foreground))"
          className="opacity-30"
        />
      </ReactFlow>
      
      {/* Export buttons - floating action buttons */}
      <div className="absolute top-4 right-4 flex flex-col space-y-2 z-10">
        <button
          onClick={() => exportDiagram('json')}
          className="p-2 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition-colors"
          title="Export as JSON (Ctrl+S)"
        >
          💾
        </button>
        <button
          onClick={() => exportDiagram('png')}
          className="p-2 bg-green-600 text-white rounded-lg shadow-lg hover:bg-green-700 transition-colors"
          title="Export as PNG (Ctrl+E)"
        >
          🖼️
        </button>
        <button
          onClick={() => exportDiagram('svg')}
          className="p-2 bg-purple-600 text-white rounded-lg shadow-lg hover:bg-purple-700 transition-colors"
          title="Export as SVG"
        >
          📐
        </button>
        <button
          onClick={() => exportDiagram('pdf')}
          className="p-2 bg-red-600 text-white rounded-lg shadow-lg hover:bg-red-700 transition-colors"
          title="Export as PDF"
        >
          📄
        </button>
      </div>
    </div>
  );
};