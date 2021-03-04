import React, {useEffect, useState} from 'react'
import { todolistAPI, tasksAPI } from './todolist-api';


export default {
    title: 'API'
}

// Todo lists
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = 'b7fc8081-88bd-4986-aff3-d296788220bc'
        todolistAPI.updateTodolist(todolistId, 'REACT')
            .then((res) => {

                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const GetTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.getTodolists()
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.createTodolist("Bla bla bla")
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.deleteTodolist("59f59e6a-3646-438f-bccf-7851eafe6b33")
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

// Tasks
export const GetTasks = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        tasksAPI.getTasks("7e12d281-6005-4a24-b2bd-0f6f85fc8573")
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const CreateTask = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        tasksAPI.createTask("7e12d281-6005-4a24-b2bd-0f6f85fc8573", "alohaaa")
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        tasksAPI.deleteTask("b7fc8081-88bd-4986-aff3-d296788220bc", "01574db7-ec41-4875-b742-a5ecfc7b450d")
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        tasksAPI.updateTask("b7fc8081-88bd-4986-aff3-d296788220bc", "64ca58e9-7866-4678-8ef3-9920299b4084", {
            title: "New Foo Title",
            description: null,
            completed: false,
            status: 0,
            priority: 1,
            startDate: null,
            deadline: null
        })
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
