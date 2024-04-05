import './widget.css';
import React from 'react';
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
  const widgetRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    const handleDragStart = (event: DragEvent) => {
      const target = event.target as HTMLElement;
      target.classList.add('selected');
      event.dataTransfer?.setData('widgetId', String(widget.id));
    };

    const handleDragEnd = (event: DragEvent) => {
      const target = event.target as HTMLElement;
      target.classList.remove('selected');
    };

    const currentRef = widgetRef.current;
    currentRef?.addEventListener('dragstart', handleDragStart);
    currentRef?.addEventListener('dragend', handleDragEnd);

    return () => {
      if (currentRef) {
        currentRef.removeEventListener('dragstart', handleDragStart);
        currentRef.removeEventListener('dragend', handleDragEnd);
      }
    };
  }, []);
  return (
    <>
      <div className="widget" ref={widgetRef} draggable="true" data-widget-id={widget.id}>
        <button className="delete-button" onClick={() => deleteWidget(widget.id)}>
          X
        </button>
        {widget.type == ' погоды' && <WeatherWidget settings={widget.settings} />}
        {widget.type == '-заметку' && <NoteWidget settings={widget.settings} />}
        {widget.type == ' валют' && <CurencyWidget settings={widget.settings} />}
      </div>
    </>
  );
}
