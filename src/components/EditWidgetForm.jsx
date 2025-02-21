import React, { useState, useEffect, useRef } from 'react';

function EditWidgetForm({ widget, updateWidgetContent, cancelEdit }) {
  const [content, setContent] = useState(widget.content);
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
      if (inputRef.current.select) {
        inputRef.current.select();
      }
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateWidgetContent(widget.id, content);
  };

  const renderEditor = () => {
    switch (widget.type) {
      case 'text':
        return (
          <textarea
            ref={inputRef}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="edit-text-input"
          />
        );
      case 'button':
        return (
          <input
            ref={inputRef}
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="edit-input"
          />
        );
      case 'image':
        return (
          <input
            ref={inputRef}
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="edit-input"
            placeholder="Image URL or placeholder path"
          />
        );
      case 'table':
        return (
          <div className="table-editor">
            <h4>Edit Headers</h4>
            <div className="table-headers-edit">
              {content.headers.map((header, index) => (
                <input
                  key={index}
                  type="text"
                  value={header}
                  ref={index === 0 ? inputRef : null}
                  onChange={(e) => {
                    const newHeaders = [...content.headers];
                    newHeaders[index] = e.target.value;
                    setContent({ ...content, headers: newHeaders });
                  }}
                  className="edit-input"
                />
              ))}
              <button
                type="button"
                onClick={() => {
                  setContent({
                    ...content,
                    headers: [...content.headers, 'New Column'],
                  });
                }}
                className="small-btn"
              >
                +
              </button>
            </div>
            
            <h4>Edit Rows</h4>
            {content.rows.map((row, rowIndex) => (
              <div key={rowIndex} className="table-row-edit">
                {row.map((cell, cellIndex) => (
                  <input
                    key={cellIndex}
                    type="text"
                    value={cell}
                    onChange={(e) => {
                      const newRows = [...content.rows];
                      newRows[rowIndex][cellIndex] = e.target.value;
                      setContent({ ...content, rows: newRows });
                    }}
                    className="edit-input"
                  />
                ))}
              </div>
            ))}
            <button
              type="button"
              onClick={() => {
                const newRow = Array(content.headers.length).fill('');
                setContent({ ...content, rows: [...content.rows, newRow] });
              }}
              className="add-row-btn"
            >
              Add Row
            </button>
          </div>
        );
      default:
        return <p>This widget type cannot be edited</p>;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="edit-form">
      {renderEditor()}
      <div className="edit-actions">
        <button type="submit" className="save-btn">Save</button>
        <button type="button" onClick={cancelEdit} className="cancel-btn">Cancel</button>
      </div>
    </form>
  );
}

export default EditWidgetForm;