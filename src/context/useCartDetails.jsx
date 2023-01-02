// Connection between 'Add to cart' in DetailProduct and CartDetails 
import { useState } from "react";
import { createContext } from "react";

// Export named
export const useCartDetails = createContext();

// Export default
export default (props) => {
    const [cartProducts, setCartProducts] = useState([])

    const addCartProducts = (product) => {
        if(cartProducts.length === 0){
            return setCartProducts([...cartProducts, product])
        }
        setCartProducts(cartProducts.map(item => {
            if(item.id === product.id){
               return(
                {...item, quantity: item.quantity + product.quantity}
               )
            }else{
                return item
            }
        }))
    };
    const deleteCartProducts = (id) => {
        setCartProducts(cartProducts.filter(item => item.id !== id))
    };

    const totalItems = cartProducts.reduce((acc, current) => current.quantity + acc, 0)

    return (
        <useCartDetails.Provider value={{cartProducts, addCartProducts, deleteCartProducts, totalItems}}>
            {props.children}
        </useCartDetails.Provider>
    )
}