
"use client"
const { useContext, createContext, useState } = require("react");


const OrderContext = createContext()


export const useOrder = () => useContext(OrderContext);



export const OrderProvider = ({ children }) => {

    const [user, setuser] = useState({ name: "", email: "", phoneNumber: "" })
    const [address, setaddress] = useState({ shipping_address: "", billing_address: "" })
    const [payment, setpayment] = useState({ payment_type: "" })
    const [ordertotal  , setordertotal] = useState(0)
    return (
        <OrderContext.Provider value={{ user, setuser, address, setaddress, payment, setpayment, setordertotal, ordertotal }}>
            {children}
        </OrderContext.Provider>
    );
};