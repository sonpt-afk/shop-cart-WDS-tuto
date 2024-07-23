import { Offcanvas,Stack } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import  CartItem  from "./CartItem";
import { formatCurrency } from "../utils/formatCurrency";
import { useEffect, useState } from "react";
import axios from "axios";
type ShoppingCartProps = {
    isOpen:boolean

}


export function ShoppingCart({isOpen}:ShoppingCartProps){
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
    const {closeCart,cartItems} = useShoppingCart()
    return <Offcanvas show={isOpen} placement="end" onHide={closeCart}>
        <Offcanvas.Header closeButton>
            <Offcanvas.Title>Shopping Cart</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
            <Stack gap={3}>
                {cartItems.map(item =>(
                    <CartItem key={item.id} {...item}/>
                ))}
                <div className="ms-auto fw-bold">
                    Total{" "}
                    {formatCurrency(
                        cartItems.reduce((total,cartItems)=> {
                        const item = products.find(product => product.id === cartItems.id)
                         return total + (item?.price ||0) * cartItems.quantity},0
                        
                        )
                        )
                    }
                </div>
            </Stack>
        </Offcanvas.Body>
    </Offcanvas>
}