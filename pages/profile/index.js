import {useRouter} from 'next/router'
import LayoutDefault from "../../layout/default"
import Link from "next/link"
import axios from "axios"
import React, { useEffect, useState } from "react";
import styles from '../../styles/Profile.module.css'
import { API_URL } from '../../helper'
import { height } from 'dom-helpers';

export default function Profile(){
    const [user, setUser] = useState({});
    const router = useRouter()
    const handlelogout = (e) =>{
        e.preventDefault()
        localStorage.clear()
        router.push('/')
    }
    useEffect(() => {
        const id = localStorage.getItem("iduser")
        axios
        .get(`http://localhost:8080/user/${id}`)
        .then((res) => {
          setUser(res.data.result);
        })
        .catch((err) => {
          alert(err);
        });
     },[]);
    return(
        <LayoutDefault>
                  
                  <div className="col-lg-10">
                    <div className={`row card bg-white border-0 mt-4 mb-5 ms-2`} style={{ height:'70vh'}}>
                    <div className="text-center mt-lg-3">
                      <img className={`${styles.profilpict}`} src={`${API_URL}/upload/${user.image}`} alt="contact Profile Picture" />
                    </div>
                    <div>
                      <p className="text-center text-capitalize fw-bold mt-2 mb-0">
                        {user.firstname} {user.lastname}
                      </p>
                    </div>    
                    <div>
                      <p className="text-center">
                        {user.number}
                      </p>
                    </div>     
  <div className={`col-lg-12 mt-lg-0 mt-5`}>
        <div className="card col-lg-10 col-12 bg-secondary text-center offset-1 mt-5 mb-3" style={{color:"white", cursor:'pointer'}}>
          <div onClick={handlelogout}>           
              Log Out           
          </div>
        </div>
      </div>
  </div>
  </div>
            
        </LayoutDefault>
    )
}
