import Link from "next/link"

export default function Home() {
  return (
    <div className='container-fluid' style={{background:'rgb(99, 121, 244)', height:'100vh'}}>
          <div className="row pt-3">
              <div className='text-light col-3 fw-bold fs-3 ms-5'>Zwallet</div>
              <Link href="/login"><button className="btn btn-outline-light offset-lg-6 col-1 fw-bold">Login</button></Link>
              <Link href="/register"><button className="btn btn-light col-1 ms-2 fw-bold" style={{color:'rgb(99, 121, 244)'}}>Signup</button></Link>
          </div>
          <div className="text-center">
            
            <p className="mt-5 text-light fw-bold" style={{fontSize:'60px'}}>Awesome App <br />For Saving Time.</p>
            <h5 className="text-light mt-3">We bring you a mobile app for banking problems <br /> that oftenly wasting much of your times.</h5>
            <Link href="/register"><button className="btn-lg btn-light col-2 ms-2 fw-bold mt-4" style={{color:'rgb(99, 121, 244)'}}>Try Now</button></Link>
          </div>
    </div>
  )
}
