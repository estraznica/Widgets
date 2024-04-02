import './widget.css';
import React from 'react';
import { NewWidget } from '../Column/Column';
import WeatherWidget from '../WeatherWidget/WeatherWidget';
import NoteWidget from '../NoteWidget/NoteWidget';
import CurencyWidget from '../Сurrency/Currency';

export default function Widget({ id, type }: NewWidget) {
  const widId = id;
  return (
    <>
      <div className="widget">
        <button className="delete-button">X</button>
        {type == ' погоды' && <WeatherWidget />}
        {type == '-заметку' && <NoteWidget />}
        {type == ' валют' && <CurencyWidget />}
      </div>
    </>
  );
}
