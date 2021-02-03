import {TasksType} from "../App";
import {v1} from "uuid";

type RemoveTaskActionType = {
    type: "REMOVE_TASK"
    taskId: string
    todoListId: string
}
type AddTaskActionType = {
    type: "ADD_TASK"
    title: string
    todoListId: string
}
type ChangeTaskStatusActionType = {
    type: "CHANGE_TASK_STATUS"
    taskId: string
    isDone: boolean
    todoListId: string
}
type ChangeTaskTitleActionType = {
    type: "CHANGE_TASK_TITLE"
    taskId: string
    title: string
    todoListId: string
}
type AddTodoListActionType = {
    type: "ADD_TODOLIST"
    title: string
    todoListId: string
}
type DeleteTodoListType = {
    type: "DELETE_TODOLIST"
    todoListId: string
}

type ActionType = RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodoListActionType
    | DeleteTodoListType

export const tasksReducer = (state: TasksType, action: ActionType) => {

    switch (action.type) {
        case "CHANGE_TASK_TITLE": {
            const copyState = {...state}
            const task = copyState[action.todoListId].find(i => i.id === action.taskId)
            if (task) {
                task.title = action.title
                return copyState
            }
        }

        case "ADD_TASK": {
            let newTask = {
                id: v1(),
                title: action.title,
                isDone: false
            }
            return {
                ...state,
                [action.todoListId]: [newTask, ...state[action.todoListId]]
            }
        }

        case "REMOVE_TASK": {
            const copyState = {...state}
            copyState[action.todoListId] = copyState[action.todoListId].filter(task => task.id !== action.taskId)
            return copyState
        }

        case "CHANGE_TASK_STATUS": {
            const copyState = {...state}
            const task = copyState[action.todoListId].find(i => i.id === action.taskId)
            if (task) {
                task.isDone = action.isDone
                return copyState
            }
        }

        case "ADD_TODOLIST": {
            return {
                ...state,
                [action.todoListId]: []
            }
        }

        case "DELETE_TODOLIST": {
            const copyState = {...state}
            delete copyState[action.todoListId]
            return copyState
        }

        default:
            return state
    }
}

export const removeTaskAC = (taskId: string, todoListId: string): RemoveTaskActionType => {
    return {
        type: "REMOVE_TASK",
        taskId,
        todoListId
    }
}
export const addTaskAC = (title: string, todoListId: string): AddTaskActionType => {
    return {
        type: "ADD_TASK",
        title,
        todoListId
    }
}
export const changeTaskStatusAC = (taskId: string, isDone: boolean, todoListId: string): ChangeTaskStatusActionType => {
    return {
        type: "CHANGE_TASK_STATUS",
        taskId,
        isDone,
        todoListId
    }
}
export const changeTaskTitleAC = (taskId: string, title: string, todoListId: string): ChangeTaskTitleActionType => {
    return {
        type: "CHANGE_TASK_TITLE",
        taskId,
        title,
        todoListId
    }
}