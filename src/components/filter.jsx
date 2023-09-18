import { useEffect, useState } from "react";
import "./filter.css";

const Filter = ({ store, setFiltered, setItemOffset }) => {
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
    setItemOffset(0)
  };
  useEffect(() => {
    categories == "" ? getCategories() : null;
    handleFilter();
  }, [currCategory]);

  return (
    <>
      <a
        className="btn btn-sm btn-outline-light rounded-0 px-3"
        onClick={() => setCurrCategory("")}
      >
        All
      </a>
      {categories.map((category, index) => (
        <a
          key={index}
          className="btn btn-sm btn-outline-light rounded-0 px-3"
          onClick={() => setCurrCategory(category.id)}
        >
          {category.name}
        </a>
      ))}
    </>
  );
};

export default Filter;
