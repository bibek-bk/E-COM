import { useDispatch, useSelector } from "react-redux";
import ProductCard from "./ProductCard";
import { useGetProductList } from "../hooks/useGetProductList";
import { useEffect, useState } from "react";
import { addProductRender } from "../utils/store/productSlice";
import { useGetProductCategory } from "../hooks/useGetProductCategory";
import ProductCategory from "./ProductCategory";
import Filter from "./Filter";

function ProductListing() {
  useGetProductList();
  useGetProductCategory();
  const dispatch = useDispatch();
  const productList = useSelector((store) => store.products?.productList);
  const renderingData = useSelector((store) => store.products?.productRender);
  const searchResult = useSelector((store) => store.products?.searchResult);
  const [toggle, setToggle] = useState(false);

  const [page, setPage] = useState(2)
  useEffect(() => {
    dispatch(addProductRender(productList));
  }, [productList]);

  if (!renderingData) {
    return (
      <>
        <p className="font-bold text-xl text-center text-black">Loading..</p>
      </>
    );
  } else
    return (
      <div className="relative">
        {/* filter-mobile */}
        <div
          className={
            +toggle
              ? "w-full h-full fixed bg-white opacity-90  z-30 top-0 "
              : "hidden"
          }
        >
          <p
            className=" font-extrabold m-10  text-2xl w-fit cursor-pointer"
            onClick={() => setToggle(false)}
          >
            close
          </p>
        </div>
        <ProductCategory />
        <div className="sort flex items-center">
          <h1>SORT BY</h1>
          <button className="border-4 font-bold px-4 py-1">
            Price Low to High
          </button>
        </div>
        {searchResult && (
          <div className="px-4 py-2 font-bold">
            Search Results for '{searchResult}'{" "}
          </div>
        )}
        <div className="sort_filter flex font-bold md:hidden">
          <div
            className="sort w-1/2 text-center border-r-2 py-1.5 my-2 cursor-pointer border-black"
            onClick={() => setToggle(true)}
          >
            Sort
          </div>
          <div
            className="filter w-1/2 text-center py-1.5 my-2 cursor-pointer"
            onClick={() => setToggle(true)}
          >
            Filter
          </div>
        </div>

        {renderingData.length === 0 ? (
          <p className="font-bold text-xl text-center text-black ">
            No Products Available
          </p>
        ) : (
          <div className=" flex gap-2  mb-16 px-4">
            {/* filters */}
            <Filter />
            {/* Product Rendering */}
            <div>
              <div className="flex  w-full flex-wrap place-content-evenly gap-2   ">
                {renderingData?.slice(page * 5 - 5, page * 5).map((p) => (
                  <ProductCard key={p.id} p={p} />
                ))}
              </div>
              <div className="pagination">
                <span>{'<-'}</span>
                {/* [...Array(renderingData).map(_,i)] */}
                <span>{'->'}</span>

              </div>
            </div>
          </div>
        )}
      </div>
    );
}

export default ProductListing;
