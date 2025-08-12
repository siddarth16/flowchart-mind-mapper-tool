import React, { useState, useRef, useEffect } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';

interface CustomNodeData {
  label: string;
  shape: string;
  color: string;
  borderColor: string;
  textColor: string;
  width?: number;
  height?: number;
  fontSize?: string;
  fontWeight?: string;
  onLabelChange?: (nodeId: string, newLabel: string) => void;
}

const ShapeRenderer: React.FC<{
  shape: string;
  color: string;
  borderColor: string;
  children: React.ReactNode;
  className?: string;
  selected?: boolean;
}> = ({ shape, color, borderColor, children, className = '', selected }) => {
  const baseClasses = `
    flex items-center justify-center text-center
    transition-all duration-200 shadow-lg border-2
    min-w-[100px] min-h-[50px] px-4 py-3
    ${selected ? 'ring-2 ring-blue-400 ring-offset-2 transform scale-105' : ''}
    ${className}
  `;

  const style = {
    backgroundColor: color,
    borderColor: selected ? '#60a5fa' : borderColor,
    boxShadow: selected 
      ? '0 10px 25px rgba(59, 130, 246, 0.3), 0 0 0 3px rgba(59, 130, 246, 0.2)' 
      : '0 4px 12px rgba(0, 0, 0, 0.1)',
  };

  switch (shape) {
    case 'circle':
    case 'central-topic':
      return (
        <div 
          className={`${baseClasses} rounded-full aspect-square w-24 h-24`}
          style={style}
        >
          <div className="text-center leading-tight">{children}</div>
        </div>
      );
    
    case 'diamond':
    case 'decision':
    case 'gateway':
      return (
        <div className="relative">
          <div 
            className={`${baseClasses} transform rotate-45 w-20 h-20`}
            style={style}
          >
            <div className="transform -rotate-45 text-center leading-tight text-sm">
              {children}
            </div>
          </div>
        </div>
      );
    
    case 'triangle':
      return (
        <div className="relative flex items-center justify-center">
          <svg width="100" height="80" viewBox="0 0 100 80">
            <polygon
              points="50,10 10,70 90,70"
              fill={color}
              stroke={selected ? '#60a5fa' : borderColor}
              strokeWidth="2"
              style={{
                filter: selected ? 'drop-shadow(0 0 6px rgba(59, 130, 246, 0.4))' : 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
              }}
            />
            <text
              x="50"
              y="50"
              textAnchor="middle"
              dominantBaseline="middle"
              className="text-xs font-medium"
              fill="currentColor"
            >
              {children}
            </text>
          </svg>
        </div>
      );
    
    case 'hexagon':
      return (
        <div className="relative flex items-center justify-center">
          <svg width="100" height="80" viewBox="0 0 100 80">
            <polygon
              points="25,10 75,10 100,40 75,70 25,70 0,40"
              fill={color}
              stroke={selected ? '#60a5fa' : borderColor}
              strokeWidth="2"
              style={{
                filter: selected ? 'drop-shadow(0 0 6px rgba(59, 130, 246, 0.4))' : 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
              }}
            />
            <text
              x="50"
              y="40"
              textAnchor="middle"
              dominantBaseline="middle"
              className="text-xs font-medium"
              fill="currentColor"
            >
              {children}
            </text>
          </svg>
        </div>
      );
    
    case 'star':
      return (
        <div className="relative flex items-center justify-center">
          <svg width="100" height="100" viewBox="0 0 100 100">
            <polygon
              points="50,10 61,35 89,35 68,57 79,91 50,70 21,91 32,57 11,35 39,35"
              fill={color}
              stroke={selected ? '#60a5fa' : borderColor}
              strokeWidth="2"
              style={{
                filter: selected ? 'drop-shadow(0 0 6px rgba(59, 130, 246, 0.4))' : 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
              }}
            />
            <text
              x="50"
              y="55"
              textAnchor="middle"
              dominantBaseline="middle"
              className="text-xs font-medium"
              fill="currentColor"
            >
              {children}
            </text>
          </svg>
        </div>
      );
    
    case 'parallelogram':
      return (
        <div className="relative flex items-center justify-center">
          <svg width="120" height="60" viewBox="0 0 120 60">
            <polygon
              points="20,10 100,10 80,50 0,50"
              fill={color}
              stroke={selected ? '#60a5fa' : borderColor}
              strokeWidth="2"
              style={{
                filter: selected ? 'drop-shadow(0 0 6px rgba(59, 130, 246, 0.4))' : 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
              }}
            />
            <text
              x="60"
              y="30"
              textAnchor="middle"
              dominantBaseline="middle"
              className="text-sm font-medium"
              fill="currentColor"
            >
              {children}
            </text>
          </svg>
        </div>
      );
    
    case 'database':
      return (
        <div 
          className={`${baseClasses} rounded-t-full rounded-b-lg relative overflow-hidden`}
          style={{ ...style, height: '70px', minHeight: '70px' }}
        >
          <div className="absolute top-0 left-0 right-0 h-4 bg-black bg-opacity-10 rounded-t-full"></div>
          <div className="flex items-center justify-center h-full text-center">
            {children}
          </div>
        </div>
      );
    
    case 'cloud':
      return (
        <div className="relative flex items-center justify-center">
          <svg width="120" height="80" viewBox="0 0 120 80">
            <path
              d="M30,50 Q30,30 50,30 Q60,20 80,25 Q100,30 100,45 Q110,50 100,60 Q90,70 70,65 Q50,70 30,60 Q20,55 30,50 Z"
              fill={color}
              stroke={selected ? '#60a5fa' : borderColor}
              strokeWidth="2"
              style={{
                filter: selected ? 'drop-shadow(0 0 6px rgba(59, 130, 246, 0.4))' : 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
              }}
            />
            <text
              x="60"
              y="50"
              textAnchor="middle"
              dominantBaseline="middle"
              className="text-sm font-medium"
              fill="currentColor"
            >
              {children}
            </text>
          </svg>
        </div>
      );
    
    case 'document':
      return (
        <div className="relative">
          <div 
            className={`${baseClasses} rounded-t-lg relative`}
            style={{
              ...style,
              clipPath: 'polygon(0% 0%, 85% 0%, 100% 15%, 100% 100%, 0% 100%)',
              minHeight: '60px'
            }}
          >
            <div className="text-center">{children}</div>
          </div>
          <div 
            className="absolute top-0 right-0 w-4 h-4 border-l-2 border-b-2"
            style={{ borderColor: selected ? '#60a5fa' : borderColor }}
          ></div>
        </div>
      );
    
    case 'terminator':
    case 'process':
    case 'task':
    case 'rectangle':
    case 'branch-topic':
    default:
      return (
        <div 
          className={`${baseClasses} ${shape === 'terminator' ? 'rounded-full' : 'rounded-lg'}`}
          style={style}
        >
          <div className="text-center leading-tight">{children}</div>
        </div>
      );
  }
};

export const CustomNode: React.FC<NodeProps<CustomNodeData>> = ({ 
  data, 
  selected, 
  isConnectable,
  id 
}) => {
  const { 
    label, 
    shape, 
    color, 
    borderColor, 
    textColor, 
    fontSize = '14px',
    fontWeight = '500',
    onLabelChange 
  } = data;

  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(label);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleDoubleClick = () => {
    setIsEditing(true);
    setEditText(label);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      finishEditing();
    } else if (e.key === 'Escape') {
      setIsEditing(false);
      setEditText(label);
    }
  };

  const finishEditing = () => {
    setIsEditing(false);
    if (onLabelChange && editText.trim() !== '') {
      onLabelChange(id, editText.trim());
    }
  };

  const handleBlur = () => {
    finishEditing();
  };

  const renderContent = () => {
    if (isEditing) {
      return (
        <input
          ref={inputRef}
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyPress}
          className="bg-transparent border-none outline-none text-center w-full max-w-[80px]"
          style={{ 
            color: textColor,
            fontSize: fontSize,
            fontWeight: fontWeight
          }}
        />
      );
    }

    return (
      <span 
        className="select-none cursor-text leading-tight"
        style={{ 
          color: textColor,
          fontSize: fontSize,
          fontWeight: fontWeight
        }}
        onDoubleClick={handleDoubleClick}
      >
        {label}
      </span>
    );
  };

  // Determine handle positions based on shape
  const getHandlePositions = () => {
    if (shape === 'diamond' || shape === 'decision' || shape === 'gateway') {
      return {
        top: { top: '-6px', left: '50%', transform: 'translateX(-50%)' },
        bottom: { bottom: '-6px', left: '50%', transform: 'translateX(-50%)' },
        left: { left: '-6px', top: '50%', transform: 'translateY(-50%)' },
        right: { right: '-6px', top: '50%', transform: 'translateY(-50%)' },
      };
    }
    return {
      top: { top: '-6px', left: '50%', transform: 'translateX(-50%)' },
      bottom: { bottom: '-6px', left: '50%', transform: 'translateX(-50%)' },
      left: { left: '-6px', top: '50%', transform: 'translateY(-50%)' },
      right: { right: '-6px', top: '50%', transform: 'translateY(-50%)' },
    };
  };

  const handlePositions = getHandlePositions();
  const handleStyle = {
    width: '12px',
    height: '12px',
    background: '#6366f1',
    border: '2px solid #ffffff',
    borderRadius: '50%',
    opacity: selected ? 1 : 0,
    transition: 'opacity 0.2s ease',
  };

  return (
    <div className="group relative" style={{ minWidth: '100px' }}>
      {/* Connection Handles */}
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
        className="group-hover:opacity-100"
        style={{ ...handleStyle, ...handlePositions.top }}
      />
      
      <Handle
        type="source"
        position={Position.Bottom}
        isConnectable={isConnectable}
        className="group-hover:opacity-100"
        style={{ ...handleStyle, ...handlePositions.bottom }}
      />
      
      <Handle
        type="target"
        position={Position.Left}
        isConnectable={isConnectable}
        className="group-hover:opacity-100"
        style={{ ...handleStyle, ...handlePositions.left }}
      />
      
      <Handle
        type="source"
        position={Position.Right}
        isConnectable={isConnectable}
        className="group-hover:opacity-100"
        style={{ ...handleStyle, ...handlePositions.right }}
      />

      {/* Additional handles for complex shapes */}
      {(shape === 'rectangle' || shape === 'process') && (
        <>
          <Handle
            type="source"
            position={Position.Top}
            id="top-right"
            isConnectable={isConnectable}
            className="group-hover:opacity-100"
            style={{ 
              ...handleStyle, 
              top: '-5px', 
              right: '20px',
              width: '10px',
              height: '10px' 
            }}
          />
          <Handle
            type="source"
            position={Position.Bottom}
            id="bottom-left"
            isConnectable={isConnectable}
            className="group-hover:opacity-100"
            style={{ 
              ...handleStyle, 
              bottom: '-5px', 
              left: '20px',
              width: '10px',
              height: '10px' 
            }}
          />
        </>
      )}
      
      {/* Node Content */}
      <ShapeRenderer
        shape={shape}
        color={color}
        borderColor={borderColor}
        selected={selected}
        className="group-hover:shadow-xl cursor-pointer"
      >
        {renderContent()}
      </ShapeRenderer>
      
      {/* Shape Label for debugging - remove in production */}
      {process.env.NODE_ENV === 'development' && selected && (
        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs bg-black text-white px-1 rounded">
          {shape}
        </div>
      )}
    </div>
  );
};