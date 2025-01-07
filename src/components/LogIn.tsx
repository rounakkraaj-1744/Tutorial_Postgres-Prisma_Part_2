import { Button } from "./ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "./ui/card"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { useNavigate } from "react-router-dom";

export default function signup(){
    const navigate = useNavigate();
    return(
        <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Log In</CardTitle>
          <CardDescription>If you already have an account, log in</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Name of your project" className="rounded-xl"/>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Password</Label>
                <Input id="name" placeholder="Enter your password" className="rounded-xl"/>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" className="rounded-xl hover:bg-black hover:text-white">Log In</Button>
          <Button className="bg-black text-white hover:text-black rounded-xl hover:bg-gray-100" onClick={()=>{navigate('/')}}>Sign Up</Button>
        </CardFooter>
      </Card>
    );
}