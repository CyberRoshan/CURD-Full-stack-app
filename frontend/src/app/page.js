"use client"
import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'

export default function Home() {

  let [dataList,setDataList]=useState([])


  let saveStudent=(event)=>{
    event.preventDefault()
    let uname=event.target.uname.value
    let uemail=event.target.uemail.value
    let upassword=event.target.upassword.value
    let uphone=event.target.uphone.value
    let userData={
      uname,uemail,upassword,uphone
    }
    // console.log(userData)
    axios.post("http://localhost:8000/website/insert-student",userData)
    .then((res)=>{
      console.log(res.data)
      viewStudent()
    })
    event.target.reset()
  }

  let viewStudent=()=>{
    axios.get("http://localhost:8000/website/view-student")
    .then((res)=>{
      setDataList(res.data.dataList)
    })
  }

  let deleteStudent=(ID)=>{
    // console.log(ID)
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#000",
      confirmButtonText: "Delete"
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:8000/website/delete-student/${ID}`)
        .then((res)=>{
          console.log(res.data)
          viewStudent()
        })
        Swal.fire({
          title: "Deleted!",
          text: "Student Data has been deleted.",
          icon: "success"
        });
      }
    });
  }

  useEffect(()=>{
    viewStudent()
  },[])
  return (
    <section className="grid lg:grid-cols-[30%_auto] grid-cols-1 gap-10 p-5">
      <form onSubmit={saveStudent} className="rounded-lg lg:h-[460px] h-full shadow-xl p-5 ">
        <div class="mb-6">
        <label
          for="uname"
          class="block mb-2 text-sm font-medium text-gray-900"
        >
          Your Name
        </label>
        <input
          type="text"
          id="uname"
          name="uname"
          class="bg-transparent border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-2 focus:ring-fuchsia-50 focus:border-fuchsia-300 block w-full p-2.5"
          placeholder="Enter Your Name"
          required
        />
      </div>
      <div class="mb-6">
        <label
          for="email"
          class="block mb-2 text-sm font-medium text-gray-900"
        >
          Your email
        </label>
        <input
          type="email"
          name="uemail"
          id="email"
          class="bg-transparent border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-2 focus:ring-fuchsia-50 focus:border-fuchsia-300 block w-full p-2.5"
          placeholder="Enter Your Email"
          required
        />
      </div>
      <div class="mb-6">
        <label
          for="password"
          class="block mb-2 text-sm font-medium text-gray-900"
        >
          Your password
        </label>
        <input
          type="password"
          name="upassword"
          id="password"
          placeholder="Enter Your Password"
          class="bg-transparent border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-2 focus:ring-fuchsia-50 focus:border-fuchsia-300 block w-full p-2.5"
          required
        />
      </div>
      <div class="mb-6">
        <label
          for="phone"
          class="block mb-2 text-sm font-medium text-gray-900"
        >
          Your Mobile Number
        </label>
        <input
          type="tel"
          name="uphone"
          id="phone"
          placeholder="Enter Your Mobile No."
          class="bg-transparent border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-2 focus:ring-fuchsia-50 focus:border-fuchsia-300 block w-full p-2.5"
          required
        />
      </div>
      <button type="submit" class="text-white w-full bg-gradient-to-br from-pink-500 to-pink-500 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 text-center  items-center shadow-md shadow-gray-300 hover:scale-[1.02] transition-transform">Submit</button>
    </form>
    <div class="relative overflow-x-auto shadow-xl sm:rounded-lg">
      <table class="w-full text-sm text-left text-gray-500">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" class="px-6 py-3">
              ID
            </th>
            <th scope="col" class="px-6 py-3">
              Name
            </th>
            <th scope="col" class="px-6 py-3">
              Email
            </th>
            <th scope="col" class="px-6 py-3">
              Password
            </th>
            <th scope="col" class="px-6 py-3">
              Phone
            </th>
            <th scope="col" class="px-6 py-3">
              Delete
            </th>
          </tr>
        </thead>
        <tbody>
          {dataList.length>=1 ?
          dataList.map((item,index)=>{
            return (
              <tr key={index} class="bg-white border-b hover:bg-gray-50">
              <th
                scope="row"
                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
              >
                {index+1}
              </th>
              <td class="px-6 py-4 font-semibold">{item.uname}</td>
              <td class="px-6 py-4 font-semibold">{item.uemail}</td>
              <td class="px-6 py-4 font-semibold">{item.upassword}</td>
              <td class="px-6 py-4 font-semibold ">{item.uphone}</td>
              <td class="pt-4">
              <button onClick={()=>deleteStudent(item._id)} type="button" class="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Delete</button>
              </td>
            </tr>
            )
          })
          :
          <tr class="bg-white border-b hover:bg-gray-50">
            <th
              colSpan={6}
              scope="row"
              class="px-6 py-4 font-medium text-gray-900 text-center whitespace-nowrap"
            >No Data Found..</th>
          </tr>
        }
        </tbody>
      </table>
    </div>
    </section>
  );
}
