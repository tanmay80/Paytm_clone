import { useEffect, useState } from "react"
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Users=()=>{

    const [users,setUsers]=useState([]);
    const [filter,setFilter]=useState("");

    useEffect(()=>{

        const token = localStorage.getItem('token'); 

        axios.get("http://localhost:3000/api/v1/user/bulk?filter="+filter, {
            headers: {
                Authorization: "Bearer "+token
            }
        })
            .then(response =>{
                setUsers(response.data.user)
            })
    },[filter])

    return <>
        <div className="pl-6 pr-6"> 
                <input onChange={(e)=>{
                    setFilter(e)
                }} type="text" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search ..." required />
            </div>

        <div>
            {users.map(user =>  <User user={user}/>)}
        </div>
    </>
}

function User({user}){

    const navigate=useNavigate();

    return <div className="flex justify-between pl-6 pr-8">
                <div className="flex ">
                    <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                        <div className="flex flex-col justify-center h-full  text-xl">
                            {user.firstname[0].toUpperCase()}
                        </div>
                    </div>
                    <div className="flex flex-col justify-center h-ful">
                        <div>
                            {user.firstname} {user.lastname}
                        </div>
                    </div>
                </div>

                <div className="flex flex-col justify-center h-full">
                    <button onClick={()=>{
                        navigate("/send?id="+user._id + "&name=" + user.firstname);
                    }}>Send Money</button>
                </div>
            </div>
}