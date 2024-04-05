import './App.css';
import React from 'react';
import Column from './components/Column/Column';
import { NewWidget, Id, WidgetSettings } from './types';
import generateId from './utils/generateId';

export default function App() {
  const [widgets, setWidgets] = React.useState<NewWidget[]>([]);
  const addWidget = (columnId: Id, type: string) => {
    let setting: WidgetSettings = {
      city: 'Екатеринбург',
    };
    if (type == '-заметку') {
      setting = {
        noteValue: '',
      };
    }
    if (type == ' валют') {
      setting = {
        currency1: 'eur',
        currency2: 'rub',
        cur1tocur2: 100,
      };
    }
    const widgetToAdd: NewWidget = {
      id: generateId(),
      type: type,
      columnId: columnId,
      settings: setting,
    };
    setWidgets([...widgets, widgetToAdd]);
  };
  function deleteWidget(id: Id) {
    const filteredWidgets = widgets.filter((widget) => widget.id !== id);
    setWidgets(filteredWidgets);
  }
  return (
    <>
      <main>
        <Column
          id={1}
          type={' погоды'}
          widgets={widgets}
          onSetWidgets={setWidgets}
          onAddWidget={addWidget}
          onDeleteWidget={deleteWidget}
        />
        <Column
          id={2}
          type={' валют'}
          widgets={widgets}
          onSetWidgets={setWidgets}
          onAddWidget={addWidget}
          onDeleteWidget={deleteWidget}
        />
        <Column
          id={3}
          type={'-заметку'}
          widgets={widgets}
          onSetWidgets={setWidgets}
          onAddWidget={addWidget}
          onDeleteWidget={deleteWidget}
        />
      </main>
    </>
  );
}
