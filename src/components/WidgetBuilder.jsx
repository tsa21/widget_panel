import React, { useState, useEffect } from 'react';
import WidgetPanel from './WidgetPanel';
import Canvas from './Canvas';

const generateId = () => Math.random().toString(36).substr(2, 9);

function WidgetBuilder() {
  const [widgets, setWidgets] = useState(() => {
    const savedLayout = localStorage.getItem('widgetLayout');
    if (savedLayout) {
      try {
        return JSON.parse(savedLayout);
      } catch (error) {
        console.error('Failed to parse saved layout:', error);
        return [];
      }
    }
    return [];
  });

  const [isDraggingNewWidget, setIsDraggingNewWidget] = useState(false);
  const [editingWidget, setEditingWidget] = useState(null);

  // Save to localStorage whenever widgets change
  useEffect(() => {
    localStorage.setItem('widgetLayout', JSON.stringify(widgets));
  }, [widgets]);

  const addWidget = (type, x, y) => {
    const newWidget = {
      id: generateId(),
      type,
      position: { x, y },
      content: getDefaultContent(type),
    };
    setWidgets([...widgets, newWidget]);
  };

  const getDefaultContent = (type) => {
    switch (type) {
      case 'text': return 'Double-click to edit this text';
      case 'button': return 'Button';
      case 'image': return null;
      case 'table': return {
        headers: ['Column 1', 'Column 2'],
        rows: [['Data 1', 'Data 2'], ['Data 3', 'Data 4']],
      };
      default: return '';
    }
  };

  const updateWidgetPosition = (id, position) => {
    setWidgets(widgets.map((widget) =>
      widget.id === id ? { ...widget, position } : widget
    ));
  };

  const updateWidgetContent = (id, content) => {
    setWidgets(widgets.map((widget) =>
      widget.id === id ? { ...widget, content } : widget
    ));
    setEditingWidget(null);
  };

  const removeWidget = (id) => {
    setWidgets(widgets.filter((widget) => widget.id !== id));
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Widget Builder</h1>
        <div className="header-controls">
          <button className="clear-button" onClick={() => setWidgets([])}>
            Clear Canvas
          </button>
        </div>
      </header>
      <main className="main-content">
        <WidgetPanel setIsDraggingNewWidget={setIsDraggingNewWidget} />
        <Canvas
          widgets={widgets}
          updateWidgetPosition={updateWidgetPosition}
          removeWidget={removeWidget}
          addWidget={addWidget}
          isDraggingNewWidget={isDraggingNewWidget}
          editingWidget={editingWidget}
          setEditingWidget={setEditingWidget}
          updateWidgetContent={updateWidgetContent}
        />
      </main>
    </div>
  );
}

export default WidgetBuilder;