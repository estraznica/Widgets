import './note.css';
import React from 'react';

export default function NoteWidget() {
  const [note, setNote] = React.useState('');
  const handleNoteChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNote(event.target.value);
  };
  return (
    <>
      <textarea
        value={note}
        onChange={handleNoteChange}
        placeholder="Введите заметку..."
        className="note-area"
      />
    </>
  );
}
