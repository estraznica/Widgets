import './column.css';
import React from 'react';
import NoteWidget from '../NoteWidget/NoteWidget';
import WeatherWidget from '../WeatherWidget/WeatherWidget';
import CurencyWidget from '../Сurrency/Currency';
export type Prop = {
  id: string;
  type: string;
};
export default function Column({ id, type }: Prop) {
  const [widgets, setWidgets] = React.useState<React.ReactNode[]>([]);
  const addWidget = () => {
    if (type == ' погоды') {
      setWidgets([...widgets, <WeatherWidget key={widgets.length} />]);
    }
    if (type == '-заметку') {
      setWidgets([...widgets, <NoteWidget key={widgets.length} />]);
    }
    if (type == ' валют') {
      setWidgets([...widgets, <CurencyWidget key={widgets.length} />]);
    }
  };
  return (
    <>
      <div className="column" id={id}>
        {widgets.map((widget, index) => (
          <React.Fragment key={index}>{widget}</React.Fragment>
        ))}
        <button className="column_addwidgets_button" onClick={addWidget}>
          + Добавить виджет{type}
        </button>
      </div>
    </>
  );
}
