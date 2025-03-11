import Nav from "./Nav";
import { Link, useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { ProductContext } from "../utils/Context";
import Loading from "./Loading";
import axios from "../utils/axios";
const Home = () => {
  const [products] = useContext(ProductContext);

  const { search } = useLocation();
  const category = decodeURI(search.split("=")[1]);

  const [selectedCategory, setSelectedCategory] = useState(null);

  //   const getCategoryProducts = async () => {
  //     try {
  //       const { data } = await axios.get(`/products/category/${category}`);
  //       setSelectedCategory(data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  useEffect(() => {
    if (category === "undefined") setSelectedCategory(products);
    if (category !== "undefined") {
      // getCategoryProducts();
      setSelectedCategory(
        products.filter(
          (product) => product.category.toLowerCase() === category,
        ),
      );
    }
  }, [category, products]);

  return products ? (
    <>
      <Nav />
      <div className="flex h-full w-[80%] flex-wrap items-start justify-center gap-4 overflow-x-hidden overflow-y-auto bg-slate-50 px-5 py-5">
        {selectedCategory &&
          selectedCategory?.map((product) => (
            <Link
              key={product?.id}
              to={`/detail/${product?.id}`}
              className="card flex h-82 w-60 flex-col items-start justify-start gap-1 rounded-lg bg-white p-4 shadow-lg outline-none"
            >
              <div className="group mb-2 min-h-48 w-full overflow-hidden rounded-t-lg">
                <img
                  className="aspect-square h-full w-full object-contain transition-transform duration-300 ease-in-out group-hover:scale-110"
                  src={`${product?.image}`}
                  alt=""
                />
              </div>
              <h2 className="text-md mb-2 w-full overflow-hidden font-medium overflow-ellipsis whitespace-nowrap">
                {product?.title}
              </h2>

              <button className="font-regular mt-auto cursor-pointer rounded-lg border border-slate-600 bg-slate-600 px-4 py-2 text-sm text-slate-100 transition-all duration-200 outline-none hover:bg-slate-700">
                Know more
              </button>
            </Link>
          ))}
      </div>
    </>
  ) : (
    <Loading />
  );
};

export default Home;
