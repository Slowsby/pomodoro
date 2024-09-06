import { useState, useEffect } from 'react';

const Customize = ({ isOnBreak }: { isOnBreak: boolean }) => {
  const [time, setTime] = useState(
    new Date().toLocaleTimeString([], {
      hour12: true,
      hour: 'numeric',
      minute: '2-digit',
    }),
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(
        new Date().toLocaleTimeString([], {
          hour12: true,
          hour: 'numeric',
          minute: '2-digit',
        }),
      );
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <div className='flex justify-between items-center'>
        <div className='flex-col text-2xl p-4'>
          <p>{time}</p>
        </div>
        <div className=''>
          <button
            className={
              isOnBreak
                ? 'transition ease-in duration-150 text-lg bg-[#0E8145] p-4 rounded-full shadow-lg hover:shadow-2xl hover:drop-shadow-xl py-2 m-2 contrast-50 disabled:cursor-not-allowed'
                : 'transition ease-in duration-150 text-lg bg-[#028090] p-4 rounded-full shadow-lg hover:shadow-2xl hover:drop-shadow-xl py-2 m-2 contrast-50 disabled:cursor-not-allowed'
            }
            disabled
          >
            Customize
          </button>
        </div>
      </div>
    </>
  );
};

export default Customize;
