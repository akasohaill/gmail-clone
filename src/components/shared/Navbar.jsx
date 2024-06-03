import React, { useEffect, useState } from 'react'
import Avatar from 'react-avatar';
import { CiCircleQuestion, CiSettings } from 'react-icons/ci';
import { IoIosSearch } from 'react-icons/io';
import { PiDotsNineBold } from 'react-icons/pi';
import { RxHamburgerMenu } from "react-icons/rx";
import { useDispatch, useSelector } from 'react-redux';
import { setSearchText, setUser } from '../../redux/appSlice';
import { AnimatePresence, motion } from 'framer-motion';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';


const Navbar = () => {

    const [toggle, setToggle] = useState()
    const [input, setInput] = useState();
    const dispatch = useDispatch()
    const {user}=useSelector(store=>store.appSlice)

    const logOutHandler=()=>{
        signOut(auth).then(()=>{
            dispatch(setUser(null));
        }).catch((error)=>{
            console.log(error);
        })
    }


    useEffect(() => {
        dispatch(setSearchText(input))
    }, [input])

    return (
        <div

            className='flex items-center justify-between mx-3 h-16'>
            <div className="flex items-center gap-10">
                <div className="flex items-center gap-2">
                    <div className="p-3 rounded-full hover:bg-gray-100 cursor-pointer">
                        <RxHamburgerMenu size={"20px"} />
                    </div>
                    <img className='w-8' src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Gmail_icon_%282020%29.svg/2560px-Gmail_icon_%282020%29.svg.png" alt="gmail-icon" />
                    <h1 className='text-2xl text-gray-500 font-medium'>Gmail</h1>
                </div>
            </div>
            <div className="md:block hidden w-[50%] mr-60">
                <div className="flex items-center px-2 py-3 bg-[#EAF1FE] rounded-full">
                    <IoIosSearch className='text-gay-500' height={"24px"} />
                    <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        type="text"
                        placeholder='Search mails'
                        className='rounded-full w-full bg-transparent outline-none px-1'
                    />
                </div>
            </div>
            <div className="md:block hidden">
                <div className="flex items-center gap-2">
                    <div className="p-3 rounded-full hover:bg-gray-100 cursor-pointer">
                        <CiCircleQuestion size={"20px"} />
                    </div>
                    <div className="p-3 rounded-full hover:bg-gray-100 cursor-pointer">
                        <CiSettings size={"20px"} />
                    </div>
                    <div className="p-3 rounded-full hover:bg-gray-100 cursor-pointer">
                        <PiDotsNineBold size={"20px"} />
                    </div>
                    <div className="cursor-pointer relative">
                        <Avatar onClick={() => setToggle(!toggle)} src={user.photoURL} size='40' round={true} />
                        <AnimatePresence>
                        {
                        toggle && (
                            <motion.div
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                className='absolute z-20 right-2 rounded-md shadow-lg bg-white '
                            >
                                <p onClick={logOutHandler} className='underline p-2'>LogOut</p>
                            </motion.div>
                        )
                    }
                        </AnimatePresence>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default Navbar
