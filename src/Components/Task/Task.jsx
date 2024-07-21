import React, { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import './Task.css';

import Timer from '../Timer'

export default function Task(props) {
  const {
    index,
    description,
    created,
    onDeleted,
    onEdit,
    onToggleCompleted,
    active,
    editing,
    timerInSec,
    onTaskAdded,
    onPlayTimer,
    onPauseTimer,
  } = props;

  const [inputValue, setInputValue] = useState(description);
  const [edited, setEdited] = useState(false);

  function onInputChange(event) {
    setInputValue(event.target.value);
  }

  function onSubmit(event) {
    if (inputValue !== description) {
      setEdited(true);

      event.preventDefault();
      onTaskAdded(inputValue, timerInSec, created);

      // eslint-disable-next-line no-undef
      const editingTask = document.querySelectorAll('.task');
      editingTask[index].classList.add('visually-hidden');
    }
    onEdit();
  }

  const onKeyDownTask = (e) => {
    if (e.key === 'Escape') {
      onEdit();
      setInputValue(description);
    }
  };

  const onBluredTask = (e) => {
    e.preventDefault();
    onEdit();
    setInputValue(description);
  };

  let classStatus = active ? 'active' : 'completed';

  classStatus = edited ? 'visually-hidden' : classStatus;

  const text = edited ? inputValue : description;

  const htmlSample = (
    <div className="view">
      <input className="toggle" type="checkbox" onClick={onToggleCompleted} defaultChecked={!active} />
      <label>
        <div className="timer-block">
          <span className="title">{text}</span>
          <Timer timerInSec={timerInSec} onPlayTimer={onPlayTimer} onPauseTimer={onPauseTimer} />
        </div>
        <span className="created">created {created ? formatDistanceToNow(created) : 'непонятная дата'} ago</span>
      </label>
      <button className="icon icon-edit" onClick={onEdit}></button>
      <button className="icon icon-destroy" onClick={onDeleted}></button>
    </div>
  );

  if (editing) {
    return (
      <li className="task editing">
        {htmlSample}
        <form className="new-todo-form" onSubmit={onSubmit}>
          <input
            type="text"
            className="edit"
            onChange={onInputChange}
            value={inputValue}
            autoFocus
            onKeyDown={onKeyDownTask}
            onBlur={onBluredTask}
          />
          <button type="submit"></button>
        </form>
      </li>
    );
  } else {
    return <li className={`task ${classStatus}`}>{htmlSample}</li>;
  }
}