import React, { useState } from 'react'
import { RxCross2 } from 'react-icons/rx'
import { useDispatch, useSelector } from 'react-redux'
import { setOpen } from '../redux/appSlice'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase'

const SendMail = () => {
    const [formData, setFormData] = useState({
        to: "",
        subject: "",
        message: ""
    })
    const open = useSelector(store => store.appSlice.open)
    const dispatch = useDispatch();

    const changeHandler=(e)=>{
        setFormData({...formData,[e.target.name]:e.target.value})
    }

    const submitHandler=async(e)=>{
        e.preventDefault();
        await addDoc(collection(db,"emails"),{
            to:formData.to,
            subject:formData.subject,
            message:formData.message,
            createdAt:serverTimestamp()
        })
        dispatch(setOpen(false))
        setFormData({
            to: "",
            subject: "",
            message: ""
        })
    }

    return (
        <div className={`${open ? "block" : "hidden"} bg-white max-w-6xl shadow-slate-600 rounded-t-md`}>
            <div className="flex px-3 py-2 bg-[#F2F6Fc] rounded-t-md justify-between">
                <h1>New Message</h1>
                <div onClick={() => dispatch(setOpen(false))} className="hover:bg-gray-200 rounded-full p-2 cursor-pointer">
                    <RxCross2 size="10px" />
                </div>
            </div>
            <form onSubmit={submitHandler} action="" className='flex flex-col p-3 gap-2'>

                <input onChange={changeHandler} value={formData.to} type="text" name='to' placeholder='TO' className='outline-none py-1' />

                <input onChange={changeHandler} value={formData.subject} type="text" name='subject' placeholder='Subject' className='outline-none py-1' />

                <textarea onChange={changeHandler} value={formData.message} cols={30} rows={10} name='message' type="text" placeholder='Message' className='outline-none py-1' ></textarea>

                <button type='submit' className='rounded-full w-fit px-4 bg-[#0B57D0] text-white font-mediu,'>Send</button>
            </form>
        </div>
    )
}

export default SendMail
