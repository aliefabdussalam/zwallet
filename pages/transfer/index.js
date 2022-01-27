import {useRouter} from 'next/router'
import React, {useState, useEffect} from 'react'
import LayoutDefault from "../../layout/default"
import axios from "axios";
import { API_URL } from '../../helper'
import styles from '../../styles/Transfer.module.css'

export default function Transfer(){
    const router = useRouter()
    const [search, setSearch] = useState("");
    const [receiver, setReceiver] = useState([]);
    useEffect(() => {
        axios
          .get(`${API_URL}/user`)
          .then((res) => {
            setReceiver(res.data.result);
          })
          .catch((err) => {
            console.log(err.response);
          });
      }, []);
      const submitSearch = (e) => {
        e.preventDefault();
        axios
          .get(`${API_URL}/user?search=${search}`)
          .then((res) => {
            setReceiver(res.data.result);
          })
          .catch((err) => {
            console.log(err);
          });
        setSearch("");
      };
      const toreceiver = (id) => {
        router.push(`/transfer/${id}`);
      };
    
    return(
        <LayoutDefault>
            
            
            <div className="card mt-4 bg-white border-0 col-10 mb-4">
                <div className="m-4">
                    <h5>Search Receiver</h5>
                </div>
                <div >
                    <form onSubmit={submitSearch} >
                        <div size={32} />
                        <input
                        ype="text"
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search receiver here"
                        className={`ms-3 form-label col-10`}
                    />
                    </form>
                </div>
                <div className="mt-lg-2">
          {receiver.map((e, i) => (
            <div
              key={i}
              onClick={() => toreceiver(e.id)}
              className={`row mt-3 ms-3 card col-10 shadow border-0`}
            >
              <div className="col-lg-9">
                <div className="row">
                  <div className="col-lg-1 col-3">
                    <img className={`${styles.profilpict}`} src={`${API_URL}/upload/${e.image}`} alt="contact Profile Picture" />
                  </div>

                  <div className="col-lg-10 col-9 ms-lg-2 d-flex flex-column mt-lg-1 mb-lg-1">
                    <span
                      className={`text-capitalize ms-2`}
                    >
                      {e.firstname} {e.lastname}
                    </span>
                    <small className='ms-2'>
                      {e.number}
                    </small>
                  </div>
                </div>
              </div>
            </div>
          ))}
          </div>
            </div>
           
            
        </LayoutDefault>
    )
}
