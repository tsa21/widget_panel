import React from 'react';
import DraggableWidgetItem from './DraggableWidgetItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFont, faImage, faSquareCheck, faTable } from '@fortawesome/free-solid-svg-icons';

function WidgetPanel({ setIsDraggingNewWidget }) {
  const widgetTypes = [
    { type: 'text', label: 'Text Widget', icon: <FontAwesomeIcon icon={faFont} /> },
    // { type: 'image', label: 'Image Widget', icon: <FontAwesomeIcon icon={faImage} /> },
    { type: 'button', label: 'Button Widget', icon: <FontAwesomeIcon icon={faSquareCheck} /> },
    { type: 'table', label: 'Table Widget', icon: <FontAwesomeIcon icon={faTable} /> },
  ];

  return (
    <div className="widget-panel">
      <h2>Widgets</h2>
      <div className="widget-list">
        {widgetTypes.map((widget) => (
          <DraggableWidgetItem
            key={widget.type}
            type={widget.type}
            label={widget.label}
            icon={widget.icon}
            setIsDraggingNewWidget={setIsDraggingNewWidget}
          />
        ))}
      </div>
    </div>
  );
}

export default WidgetPanel;