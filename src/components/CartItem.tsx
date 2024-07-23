import React from 'react'
import {useShoppingCart} from '../context/ShoppingCartContext'
import { useState,useEffect } from 'react'
import axios from 'axios'
import { Stack ,Button} from 'react-bootstrap'
import { formatCurrency } from '../utils/formatCurrency'
type CartItemProps={
    id:number
    quantity:number
}
const CartItem = ({id,quantity}: CartItemProps) => {
    const {removeFromCart} = useShoppingCart()
    const [products, setProducts] = useState([]); // Initialize empty products state

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get('https://dummyjson.com/products'); // Corrected URL
          setProducts(response.data.products);
        } catch (error) {
          console.error('Error fetching products:', error);
        }
      };
  
      fetchData();
    }, []); // Empty dependency array to fetch data only once on component mount

    const item = products.find(item => item.id === id)
    if(!item){
        return null
    }
  return (
    <>
      <Stack direction="horizontal" gap={3} className='d-flex align-items-center'>
        <img src={item.images[0]} alt="" style={{width:'125px' ,objectFit:'cover'}}/>
        <div>
            {item.title} {quantity >1 && <span style={{fontSize:".65rem"}}>x{quantity}</span>}
        </div>
        <div style={{fontSize:".65rem"}}>{formatCurrency(item.price * quantity)}</div>
    <Button variant='outline-danger' size='sm' onClick={()=> removeFromCart(item.id)}>&times;</Button>
        </Stack>
    </>
  )
}

export default CartItem