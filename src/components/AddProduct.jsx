import { useContext, useEffect, useState } from "react";
import { ProductContext } from "../utils/Context";
import { nanoid } from "nanoid";
import { useNavigate, useParams } from "react-router-dom";
import InputField from "./InputField";
import SelectedField from "./SelectedField";
import TextAreaField from "./TextAreaField";
import { toast } from "react-toastify";

const AddProduct = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  const [products, setProducts] = useContext(ProductContext);

  const [getProductDetail, setGetProductDetail] = useState({
    title: "",
    image: "",
    category: "",
    price: "",
    description: "",
  });

  const { title, image, category, price, description } = getProductDetail;

  const [error, setError] = useState({});

  useEffect(() => {
    if (id) {
      const productToEdit = products.find(
        (product) => product.id.toString() === id,
      );
      if (productToEdit) {
        setGetProductDetail(productToEdit);
      }
    }
  }, [id, products]);

  const validateFormData = (formData) => {
    const errorData = {};
    if (!formData.title) errorData.title = "Title is required";
    if (!formData.image) errorData.image = "ImageUrl is required";
    if (!formData.category) errorData.category = "Please select a category";
    if (!formData.price) errorData.price = "Price is required";
    if (!formData.description)
      errorData.description = "Description is required";
    setError(errorData);
    return errorData;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const getErrorData = validateFormData(getProductDetail);

    if (Object.keys(getErrorData).length > 0) return;

    if (id) {
      // Update existing product
      const updatedProducts = products.map((product) =>
        product.id.toString() === id ? { ...getProductDetail, id } : product,
      );
      setProducts(updatedProducts);
      localStorage.setItem("products", JSON.stringify(updatedProducts));
      toast.success("Product updated successfully!")
    } else {
      // Add new product
      const newProduct = { ...getProductDetail, id: nanoid() };
      setProducts([...products, newProduct]);
      localStorage.setItem(
        "products",
        JSON.stringify([...products, newProduct]),
      );
      toast.success("New product added successfully!")
    }

    navigate("/");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGetProductDetail((prev) => ({ ...prev, [name]: value }));
    setError({});
  };

  return (
    <div className="m-auto flex h-screen w-full max-w-[80%] flex-col py-5 text-center">
      <h2 className="mb-3 text-2xl font-semibold">
        {id ? "Edit Product" : "Add New Product"}
      </h2>
      <form
        className="flex flex-col items-center gap-9"
        onSubmit={handleFormSubmit}
      >
        <InputField
          id="title"
          label="Title"
          type="text"
          name="title"
          value={title}
          onChangeHandler={handleChange}
          error={error.title}
        />
        <InputField
          id="image"
          label="ImageUrl"
          type="url"
          name="image"
          value={image}
          onChangeHandler={handleChange}
          error={error.image}
        />
        <div className="text-md flex w-1/2 justify-center gap-3">
          <SelectedField
            id="category"
            label="Category"
            value={category}
            name="category"
            onChangeHandler={handleChange}
            error={error.category}
            classNameAddedProps="flex-1"
            optionsValue={[
              "electronics",
              "men's clothing",
              "women's clothing",
              "kitchen",
              "books",
              "jewelery",
              "others",
            ]}
            defaultOption="Select Category"
          />
          <InputField
            id="price"
            label="Price"
            type="number"
            name="price"
            value={price}
            onChangeHandler={handleChange}
            error={error.price}
            classNameAddedProps="flex-1"
          />
        </div>
        <TextAreaField
          id="description"
          label="Description"
          name="description"
          value={description}
          rows={7}
          onChangeHandler={handleChange}
          error={error.description}
        />
        <div className="flex w-1/2 items-start">
          <button className="font-regular cursor-pointer rounded-lg border border-slate-600 bg-slate-600 px-4 py-2 text-sm text-slate-100 transition-all duration-200 outline-none hover:bg-slate-700">
            {id ? "Save" : "Add"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
