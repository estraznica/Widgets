import './widget.css';
// import React from 'react';
import { NewWidget } from '../../types';
import WeatherWidget from '../WeatherWidget/WeatherWidget';
import NoteWidget from '../NoteWidget/NoteWidget';
import CurencyWidget from '../Сurrency/Currency';
import { Id } from '../../types';
interface Props {
  widget: NewWidget;
  deleteWidget: (id: Id) => void;
}

export default function Widget(props: Props) {
  const { widget, deleteWidget } = props;
  return (
    <>
      <div className="widget">
        <button className="delete-button" onClick={() => deleteWidget(widget.id)}>
          X
        </button>
        {widget.type == ' погоды' && <WeatherWidget />}
        {widget.type == '-заметку' && <NoteWidget />}
        {widget.type == ' валют' && <CurencyWidget />}
      </div>
    </>
  );
}
