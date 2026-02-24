const API_URL = import.meta.env.VITE_API_URL + "/api/tasks/"
export async function getTasks(token) {
    const response = await fetch(API_URL, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    if (!response.ok) {
        const text = await response.text()

        // Intentamos parsear JSON si es JSON
        try {
            const errorJson = JSON.parse(text)
            throw new Error(errorJson.error || "Error desconocido")
        } catch {
            throw new Error("Error del servidor")
        }
    }

    return response.json()
}

export async function createTask(token, title) {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ title })
    })

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        const error = new Error(errorData.error || "Error al crear tarea")
        error.status = response.status
        throw error
    }

    return response.json()
}

export async function toggleTask(token, taskId) {
    const response = await fetch(`${API_URL}${taskId}`, {
        method: "PATCH",
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        const error = new Error(errorData.error || "Error al actualizar tarea")
        error.status = response.status
        throw error
    }

    return response.json()
}

export async function deleteTask(token, taskId) {
    const response = await fetch(`${API_URL}${taskId}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        const error = new Error(errorData.error || "Error al eliminar tarea")
        error.status = response.status
        throw error
    }

    return true
}