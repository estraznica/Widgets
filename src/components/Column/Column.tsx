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
  //в колонке отображаются только виджеты у которых айди колонки такое же как айди текущей колонки
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
      //создаем временный массив всех виджетов
      //убираем перетаскиваемый элемент из него
      const newWidgets = [...widgets];
      newWidgets.splice(draggedWidgetIndex, 1);
      //находим индекс виджета, на чье место хотим вставить перетаскиваемый элемент
      const targetIndex = Array.from(event.currentTarget.children).findIndex((element) =>
        element.contains(event.target as Node),
      );
      const targetIndexInAllWidgets = widgets.indexOf(columnWidgets[targetIndex]);
      if (targetIndex !== -1) {
        //вставляем виджет в массив и обновляем состояние виджетов
        newWidgets.splice(targetIndexInAllWidgets, 0, {
          ...widgets[draggedWidgetIndex],
          columnId: id,
        });
        onSetWidgets(newWidgets);
      } else {
        //если сбрасываем не на виджет, а на пустое место в колонке, либо колонка в целом пустая
        widgets[draggedWidgetIndex].columnId = id;
        newWidgets.push(widgets[draggedWidgetIndex]);
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
