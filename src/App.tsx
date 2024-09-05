import { useEffect, useState } from 'react';
import Countdwon from './components/Countdown';
import './output.css';
const App = () => {
  const [isRunning, setRunning] = useState(false);
  const exportRunning = (runningStatus: boolean) => {
    setRunning(runningStatus);
  };

  useEffect(() => {
    const handleQuit = (e: BeforeUnloadEvent) => {
      e.preventDefault();
    };
    if (isRunning) {
      window.addEventListener('beforeunload', handleQuit);
    } else {
      window.removeEventListener('beforeunload', handleQuit);
    }
    return () => {
      window.addEventListener('beforeunload', handleQuit);
    };
  }, [isRunning]);
  return (
    <>
      <Countdwon exportRunning={exportRunning} />
    </>
  );
};

export default App;
