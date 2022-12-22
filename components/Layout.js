import {  getSession, useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
// import { getUsers } from "../database/controller";
import { getUsers } from "../lib/helper";
import SideBar from "./SideBar";
// import IsLoadingSideBar from "./IsLoadingSideBar";

// import Sidebar from "./Sidebar";
import SideBarAdmin from "./SideBarAdmin";
import SideBarProf from "./SideBarProf";

// -----------------------------------------------------


export default function Layout ({ children }) {

  // const [data1, setData1] = useState([])
  // const [isLoading, setLoading] = useState(false)
  const session =useSession()

  const {isLoading, data, isError} = useQuery('users', getUsers)

  if(isLoading) console.log("Loading...")
  if(isError) console.log("Error...")
  console.log(data)

  console.log(getUsers())


  const Users =data && data.filter(e=>(e.email === session.data.user.email) && e.role ==="admin");
  const etudiant =data && data.filter(e=>(e.email === session.data.user.email) && e.role ==="user");
  const listDesProf =data&& data.filter(e=>(e.email === session.data.user.email) && e.role ==="prof")
  const prof =data&& data.filter(e=> e.role ==="prof")
  // console.log(Users&&Users[0])


  const isAdmin =  Users&& Users.length>0
  const isProf = listDesProf&& listDesProf.length>0
  const isEtud = etudiant&& etudiant.length>0


  {
    data&& data.map(el=> {
      // console.log(el.email)
      if(el.role ==="admin"){

        // setIsAdmin(true)
      }

    })


  }

  return (
    <div className="h-screen flex flex-row justify-start">


       {/* <SideBarAdmin /> */}
       {isAdmin ? <SideBarAdmin/>: isProf? <SideBarProf/>: <SideBar  prof={prof}/>  }
      <div className="bg-primary flex-1 p-4 text-black">
          {children}
      </div>
    </div>
  );
};
export async function getServerSideProps() {

  const res = await fetch('http://localhost:3000/api/auth/fetchAdmin');
  const data1 = await res.json();
  if(!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false

      }
    }
  }
  return {
    props: {
      data1
    }
  }
}









