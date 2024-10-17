"use client";
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';

const initialElements = [
  { id: 'title', content: 'Título', type: 'text' },
  { id: 'paragraph', content: 'Párrafo', type: 'text' },
  { id: 'image', content: 'Imagen', type: 'image' },
];

const TemplateGenerator = () => {
  const [elements, setElements] = useState([]);
  const [availableElements] = useState(initialElements);

  const onDragStart = (e, id) => {
    e.dataTransfer.setData('text/plain', id);
  };

  const onDragOver = (e) => {
    e.preventDefault();
  };

  const onDrop = (e, targetId) => {
    e.preventDefault();
    const sourceId = e.dataTransfer.getData('text');
    
    if (targetId === 'canvas') {
      const element = availableElements.find(el => el.id === sourceId);
      if (element) {
        const newElement = { ...element, id: `${element.id}-${Date.now()}` };
        setElements([...elements, newElement]);
      }
    } else {
      const updatedElements = [...elements];
      const sourceIndex = updatedElements.findIndex(el => el.id === sourceId);
      const targetIndex = updatedElements.findIndex(el => el.id === targetId);
      
      if (sourceIndex !== -1 && targetIndex !== -1) {
        const [removed] = updatedElements.splice(sourceIndex, 1);
        updatedElements.splice(targetIndex, 0, removed);
        setElements(updatedElements);
      }
    }
  };

  return (
    <div className="flex">
      <div className="w-1/4 p-4">
        <h2 className="text-xl font-bold mb-4">Elementos Disponibles</h2>
        <div>
          {availableElements.map((element) => (
            <div
              key={element.id}
              draggable
              onDragStart={(e) => onDragStart(e, element.id)}
              className="bg-gray-200 p-2 mb-2 rounded cursor-move"
            >
              {element.content}
            </div>
          ))}
        </div>
      </div>
      <div className="w-3/4 p-4">
        <h2 className="text-xl font-bold mb-4">Lienzo</h2>
        <div
          onDragOver={onDragOver}
          onDrop={(e) => onDrop(e, 'canvas')}
          className="bg-white border-2 border-dashed border-gray-300 p-4 min-h-[400px]"
        >
          {elements.map((element) => (
            <div
              key={element.id}
              draggable
              onDragStart={(e) => onDragStart(e, element.id)}
              onDragOver={onDragOver}
              onDrop={(e) => onDrop(e, element.id)}
              className="bg-gray-100 p-2 mb-2 rounded cursor-move"
            >
              {element.type === 'image' ? (
                <img src="/api/placeholder/200/100" alt="placeholder" className="w-full" />
              ) : (
                element.content
              )}
            </div>
          ))}
        </div>
      </div>
      <Card className="mt-4">
        <CardContent>
          <h3 className="text-lg font-semibold mb-2">Vista Previa</h3>
          <div className="bg-white border border-gray-300 p-4">
            {elements.map((element, index) => (
              <div key={index} className="mb-2">
                {element.type === 'image' ? (
                  <img src="/api/placeholder/200/100" alt="placeholder" className="w-full" />
                ) : (
                  element.content
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TemplateGenerator;