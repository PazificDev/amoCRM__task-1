import { useState, useEffect } from "react";
import useInput from "./hooks/useInput";

function App() {

  const input = useInput('', {isEmpty: true, isNumber: true, isPositive: true});

  const [isOver, setIsOver] = useState(false);
  const [[h, m, s], setTimer] = useState([0, 0, 0]);

  const handleStart = () => {
    const hours = Math.floor(input.value / 3600);
    const minutes = Math.floor(input.value % 3600 / 60);
    const seconds = input.value % 60;
    setTimer([hours, minutes, seconds]);
    setIsOver(false);
    input.onClear();
  }

  const tick =()=>{
    if(isOver) return;
    if (h === 0 && m === 0 && s === 0) {
      setIsOver(true);
    } else if (m === 0 && s === 0) {
      setTimer([h - 1, 59, 59]);
    } else if (s === 0) {
      setTimer([h, m - 1, 59]);
    } else {
      setTimer([h, m, s - 1]);
    }
}

useEffect(()=>{
    const timer = setInterval(() => tick(), 1000);
    return () => clearInterval(timer);
});

  return (
    <div className="App">
      <input placeholder="Seconds" type="text" onChange={e => input.onChange(e)} onBlur={e => input.onBlur(e)} value={input.value}/>

      <button onClick={handleStart} disabled={input.isEmpty || input.isNumberError || input.isNumberPositiveError}>Start</button>

      <br />
      <br />

      {input.isDirty && <span>
        {
        input.isEmpty ? "Поле не может быть пустым" : input.isNumberError ? "Допустимы только числовые значения" : input.isNumberPositiveError ? "Введите положительное значение" : ""
        }
      </span>}

      <br />
      <br />

      <span>{`${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`}</span>
    </div>
  );
}

export default App;
