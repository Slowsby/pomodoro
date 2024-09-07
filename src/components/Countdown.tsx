import { useEffect, useState } from 'react';
interface CountdownProps {
  exportOnBreak: (is: boolean) => void;
}
const Countdwon = ({ exportOnBreak }: CountdownProps) => {
  const [count, setCount] = useState(1);
  const [time, setTime] = useState(1500);
  const [isRunning, setRunning] = useState(false);
  const [isOnBreak, setBreak] = useState(false);
  const [timeObj] = useState<CustomTime>({
    mainTime: 1500,
    shortBreakTime: 300,
    longBreakTime: 900,
  });

  type CustomTime = {
    mainTime: number;
    shortBreakTime: number;
    longBreakTime: number;
  };
  Notification.requestPermission();

  useEffect(() => {
    if (isRunning) {
      const countdown = setInterval(() => {
        setTime((time) => {
          if (time === 0) {
            clearInterval(countdown);
            setRunning(false);
            if (!isOnBreak && count % 4 != 0) {
              setTime(timeObj.shortBreakTime);
              setBreak(true);
              return timeObj.shortBreakTime;
            } else if (!isOnBreak && count % 4 === 0) {
              setTime(timeObj.longBreakTime);
              setBreak(true);
              return timeObj.longBreakTime;
            }
            if (isOnBreak) {
              setCount((prev) => prev + 1);
              setTime(timeObj.mainTime);
              setBreak(false);
              return timeObj.mainTime;
            }
            return 0;
          } else {
            return time - 1;
          }
        });
      }, 1000);
      return () => clearInterval(countdown);
    }
  }, [isRunning, count, isOnBreak, timeObj]);

  useEffect(() => {
    if (Notification.permission === 'granted' && time === 0) {
      const title = "Time's up!";
      const bodyMessage = isOnBreak ? 'Back to work!' : 'Time to take a break!';
      const options = {
        body: bodyMessage,
      };
      new Notification(title, options);
      const audioNotification = new Audio('./assets/notification.mp3');
      audioNotification.play();
    }
  }, [time, isOnBreak]);

  useEffect(() => {
    exportOnBreak(isOnBreak);
  }, [isOnBreak, exportOnBreak]);
  return (
    <div className='flex flex-col items-center justify-center p-50'>
      <p
        className={
          isOnBreak
            ? 'pomodoro mt-24 mb-16 text-4xl'
            : 'pomodoro mt-24 mb-24 text-4xl'
        }
      >
        Pomodoro: {count}
      </p>
      <p className='breakText text-2xl'>
        {isOnBreak ? (count % 4 !== 0 ? 'Short Break!' : 'Long Break!') : ''}
      </p>
      <p className='countdownTimer mb-10 text-9xl'>
        {`${Math.floor(time / 60)}`.padStart(2, '0')}:
        {`${time % 60}`.padStart(2, '0')}
      </p>
      <div className='flex'>
        <button
          className={
            isOnBreak
              ? 'startBtn transition ease-in duration-150 text-3xl bg-[#0E8145] p-4 rounded-full shadow-lg hover:shadow-2xl hover:drop-shadow-xl hover:bg-[#206635] active:contrast-125 py-3 m-2 mr-8 ml-9'
              : 'startBtn transition ease-in duration-150 text-3xl bg-[#028090] p-4 rounded-full shadow-lg hover:shadow-2xl hover:drop-shadow-xl hover:bg-[#28636b] active:contrast-125 py-3 m-2 mr-8 ml-9'
          }
          onClick={() => setRunning(true)}
        >
          Start
        </button>
        <button
          className={isRunning ? 'skipBtn block' : 'skipBtn hidden'}
          onClick={() => setTime(0)}
        >
          <svg
            version='1.1'
            xmlns='http://www.w3.org/2000/svg'
            xmlnsXlink='http://www.w3.org/1999/xlink'
            width='24px'
            height='24px'
            viewBox='0,0,256,256'
          >
            <g
              fill='#ffffff'
              fillRule='nonzero'
              stroke='none'
              strokeWidth='1'
              strokeLinecap='butt'
              strokeLinejoin='miter'
              strokeMiterlimit='10'
              strokeDasharray=''
              strokeDashoffset='0'
              fontFamily='none'
              fontWeight='none'
              fontSize='none'
              textAnchor='none'
            >
              <g transform='scale(10.66667,10.66667)'>
                <path d='M20,6c-0.552,0 -1,0.448 -1,1v10c0,0.552 0.448,1 1,1c0.552,0 1,-0.448 1,-1v-10c0,-0.552 -0.448,-1 -1,-1zM4.05078,6.92969c-0.53677,-0.02611 -1.05078,0.39175 -1.05078,1v8.14062c0,0.811 0.91317,1.28441 1.57617,0.81641l5.76758,-4.07031c0.564,-0.398 0.564,-1.23481 0,-1.63281l-5.76758,-4.07031c-0.16575,-0.117 -0.34647,-0.17489 -0.52539,-0.18359zM12.05078,6.92969c-0.53677,-0.02611 -1.05078,0.39175 -1.05078,1v8.14062c0,0.811 0.91317,1.28441 1.57617,0.81641l5.76758,-4.07031c0.564,-0.398 0.564,-1.23481 0,-1.63281l-5.76758,-4.07031c-0.16575,-0.117 -0.34647,-0.17489 -0.52539,-0.18359z'></path>
              </g>
            </g>
          </svg>
        </button>
        <button
          className={
            isOnBreak
              ? 'pauseBtn transition ease-in duration-150 text-3xl bg-[#0E8145] p-4 rounded-full shadow-lg hover:shadow-2xl hover:drop-shadow-xl hover:bg-[#206635] active:contrast-125 py-3 m-2 mr-7 ml-9'
              : 'pauseBtn transition ease-in duration-150 text-3xl bg-[#028090] p-4 rounded-full shadow-lg hover:shadow-2xl hover:drop-shadow-xl hover:bg-[#28636b] active:contrast-125 py-3 m-2 mr-7 ml-9'
          }
          onClick={() => setRunning(false)}
        >
          Pause
        </button>
      </div>
      <div className='w-[50%] bg-gray-200 rounded-xl shadow-sm overflow-hidden mt-52'>
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
  );
};
export default Countdwon;
