import { useAuth } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { useTasks } from "../hooks/useTasks"
import {jwtDecode} from "jwt-decode"
import "../styles/dashboard.css"

function Dashboard() {
    const { logout, token } = useAuth()
    const navigate = useNavigate()
    const userEmail = token ? jwtDecode(token).email : ""
    console.log(import.meta.env)
    const {
        tasks,
        error,
        loading,
        handleCreateTask,
        handleToggleTask,
        handleDeleteTask
    } = useTasks(token, logout, navigate)

    const [newTaskTitle, setNewTaskTitle] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!newTaskTitle.trim()) return

        handleCreateTask(newTaskTitle)
        setNewTaskTitle("")
    }

    const handleLogout = () => {
        logout()
        navigate("/login")
    }

    return (
        <div className="app-container">
            <div className="dashboard-card">
                <div className="dashboard-header">
                    <h2 className="dashboard-title">Tareas de {userEmail}</h2>
                    <button className="logout-btn" onClick={handleLogout}>Logout</button>
                </div>
                
                <p className="task-counter">
                    {tasks.filter(t => !t.completed).length} pendientes · {tasks.length} total
                </p>
                

                <form className="task-form" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={newTaskTitle}
                        onChange={(e) => setNewTaskTitle(e.target.value)}
                        placeholder="Nueva tarea..."
                    />
                    <button type="submit">Crear tarea</button>
                </form>

                {loading && <p>Cargando tareas...</p>}
                {error && <p style={{ color: "red" }}>{error}</p>}

                {tasks.length === 0 && !loading ? (
                    <div className="empty-state">
                        <p>No tienes tareas todavía</p>
                        <span>Empieza creando una 👇</span>
                    </div>
                ) : (
                    <ul>
                        {tasks.map(task => (
                            <li key={task.id} className="task-item" onClick={() => handleToggleTask(task.id)}>
                                <span className={`task-text ${task.completed ? "completed" : ""}`}>
                                    {task.title}
                                </span>

                                <button
                                    className="delete-btn"
                                    onClick={(e) => {
                                    e.stopPropagation()
                                    handleDeleteTask(task.id)
                                    }}
                                >
                                    ❌
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>    
    )
}

export default Dashboard