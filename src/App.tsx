import { useEffect } from 'react';
import Countdwon from './components/Countdown';
import './output.css';
const App = () => {
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
    <>
      <Countdwon />
    </>
  );
};

export default App;
