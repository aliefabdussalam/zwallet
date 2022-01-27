import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { HiOutlinePencil } from "react-icons/hi";
import axios from "axios";
import styles from '../../styles/Transfer.module.css'
import LayoutDefault from "../../layout/default"
import { API_URL } from '../../helper'

const Transfer = () => {
  const router = useRouter()
  const [user, setUser] = useState({});
  const [warning, setWarning] = useState("");
  const [receiver, setreceiver] = useState({});

  useEffect(() => {
    const idReceiver = router.query;
    const iduser = localStorage.getItem("iduser");
    axios
      .get(`${API_URL}/user/${idReceiver.id}`)
      .then((res) => {
        setreceiver(res.data.result);
      })
      .catch((err) => {
        alert(err.response.data.error);
      });
    axios
      .get(`${API_URL}/user/${iduser}`)
      .then((res) => {
          console.log(res.data.result)
        setUser(res.data.result);
      })
      .catch((err) => {
        alert(err.response.data.error);
      });
  }, []);
  const [form, setForm] = useState({
    nominal: "",
    note: "",
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;

    if (name === "nominal" && value >= user.saldo) {
      setForm({
        ...form,
        nominal: user.saldo,
      });
      setWarning("");
    } else {
      setForm({
        ...form,
        [name]: value,
      });
      setWarning("");
    }
  };



  const handletf = (e) => {
    e.preventDefault();
    const iduser = localStorage.getItem("iduser");
    const headers = {
      iduser,
    };
    const idReceiver = router.query;
    const dataTf = {
      receiver: router.query.id,
      amount: parseInt(form.nominal),
      balance: user.saldo - form.nominal,
      notes: form.note,
      type: "Transfer",
    };
        axios
          .post(`${API_URL}/transfer/${idReceiver.id}`, dataTf, { headers })
          .then((res) => {
            console.log(res.data.result.id);
            alert("transfer berhasil")
            setForm('')
            router.push('/dashboard')
          })
          .catch((err) => {
            setWarning(err.response.data);
          });
  };

  // number with commas
  const numberWithCommas = (num) => {
    if (num) {
      return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    } else {
      return num;
    }
  };

  return (
    <LayoutDefault>
      <div className="card mt-4 bg-white border-0 col-10 mb-4">
      <div className={`row`}>
        <div className={`col-lg-3 m-4`}>
          <p>Tranfer Money</p>
        </div>

        <div className={`col-lg-12 ms-4`}>
          <div className={`row`}>
            <div className="col-lg-9">
              <div className="row">
                <div className="col-lg-1 col-3">
                  <img className={`${styles.profilpict}`} src={`${API_URL}/upload/${receiver.image}`} alt="contact Profile Picture" />
                </div>

                <div className="col-lg-10 col-9 d-flex flex-column ms-3">
                  <span className={` text-capitalize`}>
                    {`${receiver.firstname} ${receiver.lastname}`}
                  </span>
                  <small className={``}>
                     {receiver.number}
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={`col-lg-12 ms-4 mt-2`}>
          <div className="row">
            <div className="col-lg-4 col-11">
              <p className={``}>
                Type the amount you want to transfer and then press continue to
                the next steps.
              </p>
            </div>
          </div>
        </div>

        <div className={`col-lg-12`}>
          <form className="text-center position-relative">
            <input
              type="number"
              name="nominal"
              value={form.nominal}
              placeholder="0.00"
              onChange={changeHandler}
              className={`form-control mb-lg-4 mb-2`}
            />

            <span className={``}>
              Rp. {numberWithCommas(user.saldo)} Available
            </span>

            <input
              type="text"
              name="note"
              value={form.note}
              onChange={changeHandler}
              placeholder="Add some notes"
              className={`form-control mt-lg-5 mt-3`}
            />
            
            <div className=''></div>
            <small className=''>{warning}</small>
          </form>
        </div>

        <div className={`col-lg-10`}>
          <button
            onClick={handletf}
            type="button"
            className={`btn`}
          >
            Continue
          </button>
        </div>
      </div>
      </div>
    </LayoutDefault>
  );
};

export default Transfer;