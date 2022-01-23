import {useRouter} from 'next/router'
import LayoutDefault from "../../layout/default"
import styles from "../../styles/Dashboard.module.css";
import { AiOutlineArrowUp, AiOutlinePlus, AiOutlineArrowDown } from "react-icons/ai";
import React, { useEffect, useState } from "react";
import axios from 'axios';
import { API_URL } from '../../helper'
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from 'chart.js';
// import { Bar } from 'react-chartjs-2';

export default function Dashboard(){
    const [user, setUser] = useState({});
    const [dataIncome, setDataIncome] = useState({});
    const [income, setIncome] = useState("");
    const [expense, setExpense] = useState("");
    const router = useRouter()
    const [history, setHistory] = useState([]);
    const handletopup = (e) =>{
        e.preventDefault()
        router.push('/topup')
    }
    const handletransfer = (e) =>{
        e.preventDefault()
        router.push('/transfer')
    }
    const numberWithCommas = (num) => {
        if (num) {
          return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        } else {
          return num;
        }
      };
    Array.prototype.sum = function (prop) {
        let total = 0;
        for (let i = 0, len = this.length; i < len; i++) {
          total += this[i][prop];
        }
        return total;
      };
    useEffect(() => {
       const id = localStorage.getItem("iduser")
       const headers = {
           iduser : id,
       }
       axios
      .get(`${API_URL}/transaction`, { headers })
      .then((res) => {
        const data = res.data.result;
        console.log(data)
        setHistory(data.slice(Math.max(data.length - 4)));
      })
      .catch((err) => {
        alert(err.response.data.error);
      });
       axios
       .get(`${API_URL}/user/${id}`)
       .then((res) => {
         setUser(res.data.result);
       })
       .catch((err) => {
         alert(err);
       });
       axios
      .get(`${API_URL}/income`, { headers })
      .then((res) => {
        const dataIncome = res.data.result;
        setDataIncome(dataIncome);
        setIncome(dataIncome.sum("amount"));
      })
      .catch((err) => {
        alert(err);
      });
      axios
      .get(`${API_URL}/spending`, { headers })
      .then((res) => {
        const dataExpense = res.data.result;
        setExpense(dataExpense.sum("amount"));
      })
      .catch((err) => {
        alert(err.response.data.error);
      });
    },[]);
    return(
        <LayoutDefault>
        <div className='col-10'>
            <div className='fontFamily w-100 p-3 d-flex mt-4' style={{background:'rgb(99, 121, 244)', borderRadius:'20px'}}>
                <div className='w-75 text-white'>
                    <p>Balance</p>
                    <h1>Rp. {user === "" ? 0 : numberWithCommas(user.saldo)}</h1>
                    <p className='pt-2'>{user.number}</p>
                </div>
                <div className='w-25 d-flex justify-content-center align-items-center flex-column'>
                    <button type="" onClick={handletransfer} className={`btn fw-bold text-white mb-2 col-10`} style={{background:'rgba(255, 255, 255, 0.2)'}}>
                        <AiOutlineArrowUp className='me-2' />
                        Transfer
                    </button>
                    <button type="" onClick={handletopup} className={`btn fw-bold text-white col-10`} style={{background:'rgba(255, 255, 255, 0.2)'}}> 
                        <AiOutlinePlus className='me-2' />
                        Top Up
                    </button>
                </div>
            </div>
            <div className='row'>
                <div className="col-6">
                    <div className={`mb-2 p-3 bg-white shadow mt-3 rounded-3`}>
                        <div className='d-flex '>
                            <div className='w-50'>
                                <AiOutlineArrowDown style={{color : "#1EC15F" , fontSize: "1.5rem", marginBottom: '0.7rem'}} />
                                <p className='mb-1'>Income</p>
                                <p className='fw-bold fontFamily'>Rp. {income === "" ? 0 : numberWithCommas(income)}</p>
                            </div>
                            <div>
                                <AiOutlineArrowUp style={{color : "#FF5B37" , fontSize: "1.5rem", marginBottom: '0.7rem'}} />
                                <p className='mb-1'>Expense</p>
                                <p className='fw-bold fontFamily'>Rp. {expense === "" ? 0 : numberWithCommas(expense)}</p>
                            </div>
                        </div>
                        
                    </div>
                    
                </div>
                <div className="col-6">
                    <div className={`mb-2 p-3 bg-white shadow mt-3 rounded-3`}>
                        <p className='fw-bold fontFamily'>Transaction History</p>
                        {history === "" ? (
                    <small>Loading...</small>
                  ) : (
                    history.map((e, i) => (
                      <div key={i} className="row my-lg-3 my-4">
                        <div className="col-2 text-end">
                        <img className={`${styles.profilpict}`} src={`${API_URL}/upload/${e.receiverUsers.image}`} alt="contact Profile Picture" />
                        </div>

                        <div className="col-5 ms-lg-0 ms-1 d-flex flex-column">
                          <span
                            className={`text-capitalize`}
                          >
                            {`${e.receiverUsers.firstname} ${e.receiverUsers.lastname}`}
                          </span>
                          <small>
                            {e.type}
                          </small>
                        </div>

                        <div
                          className={`col-4 text-start pt-2 
                    ${
                      e.receiver === user.id || e.type === "topup"
                        ? styles.colorGreen
                        : styles.colorRed
                    }
                    `}
                        >
                          <p>
                            {e.receiver === user.id ? " + " : " - "}Rp.{" "}
                            {numberWithCommas(e.amount)}
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                        
                    </div>
                </div>
            </div>
        </div>           
        </LayoutDefault>
    )
}
