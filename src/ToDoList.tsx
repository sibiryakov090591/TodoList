import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType, TaskType} from "./App";

type ToDoListType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskID:string, todoListId: string) => void
    removeTodoList: (id: string) => void
    changeFilter: (filterValue: FilterValuesType, todoListId: string) => void
    addTask: (title: string, todoListId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todoListId: string) => void
    filter: string
}

function ToDoList(props: ToDoListType) {

    const [title, setTitle] = useState("")
    const [error, setError] = useState<string | null>(null)
    const addTask = () => {
        if (title.trim() !== "") {
            props.addTask(title, props.id)
            setTitle("")
        } else {
            setError("Title is required!")
        }
    }
    const removeTodoList = () => {props.removeTodoList(props.id)}
    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e:KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.charCode === 13) {addTask()}
    }
    const onAllClickHandler = () => {props.changeFilter("all", props.id)}
    const onActiveClickHandler = () => {props.changeFilter("active", props.id)}
    const onCompletedClickHandler = () => {props.changeFilter("completed", props.id)}

    return (
        <div>
            <h3>{props.title} <button onClick={removeTodoList}>X</button></h3>
            <div>
                <input value={title}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}
                       className={error ? "error" : ""}
                />
                <button onClick={addTask}>+</button>
                {error && <div className="error-message">{error}</div>}
            </div>
            <ul>
                {
                    props.tasks.map(task => {
                        const onClickHandler = () => {props.removeTask(task.id, props.id)}
                        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            let newIsDoneValue = e.currentTarget.checked
                            props.changeTaskStatus(task.id, newIsDoneValue, props.id)
                        }

                        return (
                            <li className={task.isDone ? "is-done" : ""}><input type="checkbox"
                                       checked={task.isDone}
                                       onChange={onChangeHandler}/>
                                <span>{task.title}</span>
                                <button onClick={onClickHandler}>x</button>
                            </li>
                        )
                    })
                }
            </ul>
            <div>
                <button className={props.filter === "all" ? "active-filter" : ""}
                        onClick={onAllClickHandler}>All</button>
                <button className={props.filter === "active" ? "active-filter" : ""}
                        onClick={onActiveClickHandler}>Active</button>
                <button className={props.filter === "completed" ? "active-filter" : ""}
                        onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    )
}

export default ToDoList;
