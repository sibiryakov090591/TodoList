import {FilterValuesType, TodoListType} from "../App";
import {v1} from "uuid";

export const DELETE_TODOLIST = "DELETE_TODOLIST"
export const ADD_TODOLIST = "ADD_TODOLIST"
export const CHANGE_TODOLIST_TITLE = "CHANGE_TODOLIST_TITLE"
export const CHANGE_TODOLIST_FILTER = "CHANGE_TODOLIST_FILTER"

const todoListId1 = v1()
const todoListId2 = v1()

export type ActionType = {
    type: string
    todoListId?: string | number
    title?: string
    filterValue?: FilterValuesType
}

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
        case DELETE_TODOLIST:
            return state.filter(item => item.id !== action.todoListId)

        case ADD_TODOLIST: {
            if (action.title) {
                const newTodoList: TodoListType = {
                    id: v1(),
                    title: action.title,
                    filter: "all"
                }
                return [newTodoList, ...state]
            } else return state
        }

        case CHANGE_TODOLIST_TITLE: {
            const copyTodoLists = [...state]
            const todoList = copyTodoLists.find(i => i.id === action.todoListId)
            if (todoList && action.title) todoList.title = action.title
            return copyTodoLists
        }

        case CHANGE_TODOLIST_FILTER: {
            const copyTodoLists = [...state]
            copyTodoLists.map(tl => {
                if (tl.id === action.todoListId && action.filterValue) {
                    tl.filter = action.filterValue
                    return tl
                } else return tl
            })
            return copyTodoLists
        }

        default: return state
    }
}

export const deleteTodoListAC = (todoListId: string | number): ActionType => {
    return {
        type: DELETE_TODOLIST,
        todoListId
    }
}
export const addTodoListAC = (title: string): ActionType => {
    return {
        type: ADD_TODOLIST,
        title
    }
}
export const changeTodoListTitleAC = (title: string, todoListId: number | string): ActionType => {
    return {
        type: CHANGE_TODOLIST_TITLE,
        title,
        todoListId
    }
}
export const changeTodoListFilterAC = (filterValue: FilterValuesType, todoListId: number | string): ActionType => {
    return {
        type: CHANGE_TODOLIST_FILTER,
        filterValue,
        todoListId
    }
}
