import './note.css';
import React from 'react';
import { WidgetSettings } from '../../types';
interface Props {
  settings: WidgetSettings;
}

export default function NoteWidget(props: Props) {
  const { settings } = props;
  const [note, setNote] = React.useState(settings.noteValue);
  const handleNoteChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNote(event.target.value);
    settings.noteValue = event.target.value;
  };
  return (
    <>
      <textarea
        value={note}
        onChange={handleNoteChange}
        placeholder="Пустая заметка"
        spellCheck="false"
        className="note-area"
      />
    </>
  );
}
