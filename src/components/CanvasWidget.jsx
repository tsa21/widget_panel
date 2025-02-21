import React from 'react';
import { useDrag } from 'react-dnd';
import TextWidget from './TextWidget';
import ImageWidget from './ImageWidget';
import ButtonWidget from './ButtonWidget';
import TableWidget from './TableWidget';
import EditWidgetForm from './EditWidgetForm';

function CanvasWidget({ 
  widget, 
  updatePosition, 
  removeWidget,
  isEditing,
  setEditingWidget,
  updateWidgetContent,
}) {
  const [{ isDragging }, drag] = useDrag({
    type: 'WIDGET',
    item: () => ({ id: widget.id, type: widget.type }),
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
    canDrag: () => !isEditing,
  });

  const style = {
    left: `${widget.position.x}px`,
    top: `${widget.position.y}px`,
    opacity: isDragging ? 0.5 : 1,
  };

  const handleDoubleClick = () => {
    if (!isEditing) {
      setEditingWidget(widget.id);
    }
  };

  const renderWidgetContent = () => {
    if (isEditing) {
      return (
        <EditWidgetForm 
          widget={widget} 
          updateWidgetContent={updateWidgetContent}
          cancelEdit={() => setEditingWidget(null)}
        />
      );
    }

    switch (widget.type) {
      case 'text': return <TextWidget content={widget.content} />;
      // case 'image': return <ImageWidget src={widget.content} />;
      case 'button': return <ButtonWidget label={widget.content} />;
      case 'table': return <TableWidget data={widget.content} />;
      default: return <div>Unknown widget type</div>;
    }
  };

  return (
    <div
      ref={drag}
      className={`canvas-widget ${widget.type}-widget ${isEditing ? 'editing' : ''}`}
      style={style}
      onDoubleClick={handleDoubleClick}
    >
      <div className="widget-header">
        <span className="widget-title">{widget.type.toUpperCase()}</span>
        <button
          className="widget-remove-btn"
          onClick={() => removeWidget(widget.id)}
        >
          ×
        </button>
      </div>
      <div className="widget-content">{renderWidgetContent()}</div>
    </div>
  );
}

export default CanvasWidget;