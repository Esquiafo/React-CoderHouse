import  {createContext} from 'react';


const CartContext = createContext({
    // Array de productos
    items: [],
    // Funcion que agrega nuevos productos
        addItems(x)  {
        this.items.length!==0 ?
           this.lookItem(x)!==true ? this.items.push(x) : alert('Ya esta en el carrito')
         : this.items.push(x)
        },
        // Funcion que busca un ID repetido
        lookItem (b) {
        for (let i = 0; i < this.items.length; i++) {
        if (b.id===this.items[i].id) {return true}
        } return false
        },
        // Funcion que borra todos los elementos
        clear() {
        this.items=[];
        },
        // Funcion que borra un ID especifico
        eliminarId (h) {
          this.items.splice(h,1)
        },
        // Contador positivo carrito
        upCant (h) {
          console.log(h)
          if(this.items[h].cantidad==this.items[h].stock){
            alert("No se puede aumentar mas")
          }else{
            this.items[h].cantidad++
          }
        },
         // Contador negativo carrito
        downCant (h) {
          this.items[h].cantidad--
          if (this.items[h].cantidad==0) {
            this.eliminarId(h)
          }
        },
        
});

export default CartContext;

