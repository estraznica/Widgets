import './column.css';
import React from 'react';
// import NoteWidget from '../NoteWidget/NoteWidget';
// import WeatherWidget from '../WeatherWidget/WeatherWidget';
// import CurencyWidget from '../Сurrency/Currency';
import Widget from '../Widget/Widget';
export type Props = {
  id: string;
  type: string;
};
export type NewWidget = {
  id: string | null;
  type: string;
};
export default function Column({ id, type }: Props) {
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
    };
    setWidgets([...widgets, widgetToAdd]);
  };
  return (
    <>
      <div className="column" id={id}>
        {widgets.map((widget) => (
          <Widget id={widget.id} key={widget.id} type={widget.type} />
        ))}
        <button className="column_addwidgets_button" onClick={addWidget}>
          + Добавить виджет{type}
        </button>
      </div>
    </>
  );
}
