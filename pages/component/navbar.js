import axios from "axios";
import React, { useEffect, useState } from "react";
import { BsBell } from "react-icons/bs";
import styles from "../../styles/Navbar.module.css"
import { API_URL } from '../../helper'

const Navbar = () =>{
const [user, setUser] = useState({});
useEffect(() => {
    const id = localStorage.getItem("iduser")
    axios
    .get(`${API_URL}/user/${id}`)
    .then((res) => {
      setUser(res.data.result);
    })
    .catch((err) => {
      alert(err);
    });
 },[]);
    return(
        <div className={`${styles.navbox}`} style={{ height:'12vh'}}>
            <div className="pt-3 row">
              <div className='col-lg-2 offset-lg-1 ps-lg-5 fw-bold fs-3' style={{color:'rgb(99, 121, 244)'}}>Zwallet</div>
              
              <div className="offset-lg-5 col-lg-1 ps-5">
                  <img className={`${styles.profilpict}`} src={`${API_URL}/upload/${user.image}`} alt="contact Profile Picture" />
                </div>

                <div className="col-lg-2 d-flex flex-column ps-0">
                  <span className={` text-capitalize`}>
                    {`${user.firstname} ${user.lastname}`}
                  </span>
                  <small className={``}>
                     {user.number}
                  </small>
                  <BsBell size={20} color={'grey'} className={`${styles.bel}`}/>
                </div>
             
          </div>
        </div>
    )
}
export default Navbar