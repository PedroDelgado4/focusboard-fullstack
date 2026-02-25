import { useEffect, useState } from "react"
import { useAuth } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"
import "../styles/auth.css"

function Login(){
    const {login, isAuthenticated} = useAuth()
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    useEffect(() => {
        if (isAuthenticated){
            navigate("/dashboard")
        }
    },[isAuthenticated, navigate])
    

    /*const handleLogin = () => {
        login("fake-jwt-token")
        navigate("/dashboard")
    }*/

    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password : password
            })
        })
        
        if(!response.ok){
            const errorData = await response.json()
            setError(errorData.error)
            return
        }
        const data = await response.json()
        console.log(data)
        login(data.token)
        

    }

    return(
        <div className="auth-container">
            <div className="auth-card">
                <h2>FocusBoard - Login</h2>
            
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Introduce tu email..." value={email} onChange={(e) => setEmail(e.target.value)}/>
                    <input type="password" placeholder="Introduce tu contraseña..." value={password} onChange={(e) => setPassword(e.target.value)}/>
                    {error && <p>{error}</p>}
                    <button type="submit">Login</button>
                    <p className="auth-link">
                        ¿No tienes cuenta?{" "}
                        <span onClick={() => navigate("/register")}>
                            Regístrate
                        </span>
                    </p>
                </form>
                <p className="cold-start-warning">
                ⚠️ El backend puede tardar hasta 30 segundos en activarse si está inactivo (hosting gratuito).
                </p>
                <p className="demo-credentials">
                    Usuario demo: <strong>demo@focusboard.com</strong> | Contraseña: <strong>demo123</strong>
                </p>
            </div>
            
            
        </div>
    )
}

export default Login