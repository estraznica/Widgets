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

  return (
    <>
      <div className="column">
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
