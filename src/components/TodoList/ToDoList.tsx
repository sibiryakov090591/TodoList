import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType, TaskType} from "../../App";
import {AddItemForm} from "../AddItemForm/AddItemForm";
import {EditableSpan} from "./EditableSpan/EditableSpan";

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
    changeTaskTitle: (newTitleValue: string, taskId: string) => void
    changeListTitle: (newTitleValue: string, todoListId: string) => void
}

function ToDoList(props: ToDoListType) {

    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }

    const removeTodoList = () => props.removeTodoList(props.id)

    const onChangeTodoListTitleHandler = (title: string) => {
        props.changeListTitle(title, props.id)
    }

    // filters
    const onAllClickHandler = () => props.changeFilter("all", props.id)
    const onActiveClickHandler = () => props.changeFilter("active", props.id)
    const onCompletedClickHandler = () => props.changeFilter("completed", props.id)

    return (
        <div>
            <h3>
                <EditableSpan title={props.title} onChange={onChangeTodoListTitleHandler}/>
                <button onClick={removeTodoList}>X</button>
            </h3>
            <AddItemForm addItem={addTask} />
            <ul>
                {
                    props.tasks.map(task => {
                        const onClickHandler = () => {props.removeTask(task.id, props.id)}
                        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            let newIsDoneValue = e.currentTarget.checked
                            props.changeTaskStatus(task.id, newIsDoneValue, props.id)
                        }
                        const onChangeTaskTitleHandler = (title: string) => {
                            props.changeTaskTitle(title, task.id)
                        }

                        return (
                            <li key={task.id}
                                className={task.isDone ? "is-done" : ""}
                            >
                                <input type="checkbox"
                                       checked={task.isDone}
                                       onChange={onChangeHandler}
                                />
                                <EditableSpan title={task.title} onChange={onChangeTaskTitleHandler}/>
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

export default ToDoList
