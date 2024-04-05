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
    const handleDrag = () => {
      const scrollThreshold = 10;
      const scrollSpeed = 4;
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      const widgetRect = widgetRef.current?.getBoundingClientRect();
      if (widgetRect) {
        const { left, right, top, bottom } = widgetRect;
        const widgetCenterX = (left + right) / 2;
        const widgetCenterY = (top + bottom) / 2;
        if (widgetCenterY < scrollThreshold) {
          window.scrollBy(0, -scrollSpeed); // Прокрутка вверх
        }
        if (widgetCenterY > windowHeight - scrollThreshold) {
          window.scrollBy(0, scrollSpeed); // Прокрутка вниз
        }
        if (widgetCenterX < scrollThreshold) {
          window.scrollBy(-scrollSpeed, 0); // Прокрутка влево
        }
        if (widgetCenterX > windowWidth - scrollThreshold) {
          window.scrollBy(scrollSpeed, 0); // Прокрутка вправо
        }
      }
    };
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
    currentRef?.addEventListener('drag', handleDrag);

    return () => {
      currentRef?.removeEventListener('dragstart', handleDragStart);
      currentRef?.removeEventListener('dragend', handleDragEnd);
      currentRef?.removeEventListener('drag', handleDrag);
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
