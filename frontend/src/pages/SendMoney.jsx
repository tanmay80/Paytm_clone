import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const SendMoney =()=>{

    const [amount,setAmount] =useState();
    const [searchParams] = useSearchParams();
    const id= searchParams.get("id");
    const name= searchParams.get("name");
    const navigate= useNavigate();

    return  <div class="h-screen flex items-center justify-center">
                <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <a href="#">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Send Money</h5>
                    </a>
                    <div className="flex ">
                        <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                            <div className="flex flex-col justify-center h-full  text-xl">
                                {name[0].toUpperCase()}
                            </div>
                        </div>
                        <div className="flex flex-col justify-center h-ful text-gray-900 dark:text-white">
                            <div>
                                {name}
                            </div>
                        </div>
                    </div>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Amount (in Rs.)</p>

                    <div className="pb-4"> 
                        <input onChange={(e)=>{
                            setAmount(e.target.value)
                        }} type="text" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search ..." required />
                    </div>

                    <button onClick={async ()=>{
                        const res=await axios.post("http://localhost:3000/api/v1/account/transfer",{
                            to:id,
                            amount:amount
                        },{
                            headers:{
                                Authorization:"Bearer "+ localStorage.getItem("token")
                            }
                        })

                        if(res.status === 200){
                            console.log("Transaction Completed");
                            alert("Transaction Completed");
                        }else{
                            console.log("Transaction Failed")
                            alert("Transaction Failed");
                        }
                        navigate("/dashboard");
                    }} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Send Money
                        <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                        </svg>
                    </button>
                </div>
            </div>

    
};