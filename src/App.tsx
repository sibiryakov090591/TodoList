import React, {useState} from 'react';
import './App.css';
import ToDoList from "./ToDoList";
import {v1} from "uuid";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValuesType = "all" | "active" | "completed"

function App() {

    const [tasks, setTasks] = useState<Array<TaskType>>(
        [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "QQQ", isDone: false},
            {id: v1(), title: "WWW", isDone: false},
            {id: v1(), title: "EEE", isDone: false},
            {id: v1(), title: "RRR", isDone: false},
        ]
    )

    const [filter, setFilter] = useState<FilterValuesType>("all")

    function removeTask(taskId: string) {
        let newTasks = tasks.filter(task => task.id !== taskId)
        setTasks(newTasks)
    }

    function changeFilter(filterValue: FilterValuesType) {
        setFilter(filterValue)
    }

    function addTask(title: string) {
        let task = {id: v1(), title: title, isDone: true}
        let newTasks = [task, ...tasks]
        setTasks(newTasks)
    }

    let tasksForToDoList = tasks;
    if (filter === "active") {
        tasksForToDoList = tasks.filter(t => !t.isDone)
    }
    if (filter === "completed") {
        tasksForToDoList = tasks.filter(t => t.isDone)
    }

    return (
        <div className="App">
            <ToDoList title={"What to learn"}
                      tasks={tasksForToDoList}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask}
            />
        </div>
    )
}

export default App;
