import React from 'react'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Button } from '../ui/button'
import { Separator } from '../ui/separator'
import { Link } from 'react-router-dom'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'

export default function RegisterForm(props) {
    return (
        <div className='m-auto p-5 py-10  lg:p-8 bg-gradient-to-t bg-opacity-20 lg:w-2/5 w-full flex flex-col gap-4 glassmorphism'>
            <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="name">Full Name</Label>
                <Input type="text" id="name" placeholder="Your Good Name" className="w-full"
                    onChange={(e) => props.setName(e.target.value)}
                    value={props.name}
                />
            </div>
            <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="email">Email</Label>
                <Input type="email" id="email" placeholder="Email" className="w-full"
                    onChange={(e) => props.setEmail(e.target.value)}
                    value={props.email}
                />
            </div>
            <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="Password">Password</Label>
                <Input type="password" id="password" placeholder="********" className="w-full"
                    onChange={(e) => props.setPassword(e.target.value)}
                    value={props.password}
                />
            </div>
            <div className="grid grid-cols-2 w-full items-center gap-3">
                <div className='grid w-full items-center gap-2'>
                    <Label htmlFor="age">Age</Label>
                    <Input type="number" id="age" placeholder="e.g 24" className="w-full"
                        onChange={(e) => props.setAge(e.target.value)}
                        value={props.age}
                    />
                </div>
                <div className='grid w-full items-center gap-2'>
                    <Label htmlFor="gender">Gender</Label>
                    <Select onValueChange={(e) => props.setGender(e)} defaultValue={props.gender || 'female'}>
                        <SelectTrigger className="" >
                            <SelectValue placeholder="Select your Gender" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <div className='w-full pt-3'>
                <Button className='w-full' onClick={props.handleSubmit}>Register</Button>
            </div>
            <Separator />
            <Label>Already Have an Account? <Link to={"/login"} className='text-blue-500'>Sign in Now</Link></Label>
        </div>
    )
}
