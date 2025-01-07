import { Button } from "./ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "./ui/card"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function signup() {

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const navigate = useNavigate();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password != confirmPassword) {
      alert("Password do not match!!");
      return;
    }
    try {
      const response = await fetch(`http://localhost:${process.env.PORT}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({username, password})
      }).then(response => response.json()).then(data => console.log(data));

      //@ts-ignore
      if (response.ok){
        alert('Signup successful!')
        setUsername("")
        setPassword("")
        setConfirmPassword("")
      }
      else{
        //@ts-ignore
        const data = await response.json();
        alert(`Signup failed: ${data.error}`);
      }
    }
    catch (error) {
      console.error("Signup error", error);
      alert('An error occurred during signup');
    }
  }

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Sign Up</CardTitle>
        <CardDescription>Create an account in our website</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSignUp}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Name of your project" className="rounded-xl" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Password</Label>
              <Input id="name" placeholder="Enter your password" className="rounded-xl" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Confirm Password</Label>
              <Input id="name" placeholder="Confirm your password" className="rounded-xl" />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" className="rounded-xl hover:bg-black hover:text-white" onClick={() => { navigate('/login') }}>Log In</Button>
        <Button className="bg-black text-white hover:text-black rounded-xl hover:bg-gray-100">Sign Up</Button>
      </CardFooter>
    </Card>
  );
}