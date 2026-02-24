import { useState, useEffect } from "react"
import { getTasks, createTask, toggleTask, deleteTask } from "../api/tasks"


export function useTasks(token, logout, navigate) {
    const [tasks, setTasks] = useState([])
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (!token) return

        const fetchTasks = async () => {
            try {
                setLoading(true)
                const data = await getTasks(token)
                setTasks(data)
            } catch (err) {
                if (err.status === 401) {
                    logout()
                    navigate("/login")
                    return
                }
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        fetchTasks()

    }, [token, logout, navigate])

    const handleCreateTask = async (title) => {
        try {
            const newTask = await createTask(token, title)
            setTasks(prev => [...prev, newTask])
        } catch (err) {
            if (err.status === 401) {
                logout()
                navigate("/login")
                return
            }
            setError(err.message)
        }
    }

    const handleToggleTask = async (taskId) => {
        try {
            const updated = await toggleTask(token, taskId)
            setTasks(prev =>
                prev.map(task =>
                    task.id === updated.id ? updated : task
                )
            )
        } catch (err) {
            if (err.status === 401) {
                logout()
                navigate("/login")
                return
            }
            setError(err.message)
        }
    }

    const handleDeleteTask = async (taskId) => {
    // Guarda la tarea por si queremos revertir
        const previousTasks = tasks

        // Eliminacion optimista
        setTasks(prev => prev.filter(task => task.id !== taskId))

        try {
            await deleteTask(token, taskId)
        } catch (err) {
            if (err.status === 401) {
                logout()
                navigate("/login")
                return
            }

            // Si algo falla, restaura estado anterior
            setTasks(previousTasks)
            setError("Error al eliminar tarea")
        }
    }

    return {
    tasks,
    error,
    loading,
    handleCreateTask,
    handleToggleTask,
    handleDeleteTask
    }
}

