import { useEffect, useState } from 'react';

interface CountdownProps {
  exportRunning: (runningStatus: boolean) => void;
}
const Countdwon = ({ exportRunning }: CountdownProps) => {
  const [count, setCount] = useState(1);
  const [time, setTime] = useState(1500);
  const [isRunning, setRunning] = useState(false);
  const [isOnBreak, setBreak] = useState(false);

  useEffect(() => {
    exportRunning(isRunning);
    if (isRunning) {
      const countdown = setInterval(() => {
        setTime((time) => {
          if (time === 0) {
            clearInterval(countdown);
            setRunning(false);
            if (!isOnBreak && count % 4 != 0) {
              setTime(300);
              setBreak(true);
              return 300;
            } else if (!isOnBreak && count % 4 === 0) {
              setTime(900);
              setBreak(true);
              return 900;
            }
            if (isOnBreak) {
              setCount((prev) => prev + 1);
              setTime(1500);
              setBreak(false);
              return 1500;
            }
            return 0;
          } else {
            return time - 1;
          }
        });
      }, 1000);
      return () => clearInterval(countdown);
    }
  }, [isRunning, exportRunning, count, isOnBreak]);

  return (
    <div
      className={
        isOnBreak
          ? 'h-screen bg-[#0A5C32] text-[#dbdbdb]'
          : 'h-screen bg-[#114b5f] text-[#dbdbdb]'
      }
    >
      <div className='flex flex-col items-center justify-center p-50'>
        <p className='mt-40 mb-24 text-4xl'>Pomodoro: {count}</p>
        <p className='text-2xl'>
          {isOnBreak ? (count % 4 !== 0 ? 'Short Break!' : 'Long Break!') : ''}
        </p>
        <p className=' mb-10 text-9xl'>
          {`${Math.floor(time / 60)}`.padStart(2, '0')}:
          {`${time % 60}`.padStart(2, '0')}
        </p>
        <div className='flex'>
          <button
            className={
              isOnBreak
                ? 'transition ease-in duration-150 text-3xl bg-[#0E8145] p-4 rounded-full shadow-lg hover:shadow-2xl hover:drop-shadow-xl py-3 m-2'
                : 'transition ease-in duration-150 text-3xl bg-[#028090] p-4 rounded-full shadow-lg hover:shadow-2xl hover:drop-shadow-xl py-3 m-2'
            }
            onClick={() => setRunning(true)}
          >
            Start
          </button>
          <button
            className={
              isOnBreak
                ? 'transition ease-in duration-150 text-3xl bg-[#0E8145] p-4 rounded-full shadow-lg hover:shadow-2xl hover:drop-shadow-xl py-3 m-2'
                : 'transition ease-in duration-150 text-3xl bg-[#028090] p-4 rounded-full shadow-lg hover:shadow-2xl hover:drop-shadow-xl py-3 m-2'
            }
            onClick={() => setRunning(false)}
          >
            Pause
          </button>
          <button onClick={() => setTime(1)}>test</button>
        </div>
        <div className='w-[50%] bg-gray-200 rounded-xl shadow-sm overflow-hidden mt-5'>
          <div className='relative h-6 flex items-center justify-center w-full'>
            <div
              className={
                isOnBreak
                  ? 'absolute top-0 bottom-0 left-0 rounded-xl bg-green-500 transition-all duration-300 ease-linear'
                  : 'absolute top-0 bottom-0 left-0 rounded-xl bg-blue-300 transition-all duration-300 ease-linear'
              }
              style={{
                width: `${
                  isOnBreak
                    ? count % 4 !== 0
                      ? (1 - time / 300) * 100
                      : (1 - time / 900) * 100
                    : (1 - time / 1500) * 100
                }%`,
              }}
            ></div>
            <div className='relative text-indigo-900 font-medium text-sm'>
              {/*
              {`${Math.floor(
                isOnBreak
                  ? count % 4 !== 0
                    ? (1 - time / 300) * 100
                    : (1 - time / 900) * 100
                  : (1 - time / 1500) * 100,
              )}%`}
              */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Countdwon;
