import { useEffect, useState } from "react"
import { useAuth } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"
import "../styles/auth.css"

function Register() {
  const {login, isAuthenticated} = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard")
    }
  },[isAuthenticated, navigate])

  const handleSubmit = async (e) => {
      e.preventDefault()
      setError("")
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/register`, {
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password : password
            })
        })
        
        if (!response.ok) {
          const text = await response.text()

          try {
              const errorData = JSON.parse(text)
              setError(errorData.error || "Error al registrar")
          } catch {
              setError("Error del servidor")
          }

          return
        }
        const data = await response.json()
        login(data.token)
  }


  return (
      <div className="auth-container">
        <div className="auth-card">
          <h2>FocusBoard - Register</h2>
        
          <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Introduce tu email..." value={email} onChange={(e) => setEmail(e.target.value)}/>
            <input type="password" placeholder="Introduce tu email..." value={password} onChange={(e) => setPassword(e.target.value)}/>
            {error && <p>{error}</p>}
            <button type="submit">Register</button>
            <p className="auth-link">
              ¿Ya tienes cuenta?{" "}
              <span onClick={() => navigate("/login")}>
                Inicia sesión
              </span>
            </p>
          </form>      
        </div>
        
        
        
      </div>
  )
}

export default Register
