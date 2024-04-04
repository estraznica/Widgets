import './column.css';
import React from 'react';
import Widget from '../Widget/Widget';
import { NewWidget } from '../../types';
import { ColumnType } from '../../types';
import { Id } from '../../types';
export default function Column({ id, type }: ColumnType) {
  function generateId() {
    let Id =
      Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    return Id;
  }
  const [widgets, setWidgets] = React.useState<NewWidget[]>([]);

  const addWidget = () => {
    const widgetToAdd: NewWidget = {
      id: generateId(),
      type: type,
      columnId: id,
    };
    setWidgets([...widgets, widgetToAdd]);
  };

  function deleteWidget(id: Id) {
    const filteredWidgets = widgets.filter((widget) => widget.id !== id);
    setWidgets(filteredWidgets);
  }
  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const widgetId = event.dataTransfer.getData('widgetId');
    const draggedWidgetIndex = widgets.findIndex((widget) => widget.id === widgetId);
    if (draggedWidgetIndex !== -1) {
      const newWidgets = [...widgets];
      newWidgets.splice(draggedWidgetIndex, 1);

      const targetIndex = Array.from(event.currentTarget.children).findIndex((element) =>
        element.contains(event.target as Node),
      );
      if (targetIndex !== -1) {
        newWidgets.splice(targetIndex, 0, { ...widgets[draggedWidgetIndex], columnId: id });
        setWidgets(newWidgets);
      }
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  return (
    <>
      <div className="column" onDrop={handleDrop} onDragOver={handleDragOver}>
        {widgets.map((widget) => (
          <Widget widget={widget} key={widget.id} deleteWidget={() => deleteWidget(widget.id)} />
        ))}
        <button className="column_addwidgets_button" onClick={addWidget}>
          + Добавить виджет{type}
        </button>
      </div>
    </>
  );
}
