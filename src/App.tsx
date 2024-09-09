import { useEffect, useState } from 'react';
import Countdown from './components/Countdown';
import Customize from './components/Customize';
import { CustomTime } from './types.ts';
import './index.css';
const App = () => {
  const [isOnBreak, setBreak] = useState<boolean>(false);
  const [timeObj, setTimeObj] = useState<CustomTime>({
    mainTime: 1500,
    shortBreakTime: 300,
    longBreakTime: 900,
  });

  useEffect(() => {
    const storedTimeObj = localStorage.getItem('timeObj');
    if (storedTimeObj) {
      setTimeObj(JSON.parse(storedTimeObj));
    }
  }, []);
  useEffect(() => {
    localStorage.setItem('timeObj', JSON.stringify(timeObj));
  }, [timeObj]);

  const exportOnBreak = (is: boolean) => {
    setBreak(is);
  };
  useEffect(() => {
    const handleQuit = (e: BeforeUnloadEvent) => {
      e.preventDefault();
    };
    window.addEventListener('beforeunload', handleQuit);
    return () => {
      window.removeEventListener('beforeunload', handleQuit);
    };
  }, []);

  return (
    <div
      className={`
        ${
          isOnBreak ? 'bg-[#0A5C32]' : 'bg-[#114b5f]'
        } mainBg h-screen text-[#dbdbdb]`}
    >
      <Customize
        isOnBreak={isOnBreak}
        customTime={timeObj}
        setTimeObj={setTimeObj}
      />
      <Countdown exportOnBreak={exportOnBreak} customTime={timeObj} />
    </div>
  );
};

export default App;
