import React from 'react';
import { useDrop } from 'react-dnd';
import CanvasWidget from './CanvasWidget';

function Canvas({
  widgets,
  updateWidgetPosition,
  removeWidget,
  addWidget,
  isDraggingNewWidget,
  editingWidget,
  setEditingWidget,
  updateWidgetContent,
}) {
  const [{ isOver }, drop] = useDrop({
    accept: 'WIDGET',
    drop: (item, monitor) => {
      const offset = monitor.getClientOffset();
      if (!offset) return;
      
      const canvasRect = document.getElementById('canvas').getBoundingClientRect();
      const x = offset.x - canvasRect.left;
      const y = offset.y - canvasRect.top;
      
      if (!item.id) {
        addWidget(item.type, x, y);
      } else {
        updateWidgetPosition(item.id, { x, y });
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <div
      id="canvas"
      ref={drop}
      className={`canvas ${isOver && isDraggingNewWidget ? 'canvas-highlight' : ''}`}
    >
      {widgets.map((widget) => (
        <CanvasWidget
          key={widget.id}
          widget={widget}
          updatePosition={updateWidgetPosition}
          removeWidget={removeWidget}
          isEditing={editingWidget === widget.id}
          setEditingWidget={setEditingWidget}
          updateWidgetContent={updateWidgetContent}
        />
      ))}
      {widgets.length === 0 && (
        <div className="empty-canvas-message">
          Drag and drop widgets here to build your layout
        </div>
      )}
    </div>
  );
}

export default Canvas;