import { useState } from "react";
import product from "../Data/product.js";
import NavBar from "./components/Navbar";
import ImageSlider from "./components/ImageSlider.jsx";

function App() {
  const [qty, setQty] = useState(0);
  const [cart, setCart] = useState([]);
  const [viewSlide, setViewSlide] = useState(false);

  function addQty() {
    setQty((prev) => (prev < 10 ? prev + 1 : prev));
  }

  function minusQty() {
    setQty((prev) => (prev > 0 ? prev - 1 : prev));
  }

  function addToCart() {
    const productInfo = [
      {
        id: product.id,
        name: product.name,
        priceCents: product.currentPriceCents,
        img: product.images[0].main,
        qty: qty,
      },
    ];

    setCart(productInfo);
  }

  return (
    <>
      <main className="overflow-hidden">
        {viewSlide && (
          <div
            className="bg-Black-lighbox-bg absolute inset-0 z-10 hidden opacity-85 md:block"
            aria-hidden="true"
          ></div>
        )}

        <section className="font-kumbh-sans relative mx-auto mb-8 min-h-screen md:mb-0 md:w-9/10 md:max-w-6xl">
          <NavBar cart={cart} setCart={setCart} />

          <section className="mx-auto items-center justify-center gap-16 md:flex md:w-8/10 md:py-20">
            <ImageSlider
              product={product}
              viewSlide={viewSlide}
              setViewSlide={setViewSlide}
            />

            <div className="space-y-4 p-6">
              <p className="text-Dark-grayish-blue text-xs font-bold uppercase">
                sneaker company
              </p>
              <h1 className="text-Very-dark-blue text-3xl font-extrabold">
                {product.name}
              </h1>
              <p className="text-Dark-grayish-blue">{product.description}</p>

              <div className="flex items-center justify-between md:block md:space-y-4">
                <div className="flex items-center gap-4">
                  <p className="text-Very-dark-blue text-3xl font-extrabold">{`$${(product.currentPriceCents / 100).toFixed(2)}`}</p>
                  <p className="bg-Very-dark-blue text-Light-grayish-blue rounded-sm px-1 text-sm">{`${product.discountRate}%`}</p>
                </div>

                <p className="text-Dark-grayish-blue font-bold line-through">{`$${(product.markedPriceCents / 100).toFixed(2)}`}</p>
              </div>

              <div className="items-center gap-4 space-y-4 md:flex md:space-y-0">
                <div className="bg-Light-grayish-blue flex items-center justify-between rounded-lg p-4 md:w-5/10">
                  <img
                    src="/ecommerce-product-page/images/icon-minus.svg"
                    alt="Decrease quantity"
                    role="button"
                    tabIndex="0"
                    aria-label="Decrease quantity"
                    className="cursor-pointer"
                    onClick={minusQty}
                    onKeyDown={(e) => e.key === "Enter" && minusQty()}
                  />
                  <p>{qty}</p>
                  <img
                    src="/ecommerce-product-page/images/icon-plus.svg"
                    alt="Increase quantity"
                    role="button"
                    tabIndex="0"
                    aria-label="Increase quantity"
                    className="cursor-pointer"
                    onClick={addQty}
                    onKeyDown={(e) => e.key === "Enter" && addQty()}
                  />
                </div>

                <button
                  className="bg-Orange shadow-Orange flex w-full cursor-pointer items-center justify-center gap-4 rounded-md p-4 font-bold shadow-2xl transition-all duration-75 ease-in hover:opacity-80 active:scale-95"
                  onClick={addToCart}
                  aria-label="Add selected quantity of product to cart"
                >
                  <img
                    src="/ecommerce-product-page/images/icon-cart.svg"
                    alt=""
                    aria-hidden="true"
                  />
                  Add to cart
                </button>
              </div>
            </div>
          </section>
        </section>
      </main>
    </>
  );
}

export default App;
