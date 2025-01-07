import { Button } from "./ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "./ui/card"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function signup() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")

        try {
            const response = await fetch(`http://localhost:${process.env.PORT}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password })
            })

            //@ts-ignore
            if (response.ok) {
                const userData = await response.json();
                localStorage.setItem('user', JSON.stringify(userData));
                navigate('/details');
            } else {
                const errorData = await response.json();
                setError(errorData.error || 'Login failed');
            }
        } catch (error) {
            console.error('Login error:', error);
            setError('An error occurred during login');
        }
    }

    return (
        <Card className="w-[350px]">
            <CardHeader>
                <CardTitle>Log In</CardTitle>
                <CardDescription>If you already have an account, log in</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleLogin}>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="username">Username</Label>
                            <Input id="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="John Doe" className="rounded-xl"/>
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="*********" className="rounded-xl"/>
                        </div>
                    </div>
                    {error && <p className="text-red-500 mt-2">{error}</p>}
                </form>
            </CardContent>
            <CardFooter className="flex justify-between">
                <Button variant="outline" className="rounded-xl hover:bg-black hover:text-white">Log In</Button>
                <Button className="bg-black text-white hover:text-black rounded-xl hover:bg-gray-100" onClick={() => { navigate('/') }}>Sign Up</Button>
            </CardFooter>
        </Card>
    );
}