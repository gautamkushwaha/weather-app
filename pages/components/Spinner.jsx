import React from 'react'
import Image from 'next/image'

export default function Spinner() {
  return (
    <>
      <Image  className="w-[200px] m-auto block" src="spinner.gif" alt="loading..."/>
    </>
  )
}
