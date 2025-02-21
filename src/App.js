import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import WidgetBuilder from './components/WidgetBuilder';
import './App.css';

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <WidgetBuilder />
    </DndProvider>
  );
}

export default App;