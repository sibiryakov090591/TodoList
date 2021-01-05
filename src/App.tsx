import React, {useState} from 'react';
import './App.css';
import ToDoList from "./ToDoList";
import {v1} from "uuid";

export type TodoListsType = {
    id: string
    title: string
    filter: string
}

export type TasksType = {
    [key: string]: Array<TaskType>
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValuesType = "all" | "active" | "completed"

function App() {

    const todoListId1 = v1();
    const todoListId2 = v1();

    const [todoLists, setTodoLists] = useState<Array<TodoListsType>>([
        {
            id: todoListId1,
            title: "What to learn",
            filter: "all"
        },
        {
            id: todoListId2,
            title: "What to buy",
            filter: "all"
        }
    ])

    const [tasks, setTasks] = useState<TasksType>({
        [todoListId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false}
        ],
        [todoListId2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "Juice", isDone: true},
            {id: v1(), title: "Chocolate", isDone: false}
        ]
    })

    function removeTask(taskId: string, todoListId: string) {
        let todoListTasks = tasks[todoListId]
        tasks[todoListId] = todoListTasks.filter(tl => tl.id !== taskId)
        setTasks({...tasks})
    }

    function removeTodoList(id: string) {
        setTodoLists(todoLists.filter(tl => tl.id !== id))
        delete tasks[id]
        setTasks({...tasks})
    }

    function changeFilter(filterValue: FilterValuesType, todoListId: string) {
        let todolist = todoLists.find(tl => tl.id === todoListId)
        if (todolist) {
            todolist.filter = filterValue
            setTodoLists([...todoLists])
        }
    }

    function addTask(title: string, todoListId: string) {
        let task = {id: v1(), title: title, isDone: true}
        let todoListTasks = tasks[todoListId]
        tasks[todoListId] = [task, ...todoListTasks]
        setTasks({...tasks})
    }

    function changeTaskStatus(id: string, isDone: boolean, todoListId: string) {
        let todoListTasks = tasks[todoListId]
        let task = todoListTasks.find(t => t.id === id)
        if (task) {
            task.isDone = isDone
            setTasks({...tasks})
        }
    }

    return (
        <div className="App">
            {
                todoLists.map(tl => {
                    let allTodoListTasks = tasks[tl.id]
                    let tasksForToDoList = allTodoListTasks;
                    if (tl.filter === "active") {
                        tasksForToDoList = allTodoListTasks.filter(t => !t.isDone)
                    }
                    if (tl.filter === "completed") {
                        tasksForToDoList = allTodoListTasks.filter(t => t.isDone)
                    }

                    return (
                        <ToDoList key={tl.id}
                                  id={tl.id}
                                  title={tl.title}
                                  tasks={tasksForToDoList}
                                  removeTask={removeTask}
                                  removeTodoList={removeTodoList}
                                  changeFilter={changeFilter}
                                  addTask={addTask}
                                  changeTaskStatus={changeTaskStatus}
                                  filter={tl.filter}/>
                    )
                })
            }


        </div>
    )
}

export default App;
