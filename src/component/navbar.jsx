import { MdFastfood } from 'react-icons/md';
import { FaSearch } from 'react-icons/fa';
import { FiShoppingBag } from 'react-icons/fi';
import { useContext, useEffect } from 'react';
import { dataContext } from '../context/userContext';
import { useSelector } from "react-redux";
import { food_items } from '../food';
const Navbar = () => {
  let {input,setInput,cat,setCat,showCard,setShowCard} = useContext(dataContext)
  useEffect(()=>{
    let newList = food_items.filter((item)=>item.food_name.includes(input) || item.food_name.toLowerCase().includes(input))
    setCat(newList)
  },[input])

  let items = useSelector(state=>state.cart)
  console.log(items)
  return (
    <div className='w-full h-[100px] flex justify-between items-center px-5 md:px-8'>
        <div className='w-[60px] h-[60px] bg-white flex justify-center items-center rounded-md
        shadow-xl'>
            <MdFastfood className='h-[30px] w-[30px] text-green-500' />
        </div>
        <form className='w-[45%] h-[55px] bg-white flex items-center px-5 gap-5 rounded-md shadow-2xl md:w-[70%]
        ' onSubmit={(e)=>e.preventDefault()}>
            <FaSearch className='text-green-500 w-[20px] h-[20px]'/>
            <input type="text" className='bg-white w-[100%] outline-none text-[16px] md:text-[20px]'
            onChange={(e)=>setInput(e.target.value)} value={input} placeholder='Search food' />
        </form>
        <div className='w-[60px] h-[60px] bg-white flex justify-center items-center rounded-md
        shadow-xl relative cursor-pointer' onClick={()=>{
          setShowCard(true)
        }}>
          <span className='absolute top-0 right-2 text-green-500 font-bold'>{items.length}</span>
            <FiShoppingBag className='h-[30px] w-[30px] text-green-500' />
        </div>
    </div>
  )
}

export default Navbar