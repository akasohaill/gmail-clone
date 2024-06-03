import { deleteDoc, doc } from 'firebase/firestore'
import React from 'react'
import { BiArchiveIn } from 'react-icons/bi'
import { IoMdArrowBack, IoMdMore } from 'react-icons/io'
import {
  MdDeleteOutline,
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdOutlineAddTask,
  MdOutlineDriveFileMove,
  MdOutlineMarkEmailUnread,
  MdOutlineReport,
  MdOutlineWatchLater
} from 'react-icons/md'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { db } from '../firebase'

const Mail = () => {

  const params = useParams()
  const navigate = useNavigate()
  const { selectedMail } = useSelector(store => store.appSlice)
  const deleteMailId = async (id) => {
    try {
      await deleteDoc(doc(db, "emails", id))
      navigate('/')
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='flex-1 bg-white rounded-lg mx-5'>
      <div className="flex items-center px-4 justify-between">
        <div className="flex items-center gap-2 text-gray-700 py-2">
          <div onClick={() => { navigate("/") }} className="p-2 rounded-full hover:bg-gray-100 cursor-pointer">
            <IoMdArrowBack size="20px" />
          </div>
          <div className="p-2 rounded-full hover:bg-gray-100 cursor-pointer">
            <BiArchiveIn size="20px" />
          </div>
          <div className="p-2 rounded-full hover:bg-gray-100 cursor-pointer">
            <MdOutlineReport size="20px" />
          </div>
          <div onClick={() => deleteMailId(params.id)} className="p-2 rounded-full hover:bg-gray-100 cursor-pointer">
            <MdDeleteOutline size="20px" />
          </div>
          <div className="p-2 rounded-full hover:bg-gray-100 cursor-pointer">
            <MdOutlineMarkEmailUnread size="20px" />
          </div>
          <div className="p-2 rounded-full hover:bg-gray-100 cursor-pointer">
            <MdOutlineWatchLater size="20px" />
          </div>
          <div className="p-2 rounded-full hover:bg-gray-100 cursor-pointer">
            <MdOutlineAddTask size="20px" />
          </div>
          <div className="p-2 rounded-full hover:bg-gray-100 cursor-pointer">
            <MdOutlineDriveFileMove size="20px" />
          </div>
          <div className="p-2 rounded-full hover:bg-gray-100 cursor-pointer">
            <IoMdMore size="20px" />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button><MdKeyboardArrowLeft className='hover:rounded-full hover:bg-gray-100' size={"24px"} /></button>
          <button><MdKeyboardArrowRight className='hover:rounded-full hover:bg-gray-100' size={"24px"} /></button>
        </div>
      </div>
      <div className="h-[90vh] overflow-y-auto p-4">
        <div className="flex items-center justify-between bg-white gap-1">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-medium">{selectedMail?.subject} </h1>
            <span className='text-sm bg-gray-200 rounded-md px-2'>inbox</span>
          </div>
          <div className="flex-none my-5 text-gray-500 text-sm ">
            <p>{new Date(selectedMail?.createdAt?.seconds * 1000).toUTCString()}</p>
          </div>
        </div>
        <div className="text-gray-500 text-sm">
          <h1>{selectedMail?.to}</h1>
          <span>from me</span>
        </div>
        <div className="my-10">
          <p>{selectedMail?.message}</p>
        </div>
      </div>
    </div>
  )
}

export default Mail
