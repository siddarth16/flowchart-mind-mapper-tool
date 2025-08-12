import React, { useState } from 'react';
import { 
  X, 
  GitBranch, 
  Workflow, 
  Users, 
  Database, 
  Network,
  Zap,
  Building,
  Search,
  Play,
  Download,
  Star,
  Eye,
  Code,
  BarChart,
  Globe,
  MapPin,
  Calendar,
  ShoppingCart,
  Truck,
  Heart,
  Lightbulb,
  Target,
  BookOpen,
  Calculator,
  Clock,
  TrendingUp
} from 'lucide-react';
import { useAppStore } from '../stores/useAppStore';
import type { Node, Edge } from 'reactflow';

interface Template {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  category: string;
  nodes: Node[];
  edges: Edge[];
  preview: string;
  tags: string[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}

const COMPREHENSIVE_TEMPLATES: Template[] = [
  // Flowchart Templates
  {
    id: 'flowchart-basic',
    name: 'Basic Process Flow',
    icon: Workflow,
    description: 'Simple process flowchart with decision points',
    category: 'Flowcharts',
    difficulty: 'Beginner',
    tags: ['process', 'decision', 'workflow'],
    preview: 'Start → Process → Decision → End',
    nodes: [
      { id: '1', type: 'custom', position: { x: 100, y: 50 }, data: { label: 'Start', shape: 'terminator', color: '#10b981' } },
      { id: '2', type: 'custom', position: { x: 100, y: 150 }, data: { label: 'Process', shape: 'process', color: '#3b82f6' } },
      { id: '3', type: 'custom', position: { x: 100, y: 250 }, data: { label: 'Decision?', shape: 'diamond', color: '#f59e0b' } },
      { id: '4', type: 'custom', position: { x: 250, y: 350 }, data: { label: 'Yes', shape: 'process', color: '#3b82f6' } },
      { id: '5', type: 'custom', position: { x: 100, y: 450 }, data: { label: 'End', shape: 'terminator', color: '#ef4444' } },
    ],
    edges: [
      { id: 'e1-2', source: '1', target: '2' },
      { id: 'e2-3', source: '2', target: '3' },
      { id: 'e3-4', source: '3', target: '4', label: 'Yes' },
      { id: 'e3-5', source: '3', target: '5', label: 'No' },
      { id: 'e4-5', source: '4', target: '5' },
    ]
  },
  {
    id: 'flowchart-complex',
    name: 'Complex Decision Flow',
    icon: Workflow,
    description: 'Multi-path decision flowchart with loops',
    category: 'Flowcharts',
    difficulty: 'Advanced',
    tags: ['complex', 'loops', 'multiple paths'],
    preview: 'Multi-branch decision tree with error handling',
    nodes: [
      { id: '1', type: 'custom', position: { x: 200, y: 50 }, data: { label: 'Initialize', shape: 'terminator', color: '#10b981' } },
      { id: '2', type: 'custom', position: { x: 200, y: 150 }, data: { label: 'Load Data', shape: 'data', color: '#8b5cf6' } },
      { id: '3', type: 'custom', position: { x: 200, y: 250 }, data: { label: 'Data Valid?', shape: 'diamond', color: '#f59e0b' } },
      { id: '4', type: 'custom', position: { x: 350, y: 350 }, data: { label: 'Process Data', shape: 'process', color: '#3b82f6' } },
      { id: '5', type: 'custom', position: { x: 50, y: 350 }, data: { label: 'Error Handler', shape: 'process', color: '#ef4444' } },
      { id: '6', type: 'custom', position: { x: 200, y: 450 }, data: { label: 'Save Results', shape: 'document', color: '#06b6d4' } },
      { id: '7', type: 'custom', position: { x: 200, y: 550 }, data: { label: 'Complete', shape: 'terminator', color: '#ef4444' } },
    ],
    edges: [
      { id: 'e1-2', source: '1', target: '2' },
      { id: 'e2-3', source: '2', target: '3' },
      { id: 'e3-4', source: '3', target: '4', label: 'Valid' },
      { id: 'e3-5', source: '3', target: '5', label: 'Invalid' },
      { id: 'e4-6', source: '4', target: '6' },
      { id: 'e5-2', source: '5', target: '2', label: 'Retry' },
      { id: 'e6-7', source: '6', target: '7' },
    ]
  },

  // Mind Map Templates
  {
    id: 'mindmap-project',
    name: 'Project Planning',
    icon: GitBranch,
    description: 'Comprehensive project planning mind map',
    category: 'Mind Maps',
    difficulty: 'Intermediate',
    tags: ['project', 'planning', 'management'],
    preview: 'Central project with branches for tasks, resources, timeline',
    nodes: [
      { id: '1', type: 'custom', position: { x: 300, y: 250 }, data: { label: 'Project Name', shape: 'circle', color: '#ef4444' } },
      { id: '2', type: 'custom', position: { x: 150, y: 150 }, data: { label: 'Resources', shape: 'rectangle', color: '#3b82f6' } },
      { id: '3', type: 'custom', position: { x: 450, y: 150 }, data: { label: 'Timeline', shape: 'rectangle', color: '#10b981' } },
      { id: '4', type: 'custom', position: { x: 150, y: 350 }, data: { label: 'Tasks', shape: 'rectangle', color: '#f59e0b' } },
      { id: '5', type: 'custom', position: { x: 450, y: 350 }, data: { label: 'Deliverables', shape: 'rectangle', color: '#8b5cf6' } },
      { id: '6', type: 'custom', position: { x: 50, y: 100 }, data: { label: 'Team', shape: 'rectangle', color: '#06b6d4' } },
      { id: '7', type: 'custom', position: { x: 50, y: 200 }, data: { label: 'Budget', shape: 'rectangle', color: '#84cc16' } },
    ],
    edges: [
      { id: 'e1-2', source: '1', target: '2' },
      { id: 'e1-3', source: '1', target: '3' },
      { id: 'e1-4', source: '1', target: '4' },
      { id: 'e1-5', source: '1', target: '5' },
      { id: 'e2-6', source: '2', target: '6' },
      { id: 'e2-7', source: '2', target: '7' },
    ]
  },

  // Organization Chart Templates
  {
    id: 'orgchart-corporate',
    name: 'Corporate Hierarchy',
    icon: Users,
    description: 'Standard corporate organizational structure',
    category: 'Organization Charts',
    difficulty: 'Beginner',
    tags: ['corporate', 'hierarchy', 'management'],
    preview: 'CEO → Departments → Teams',
    nodes: [
      { id: '1', type: 'custom', position: { x: 250, y: 50 }, data: { label: 'CEO', shape: 'rectangle', color: '#dc2626' } },
      { id: '2', type: 'custom', position: { x: 100, y: 150 }, data: { label: 'CTO', shape: 'rectangle', color: '#3b82f6' } },
      { id: '3', type: 'custom', position: { x: 250, y: 150 }, data: { label: 'CFO', shape: 'rectangle', color: '#3b82f6' } },
      { id: '4', type: 'custom', position: { x: 400, y: 150 }, data: { label: 'CMO', shape: 'rectangle', color: '#3b82f6' } },
      { id: '5', type: 'custom', position: { x: 50, y: 250 }, data: { label: 'Dev Team', shape: 'rectangle', color: '#16a34a' } },
      { id: '6', type: 'custom', position: { x: 150, y: 250 }, data: { label: 'QA Team', shape: 'rectangle', color: '#16a34a' } },
      { id: '7', type: 'custom', position: { x: 350, y: 250 }, data: { label: 'Marketing', shape: 'rectangle', color: '#16a34a' } },
      { id: '8', type: 'custom', position: { x: 450, y: 250 }, data: { label: 'Sales', shape: 'rectangle', color: '#16a34a' } },
    ],
    edges: [
      { id: 'e1-2', source: '1', target: '2' },
      { id: 'e1-3', source: '1', target: '3' },
      { id: 'e1-4', source: '1', target: '4' },
      { id: 'e2-5', source: '2', target: '5' },
      { id: 'e2-6', source: '2', target: '6' },
      { id: 'e4-7', source: '4', target: '7' },
      { id: 'e4-8', source: '4', target: '8' },
    ]
  },

  // Database/ERD Templates
  {
    id: 'erd-ecommerce',
    name: 'E-commerce Database',
    icon: Database,
    description: 'Entity relationship diagram for online store',
    category: 'Database Design',
    difficulty: 'Advanced',
    tags: ['database', 'ecommerce', 'relationships'],
    preview: 'Users → Orders → Products relationships',
    nodes: [
      { id: '1', type: 'custom', position: { x: 100, y: 100 }, data: { label: 'Users', shape: 'rectangle', color: '#3b82f6' } },
      { id: '2', type: 'custom', position: { x: 350, y: 100 }, data: { label: 'Orders', shape: 'rectangle', color: '#10b981' } },
      { id: '3', type: 'custom', position: { x: 350, y: 300 }, data: { label: 'Products', shape: 'rectangle', color: '#f59e0b' } },
      { id: '4', type: 'custom', position: { x: 100, y: 300 }, data: { label: 'Categories', shape: 'rectangle', color: '#8b5cf6' } },
      { id: '5', type: 'custom', position: { x: 225, y: 200 }, data: { label: 'Order_Items', shape: 'rectangle', color: '#06b6d4' } },
    ],
    edges: [
      { id: 'e1-2', source: '1', target: '2', label: '1:N' },
      { id: 'e2-5', source: '2', target: '5', label: '1:N' },
      { id: 'e3-5', source: '3', target: '5', label: '1:N' },
      { id: 'e4-3', source: '4', target: '3', label: '1:N' },
    ]
  },

  // Network Diagram Templates
  {
    id: 'network-office',
    name: 'Office Network',
    icon: Network,
    description: 'Standard office network topology',
    category: 'Network Diagrams',
    difficulty: 'Intermediate',
    tags: ['network', 'topology', 'infrastructure'],
    preview: 'Internet → Router → Switches → Devices',
    nodes: [
      { id: '1', type: 'custom', position: { x: 50, y: 150 }, data: { label: 'Internet', shape: 'cloud', color: '#06b6d4' } },
      { id: '2', type: 'custom', position: { x: 200, y: 150 }, data: { label: 'Router', shape: 'rectangle', color: '#4338ca' } },
      { id: '3', type: 'custom', position: { x: 350, y: 100 }, data: { label: 'Switch 1', shape: 'rectangle', color: '#059669' } },
      { id: '4', type: 'custom', position: { x: 350, y: 200 }, data: { label: 'Switch 2', shape: 'rectangle', color: '#059669' } },
      { id: '5', type: 'custom', position: { x: 500, y: 50 }, data: { label: 'Workstation', shape: 'rectangle', color: '#6b7280' } },
      { id: '6', type: 'custom', position: { x: 500, y: 150 }, data: { label: 'Server', shape: 'rectangle', color: '#374151' } },
      { id: '7', type: 'custom', position: { x: 500, y: 250 }, data: { label: 'Printer', shape: 'rectangle', color: '#7c3aed' } },
    ],
    edges: [
      { id: 'e1-2', source: '1', target: '2' },
      { id: 'e2-3', source: '2', target: '3' },
      { id: 'e2-4', source: '2', target: '4' },
      { id: 'e3-5', source: '3', target: '5' },
      { id: 'e3-6', source: '3', target: '6' },
      { id: 'e4-7', source: '4', target: '7' },
    ]
  },

  // UML Templates
  {
    id: 'uml-usecase',
    name: 'Use Case Diagram',
    icon: Users,
    description: 'System use case diagram with actors',
    category: 'UML Diagrams',
    difficulty: 'Intermediate',
    tags: ['uml', 'use case', 'system design'],
    preview: 'Actors → Use Cases → System',
    nodes: [
      { id: '1', type: 'custom', position: { x: 100, y: 150 }, data: { label: 'Customer', shape: 'actor', color: '#14b8a6' } },
      { id: '2', type: 'custom', position: { x: 100, y: 300 }, data: { label: 'Admin', shape: 'actor', color: '#14b8a6' } },
      { id: '3', type: 'custom', position: { x: 300, y: 100 }, data: { label: 'Login', shape: 'usecase', color: '#f59e0b' } },
      { id: '4', type: 'custom', position: { x: 300, y: 200 }, data: { label: 'Browse Products', shape: 'usecase', color: '#f59e0b' } },
      { id: '5', type: 'custom', position: { x: 300, y: 300 }, data: { label: 'Make Purchase', shape: 'usecase', color: '#f59e0b' } },
      { id: '6', type: 'custom', position: { x: 300, y: 400 }, data: { label: 'Manage Inventory', shape: 'usecase', color: '#f59e0b' } },
      { id: '7', type: 'custom', position: { x: 500, y: 250 }, data: { label: 'E-commerce System', shape: 'class', color: '#ef4444' } },
    ],
    edges: [
      { id: 'e1-3', source: '1', target: '3' },
      { id: 'e1-4', source: '1', target: '4' },
      { id: 'e1-5', source: '1', target: '5' },
      { id: 'e2-3', source: '2', target: '3' },
      { id: 'e2-6', source: '2', target: '6' },
      { id: 'e3-7', source: '3', target: '7' },
      { id: 'e4-7', source: '4', target: '7' },
      { id: 'e5-7', source: '5', target: '7' },
      { id: 'e6-7', source: '6', target: '7' },
    ]
  },

  // Business Process Templates
  {
    id: 'bpmn-customer-service',
    name: 'Customer Service Process',
    icon: Zap,
    description: 'BPMN customer service workflow',
    category: 'Business Process',
    difficulty: 'Advanced',
    tags: ['bpmn', 'customer service', 'workflow'],
    preview: 'Customer inquiry → Support process → Resolution',
    nodes: [
      { id: '1', type: 'custom', position: { x: 50, y: 200 }, data: { label: 'Customer Inquiry', shape: 'event', color: '#eab308' } },
      { id: '2', type: 'custom', position: { x: 200, y: 200 }, data: { label: 'Categorize Issue', shape: 'task', color: '#3b82f6' } },
      { id: '3', type: 'custom', position: { x: 350, y: 200 }, data: { label: 'Priority?', shape: 'gateway', color: '#f97316' } },
      { id: '4', type: 'custom', position: { x: 500, y: 150 }, data: { label: 'Escalate', shape: 'task', color: '#dc2626' } },
      { id: '5', type: 'custom', position: { x: 500, y: 250 }, data: { label: 'Standard Process', shape: 'task', color: '#3b82f6' } },
      { id: '6', type: 'custom', position: { x: 650, y: 200 }, data: { label: 'Resolve Issue', shape: 'task', color: '#10b981' } },
      { id: '7', type: 'custom', position: { x: 800, y: 200 }, data: { label: 'Issue Resolved', shape: 'event', color: '#eab308' } },
    ],
    edges: [
      { id: 'e1-2', source: '1', target: '2' },
      { id: 'e2-3', source: '2', target: '3' },
      { id: 'e3-4', source: '3', target: '4', label: 'High' },
      { id: 'e3-5', source: '3', target: '5', label: 'Normal' },
      { id: 'e4-6', source: '4', target: '6' },
      { id: 'e5-6', source: '5', target: '6' },
      { id: 'e6-7', source: '6', target: '7' },
    ]
  },

  // Software Architecture Templates
  {
    id: 'architecture-microservices',
    name: 'Microservices Architecture',
    icon: Building,
    description: 'Modern microservices system architecture',
    category: 'Software Architecture',
    difficulty: 'Advanced',
    tags: ['microservices', 'architecture', 'system design'],
    preview: 'Client → API Gateway → Services → Database',
    nodes: [
      { id: '1', type: 'custom', position: { x: 100, y: 100 }, data: { label: 'Web Client', shape: 'rectangle', color: '#3b82f6' } },
      { id: '2', type: 'custom', position: { x: 100, y: 200 }, data: { label: 'Mobile Client', shape: 'rectangle', color: '#3b82f6' } },
      { id: '3', type: 'custom', position: { x: 300, y: 150 }, data: { label: 'API Gateway', shape: 'rectangle', color: '#10b981' } },
      { id: '4', type: 'custom', position: { x: 500, y: 100 }, data: { label: 'User Service', shape: 'rectangle', color: '#f59e0b' } },
      { id: '5', type: 'custom', position: { x: 500, y: 200 }, data: { label: 'Order Service', shape: 'rectangle', color: '#f59e0b' } },
      { id: '6', type: 'custom', position: { x: 700, y: 100 }, data: { label: 'User DB', shape: 'database', color: '#84cc16' } },
      { id: '7', type: 'custom', position: { x: 700, y: 200 }, data: { label: 'Order DB', shape: 'database', color: '#84cc16' } },
    ],
    edges: [
      { id: 'e1-3', source: '1', target: '3' },
      { id: 'e2-3', source: '2', target: '3' },
      { id: 'e3-4', source: '3', target: '4' },
      { id: 'e3-5', source: '3', target: '5' },
      { id: 'e4-6', source: '4', target: '6' },
      { id: 'e5-7', source: '5', target: '7' },
    ]
  },

  // Additional specialized templates
  {
    id: 'agile-workflow',
    name: 'Agile Development Workflow',
    icon: TrendingUp,
    description: 'Agile development lifecycle and sprints',
    category: 'Project Management',
    difficulty: 'Intermediate',
    tags: ['agile', 'scrum', 'development'],
    preview: 'Backlog → Sprint → Review → Retrospective',
    nodes: [
      { id: '1', type: 'custom', position: { x: 100, y: 150 }, data: { label: 'Product Backlog', shape: 'rectangle', color: '#8b5cf6' } },
      { id: '2', type: 'custom', position: { x: 300, y: 150 }, data: { label: 'Sprint Planning', shape: 'rectangle', color: '#3b82f6' } },
      { id: '3', type: 'custom', position: { x: 500, y: 150 }, data: { label: 'Sprint', shape: 'rectangle', color: '#10b981' } },
      { id: '4', type: 'custom', position: { x: 700, y: 150 }, data: { label: 'Sprint Review', shape: 'rectangle', color: '#f59e0b' } },
      { id: '5', type: 'custom', position: { x: 500, y: 300 }, data: { label: 'Retrospective', shape: 'rectangle', color: '#ef4444' } },
    ],
    edges: [
      { id: 'e1-2', source: '1', target: '2' },
      { id: 'e2-3', source: '2', target: '3' },
      { id: 'e3-4', source: '3', target: '4' },
      { id: 'e4-5', source: '4', target: '5' },
      { id: 'e5-2', source: '5', target: '2' },
    ]
  }
];

const categories = [...new Set(COMPREHENSIVE_TEMPLATES.map(t => t.category))];

export const TemplateLibrary: React.FC = () => {
  const { setShowTemplateLibrary } = useAppStore();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);

  const handleClose = () => {
    setShowTemplateLibrary(false);
  };

  const filteredTemplates = COMPREHENSIVE_TEMPLATES.filter(template => {
    const matchesCategory = selectedCategory === 'All' || template.category === selectedCategory;
    const matchesSearch = searchTerm === '' || 
      template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  const handleTemplateUse = (template: Template) => {
    // TODO: Implement template application to canvas
    console.log('Using template:', template.id);
    handleClose();
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'text-green-600 bg-green-100';
      case 'Intermediate': return 'text-yellow-600 bg-yellow-100';
      case 'Advanced': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card border border-border rounded-xl shadow-2xl max-w-7xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border bg-secondary/30">
          <div>
            <h2 className="text-2xl font-bold text-foreground flex items-center space-x-2">
              <BookOpen className="w-6 h-6 text-blue-500" />
              <span>Template Library</span>
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Choose from {COMPREHENSIVE_TEMPLATES.length} professional templates
            </p>
          </div>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-accent rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex h-full">
          {/* Sidebar */}
          <div className="w-80 border-r border-border bg-secondary/20 p-4 overflow-y-auto">
            {/* Search */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search templates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Categories */}
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-foreground mb-3">Categories</h3>
              <button
                onClick={() => setSelectedCategory('All')}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                  selectedCategory === 'All' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'hover:bg-accent'
                }`}
              >
                All Templates ({COMPREHENSIVE_TEMPLATES.length})
              </button>
              {categories.map(category => {
                const count = COMPREHENSIVE_TEMPLATES.filter(t => t.category === category).length;
                return (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                      selectedCategory === category 
                        ? 'bg-primary text-primary-foreground' 
                        : 'hover:bg-accent'
                    }`}
                  >
                    {category} ({count})
                  </button>
                );
              })}
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {selectedTemplate ? (
              /* Template Detail View */
              <div className="max-w-4xl">
                <div className="mb-6">
                  <button
                    onClick={() => setSelectedTemplate(null)}
                    className="text-primary hover:text-primary/80 text-sm mb-4"
                  >
                    ← Back to templates
                  </button>
                  
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <selectedTemplate.icon className="w-8 h-8 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-foreground mb-2">{selectedTemplate.name}</h3>
                      <p className="text-muted-foreground mb-4">{selectedTemplate.description}</p>
                      
                      <div className="flex items-center space-x-4 mb-4">
                        <span className="text-sm text-muted-foreground">Category: {selectedTemplate.category}</span>
                        <span className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(selectedTemplate.difficulty)}`}>
                          {selectedTemplate.difficulty}
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-6">
                        {selectedTemplate.tags.map(tag => (
                          <span key={tag} className="text-xs px-2 py-1 bg-secondary text-secondary-foreground rounded-full">
                            #{tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex space-x-3">
                        <button
                          onClick={() => handleTemplateUse(selectedTemplate)}
                          className="flex items-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                        >
                          <Play className="w-4 h-4" />
                          <span>Use Template</span>
                        </button>
                        <button className="flex items-center space-x-2 px-4 py-2 bg-secondary hover:bg-accent rounded-lg transition-colors">
                          <Eye className="w-4 h-4" />
                          <span>Preview</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Template Preview */}
                <div className="bg-background border border-border rounded-lg p-6">
                  <h4 className="text-lg font-semibold mb-4">Template Structure</h4>
                  <div className="text-sm text-muted-foreground space-y-2">
                    <p><strong>Nodes:</strong> {selectedTemplate.nodes.length}</p>
                    <p><strong>Connections:</strong> {selectedTemplate.edges.length}</p>
                    <p><strong>Preview:</strong> {selectedTemplate.preview}</p>
                  </div>
                </div>
              </div>
            ) : (
              /* Template Grid */
              <>
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {selectedCategory === 'All' ? 'All Templates' : selectedCategory}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {filteredTemplates.length} template{filteredTemplates.length !== 1 ? 's' : ''} found
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredTemplates.map((template) => {
                    const Icon = template.icon;
                    return (
                      <div
                        key={template.id}
                        className="group bg-background border border-border rounded-lg p-5 hover:border-primary/50 hover:shadow-lg transition-all duration-200 cursor-pointer"
                        onClick={() => setSelectedTemplate(template)}
                      >
                        <div className="flex items-start space-x-4 mb-4">
                          <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                            <Icon className="w-6 h-6 text-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                              {template.name}
                            </h3>
                            <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                              {template.description}
                            </p>
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-muted-foreground">{template.category}</span>
                              <span className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(template.difficulty)}`}>
                                {template.difficulty}
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-1 mb-3">
                          {template.tags.slice(0, 3).map(tag => (
                            <span key={tag} className="text-xs px-2 py-1 bg-secondary text-secondary-foreground rounded">
                              {tag}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center justify-between pt-3 border-t border-border">
                          <div className="text-xs text-muted-foreground">
                            {template.nodes.length} nodes • {template.edges.length} connections
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleTemplateUse(template);
                            }}
                            className="text-xs text-primary hover:text-primary/80 font-medium"
                          >
                            Use Template
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {filteredTemplates.length === 0 && (
                  <div className="text-center py-12">
                    <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No templates found matching your criteria.</p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};