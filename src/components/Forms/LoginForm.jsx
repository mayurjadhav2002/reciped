import React from 'react'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Button } from '../ui/button'
import { Separator } from '../ui/separator'
import { Link } from 'react-router-dom'

export default function LoginForm(props) {
  return (
    <div className='m-auto p-5 py-10  lg:p-8 bg-gradient-to-t bg-opacity-20 lg:w-2/5 w-full flex flex-col gap-4 z-20 glassmorphism'>
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="email">Email</Label>
        <Input type="email" id="email" placeholder="Email" className="w-full" value={props.email}
          onChange={(e) => props.setEmail(e.target.value)}
          required
        />
      </div>
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="Password">Password</Label>
        <Input type="password" id="password" placeholder="********" className="w-full"
          value={props.password}
          onChange={(e) => props.setPassword(e.target.value)}
          required

        />
      </div>
      <div className='w-full pt-3'>
        <Button 
        type="submit"
        className='w-full'
        onClick={props.handleSubmit}
        >Login</Button>
      </div>
      <Separator />
      <Label>Dont Have an Account? <Link to={"/register"} className='text-blue-500'>Create a New Account</Link></Label>
    </div>
  )
}
