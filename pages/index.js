import Image from 'next/image'
import { Inter } from 'next/font/google'
import Head from 'next/head'
import axios from 'axios'
import { useState } from 'react'
import Spinner from './components/Spinner'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  //
  const [city, setCity] = useState('Visakhapatnam');
  const [temp, setTemp] = useState(32);
  const [loading, setLoading] = useState(false);

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`

  const fetchWeather = (e) => {
    e.preventDefault();
    setLoading(true);
    axios.get(url).then((response) => {
    setTemp(JSON.stringify(response.data.main.temp));
    setCity(response.data.name);
    // console.log(response.data);
    });
     setCity('');
    setLoading(false);
  };

  if (loading) {
    return <Spinner />
  } else {
    return (
      <main className="w-[100vw]  flex justify-center items-center h-[800px] md:h-[1140px] ">
        <div className='w-[100%] flex-col flex md:flex-row justify-center items-center gap-5 md:gap-20 my-[0px] md:my-20'>
          <div className='border grid grid-col-1 gap-5 rounded'>
            <div className='border rounded w-[300px] md:w-[460px] bg-white mt-5 md:mt-10'>
              <h1 className=' text-[36px] md:text-[54px] text-bold text-[#4B77BE] text-center'>The Weather App</h1>
              <p className=' text-[54px] md:text-[72px] text-bold text-[#3F3D56] text-center'>{temp}°F</p>
              <p className=' text-[36px] md:text-[54px] text-bold text-[#4B77BE] text-center'>{city}</p>
            </div>
            <div className='border w-[300px] md:w-[460px] p-4 bg-white'>

              {/* form */}
              <div>
                <form 
                onSubmit={fetchWeather} 
                className='flex items-center justify-between rounded text-center my-auto'>
                  <input type="text" placeholder="Enter city"
                   onChange={(e)=>setCity(e.target.value)} 
                   className=' border border-black mx-1 md:mx-5 w-[150px] md:w-[218px] my-auto p-2 rounded'/>
                  <button onClick={fetchWeather}
                  className=' border border-black mx-1 md:mx-5 bg-[#4B77BE] p-1 md:p-2 rounded'>
                    Get Weather
                  </button>
                </form>
              </div>
            </div>
            <div>
            </div>
          </div>
          <div className='w-[40%] my-10'>
            <div>
              <img src='weather.png' alt="weather" className=' h-[200px] md:h-[360px]'></img>
            </div>

          </div>

        </div>
      </main>

    )
  }
}
