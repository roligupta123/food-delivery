import image1 from '../assets/image1.avif'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { useDispatch } from 'react-redux'
import { RemoveItem,IncrementQty,DecrementQty } from "../redux/cartSlice";

const Card2 = ({name,price,image,id,qty}) => {
    let dispatch = useDispatch()
  return (
    <div className="w-full h-[120px] shadow-lg p-2 flex justify-between" >
        <div className="w-[60%] h-full bg-slate-200 flex gap-5">
            <div className="w-[60%] h-full overflow-hidden rounded-lg">
                <img src={image} alt="" className='object-cover'/>
            </div>
            <div className='w-[40%] h-full flex flex-col gap-5'>
                <div className='text-lg text-gray-600 font-semibold'>{name}</div>
                <div className='w-[100px] h-[50px] text-xl flex rounded-lg overflow-hidden shadow-lg
                font-semibold border-2 border-green-400'>
                    <button className='w-[30%] h-full bg-white flex justify-center items-center text-green-400 hover:bg-gray-300'
                    onClick={()=>{
                        qty>1?dispatch(DecrementQty(id)):1
                    }}>-</button>
                    <span className='w-[40%] h-full bg-slate-300 flex justify-center items-center text-green-400'>{qty}</span>
                    <button className='w-[30%] h-full bg-white flex justify-center items-center text-green-400
                    hover:bg-gray-200' onClick={()=>{
                        dispatch(IncrementQty(id))
                    }}>+</button>
                </div>
            </div>
        </div>
        <div className='flex flex-col justify-start items-end gap-6'>
            <span className='text-xl text-green-400 font-semibold'>Rs {price}</span>
            <RiDeleteBin6Line className='w-[30px] h-[30px] text-red-300 cursor-pointer' onClick={()=>dispatch(RemoveItem(id))}/>
        </div>
    </div>
    
  )
}

export default Card2