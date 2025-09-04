import { useContext, useState } from 'react'
import Categories from '../category'
import Navbar from './../component/navbar'
import Card from './../component/card'
import Card2 from './../component/card2'
import { food_items } from '../food'
import { dataContext } from '../context/userContext'
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { RxCross2 } from 'react-icons/rx'

const Home = () => {
  // let [cat,setCat] = useState(food_items)
  const {cat, setCat,input,showCard,setShowCard} = useContext(dataContext)

  function filter(category) {
  if (category.toLowerCase() === "all") {
    setCat(food_items);
  } else {
    let newList = food_items.filter(
      (item) => item.food_category.toLowerCase() === category.toLowerCase()
    );
    setCat(newList);
  }
}

let items = useSelector(state=>state.cart)
let subtotal =  items.reduce((total,item)=>total+item.qty*item.price,0) 
let deliveryFee = 20;
let taxes = subtotal*0.5/100
let total = Math.floor(subtotal+deliveryFee+taxes)

  return (
    <div className='w-full'>
        <Navbar />
        {!input?<div className='flex flex-wrap justify-center items-center gap-5 w-[100%]'>
          {Categories.map((item, index)=>{
            return <div key={index} className='w-[140px] h-[150px] bg-white flex flex-col items-start gap-5 p-5
            justify-start text-[17px] font-semibold text-grey-600 rounded-lg shadow-xl hover:bg-green-200
            cursor-pointer transition-all duration-200' onClick={()=>filter(item.name)}>
              {item.image}
              {item.name}
            </div>
          })}
        </div>:null}
        
      <div className='w-full flex flex-wrap gap-5 px-5 justify-center items-center pt-8'>
        {cat.length>1?
        cat.map((item) => (
          <Card
            key={item.id}
            name={item.food_name}
            image={item.food_image}
            id={item.id}
            price={item.price}
            type={item.food_type}
          />
        )):<div className='text-green-500 text-2xl text-center text-semibold pt-2'>
          No Dish Found
          </div>}
        
      </div>
      <div className={`w-full md:w-[40vw] h-[100%] fixed top-0 right-0 bg-white flex flex-col items-center shadow-xl p-6
         translation-all overflow-auto duration-500 ${showCard?"translate-x-0":"translate-x-full"}`}>

        <header className='w-[100%] flex justify-between items-center'>
          <span className='text-green-500 text-[18px] font-semibold'>Order Items</span>
          <RxCross2 className='w-[30px] h-[30px] text-green-500 text-[18px] font-semibold' onClick={()=>{
            setShowCard(false)
          }} />
        </header>
        {items.length>0?
        <>
        <div className='w-full mt-9 flex flex-col gap-8'>
          {items.map((item)=>(
            <Card2 key={item.id} name={item.name} price={item.price} image={item.image} id={item.id} qty={item.qty} />
          ))}
        </div>
        <div className='w-full border-t-2 border-b-2 border-gray-400 mt-7 flex flex-col gap-4 p-8'>
          <div className='w-full flex justify-between items-center'>
            <span className='text-lg text-gray-600 font-semibold'>Subtotal</span>
            <span className='text-green-400 font-semibold text-lg'>Rs {subtotal}/-</span>
          </div>
          <div className='w-full flex justify-between items-center'>
            <span className='text-lg text-gray-600 font-semibold'>Delivery Fee</span>
            <span className='text-green-400 font-semibold text-lg'>Rs {deliveryFee}/-</span>
          </div>
          <div className='w-full flex justify-between items-center'>
            <span className='text-lg text-gray-600 font-semibold'>Taxes</span>
            <span className='text-green-400 font-semibold text-lg'>Rs {taxes }/-</span>
          </div>

        </div>
        <div className='w-full flex justify-between items-center p-9'>
            <span className='text-xl text-gray-600 font-semibold text-2xl'>Total</span>
            <span className='text-green-400 font-semibold text-xl'>Rs {total}/-</span>
          </div>
        <button className='w-[80%] p-3 rounded-lg bg-green-400 text-white hover:bg-green-300 transition-all'
        onClick={()=>{
          toast.success("Order Placed....")
        }}>Place Order</button>
      </>:<div className='text-green-400 text-2xl font-semibold text-center pt-5'>Empty Card</div>
      }
        
    </div>
</div>
  )
}

export default Home