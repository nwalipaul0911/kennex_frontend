import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React from "react";
import Order from "../pages/order/order";
import Item from "../pages/product/item"
import Success from "../pages/order/success";
import ErrorPage from "../pages/errors/error";
import Home from "../pages/home/home";
import Terms from "../pages/t&c/t&c";
import Checkout from "../pages/checkout/checkout";
import Fallback from "../widgets/fallback";
const LazyApp = React.lazy(()=>import('../App'))
const LazyContact = React.lazy(()=>import('../pages/contact/contact'))
const LazyShop = React.lazy(()=>import('../pages/shop/shop'))
const Route = () => {
  const url = import.meta.env.VITE_BACKEND_URL
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <React.Suspense fallback={<Fallback />} ><LazyApp /></React.Suspense>,
      children: [
        {
          index: true,
          element: <Home />,
          loader: async () => {
            const res = await fetch(`${url}/products`);
            if (res.status == 200) {
              const data = await res.json();
              return data;
            }
          },
        },
        {
          path: 'shop',
          element: <React.Suspense fallback={<Fallback />}><LazyShop /></React.Suspense>,
          loader: async () => {
            const res = await fetch(`${url}/products`);
            if (res.status == 200) {
              const data = await res.json();
              return data;
            }
          },
        },
        {
          path: "contact",
          element: <React.Suspense fallback={<Fallback />}><LazyContact /></React.Suspense>,
        },
        {
          path: "order/:slug",
          element: <Order />,
        },
        {
          path: 'products/:id',
          element: <Item />
        },
        {
          path: 'checkout',
          element: <Checkout />
        },
        {
          path: 'checkout/success/:slug',
          element: <Success />,
        },
        {
          path: 'terms-&-conditions',
          element: <Terms />,
          loader: async()=>{
            let res = await fetch(`${url}/terms`)
            if(res.status == 200){
              let data = await res.json()
              return data
            }
          }
        }
      ],
      errorElement : <ErrorPage />
    },
  ]);
  return (
    <RouterProvider router={routes}>
      <LazyApp />
    </RouterProvider>
  );
};

export default Route;
