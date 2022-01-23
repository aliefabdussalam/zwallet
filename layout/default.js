import Navbar from "../component/navbar";
import Footer from "../component/footer";
import Link from "next/link"
import { useRouter } from "next/router";

const LayoutDefault = (props) =>{
    const router = useRouter()
    const handlelogout = (e) =>{
        e.preventDefault()
        localStorage.clear()
        router.push('/')
    }
    return(
        <>
            <Navbar />
            <div className="row">
            <div className="col-4 m-0" style={{background:'rgb(250,252,255)'}}>
                <div className="card offset-4 col-8 bg-light mt-4 mb-4 rounded bg-white border-0 shadow" style={{height:'75vh'}}>
                    <Link href="/dashboard">
                    <div className="menu text-muted col-12 row mt-5" style={{cursor:'pointer'}}>
                        <img className="col-6 ms-2" src="https://github.com/aliefabdussalam/week3/blob/main/grid.png?raw=true" alt="menu" style={{ height:'35px', width:"55px"}} />
                        <h5 className="col-6 pt-1">Dashboard</h5>
                    </div>
                    </Link>
                    <Link href="/transfer">
                    <div className="menu text-muted col-12 row mt-2" style={{cursor:'pointer'}}>
                        <img className="col-4 ms-2" src="https://github.com/aliefabdussalam/week3/blob/main/arrow-up.png?raw=true" alt="menu" style={{ height:'35px', width:"55px"}} />
                        <h5 className="col-8 pt-2">Transfer</h5>
                    </div>
                    </Link>
                    <Link href="/topup">
                    <div className="menu text-muted col-12 row mt-2" style={{cursor:'pointer'}}>
                        <img className="col-4 ms-2" src="https://github.com/aliefabdussalam/week3/blob/main/plus.png?raw=true" alt="menu" style={{ height:'35px', width:"55px"}} />
                        <h5 className="col-8 pt-2">Top-Up</h5>
                    </div>
                    </Link>
                    <Link href="/profile">
                    <div className="menu text-muted col-12 row mt-2" style={{cursor:'pointer'}}>
                        <img className="col-4 ms-2" src="https://github.com/aliefabdussalam/week3/blob/main/user.png?raw=true" alt="menu" style={{ height:'35px', width:"55px"}} />
                        <h5 className="col-8 pt-2">Profile</h5>
                    </div>
                    </Link>
                    <div className="menu text-muted col-12 row mb-3" style={{marginTop:"185px", cursor:'pointer'}} onClick={handlelogout}>
                        <img className="col-4 ms-2" src="https://github.com/aliefabdussalam/week3/blob/main/log-out.png?raw=true" alt="menu" style={{ height:'35px', width:"55px"}} />
                        <h5 className="col-8 pt-2">Log Out</h5>
                    </div>
                </div>
            </div>
            <main className="col-8 m-0" style={{background:'rgb(250,252,255)'}}>
                {props.children}
            </main>
            </div>
            <Footer />
        </>
    )
}
export default LayoutDefault