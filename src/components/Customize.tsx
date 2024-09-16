import { useState, useEffect } from 'react';
import { CustomTime } from '../types';

interface CustomizeProps {
  isOnBreak: boolean;
  setTimeObj: React.Dispatch<
    React.SetStateAction<{
      mainTime: number;
      shortBreakTime: number;
      longBreakTime: number;
    }>
  >;
  customTime: CustomTime;
}

const Customize = ({ isOnBreak, setTimeObj, customTime }: CustomizeProps) => {
  const [show, setShow] = useState<boolean>(false);
  const [time, setTime] = useState<string>(
    new Date().toLocaleTimeString([], {
      hour12: true,
      hour: 'numeric',
      minute: '2-digit'
    })
  );
  const [mTime, setMTime] = useState<number>(0);
  const [sBreak, setSBreak] = useState<number>(0);
  const [lBreak, setLBreak] = useState<number>(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(
        new Date().toLocaleTimeString([], {
          hour12: true,
          hour: 'numeric',
          minute: '2-digit'
        })
      );
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const changeTime = (
    mainTime: number,
    shortBreakTime: number,
    longBreakTime: number
  ) => {
    setTimeObj({
      mainTime,
      shortBreakTime,
      longBreakTime
    });
  };

  const handleSubmit = () => {
    if (
      typeof mTime === 'number' &&
      mTime > 0 &&
      !isNaN(mTime) &&
      typeof sBreak === 'number' &&
      sBreak > 0 &&
      !isNaN(sBreak) &&
      typeof lBreak === 'number' &&
      lBreak > 0 &&
      !isNaN(lBreak)
    ) {
      changeTime(mTime * 60, sBreak * 60, lBreak * 60);
    } else {
      alert('Please enter a positive number.');
    }
  };
  return (
    <>
      <div className='flex justify-between items-center'>
        <div className='flex-col text-2xl p-4'>
          <p className='date'>{time.toLocaleLowerCase()}</p>
        </div>
        <div className='flex-col'>
          <button
            className={`
              ${isOnBreak ? 'bg-[#0E8145] hover:bg-[#206635]' : 'bg-[#028090] hover:bg-[#28636b]'} customizeBtn transition ease-in duration-150 text-lg p-4 rounded-full shadow-lg hover:shadow-2xl hover:drop-shadow-xl py-2 m-2 hover:contrast-150
            `}
            onClick={() => setShow((prev) => !prev)}
          >
            Customize
          </button>
          <div
            className={` ${show ? 'block' : 'hidden'}  ${isOnBreak ? 'bg-[#0E8145]' : 'bg-[#028090]'} customizeDiv rounded-lg absolute flex flex-col justify-center items-center pt-2 p-5 m-2 right-0 w-56 mb-0 pb-2`}
          >
            <h3 className='pt-0 mt-0 text-2xl'>Customize Times</h3>
            <p className='pt-0 mb-1'>(minutes)</p>
            <div className='flex justify-start overflow-auto p-1'>
              <label className='w-28' htmlFor='mainTime'>
                Main Time{' '}
              </label>
              <input
                className='text-black mb-2 text-center rounded-md'
                id='mainTime'
                name='mainTime'
                size={5}
                placeholder={`${customTime.mainTime / 60}`}
                onChange={(e) => setMTime(parseInt(e.target.value))}
                required
              />
            </div>
            <div className='flex'>
              <label className='w-28' htmlFor='shortBreak'>
                Short Break{' '}
              </label>
              <input
                className='text-black mb-2 text-center rounded-md'
                id='shortBreak'
                name='shortBreak'
                size={5}
                placeholder={`${customTime.shortBreakTime / 60}`}
                onChange={(e) => setSBreak(parseInt(e.target.value))}
                required
              />
            </div>
            <div className='flex'>
              <label className='w-28' htmlFor='longBreak'>
                Long Break{' '}
              </label>
              <input
                className='text-black mb-2 text-center rounded-md'
                id='longBreak'
                name='longBreak'
                size={5}
                placeholder={`${customTime.longBreakTime / 60}`}
                onChange={(e) => setLBreak(parseInt(e.target.value))}
                required
              />
            </div>
            <div className='flex flex-row'>
              <input
                className={`${isOnBreak ? 'bg-[#0d6e3c]' : 'bg-[#1d6974]'} p-2 rounded-t-lg cursor-pointer mr-5`}
                type='button'
                value={'Default'}
                onClick={() => changeTime(25 * 60, 5 * 60, 15 * 60)}
              />{' '}
              <input
                className={`${isOnBreak ? 'bg-[#0d6e3c]' : 'bg-[#1d6974]'} p-2 rounded-t-lg cursor-pointer ml-5`}
                type='button'
                value={'Submit'}
                onClick={() => handleSubmit()}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Customize;
