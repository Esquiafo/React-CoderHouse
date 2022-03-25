import  {createContext} from 'react';


const ApiContext = createContext({
    // Array de productos
    items: [],
    email: "",
    name: "",
    phone: "",
    lastPurchase: "",
});

export default ApiContext;

