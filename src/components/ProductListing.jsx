import { useDispatch, useSelector } from "react-redux";
import ProductCard from "./ProductCard";
import { useGetProductList } from "../hooks/useGetProductList";
import { useEffect, useState } from "react";
import Button from "./button";
import { addProductRender } from "../utils/store/productSlice";

function ProductListing() {
  useGetProductList();
  const productList = useSelector((store) => store.products?.productList);
  const renderingData = useSelector((store) => store.products?.productRender);
  const searchResult = useSelector((store) => store.products?.searchResult);
  const dispatch = useDispatch();
  // const [productBrand, setProductBrand] = useState(null);
  const [min, setMin] = useState(null);
  const [max, setMax] = useState(null);
  const [priceError, setPriceError] = useState();
  useEffect(() => {
    dispatch(addProductRender(productList));
    // console.log(productList);
  }, [productList]);
  // useEffect(() => {
  //   rd();
  // }, [renderingData]);
  // useEffect(() => {
  //   console.log(productBrand);
  //   productBrand &&
  //     Object.entries(productBrand).map((p) => {
  //       console.log("hi");
  //     });
  // }, [productBrand]);
  // const rd = () => {
  //   const brand = renderingData?.map((p) => p.brand);
  //   const newBrand = new Set(brand);
  //   setProductBrand(newBrand);
  // };
  //! All are runnnig in rendering but should change dynamicaly

  const handleTopRate4_5 = () => {
    const topRatedProduct = productList.filter((p) => p.rating >= 4.5);
    dispatch(addProductRender(topRatedProduct));
  };
  const handleTopRate4 = () => {
    const topRatedProduct = productList.filter((p) => p.rating >= 4);
    dispatch(addProductRender(topRatedProduct));
  };
  const handleTopRate3_5 = () => {
    const topRatedProduct = productList.filter((p) => p.rating >= 3.5);
    dispatch(addProductRender(topRatedProduct));
  };
  const handleTopRate3 = () => {
    const topRatedProduct = productList.filter((p) => p.rating >= 3);
    dispatch(addProductRender(topRatedProduct));
  };

  const handleDiscount20 = () => {
    const disProduct = productList.filter((p) => p.discountPercentage >= 20);
    dispatch(addProductRender(disProduct));
  };
  const handleDiscount15 = () => {
    const disProduct = productList.filter((p) => p.discountPercentage >= 15);
    dispatch(addProductRender(disProduct));
  };
  const handleDiscount10 = () => {
    const disProduct = productList.filter((p) => p.discountPercentage >= 10);
    dispatch(addProductRender(disProduct));
  };
  const handleDiscount5 = () => {
    const disProduct = productList.filter((p) => p.discountPercentage >= 5);
    dispatch(addProductRender(disProduct));
  };

  // const data = [{ price: 100 }, { price: 200 }, { price: 300 }];
  const handlePriceSearch = (min, max) => {
    // console.log(min);
    // console.log(max);
    // if (min > max) return setPriceError("min should be greater than");
    // if (min > max) {
    //   setPriceError(null);
    // }

    // console.log("fine");
    const priceFilteredData = renderingData.filter(
      (d) => d.price*133 <= max && d.price*133 >= min
    );
    dispatch(addProductRender(priceFilteredData));
    console.log(priceFilteredData);
  };

  if (!renderingData) {
    return (
      <>
        <p className="font-bold text-xl text-center text-black">Loading..</p>
      </>
    );
  } else
    return (
      <div>
        {/* <p>{}</p> */}
        <div>Categories</div>
        <div>Sort by</div>
        {searchResult && <div>Search Results for '{searchResult}' </div>}
        <div className=" flex gap-2  mb-16 px-4">
          {/* filters */}
          <div className="rounded-lg bg-slate-200 h-fit min-w-[15rem]  ">
            <h1 className="font-bold text-xl">Filters</h1>
            <div className="rating">
              <h1 className="font-bold">Customer rating</h1>
              <Button onClick={handleTopRate4_5} title={"4.5 & Up"} />
              <Button onClick={handleTopRate4} title={"4 & Up"} />
              <Button onClick={handleTopRate3_5} title={"3.5 & Up"} />
              <Button onClick={handleTopRate3} title={"3 & Up"} />
            </div>
            <div className="price font-serif"></div>
            <h1 className="font-serif">Price</h1>

            <div className=" flex gap-2">
              <input
                value={min}
                onChange={(e) => setMin(e.target.value)}
                type="number"
                placeholder="min"
                className="w-24 border border-black   rounded-sm px-2 "
              />
              -
              <input
                value={max}
                onChange={(e) => setMax(e.target.value)}
                type="number"
                placeholder="max"
                className="w-24 border border-black   rounded-sm px-2 "
              />
            </div>
            {priceError && <p>{priceError}</p>}

              <button
                onClick={() => handlePriceSearch(min, max)}
                className="border px-2 text-sm bg-gray-200 rounded-sm hover:text-gray-200 hover:bg-black font-semibold"
              >
                search
              </button>
            <div className="discount">
              <h1>Discount</h1>
              <Button onClick={handleDiscount20} title={"20% & more"} />
              <Button onClick={handleDiscount15} title={"15% & more"} />
              <Button onClick={handleDiscount10} title={"10% & more"} />
              <Button onClick={handleDiscount5} title={"5% & more"} />
            </div>
            <div className="brand">
              {/* {productBrand && Object.entries(productBrand)?.map((p,i) => <div key={i}>hi</div>)} */}
            </div>
          </div>
          {/* Product Rendering */}
          <div>
            <div className="flex flex-wrap place-content-evenly gap-2   ">
              {renderingData.length === 0 && (
                <p className="font-bold text-xl text-center text-black">
                  No Products Available
                </p>
              )}

              {renderingData?.map((p) => (
                <ProductCard key={p.id} p={p} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
}

export default ProductListing;
