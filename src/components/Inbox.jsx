import React, { useState } from 'react'
import { FaUserFriends } from 'react-icons/fa'
import { FaCaretDown } from 'react-icons/fa6'
import { GoTag } from 'react-icons/go'
import { IoMdMore, IoMdRefresh } from 'react-icons/io'
import { MdCropSquare, MdInbox, MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md'
import Messages from './Messages'

const mailItems=[
  {
    icon:<MdInbox size={"20px"}/>,
    text:"Inbox"
  },
  {
    icon:<GoTag size={"20px"}/>,
    text:"Promotion"
  },
  {
    icon:<FaUserFriends size={"20px"}/>,
    text:"Social"
  },
]

const Inbox = () => {

  const [mailTypeSelect,setMailTypeSelect]= useState(0)

  return (
    <div className='flex-1 rounded-lg mx-5 bg-white'>
      <div className="flex items-center justify-between px-4">
        <div className="flex items-center gap-2 text-gray-700 py-2">
          <div className="flex items-center gap-1">
            <MdCropSquare size={"20px"}/>
            <FaCaretDown size={"20px"}/>
          </div>
          <div className="rounded-full p-2 hover:bg-gray-100 cursor-pointer">
            <IoMdRefresh size={"20px"}/>
          </div>
          <div className="rounded-full p-2 hover:bg-gray-100 cursor-pointer">
            <IoMdMore size={"20px"}/>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <p className='text-gray-500 text-sm'>1-50 of 1000</p>
          <button><MdKeyboardArrowLeft  className='hover:rounded-full hover:bg-gray-100' size={"24px"}/></button>
          <button><MdKeyboardArrowRight className='hover:rounded-full hover:bg-gray-100'  size={"24px"}/></button>
        </div>
      </div>
      <div className="h-[90vh] overflow-y-auto">
          <div className="flex items-center gap-1">
            {mailItems.map((item,index)=>{
              return(
                <button 
                key={index}
                className={`${mailTypeSelect===index?'border-b-4 border-b-blue-600 text-blue-600':"border-b-4 border-b-transparent"} flex items-center w-52 p-4 gap-5 hover:bg-gray-100`}
                onClick={()=>setMailTypeSelect(index)}
                >
                  {item.icon}
                  <span>{item.text}</span>
                </button>
              )
            })}
          </div>
          <Messages/>
        </div>
    </div>
  )
}

export default Inbox
