import axios from "./axios";
import { createContext, useEffect, useState } from "react";

export const ProductContext = createContext();

const Context = (props) => {
  // const [products, setProducts] = useState(null)
  
  const [products, setProducts] = useState(
    JSON.parse(localStorage.getItem("products")),
  );

  // const getProducts = async () => {
  //     try {
  //         const { data } = await axios.get("/products");
  //         setProducts(data);
  //     } catch (error) {
  //         console.log(error);
  //     }
  // };

  // useEffect(() => {
  //     getProducts();
  // }, []);

  return (
    <ProductContext.Provider value={[products, setProducts]}>
      {props.children}
    </ProductContext.Provider>
  );
};

export default Context;
