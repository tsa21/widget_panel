import React from 'react';
import { useDrag } from 'react-dnd';

function DraggableWidgetItem({ type, label, icon, setIsDraggingNewWidget }) {
  const [{ isDragging }, drag] = useDrag({
    type: 'WIDGET',
    item: () => {
      setIsDraggingNewWidget(true);
      return { type };
    },
    end: () => {
      setIsDraggingNewWidget(false);
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      className={`widget-item ${isDragging ? 'dragging' : ''}`}
      title={label}
    >
      <span className="widget-icon">{icon}</span>
      <span className="widget-label">{label}</span>
    </div>
  );
}

export default DraggableWidgetItem;