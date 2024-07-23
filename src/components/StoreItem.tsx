import { Card ,Button} from "react-bootstrap"
import { formatCurrency } from "../utils/formatCurrency"
import { useShoppingCart } from "../context/ShoppingCartContext"
type StoreItemProps = {
    id:number
    name:string
    price:number
    imgUrl:string
}

export function StoreItem({id,title,price,images}:StoreItemProps) {
    const {getItemQuantity,increaseCartQuantity,decreaseCartQuantity,removeFromCart} = useShoppingCart()
    const quantity = getItemQuantity(id)
    return (
       <Card>
        <Card.Img variant="top " src={images[0]} height='300px' style={{objectFit:'cover'}}/>
        <Card.Body className="d-flex flex-column">
            <Card.Title className="d-flex justify-content-space-between aligin-items-baseline">
                <span className="fs-2">{title}</span>
                <span className="ms-2">{formatCurrency(price)}</span>
            </Card.Title>
            <div className="mt-auto">
                {quantity === 0 ? (
                    <Button onClick={()=> increaseCartQuantity(id)}>+ Add to cart</Button>
                ):(<div className="d-flex aligin-items-center justify-content-center" style={{gap: ".5rem"}}>
                    <Button onClick={()=> decreaseCartQuantity(id)}>-</Button>
                    <span className="fs-3">{quantity} in cart</span>
                    <Button onClick={()=> increaseCartQuantity(id)}>+</Button>
                    <Button
                        onClick={()=> removeFromCart(id)}
                        variant="danger"
                        size="sm"
                    >Remove</Button>
                    </div>
                    )}
            </div>
        </Card.Body>
       </Card>
        )
    }