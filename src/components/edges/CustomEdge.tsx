import React, { useState } from 'react';
import { 
  EdgeProps, 
  getSmoothStepPath, 
  getBezierPath,
  getStraightPath,
  getSimpleBezierPath,
  EdgeLabelRenderer,
  BaseEdge
} from 'reactflow';

interface CustomEdgeData {
  color?: string;
  strokeWidth?: number;
  strokeStyle?: 'solid' | 'dashed' | 'dotted';
  pathType?: 'smoothstep' | 'bezier' | 'straight' | 'simplebezier';
  animated?: boolean;
  label?: string;
  labelBgColor?: string;
  labelTextColor?: string;
  markerStart?: string;
  markerEnd?: string;
  gradient?: {
    from: string;
    to: string;
  };
  shadow?: boolean;
  onLabelChange?: (edgeId: string, newLabel: string) => void;
}

const getEdgePath = (
  pathType: string,
  sourceX: number,
  sourceY: number,
  targetX: number,
  targetY: number,
  sourcePosition: any,
  targetPosition: any
) => {
  switch (pathType) {
    case 'bezier':
      return getBezierPath({
        sourceX,
        sourceY,
        sourcePosition,
        targetX,
        targetY,
        targetPosition,
      });
    case 'straight':
      return getStraightPath({
        sourceX,
        sourceY,
        targetX,
        targetY,
      });
    case 'simplebezier':
      return getSimpleBezierPath({
        sourceX,
        sourceY,
        sourcePosition,
        targetX,
        targetY,
        targetPosition,
      });
    default: // smoothstep
      return getSmoothStepPath({
        sourceX,
        sourceY,
        sourcePosition,
        targetX,
        targetY,
        targetPosition,
      });
  }
};

const getStrokeDashArray = (strokeStyle: string, strokeWidth: number) => {
  const baseWidth = strokeWidth || 2;
  switch (strokeStyle) {
    case 'dashed':
      return `${baseWidth * 4},${baseWidth * 2}`;
    case 'dotted':
      return `${baseWidth},${baseWidth}`;
    default:
      return undefined;
  }
};

export const CustomEdge: React.FC<EdgeProps<CustomEdgeData>> = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data,
  selected,
  markerEnd,
  markerStart,
  style = {},
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(data?.label || '');

  const pathType = data?.pathType || 'smoothstep';
  const [edgePath, labelX, labelY] = getEdgePath(
    pathType,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition
  );

  const strokeColor = data?.color || style.stroke || '#6366f1';
  const strokeWidth = Number(data?.strokeWidth || style.strokeWidth || 2);
  const strokeStyle = data?.strokeStyle || 'solid';
  const animated = data?.animated || false;
  const shadow = data?.shadow || false;

  // Create gradient if specified
  const gradientId = data?.gradient ? `gradient-${id}` : undefined;

  const edgeStyle = {
    ...style,
    stroke: data?.gradient ? `url(#${gradientId})` : strokeColor,
    strokeWidth: strokeWidth,
    strokeDasharray: animated 
      ? `${strokeWidth * 2},${strokeWidth}` 
      : getStrokeDashArray(strokeStyle, strokeWidth),
    filter: shadow ? 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' : undefined,
    transition: 'all 0.2s ease',
  };

  const selectedStyle = selected ? {
    strokeWidth: strokeWidth + 2,
    stroke: data?.gradient ? `url(#${gradientId})` : '#60a5fa',
    filter: 'drop-shadow(0 0 6px rgba(96, 165, 250, 0.5))',
  } : {};

  const handleLabelEdit = () => {
    if (data?.onLabelChange && editText.trim() !== '') {
      data.onLabelChange(id, editText.trim());
    }
    setIsEditing(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleLabelEdit();
    } else if (e.key === 'Escape') {
      setIsEditing(false);
      setEditText(data?.label || '');
    }
  };

  return (
    <>
      {/* Gradient Definition */}
      {data?.gradient && (
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={data.gradient.from} />
            <stop offset="100%" stopColor={data.gradient.to} />
          </linearGradient>
        </defs>
      )}

      {/* Edge Path */}
      <BaseEdge
        path={edgePath}
        markerEnd={markerEnd}
        markerStart={markerStart}
        style={{ ...edgeStyle, ...selectedStyle }}
      />

      {/* Interactive hover area for easier selection */}
      <path
        d={edgePath}
        fill="none"
        strokeOpacity={0}
        stroke="transparent"
        strokeWidth={Math.max(Number(strokeWidth) * 3, 10)}
        className="react-flow__edge-interaction"
        style={{ cursor: 'pointer' }}
      />

      {/* Edge Label */}
      {(data?.label || isEditing) && (
        <EdgeLabelRenderer>
          <div
            style={{
              position: 'absolute',
              transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
              fontSize: 12,
              pointerEvents: 'all',
            }}
            className="nodrag nopan"
          >
            {isEditing ? (
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                onBlur={handleLabelEdit}
                onKeyDown={handleKeyPress}
                className="bg-white border border-gray-300 rounded px-2 py-1 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                style={{
                  fontSize: '12px',
                  minWidth: '60px',
                  textAlign: 'center',
                }}
                autoFocus
              />
            ) : (
              <div
                className="px-2 py-1 bg-white rounded shadow-sm border cursor-pointer hover:bg-gray-50 transition-colors"
                style={{
                  backgroundColor: data?.labelBgColor || '#ffffff',
                  color: data?.labelTextColor || strokeColor,
                  borderColor: strokeColor,
                  fontSize: '12px',
                  fontWeight: 500,
                  whiteSpace: 'nowrap',
                }}
                onDoubleClick={() => {
                  setIsEditing(true);
                  setEditText(data?.label || '');
                }}
              >
                {data?.label}
              </div>
            )}
          </div>
        </EdgeLabelRenderer>
      )}

      {/* Connection Point Indicators (only when selected) */}
      {selected && (
        <>
          <circle
            cx={sourceX}
            cy={sourceY}
            r={4}
            stroke={strokeColor}
            strokeWidth={2}
            fill="white"
            className="react-flow__edge-source-indicator"
          />
          <circle
            cx={targetX}
            cy={targetY}
            r={4}
            stroke={strokeColor}
            strokeWidth={2}
            fill="white"
            className="react-flow__edge-target-indicator"
          />
        </>
      )}

      {/* CSS for animations */}
      <style>{`
        .animated {
          animation: dash 2s linear infinite;
        }
        
        @keyframes dash {
          from {
            stroke-dashoffset: 0;
          }
          to {
            stroke-dashoffset: -20;
          }
        }

        .react-flow__edge-path.selected {
          animation: pulse 1.5s ease-in-out infinite alternate;
        }

        @keyframes pulse {
          from {
            opacity: 0.8;
          }
          to {
            opacity: 1;
          }
        }

        .react-flow__edge-interaction {
          cursor: pointer;
        }

        .react-flow__edge-interaction:hover + .react-flow__edge-path {
          stroke-width: ${Number(strokeWidth) + 1}px !important;
          filter: drop-shadow(0 0 6px rgba(99, 102, 241, 0.3)) !important;
        }
      `}</style>
    </>
  );
};