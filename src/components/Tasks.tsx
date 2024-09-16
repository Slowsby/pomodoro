import { useEffect, useState } from 'react';

type TaskProps = {
  isOnBreak: boolean;
  setCurrentTask: (task: string) => void;
};
const Tasks = ({ isOnBreak, setCurrentTask }: TaskProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [inputContent, setInputContent] = useState<string>('');
  const [tasks, setTasks] = useState<string[]>([]);

  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);
  // Delete task
  const deleteEntry = (index: number) => {
    setTasks((prevTasks) => {
      const removeTask = [
        ...prevTasks.slice(0, index),
        ...prevTasks.slice(index + 1)
      ];
      return removeTask;
    });
  };

  // Export first task to be show above the timer
  useEffect(() => {
    setCurrentTask(tasks[0]);
  }, [tasks, setCurrentTask]);

  // Register new task with Enter
  useEffect(() => {
    const handleEnter = (e: KeyboardEvent) => {
      if (
        isOpen &&
        inputContent &&
        (e.code === 'Enter' || e.code === 'NumpadEnter')
      ) {
        setTasks((prevArr) => [...prevArr, inputContent]);
        setInputContent('');
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleEnter);
    return () => {
      window.removeEventListener('keydown', handleEnter);
    };
  });

  return (
    <div className='flex flex-col justify-center items-center'>
      <div
        className={`${isOpen ? 'flex' : 'hidden'} ${isOnBreak ? 'bg-[#4d7e5c]' : 'bg-[#5d8b9c]'} flex-col absolute w-96  rounded-lg mb-[28em] items-center justify-center shadow-2xl drop-shadow-2xl`}
      >
        <p className='text-2xl text-white mb-2 pt-5'>New Task</p>
        <input
          className='text-black focus:outline-none rounded-lg p-2 text-lg w-[90%] '
          type='text'
          placeholder='Describe your task...'
          value={inputContent}
          onChange={(e) => setInputContent(e.target.value)}
          maxLength={80}
        />

        <div className='flex flex-row justify-between w-[90%]'>
          <button
            className='text-white transition ease-out delay-75 bg-red-600  my-2 p-2 rounded-lg hover:bg-red-800 hover:drop-shadow-xl'
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </button>
          <button
            className='text-white transition ease-out delay-50 bg-green-600  my-2 p-2 rounded-lg hover:bg-green-800 hover:drop-shadow-xl'
            onClick={() => {
              if (inputContent) {
                setTasks((prevArr) => [...prevArr, inputContent]);
                setInputContent('');
                setIsOpen(false);
              }
            }}
          >
            Confirm
          </button>
        </div>
      </div>
      <p className='text-3xl mb-5 mt-10'>Tasks</p>
      <div className='flex flex-col w-52 divide-y divide-gray-500'>
        {tasks.map((el, index) => {
          return (
            <div className='flex flex-row items-center justify-between w-full mt-3'>
              <p className='mr-2'>#{index + 1}</p>
              <p className='ml-1'>{el}</p>
              <button
                className='transition  delay-100 ml-3 text-2xl hover:text-green-600 font-black'
                onClick={() => deleteEntry(index)}
              >
                ✓
              </button>
            </div>
          );
        })}
      </div>
      <button
        className='text-5xl hover:contrast-150 active:text-gray-400 p-5'
        onClick={() => setIsOpen(true)}
      >
        +
      </button>
    </div>
  );
};

export default Tasks;
