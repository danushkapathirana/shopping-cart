import React from "react"

import Layout from "./Layout/Layout"
import Cart from "./Cart/Cart"
import Products from "./Shop/Products"

const App = () => {
    return(
        <Layout>
            <Cart />
            <Products />
        </Layout>
    )
}

export default App
