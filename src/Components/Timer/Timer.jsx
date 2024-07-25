export default function Timer(props) {
  const { timerInSec, onPlayTimer, onPauseTimer } = props;

  const mins = Math.floor(timerInSec / 60);
  const secs = timerInSec - mins * 60;
  const timerShow = timerInSec > 0 ? `${mins} : ${secs} ` : 'Время вышло!';

  return (
    <span className="description">
      <button className="icon icon-play" onClick={onPlayTimer}></button>
      <button className="icon icon-pause" onClick={onPauseTimer}></button>
      <span className="timer">{timerShow}</span>
    </span>
  );
}