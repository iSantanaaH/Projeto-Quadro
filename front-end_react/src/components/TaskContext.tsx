import { createContext } from "react";

type Task = {
    id: number;
    title: string;
    description: string;
};

type TaskContextValue = {
    task: Task;
    isContextTaskEmpty: boolean;
    setIsContextTaskEmpty: (isEmpty: boolean) => void;
};

export const TaskContext = createContext<TaskContextValue>({
    task: { id: 0, title: "", description: ""},
    isContextTaskEmpty: false,
    setIsContextTaskEmpty: () => {},
});