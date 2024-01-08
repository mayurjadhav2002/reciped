import RegisterForm from '../../components/Forms/RegisterForm'
import React, { useEffect, useState } from 'react'
import { useUserContext } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { RegisterQuery } from '../../Utils/query';
import { toast } from 'react-toastify';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('');
  const [age, setAge] = useState()
  const [gender, setGender] = useState('')

  const { loggedin, handleLoggedin, setUser, handleAccessToken } = useUserContext()
  const navigate = useNavigate();

  useEffect(() => {
    if (loggedin) {
      navigate('/dashboard');
    }
  }, [loggedin])




  const handleSubmit = async () => {
    try {
      console.log({name: name, email: email, password: password, age: age, gender: gender })
      const res = await RegisterQuery({ name: name, email: email, password: password, age: age, gender: gender });
      console.log(res)
      if (res.data.success == false && res.data.code == "exists") {
        toast.error("User with This Email already Exists, please login")
      }


      if (res.data.success == false && res.data.code == "error") {
        toast.error("Some error occured, please try after some time")
      }

      if (res.data.success == true && res.data.code == "success") {
        const userData = res.data.data; // Assuming user information is in data
        await setUser(userData);
        await handleAccessToken({ access_token: res.data.data.access_token, user: userData });
        await handleLoggedin(true);
        toast.success("New Account Created")
      }
    } catch (error) {
      toast.error("Sorry! Error from our side")

    }
  }
  return (
    <div className='mt-10'>
  <h1 className="scroll-m-20 text-4xl mb-10 text-center font-extrabold tracking-tight lg:text-4xl text-primary">
        Create a new Account
      </h1>
      <RegisterForm
        name={name} setName={setName}
        email={email} setEmail={setEmail}
        password={password} setPassword={setPassword}
        age={age} setAge={setAge}
        gender={gender} setGender={setGender}
        handleSubmit={handleSubmit}
      />
    </div>
  )
}

export default Register