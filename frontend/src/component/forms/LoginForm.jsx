import Input from '../ui/Input'
import Button from '../ui/Button'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function LoginForm() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()

        const res = await fetch("http://localhost:4000/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        const data = await res.json()

        if (res.ok) {
            localStorage.setItem("token", data.token);
            navigate("/admin-interface")
        } else {
            alert(data.message)
        }
    };
    return (
        <form onSubmit={handleSubmit}>
            <Input
                label='E-mail'
                type='email'
                value={email}
                name='email'
                placeholder=''
                onChange={(e) => setEmail(e.target.value)} />
            <Input
                label="Mot de passe"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                name="password"
                placeholder="Mot de passe"
            />
            <Button type='submit' >Envoyer </Button>
        </form>
    )
}

export default LoginForm