
 import { useState,useEffect,useMemo } from "react"
 import type {Guitar,CartItem} from'../types/'
 import { guitardb } from "../bd/gutarrasBd" 

 const useCart = () => {
    const initialCart=() : CartItem[]=>{
        const localStorageCart= localStorage.getItem('cart')
        return localStorageCart? JSON.parse(localStorageCart) :[]
      }
    
       const [data,setData] =useState<Guitar[]>([])
       const [cart,setCart] =useState(initialCart)
       const MIN_ITEMS=1
       
       useEffect(() => {
         if(guitardb.length >0){
            setData(guitardb)
         }     
       }, [data])
    
       useEffect(()=>{
        localStorage.setItem('cart',JSON.stringify(cart))
       },[cart])
    
      
       const addCart=(item:Guitar)=>{
        const itemExist=cart.findIndex(guitar => guitar.id === item.id)
        if(itemExist >=0 ){
          const updateCart=[...cart];
          updateCart[itemExist].quantity++
          setCart(updateCart)
        }else{
          const newItem :CartItem = {...item, quantity : 1 }
          setCart([...cart,newItem])
        }
       
       }
    
      const removeItem=(id : Guitar['id'])=>{
        setCart(prevCart => prevCart.filter(guitar => guitar.id !== id))
       }
    
      const increaseQuantity=(id: Guitar['id'])=>{
        const updateCart= cart.map(item =>{
          if(item.id ===id){
            return{
              ...item,
              quantity: item.quantity +1
            }
          }
          return item
        })
        setCart(updateCart)
       }
    
       const reduceQuantity=(id: Guitar['id'])=>{
        const updateCart= cart.map(item =>{
          if(item.id ===id && item.quantity >MIN_ITEMS ){
            return{
              ...item,
              quantity: item.quantity -1
            }
          }
          return item
        })
        setCart(updateCart)
       }
    
      const delCart=()=>{
        setCart([])
       }

    const isEmpty= useMemo( () => cart.length === 0, [cart] )
    const cartTotal= useMemo(()=> cart.reduce((total,item)=> total +(item.quantity * item.price),0), [cart])

     return{
        data,
        cart,
        setCart,
        addCart,
        removeItem,
        increaseQuantity,
        reduceQuantity,
        delCart,
        isEmpty,
        cartTotal
     }  
    
 }
 
 export default useCart