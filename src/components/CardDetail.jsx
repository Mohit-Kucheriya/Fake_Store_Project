import { useContext, useEffect, useState } from "react";
import axios from "../utils/axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loading from "./Loading";
import { ProductContext } from "../utils/Context";
import { toast } from "react-toastify";

const CardDetail = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  const [products, setProducts] = useContext(ProductContext);

  const [singleProductData, setSingleProductData] = useState(null);

  const { image, title, category, description, price } =
    singleProductData || {};

  // const getSingleProductDetail = async () => {
  //   try {
  //     const { data } = await axios.get(`/products/${id}`);
  //     setSingleProductData(data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  useEffect(() => {
    if (!singleProductData && products.length > 0) {
      setSingleProductData(
        products.find((product) => product.id.toString() === id),
      );
    }
    // getSingleProductDetail();
  }, [id, products]);

  const deleteProduct = (id) => {
    const afterDeleteProduct = products.filter((product) => product.id !== id);
    setProducts(afterDeleteProduct);
    localStorage.setItem("products", JSON.stringify(afterDeleteProduct));
    toast.success("Product deleted successfully!")
    navigate("/");
  };

  return singleProductData ? (
    <div className="m-auto flex h-screen w-full max-w-[80%] flex-col items-start gap-10 py-10">
      <button
        onClick={() => navigate(-1)}
        className="font-regular font-regular flex cursor-pointer items-center gap-1 rounded-lg border border-slate-600 bg-slate-600 px-4 py-2 text-sm text-slate-100 transition-all duration-200 outline-none hover:bg-slate-700"
      >
        <ion-icon className="h-4 w-4" name="chevron-back-sharp"></ion-icon>
        Back
      </button>
      <div className="flex w-full items-center justify-center gap-10">
        <div className="w-[25%]">
          <div className="h-76 w-full overflow-hidden">
            <img
              className="aspect-square h-full w-full object-contain"
              src={image}
              alt=""
            />
          </div>
        </div>
        <div className="flex w-[50%] flex-col gap-2">
          <h2 className="text-2xl font-semibold">{title}</h2>
          <p className="text-md font-medium">
            Category - <span>{category}</span>
          </p>
          <p className="text-md font-medium">
            Price - <span className="">${price}</span>
          </p>
          <p className="text-md text-slate-600">
            Description - <span>{description}</span>
          </p>

          <div className="mt-3 flex gap-2">
            <button
              onClick={() => navigate(`/edit/${id}`)}
              className="font-regular cursor-pointer rounded-lg border border-slate-600 bg-slate-600 px-4 py-2 text-sm text-slate-100 transition-all duration-200 outline-none hover:bg-slate-700"
            >
              Edit
            </button>

            <button
              onClick={() => deleteProduct(id)}
              className="font-regular cursor-pointer rounded-lg border border-slate-600 bg-white px-4 py-2 text-sm text-slate-600 transition-all duration-200 outline-none hover:bg-slate-600 hover:text-slate-100"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default CardDetail;
