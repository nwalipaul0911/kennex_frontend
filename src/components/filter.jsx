import { useEffect, useState } from "react";
import "./filter.css";

const Filter = ({ store, setFiltered }) => {
  const [categories, setCategories] = useState([]);
  const [currCategory, setCurrCategory] = useState("");
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(100000);
  const url = import.meta.env.VITE_BACKEND_URL;

  const getCategories = async () => {
    const res = await fetch(`${url}/categories`);
    if (res.status == 200) {
      const data = await res.json();
      setCategories(data);
    }
  };
  const handleFilter = () => {
    const filtered = store.filter((item) =>
      currCategory
        ? item.category == currCategory
        : item.category == item.category
    );
    setFiltered(filtered);
  };
  useEffect(() => {
    categories == "" ? getCategories() : null;
    handleFilter();
  }, [currCategory]);

  return (
    <>
      <h5 className="text-center">
        Filter by category <i className="fa-solid fa-filter"></i>
      </h5>
      <hr />
      <a
        className="btn btn-sm btn-outline-secondary rounded-pill px-3"
        onClick={() => setCurrCategory("")}
      >
        All
      </a>
      {categories.map((category, index) => (
        <a
          key={index}
          className="btn btn-sm btn-outline-secondary rounded-pill px-3"
          onClick={() => setCurrCategory(category.id)}
        >
          {category.name}
        </a>
      ))}

      <hr />
    </>
  );
};

export default Filter;
