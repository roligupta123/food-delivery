import React, { createContext, useState } from 'react'
import { food_items } from '../food'

export const dataContext = createContext(null)
const UserContext = (props) => {
    let [input,setInput] = useState("")
    let [cat,setCat] = useState(food_items)
    let [showCard,setShowCard] = useState(false)
    let data = {
        input,
        setInput,
        cat,
        setCat,
        showCard,
        setShowCard
    }
  return (
    <div>
        <dataContext.Provider value={data}>
            {props.children}
        </dataContext.Provider>
        
    </div>
  )
}

export default UserContext