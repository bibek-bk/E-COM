import { Provider } from "react-redux";
import Body from "./components/Body/Body";
import { store } from "./utils/store/store";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ProductListing from "./components/ProductListing";
import ProductDetails from "./components/ProductDetails";
import Cart from "./components/Cart";
import Sliderr from "./components/Slider";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Body />,
      children: [
        {
          path: "/",
          element: <ProductListing />,
        },
        {
          path: "/productDetail",
          element: <ProductDetails />,
        },
        {
          path: "/cart",
          element: <Cart />,
        },
      
        {
          path: "/slider",
          element: <Sliderr/>,
        },
      ],
    },
  ]);
  return (
    <>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </>
  );
}

export default App;
