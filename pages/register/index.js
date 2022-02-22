import Link from "next/link"
import axios from "axios"
import {useRouter} from 'next/router'
import { API_URL } from '../../helper'
import { useState } from 'react'
export default function Register(){
    const router = useRouter()
    const [form, setform] = useState({
        firstname: "",
        lastname:"",
        email:"",
        number:"",
        password:"",
    })
    const changeInput = (e) => {
        setform({
            ...form,
            [e.target.name]: e.target.value

        })
    }

    const handleSubmit = (e) => {
        e.preventDefault() 
        axios.post(`${API_URL}/register`, form)
        .then((response) => {
            router.push('/login')
            alert("registrasi berhasil silahkan login terlebih dahulu")
            
        }).catch((err) => {
            console.log(err)
        })
    }
    return(
        <div>
        
            <div className="row">
                <div className="img col-lg-6" style={{background:'rgb(99, 121, 244)'}}>
                    <div className="d-grid gap-2 col-10 mx-auto mt-5">
                        <div className='text-light col-3 fw-bold fs-3 ms-5'>Zwallet</div>
                        <img src="https://github.com/aliefabdussalam/week3/blob/main/Group%2057.png?raw=true" alt="" className="d-none d-lg-block d-xl-none"></img>
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
                    <form className="form d-grid gap-2 col-10 mx-auto" onSubmit={handleSubmit}>
                <div className="firstname">
                    <input 
                      className="form-control col-10" 
                      type="text" 
                      placeholder="first name" 
                      aria-label=".form-control-lg example" 
                      onChange={changeInput}
                      value={form.firstname} 
                      name="firstname"                      
                      ></input>
                </div>
                <div className="lastname mt-5">
                    <input 
                      className="form-control col-10" 
                      type="text" 
                      placeholder="last name" 
                      aria-label=".form-control-lg example" 
                      onChange={changeInput}
                      value={form.lastname}
                      name="lastname"
                    //   value={user.email}
                      ></input>
                </div>
                <div className="input_email mt-5">
                      <input 
                      className="form-control col-10" 
                      type="text" 
                      placeholder="Email adress" 
                      aria-label=".form-control-lg example" 
                      onChange={changeInput}
                      value={form.email}
                      name="email"
                    //   value={user.email}
                      ></input>
                </div>
                <div className="number mt-5">
                    <input 
                      className="form-control col-10" 
                      type="text" 
                      placeholder="phone number" 
                      aria-label=".form-control-lg example" 
                      onChange={changeInput}
                      value={form.number} 
                      name="number"
                    //   value={user.email}
                      ></input>
                </div>
                <div className="password mt-5">
                    <input 
                    className="form-control col-10" 
                    type="password" 
                    placeholder="Enter your password" 
                    aria-label=".form-control-lg example" 
                    onChange={changeInput}
                    value={form.password}
                    name="password"
                    // value={user.password}
                    ></input>
                </div>
                
            </form>
            <div className="d-grid gap-2 col-10 mx-auto mt-5">
                <button className="btn btn-lg btn-secondary" type="button" onClick={handleSubmit}>Sign up</button>
                <p className="text-center">Already have an account?<Link href="/login">Login</Link></p>
              </div>
                    </section>
                </div>
              
        </div>
        
        </div>
    )
}