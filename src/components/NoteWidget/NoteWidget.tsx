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
        value={note} // Устанавливаем текущее значение заметки
        onChange={handleNoteChange} // Обрабатываем изменения
        placeholder="Введите заметку..."
        className="note-area"
      />
    </>
  );
}
