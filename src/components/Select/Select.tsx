import React from 'react';
import './select.css'; // Подключаем стили
interface Props {
  options: string[];
  onSelect: (option: string) => void;
}
export default function Select({ options, onSelect }: Props) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedOption, setSelectedOption] = React.useState('Екатеринбург');

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: any) => {
    setSelectedOption(option);
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div className="select">
      <div className="selected-option" onClick={toggleMenu}>
        {selectedOption}
      </div>
      {isOpen && (
        <div className="options">
          {options.map((option: string, index: number) => (
            <div key={index} className="option" onClick={() => handleOptionClick(option)}>
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
