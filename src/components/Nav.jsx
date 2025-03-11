import { useContext } from "react";
import { ProductContext } from "../utils/Context";
import { Link } from "react-router-dom";

const Nav = () => {
  const [products] = useContext(ProductContext);

  // Get distinct categories from products array and remove duplicates using 'new Set()'
  let distinctCategories =
    products &&
    products.reduce(
      (acc, currCat) => [...acc, currCat.category.toLowerCase()],
      [],
    );

  distinctCategories = [...new Set(distinctCategories)];

  const randomColor = () => {
    return `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.7)`;
  };

  return (
    <nav className="flex h-full w-[20%] flex-col items-center gap-2 bg-slate-200 py-10">
      <Link
        to="/create"
        className="font-regular mb-1 rounded-lg border border-slate-600 bg-slate-600 px-4 py-2 text-sm text-slate-100 transition-all duration-200 outline-none hover:bg-slate-700"
      >
        Add new Product
      </Link>
      <h2 className="w-[80%] text-xl font-semibold">Category Filter</h2>
      <hr className="my-2 w-[80%] rounded-lg border-slate-300" />
      <ul className="flex w-[80%] flex-col gap-3 text-sm">
        <Link to="/" className="flex items-center gap-2 outline-none">
          <span
            style={{ backgroundColor: randomColor() }}
            className="inline-block h-3 w-3 rounded-full"
          ></span>
          Home
        </Link>
        {distinctCategories &&
          distinctCategories.map((category, i) => (
            <Link
              to={`/?category=${category}`}
              key={i}
              className="flex items-center gap-2 outline-none"
            >
              <span
                style={{ backgroundColor: randomColor() }}
                className="inline-block h-3 w-3 rounded-full"
              ></span>
              {category}
            </Link>
          ))}
      </ul>
    </nav>
  );
};

export default Nav;
