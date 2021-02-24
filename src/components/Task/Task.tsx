import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "../TodoList/EditableSpan/EditableSpan";
import {Delete} from "@material-ui/icons";
import {TaskType} from "../../App";
import {useDispatch} from "react-redux";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "../../todolists-reducer/tasks-reducer";

export type TaskPropsType = {
    todoListId: string
    task: TaskType
}

const Task: React.FC<TaskPropsType> = (props) => {

    const dispatch = useDispatch();

    const onClickHandler = useCallback(() => {
        dispatch(removeTaskAC(props.task.id, props.todoListId));
    }, [dispatch]);

    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        let newStatus = e.currentTarget.checked
        dispatch(changeTaskStatusAC(props.task.id, newStatus, props.todoListId));
    }, [dispatch]);

    const onChangeTaskTitleHandler = useCallback((title: string) => {
        dispatch(changeTaskTitleAC(title, props.task.id, props.todoListId));
    }, [dispatch]);

    return (
        <div className={props.task.isDone ? "is-done" : ""}>
            <Checkbox color={"primary"}
                      checked={props.task.isDone}
                      onChange={onChangeHandler}
            />
            <EditableSpan title={props.task.title} onChange={onChangeTaskTitleHandler}/>
            <IconButton onClick={onClickHandler}>
                <Delete/>
            </IconButton>
        </div>
    )
}

export default Task;