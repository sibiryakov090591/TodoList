import {TodoListType} from "../App";
import {v1} from "uuid";
import {
    todoListsReducer,
    addTodoListAC,
    removeTodoListAC,
    changeTodoListTitleAC,
    changeTodoListFilterAC
} from "./todolists-reducer";

let todoListId1 = v1()
let todoListId2 = v1()

let state: TodoListType[] = [
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

beforeEach(() => {
    todoListId1 = v1()
    todoListId2 = v1()
    state = [
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
})

test("Add todoList", () => {
    const testData = todoListsReducer(state, addTodoListAC("Test list"))
    expect(testData.length).toBe(3)
})

test("Delete todoList", () => {
    const testData = todoListsReducer(state, removeTodoListAC(todoListId1))
    expect(testData.length).toBe(1)
})

test("Change todoList title", () => {
    todoListsReducer(state, changeTodoListTitleAC("Test title", todoListId1))
    const todoList = state.find(i => i.id === todoListId1)
    expect(todoList?.title).toBe("Test title")
})

test("Change todoList filter", () => {
    todoListsReducer(state, changeTodoListFilterAC("completed", todoListId1))
    const todoList = state.find(i => i.id === todoListId1)
    expect(todoList?.filter).toBe("completed")
})