import {FilterValuesType, TodoListType} from "../App";
import {v1} from "uuid";

const todoListId1 = v1()
const todoListId2 = v1()

type DeleteTodoListType = {
    type: "DELETE_TODOLIST"
    todoListId: string
}
type AddTodoListType = {
    type: "ADD_TODOLIST"
    title: string
    todoListId: string
}
type ChangeTodoListTitleType = {
    type: "CHANGE_TODOLIST_TITLE"
    title: string
    todoListId: string
}
type ChangeTodoListFilterType = {
    type: "CHANGE_TODOLIST_FILTER"
    filterValue: FilterValuesType
    todoListId: string
}

type ActionType = DeleteTodoListType | AddTodoListType | ChangeTodoListTitleType | ChangeTodoListFilterType

const initialState: TodoListType[] = [
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
]

export const todoListsReducer = (state = initialState, action: ActionType) => {
    switch (action.type) {
        case "DELETE_TODOLIST":
            return state.filter(item => item.id !== action.todoListId)

        case "ADD_TODOLIST": {
            const newTodoList: TodoListType = {
                id: action.todoListId,
                title: action.title,
                filter: "all"
            }
            return [newTodoList, ...state]
        }

        case "CHANGE_TODOLIST_TITLE": {
            const copyTodoLists = [...state]
            const todoList = copyTodoLists.find(i => i.id === action.todoListId)
            if (todoList) todoList.title = action.title
            return copyTodoLists
        }

        case "CHANGE_TODOLIST_FILTER": {
            const copyTodoLists = [...state]
            copyTodoLists.map(tl => {
                if (tl.id === action.todoListId) {
                    tl.filter = action.filterValue
                    return tl
                } else return tl
            })
            return copyTodoLists
        }

        default:
            return state
    }
}

export const deleteTodoListAC = (todoListId: string): DeleteTodoListType => {
    return {
        type: "DELETE_TODOLIST",
        todoListId
    }
}
export const addTodoListAC = (title: string): AddTodoListType => {
    return {
        type: "ADD_TODOLIST",
        title,
        todoListId: v1()
    }
}
export const changeTodoListTitleAC = (title: string, todoListId: string): ChangeTodoListTitleType => {
    return {
        type: "CHANGE_TODOLIST_TITLE",
        title,
        todoListId
    }
}
export const changeTodoListFilterAC = (filterValue: FilterValuesType, todoListId: string): ChangeTodoListFilterType => {
    return {
        type: "CHANGE_TODOLIST_FILTER",
        filterValue,
        todoListId
    }
}
