import Link from "next/link"
import axios from "axios"
import {useRouter} from 'next/router'
import { useState } from 'react'
export default function Login(){
    const [user, setUser] = useState({
        email: "",
        password: "",
      })
      
      const setData=(event)=>{
        setUser({
          ...user,
          [event.target.name]: event.target.value
        })
      }
      const router = useRouter()
      const submitLogin = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8080/login', user)
         .then((response) => {
          router.push('/dashboard')
          const token = response.data
          const id = response.data.result.id
          console.log(response.data.result)
            localStorage.setItem("token", token)
            localStorage.setItem("iduser", id)
        }).catch((err) => {
          alert("email/password salah")
          console.log(err)
        })
      }
    return(
        <div>
        
            <div className="row">
                <div className="img col-lg-6" style={{background:'rgb(99, 121, 244)'}}>
                    <div className="d-grid gap-2 col-10 mx-auto mt-5">
                        <div className='text-light col-3 fw-bold fs-3 ms-5'>Zwallet</div>
                        <img src="https://github.com/aliefabdussalam/week3/blob/main/Group%2057.png?raw=true" alt=""></img>
                        <h3 className="mt-5 text-light">App that Covering Banking Needs.</h3>
                        <p className="text-light mt-4 col-8">Zwallet is an application that focussing in banking needs for all users
                        in the world. Always updated and always following world trends.
                        5000+ users registered in Zwallet everyday with worldwide
                        users coverage.</p>
                    </div>
                </div>
                <div className="col-lg-6 col-sm-12">
                    <section className="content">
                    <div className="d-grid gap-2 col-10 mx-auto mt-5">
                        <h3 className="mt-5">Start Accessing Banking Needs<br />With All Devices and All Platforms<br />With 30.000+ Users</h3>
                        <p className="text-muted mt-4 col-8">Transfering money is eassier than ever, you can access Zwallet wherever you are. Desktop, laptop, mobile phone? we cover all of that for you!</p>
                    </div>
                    <form className="form d-grid gap-2 col-10 mx-auto" onSubmit={submitLogin}>
                <div className="input_email">
                      <input 
                      className="form-control col-10" 
                      type="text" 
                      placeholder="Email adress" 
                      aria-label=".form-control-lg example" 
                      onChange={setData} 
                      name="email"
                      value={user.email}
                      ></input>
                </div>
                <div className="password mt-5">
                    <input 
                    className="form-control col-10" 
                    type="password" 
                    placeholder="Enter your password" 
                    aria-label=".form-control-lg example" 
                    onChange={setData} 
                    name="password"
                    value={user.password}
                    ></input>
                </div>
                <div className="forgot_password" >
                    <p className="text-end mt-2" href="#">Forgot password?</p>  
                </div>
            </form>
            <div className="d-grid gap-2 col-10 mx-auto mt-5">
                <button className="btn btn-lg btn-secondary" type="button" onClick={submitLogin}>Login</button>
                <p className="text-center">Don’t have an account?<Link href="/register">Signup</Link></p>
              </div>
                    </section>
                </div>
              
        </div>
        
        </div>
    )
}