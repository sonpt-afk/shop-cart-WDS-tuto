import {useContext,createContext,ReactNode, useState} from 'react';
import {ShoppingCart} from '../components/ShoppingCart'
import useLocalStorage from '../hook/useLocalStorage'
type ShoppingCartProviderProps = {
    children: ReactNode;
    
}

type ShoppingCartContext ={
    getItemQuantity: (id:number) => number;
    increaseCartQuantity: (id:number) => void;
    decreaseCartQuantity: (id:number) => void;
    removeFromCart: (id:number) => void;
    cartQuantity: number;
    cartItems: CartItem[];
    openCart: () => void;
    closeCart: () => void;
}

type CartItem={
    id:number
    name:string
    quantity:number
}

const ShoppingCartContext = createContext({} as ShoppingCartContext);
export function useShoppingCart() {
  return useContext(ShoppingCartContext);
}

export function ShoppingCartProvider({children}:ShoppingCartProviderProps) {
  const [cartItems,setCartItems] = useLocalStorage<CartItem[]>("shopping-cart",[])
    const [isOpen,setIsOpen] = useState(false)
  const cartQuantity = cartItems.reduce((quantity,item)=> item.quantity + quantity,0)


  const openCart = () => setIsOpen(true)
    const closeCart = () => setIsOpen(false)

  function getItemQuantity(id:number){
    return cartItems.find(item => item.id === id)?.quantity || 0
}

function increaseCartQuantity(id:number){
    setCartItems(currItems =>{
        if(currItems.find(item=> item.id === id) ==null){
            return [...currItems,{id,quantity:1}]
        }else{
            return currItems.map(item=>{
                if(item.id === id){
                    return {...item,quantity:item.quantity+1}
                }else{
                    return item
                }
            
            })
        }
    })
}
 
function decreaseCartQuantity(id:number){

    setCartItems(currItems =>{
        if(currItems.find(item=> item.id === id) ?.quantity === 1){
            return currItems.filter(item=> item.id !== id)
        }else{
            return currItems.map(item=>{
                if(item.id === id){
                    return {...item,quantity:item.quantity - 1}
                }else{
                    return item
                }
            
            })
        }
    })
}

function removeFromCart(id:number){
    setCartItems(currItems => currItems.filter(item=> item.id !== id))

}
    return (
    <ShoppingCartContext.Provider value={
        {getItemQuantity,
        removeFromCart,
        increaseCartQuantity,
        decreaseCartQuantity,
            closeCart,
            openCart,   
        cartItems,
          cartQuantity}}>
      {children}
      <ShoppingCart isOpen={isOpen}/>
    </ShoppingCartContext.Provider>
  )
}