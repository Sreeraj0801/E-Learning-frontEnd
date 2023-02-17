import React,{useEffect} from "react";
import { useCookies } from 'react-cookie';
import Navbar from "../../Components/Navbar/Navbar";

const Home = () => {
  return (
    <div>
      <Navbar />
      <div>
      <div className="mt-5 ">..</div>
        <div class="card m-4">
          <div class="card-body">
            <h3 className="text-center text-primary">Welcome Admin</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
