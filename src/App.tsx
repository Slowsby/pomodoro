import { useEffect, useState } from 'react';
import Countdwon from './components/Countdown';
import Customize from './components/Customize';
import './output.css';
const App = () => {
  const [isOnBreak, setBreak] = useState(false);
  const exportOnBreak = (is: boolean) => {
    setBreak(is);
  };
  useEffect(() => {
    const handleQuit = (e: BeforeUnloadEvent) => {
      e.preventDefault();
    };
    window.addEventListener('beforeunload', handleQuit);
    return () => {
      window.addEventListener('beforeunload', handleQuit);
    };
  }, []);

  return (
    <div
      className={
        isOnBreak
          ? 'h-screen bg-[#0A5C32] text-[#dbdbdb]'
          : 'h-screen bg-[#114b5f] text-[#dbdbdb]'
      }
    >
      <Customize isOnBreak={isOnBreak} />
      <Countdwon exportOnBreak={exportOnBreak} />
    </div>
  );
};

export default App;
