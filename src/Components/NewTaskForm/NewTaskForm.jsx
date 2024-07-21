import React, { useState } from 'react';
import './NewTaskForm.css';

let placeholder = 'What needs to be done?';

export default function NewTaskForm({ onTaskAdded }) {
  const [inputValue, setInputValue] = useState('');
  const [inputMinuteValue, setInputMinuteValue] = useState(null);
  const [inputSecondValue, setInputSecondValue] = useState(null);

  const onInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const onInputChangeMinInForm = (event) => {
    setInputMinuteValue(event.target.value);
  };

  const onInputChangeSecInForm = (event) => {
    setInputSecondValue(event.target.value);
  };

  const onSubmit = (event) => {
    const inputTimeInSec = Number(inputMinuteValue * 60) + Number(inputSecondValue);

    event.preventDefault();
    placeholder = "What needs to be done?";

    if (inputValue && inputTimeInSec > 0) {
      onTaskAdded(inputValue, inputTimeInSec);
      setInputValue('');
      setInputMinuteValue(0);
      setInputSecondValue(0);

      // eslint-disable-next-line no-undef
      const form = document.querySelectorAll('.new-todo-form__timer');
      form[0].value = null;
      form[1].value = null;
    }
  };

  return (
    <form className="new-todo-form" onSubmit={onSubmit}>
      <input className="new-todo" placeholder={placeholder} autoFocus onChange={onInputChange} value={inputValue} />
      <input className="new-todo-form__timer" placeholder="Min" onChange={onInputChangeMinInForm} type="number" />
      <input className="new-todo-form__timer" placeholder="Sec" onChange={onInputChangeSecInForm} type="number" />
      <button type="submit"></button>
    </form>
  );
}