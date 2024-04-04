import React, { Fragment, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

import Layout from "./Layout/Layout"
import Cart from "./Cart/Cart"
import Products from "./Shop/Products"
import { uiActions } from "../store/ui-slice"
import Notification from "./UI/Notification"
import { cartActions } from "../store/cart-slice"

let isInitial = true

const App = () => {
    const dispatch = useDispatch()
    const showCart = useSelector((state) => state.ui.cartIsVisible)
    const cart = useSelector((state) => state.cart)
    const notification = useSelector((state) => state.ui.notification)

    useEffect(() => {
        const sendCartData = async() => {
            dispatch(uiActions.showNotification({status: "sending", title: "Sending", message: "Sending cart data"}))

            const response = await fetch("https://shopping-cart-acead-default-rtdb.firebaseio.com/cart.json", {
                method: "PUT",
                body: JSON.stringify(cart)
            })

            if(!response.ok) {
                throw new Error("Sending cart data is failed")
            }
            dispatch(uiActions.showNotification({status: "success", title: "Success", message: "Send cart data successfully"}))
        }
        
        if(isInitial) {
            isInitial = false
            return
        }

        sendCartData().catch((error) => {
            dispatch(uiActions.showNotification({status: "error", title: "Error", message: "Sending cart data is failed"}))
        })
    }, [cart, dispatch])
    
    useEffect(() => {
        const fetchCartData = async() => {
            const response = await fetch("https://shopping-cart-acead-default-rtdb.firebaseio.com/cart.json")
    
            if(!response.ok) {
                throw new Error("Fetching cart data is failed")
            }
    
            const data = await response.json()
            dispatch(cartActions.replaceCart({items: data.items || [], totalQuantity: data.totalQuantity}))
        }
    
        fetchCartData().catch((error) => {
            dispatch(uiActions.showNotification({status: "error", title: "Error", message: "Fetching cart data is failed"}))
        })
    }, [dispatch])
    
    return(
        <Fragment>
            {notification && <Notification status={notification.status} title={notification.title} message={notification.message} />}
            <Layout>
                {showCart && <Cart />}
                <Products />
            </Layout>
        </Fragment>
    )
}

export default App
