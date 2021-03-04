import axios from 'axios'


type TodolistType= {
    id: string
    addedDate: string
    order: number
    title: string
}
type ResponseTodolistType<T = {}> = {
    resultCode: number
    messages: string[]
    fieldsErrors: string[]
    data: T
}

type TaskResponseType = {
    addedDate: string
    deadline: string | null
    description: string | null
    id: string
    order: number
    priority: number
    startDate: string | null
    status: number
    title: string
    todoListId: string
}
type ResponseTaskType<T = {}> = {
    data: T
    fieldsErrors: string[]
    messages: string[]
    resultCode: number
}
type BodyUpdateTaskType = {
    title: string
    description: string | null
    completed: boolean
    status: number
    priority: number
    startDate: string | null
    deadline: string | null
}

type GetTasksResponseType = {
    error: string | null
    items: TaskResponseType[]
    totalCount: number
}



const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '998429a7-d76e-46af-a3e8-87cfbdfdd453'
    }
})


export const todolistAPI = {
    getTodolists() {
        return instance.get<TodolistType[]>(`todo-lists`)
    },

    createTodolist(title: string) {
        return instance.post<ResponseTodolistType<{item: TodolistType}>>(`todo-lists`, {title})
    },

    deleteTodolist(todolistId: string) {
        return instance.delete<ResponseTodolistType>(`todo-lists/${todolistId}`)
    },

    updateTodolist(todolistId: string, title: string) {
        return instance.put<ResponseTodolistType>(`todo-lists/${todolistId}`, {title})
    }
}

export const tasksAPI = {
    getTasks(todolistId: string) {
        return instance.get<GetTasksResponseType>(`/todo-lists/${todolistId}/tasks`)
    },

    createTask(todolistId: string, title: string) {
        return instance.post<ResponseTaskType<{item: TaskResponseType}>>(`/todo-lists/${todolistId}/tasks`, {title})
    },

    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseTaskType>(`/todo-lists/${todolistId}/tasks/${taskId}`)
    },

    updateTask(todolistId: string, taskId: string, body: BodyUpdateTaskType) {
        return instance.put<ResponseTaskType<{item: TaskResponseType}>>(`/todo-lists/${todolistId}/tasks/${taskId}`, body)
    },
}
