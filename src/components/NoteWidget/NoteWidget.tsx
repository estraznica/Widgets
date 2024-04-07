import './note.css';
import React from 'react';
import { WidgetProps } from '../../types';

export default function NoteWidget(props: WidgetProps) {
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
