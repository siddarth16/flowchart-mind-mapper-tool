import React from 'react';
import { ReactFlowProvider } from 'reactflow';
import 'reactflow/dist/style.css';

import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { DiagramEditor } from './components/DiagramEditor';
import { PropertyPanel } from './components/PropertyPanel';
import { TemplateLibrary } from './components/TemplateLibrary';
import { useAppStore } from './stores/useAppStore';

import './styles/globals.css';

function App() {
  const { showTemplateLibrary, showPropertyPanel, sidebarCollapsed } = useAppStore();

  return (
    <div className="h-screen flex flex-col bg-background text-foreground overflow-hidden">
      {/* Header */}
      <Header />
      
      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <div className={`
          flex-shrink-0 transition-all duration-300 ease-in-out
          ${sidebarCollapsed ? 'w-16' : 'w-80'}
        `}>
          <Sidebar />
        </div>
        
        {/* Canvas Area */}
        <div className="flex-1 flex relative">
          <ReactFlowProvider>
            <DiagramEditor />
            
            {/* Template Library Overlay */}
            {showTemplateLibrary && (
              <div className="absolute inset-0 bg-black/50 z-50 flex items-center justify-center">
                <div className="bg-card rounded-lg shadow-xl max-w-4xl max-h-[80vh] w-full mx-4 overflow-hidden">
                  <TemplateLibrary />
                </div>
              </div>
            )}
          </ReactFlowProvider>
        </div>
        
        {/* Property Panel */}
        {showPropertyPanel && (
          <div className="w-80 flex-shrink-0 border-l border-border">
            <PropertyPanel />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;