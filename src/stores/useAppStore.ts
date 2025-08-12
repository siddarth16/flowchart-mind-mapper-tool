import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface AppState {
  // UI State
  showTemplateLibrary: boolean;
  showPropertyPanel: boolean;
  sidebarCollapsed: boolean;
  darkMode: boolean;
  
  // Canvas State
  selectedNodes: string[];
  selectedEdges: string[];
  currentTool: 'select' | 'rectangle' | 'circle' | 'diamond' | 'text' | 'arrow' | 'line' | 'mindmap';
  
  // Document State
  currentDocument: string | null;
  documents: { id: string; name: string; type: 'flowchart' | 'mindmap'; lastModified: Date }[];
  
  // Template State
  selectedTemplate: string | null;
  
  // Export State
  isExporting: boolean;
  
  // Actions
  setShowTemplateLibrary: (show: boolean) => void;
  setShowPropertyPanel: (show: boolean) => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  setDarkMode: (darkMode: boolean) => void;
  setSelectedNodes: (nodes: string[]) => void;
  setSelectedEdges: (edges: string[]) => void;
  setCurrentTool: (tool: AppState['currentTool']) => void;
  setCurrentDocument: (documentId: string | null) => void;
  addDocument: (document: Omit<AppState['documents'][0], 'id'>) => void;
  removeDocument: (documentId: string) => void;
  setSelectedTemplate: (templateId: string | null) => void;
  setIsExporting: (isExporting: boolean) => void;
}

export const useAppStore = create<AppState>()(
  devtools(
    persist(
      (set, get) => ({
        // Initial state
        showTemplateLibrary: false,
        showPropertyPanel: true,
        sidebarCollapsed: false,
        darkMode: true,
        selectedNodes: [],
        selectedEdges: [],
        currentTool: 'select',
        currentDocument: null,
        documents: [],
        selectedTemplate: null,
        isExporting: false,
        
        // Actions
        setShowTemplateLibrary: (show) => set({ showTemplateLibrary: show }),
        setShowPropertyPanel: (show) => set({ showPropertyPanel: show }),
        setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),
        setDarkMode: (darkMode) => {
          set({ darkMode });
          // Update document class
          if (darkMode) {
            document.documentElement.classList.add('dark');
          } else {
            document.documentElement.classList.remove('dark');
          }
        },
        setSelectedNodes: (nodes) => set({ selectedNodes: nodes }),
        setSelectedEdges: (edges) => set({ selectedEdges: edges }),
        setCurrentTool: (tool) => set({ currentTool: tool }),
        setCurrentDocument: (documentId) => set({ currentDocument: documentId }),
        addDocument: (document) => {
          const newDocument = {
            ...document,
            id: crypto.randomUUID(),
          };
          set((state) => ({
            documents: [...state.documents, newDocument],
          }));
        },
        removeDocument: (documentId) => {
          set((state) => ({
            documents: state.documents.filter(doc => doc.id !== documentId),
            currentDocument: state.currentDocument === documentId ? null : state.currentDocument,
          }));
        },
        setSelectedTemplate: (templateId) => set({ selectedTemplate: templateId }),
        setIsExporting: (isExporting) => set({ isExporting }),
      }),
      {
        name: 'flowchart-app-storage',
        partialize: (state) => ({
          darkMode: state.darkMode,
          sidebarCollapsed: state.sidebarCollapsed,
          showPropertyPanel: state.showPropertyPanel,
          documents: state.documents,
          currentDocument: state.currentDocument,
        }),
      }
    )
  )
); 