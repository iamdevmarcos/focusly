import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

interface Task {
  id: string;
  title: string;
  isDone: boolean;
}

interface TasksContextProps {
  tasks: Task[];
  addTask: (title: string) => void;
  toggleTaskStatus: (id: string) => void;
  removeCompletedTasks: () => void;
  newTaskTitle: string;
  setNewTaskTitle: (value: string) => void;
  handleAddTask: () => void;
}

const TasksContext = createContext<TasksContextProps | undefined>(undefined);

export const TasksProvider = ({ children }: PropsWithChildren) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  const updateLocalStorage = useCallback((tasks: Task[]) => {
    // Debounce localStorage writes to prevent blocking
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    saveTimeoutRef.current = setTimeout(() => {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }, 300);
  }, []);

  useEffect(() => {
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, []);

  const addTask = useCallback(
    (title: string) => {
      const newTask: Task = { id: Date.now().toString(), title, isDone: false };

      setTasks((prevTasks) => {
        const updatedTasks = [...prevTasks, newTask];
        updateLocalStorage(updatedTasks);
        return updatedTasks;
      });
    },
    [updateLocalStorage],
  );

  const toggleTaskStatus = useCallback(
    (id: string) => {
      setTasks((prevTasks) => {
        const updatedTasks = prevTasks.map((task) =>
          task.id === id ? { ...task, isDone: !task.isDone } : task,
        );
        updateLocalStorage(updatedTasks);
        return updatedTasks;
      });
    },
    [updateLocalStorage],
  );

  const removeCompletedTasks = useCallback(() => {
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.filter((task) => !task.isDone);
      updateLocalStorage(updatedTasks);
      return updatedTasks;
    });
  }, [updateLocalStorage]);

  const handleAddTask = () => {
    if (newTaskTitle.trim() !== "") {
      addTask(newTaskTitle);
      setNewTaskTitle("");
    }
  };

  const contextValue = useMemo(
    () => ({
      tasks,
      addTask,
      toggleTaskStatus,
      removeCompletedTasks,
      newTaskTitle,
      setNewTaskTitle,
      handleAddTask,
    }),
    [
      tasks,
      addTask,
      toggleTaskStatus,
      removeCompletedTasks,
      newTaskTitle,
      handleAddTask,
    ],
  );

  return (
    <TasksContext.Provider value={contextValue}>
      {children}
    </TasksContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TasksContext);
  if (!context) {
    throw new Error("useTasks must be used within a TasksProvider");
  }
  return context;
};
