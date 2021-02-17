import React, {useCallback} from 'react';
import {FilterValuesType, TaskType} from "../../App";
import AddItemForm from "../AddItemForm/AddItemForm";
import {EditableSpan} from "./EditableSpan/EditableSpan";
import {Button, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import Task from "../Task/Task";

type ToDoListType = {
    todoListId: string
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

    let tasksForToDoList = props.tasks;
    if (props.filter === "active") {
        tasksForToDoList = props.tasks.filter(t => !t.isDone)
    }
    if (props.filter === "completed") {
        tasksForToDoList = props.tasks.filter(t => t.isDone)
    }

    const addTask = useCallback((title: string) => {
        props.addTask(title, props.todoListId)
    }, [props.addTask, props.todoListId])

    const removeTodoList = useCallback(() => props.removeTodoList(props.todoListId), [])

    const onChangeTodoListTitleHandler = useCallback((title: string) => {
        props.changeListTitle(title, props.todoListId)
    }, [])

    // filters
    const onAllClickHandler = useCallback(() => props.changeFilter("all", props.todoListId), [props.changeFilter])
    const onActiveClickHandler = useCallback(() => props.changeFilter("active", props.todoListId), [props.changeFilter])
    const onCompletedClickHandler = useCallback(() => props.changeFilter("completed", props.todoListId), [props.changeFilter])

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
                    tasksForToDoList.map(task => <Task key={task.id} todoListId={props.todoListId} task={task}/>)
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

export default React.memo(ToDoList);
