import Task from '../Task';
import './TaskList.css';

let elems = null;
let todoArray = [];
export default function TaskList(props) {
  const { todoData, filter, onEdit, onDeleted, onToggleCompleted, onTaskAdded, inputTime, onPlayTimer, onPauseTimer } =
    props;
  function taskTemplate() {
    elems = todoArray.map((item, index) => {
      const { id, ...itemProps } = item;

      return (
        <Task
          {...itemProps}
          key={item.id}
          id={item.id}
          onDeleted={() => onDeleted(id)}
          onToggleCompleted={() => onToggleCompleted(id)}
          onEdit={() => onEdit(id)}
          onTaskAdded={(text, time) => onTaskAdded(text, time)}
          inputTime={inputTime}
          onPlayTimer={() => onPlayTimer(id)}
          onPauseTimer={() => onPauseTimer(id)}
          index={index}
        />
      );
    });
  }

  if (filter === 'all') {
    todoArray = [...todoData];
    taskTemplate();
  }

  if (filter === 'active') {
    todoArray = todoData.filter((el) => el.active);
    taskTemplate();
  }

  if (filter === 'completed') {
    todoArray = todoData.filter((el) => !el.active);
    taskTemplate();
  }

  return <ul className="todo-list">{elems}</ul>;
}

TaskList.defaultProps = {
  onDeleted: () => {},
  onToggleCompleted: () => {},
  filter: 'all',
};

TaskList.propTypes = {
  filter: (props, propName, componentName) => {
    const value = props[propName];

    if (value === 'all' || value === 'active' || value === 'completed') {
      return null;
    }
    return new Error(`${componentName}: Неправильное значение фильтра ${propName}: ${value}!!!`);
  },
};