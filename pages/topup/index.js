import {useRouter} from 'next/router'
import LayoutDefault from "../../layout/default"
import { useState } from 'react';
import { API_URL } from '../../helper'
import axios from 'axios';
 

export default function Topup(){
    const procedures = [
        {
          id: 1,
          procedure: "Go to the nearest ATM or you can use E-Banking.",
        },
        {
          id: 2,
          procedure: "Type your security number on the ATM or E-Banking.",
        },
        {
          id: 3,
          procedure: "Select “Transfer” in the menu",
        },
        {
          id: 4,
          procedure:
            "Type the virtual account number that we provide you at the top.",
        },
        {
          id: 5,
          procedure: "Type the amount of the money you want to top up.",
        },
        {
          id: 6,
          procedure: "Read the summary details",
        },
        {
          id: 7,
          procedure: "Press transfer / top up",
        },
        {
          id: 8,
          procedure: "You can see your money in Zwallet within 3 hours.",
        },
      ];
    const router = useRouter()
    const [nominal, setNominal] = useState("");
    const handleChange = (e) => {
        setNominal(e.target.value);
    };
    const topup = (e) => {
      e.preventDefault();
  
      const id = localStorage.getItem("iduser");
      const headers = {
        iduser: id,
      };
        const data = {
          receiver: localStorage.getItem("iduser"),
          amount: parseInt(nominal),
          balance: 0,
          type: "topup",
          note: "topup"
        };
        axios
          .post(`${API_URL}/topup`, data, { headers })
          .then((res) => {           
            setNominal("");
            alert("Top up berhasil");
            router.push("/dashboard")
          })
          .catch((err) => {
            console.log(err.response);
          });
      
    };
    return(
        <LayoutDefault>
                  
                <div className="col-lg-10">
                    <div className={`row card bg-white border-0 mt-4 mb-5 ms-2`}>
                        <div className={`col-lg-12 ms-3 mt-3`}>
                            <div>
                              <div className="mt-2 mb-4">
                                <small>
                                  How To Top Up
                                </small>
                              </div>
                            </div>
                          </div>

  <div className={`col-lg-12 mt-lg-0 mt-5`}>
    {procedures.map((e, i) => (
      <div
        key={i}
        className={`row mb-3`}
      >
        <div className="col-lg-1 col-1 text-center">
          <p>{e.id}</p>
        </div>
        <div className="col-lg-9 col-11">
          <div>
            <p>
              {e.procedure}
            </p>
          </div>
        </div>
      </div>
    ))}
  </div>

  <div
    className="row g-lg-3 mt-lg-0 ms-lg-0 ms-3 mt-3 justify-content-center align-items-center"
    style={{ marginTop: "-30px" }}
  >
    <div className="col-lg-auto col-2">
      <label className={`col-form-label `}>
        Rp
      </label>
    </div>
    <form onSubmit={''} className="col-lg-auto col-5">
      <input
        type="number"
        onChange={handleChange}
        className={`form-control `}
        placeholder="0.00"
      />
    </form>
    <div className="col-lg-auto col-5">
      <div className='btn'
        onClick={topup}
      >
        Top Up
      </div>
    </div>
    <small className={`text-center`}>
    </small>
  </div>
                    </div>
                </div>
                      
        </LayoutDefault>
    )
}
