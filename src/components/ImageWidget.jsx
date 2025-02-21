import React from 'react';

function ImageWidget({ src }) {
  return (
    <img
      src={src}
      alt="Widget content"
      className="image-widget-content"
    />
  );
}

export default ImageWidget;