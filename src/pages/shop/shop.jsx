import "./shop.css";
import Product from "./product";
import { useEffect, useState, useRef } from "react";
import { useLoaderData } from "react-router-dom";
import { setProducts } from "../../slices/products_slice";
import { useDispatch } from "react-redux";
import ReactPaginate from "react-paginate";
import { trackWindowScroll } from "react-lazy-load-image-component";
import { AnimatePresence, motion } from "framer-motion";
import Filter from "../../components/filter";
const Shop = ({ scrollPosition }) => {
  const url = import.meta.env.VITE_BACKEND_URL;
  const store = useLoaderData();
  const [filtered, setFiltered] = useState(store.products);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setProducts(store.products));
  }, [store]);
  const itemsPerPage = 20;
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = filtered.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(filtered.length / itemsPerPage);
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % filtered.length;
    setItemOffset(newOffset);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        
        <div className="col pb-5 order-md-2">
          <div className="row px-4">
            <h1 className="text-center text-dark my-4">Products</h1>
            {currentItems.map((product, index) => (
              <AnimatePresence>
                <motion.div exit={{ opacity: 0 }} className="col-6 col-md-3">
                  <Product
                    key={index}
                    product={product}
                    scrollPosition={scrollPosition}
                  />
                </motion.div>
              </AnimatePresence>
            ))}
          </div>
          <ReactPaginate
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            marginPagesDisplayed={2}
            pageCount={pageCount}
            previousLabel="< previous"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            breakLabel="..."
            breakClassName="page-item"
            breakLinkClassName="page-link"
            containerClassName="pagination"
            activeClassName="active"
            activeLinkClassName="active"
            renderOnZeroPageCount={null}
          />
        </div>
        <div className="col-md-3 bg-light p-3 border">
          <Filter store={store.products} setFiltered={setFiltered} />
        </div>
      </div>
    </div>
  );
};
export default trackWindowScroll(Shop);
