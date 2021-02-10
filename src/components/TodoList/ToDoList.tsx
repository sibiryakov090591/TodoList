import React, {ChangeEvent} from 'react';
import {FilterValuesType, TaskType} from "../../App";
import {AddItemForm} from "../AddItemForm/AddItemForm";
import {EditableSpan} from "./EditableSpan/EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";

type ToDoListType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskID: string, todoListId: string) => void
    removeTodoList: (id: string) => void
    changeFilter: (filterValue: FilterValuesType, todoListId: string) => void
    addTask: (title: string, todoListId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todoListId: string) => void
    filter: string
    changeTaskTitle: (newTitleValue: string, taskId: string, todoListId: string) => void
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
            <h3 style={{padding: "10px 0"}}>
                <EditableSpan title={props.title} onChange={onChangeTodoListTitleHandler}/>
                <IconButton onClick={removeTodoList}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
            <div style={{padding: "20px 0"}}>
                {
                    props.tasks.map(task => {
                        const onClickHandler = () => {
                            props.removeTask(task.id, props.id)
                        }
                        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            let newIsDoneValue = e.currentTarget.checked
                            props.changeTaskStatus(task.id, newIsDoneValue, props.id)
                        }
                        const onChangeTaskTitleHandler = (title: string) => {
                            props.changeTaskTitle(title, task.id, props.id)
                        }

                        return (
                            <div key={task.id}
                                className={task.isDone ? "is-done" : ""}
                            >
                                <Checkbox color={"primary"}
                                          checked={task.isDone}
                                          onChange={onChangeHandler}
                                />
                                <EditableSpan title={task.title} onChange={onChangeTaskTitleHandler}/>
                                <IconButton onClick={onClickHandler}>
                                    <Delete/>
                                </IconButton>
                            </div>
                        )
                    })
                }
            </div>
            <div>
                <Button variant={props.filter === "all" ? "outlined" : "text"}
                        color={"primary"}
                        onClick={onAllClickHandler}>All</Button>
                <Button variant={props.filter === "active" ? "outlined" : "text"}
                        color={"primary"}
                        onClick={onActiveClickHandler}>Active</Button>
                <Button variant={props.filter === "completed" ? "outlined" : "text"}
                        color={"secondary"}
                        onClick={onCompletedClickHandler}>Completed</Button>
            </div>
        </div>
    )
}

export default ToDoList
