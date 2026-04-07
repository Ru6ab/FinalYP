import React from 'react'

export default function MenuButton() {
  return (
    <div className='flex flex-col pl-6 bg-neutral-200 w-[370px]  fixed top-[35px] right-0 h-screen z-[9999]'>
      <div className='flex flex-col leading-loose'><h1 className='font-bold text-[18px] pt-4  text-neutral-800'>BUY</h1>
      <h1 className='font-normal text-[18px]'>Property Search</h1>
      <h1 className='font-normal text-[18px]'>Buying Guide</h1></div>

      <div className=' flex flex-col leading-loose'>
      <h1 className='font-bold text-[18px] pt-4  text-neutral-800'>SELL</h1>
      <h1 className='font-normal text-[18px]'>Property Search</h1>
      <h1 className='font-normal text-[18px]'>Selling Guide</h1></div>

      <div className=' flex flex-col leading-loose'>
      <h1 className='font-bold text-[18px] pt-4 text-neutral-800 '>RESOURCES</h1>
      <h1 className='font-normal text-[18px]'>Office Search</h1>
      <h1 className='font-normal text-[18px]'>Agent Search</h1></div>
    </div>
    
  )
}
