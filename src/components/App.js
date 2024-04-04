import React from "react"
import { useSelector } from "react-redux"

import Layout from "./Layout/Layout"
import Cart from "./Cart/Cart"
import Products from "./Shop/Products"

const App = () => {
    const showCart = useSelector((state) => state.ui.cartIsVisible)
    
    return(
        <Layout>
            {showCart && <Cart />}
            <Products />
        </Layout>
    )
}

export default App
