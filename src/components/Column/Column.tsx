import './column.css';
import React from 'react';
import Widget from '../Widget/Widget';
import { NewWidget } from '../../types';
import { ColumnType } from '../../types';

export default function Column({
  id,
  type,
  widgets,
  onSetWidgets,
  onDeleteWidget,
  onAddWidget,
}: ColumnType) {
  const [columnWidgets, setColumnWidgets] = React.useState<NewWidget[]>(
    widgets.filter((widget) => widget.columnId == id),
  );
  React.useEffect(() => {
    setColumnWidgets(widgets.filter((widget) => widget.columnId == id));
  }, [widgets]);
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
        onSetWidgets(newWidgets);
      }
    }
  };
  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };
  return (
    <>
      <div className="column" onDrop={handleDrop} onDragOver={handleDragOver}>
        {columnWidgets.map((widget) => (
          <Widget widget={widget} key={widget.id} deleteWidget={() => onDeleteWidget(widget.id)} />
        ))}
        <button className="column_addwidgets_button" onClick={() => onAddWidget(id, type)}>
          + Добавить виджет{type}
        </button>
      </div>
    </>
  );
}
