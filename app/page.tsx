"use client"
import { useState } from "react"

import Input from "./components/Input"

export default function Home() {

  const [data, setData] = useState({})
  const [location, setLocation] = useState("")
  const [error, setError] = useState("")

  const url = `http://api.weatherapi.com/v1/forecast.json?key=129341df74cc4045b08222535232505&q=${location}&days=7&aqi=yes&alerts=yes`
  console.log(process.env.REACT_APP_API_KEY);

  const handleSearch = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if(e.key === "Enter"){
      e.preventDefault()
      try {
        const response = await fetch(url)
        if(!response.ok){
          throw new Error()
        }
        const data = await response.json()
        setData(data)
        setLocation('')
        setError('')
      } catch(err){
        return null
      }
    }
  }

  return (
      <div className='bg-cover bg-gradient-to-r from-blue-500 to-blue-300 h-screen'>
        <div className="bg-white/25 w-full flex flex-col h-fit">
          <div className="flex flex-col md:flex-row justify-between items-center p-12">
            <Input handleSearch={handleSearch} setLocation={setLocation}/>
            <h1 className="mb-8 md:mb-0 order-1 text-white py-2 px-4 rounded-xl italic font-bold">Weather App.</h1>
          </div>
          {data.current ? (
            <div>{data.current.temp_f}</div>
          ) : null}
        </div>
      </div>
  )
}
