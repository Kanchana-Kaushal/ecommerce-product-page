import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Cart from "./Cart";

function NavBar(props) {
  const [isMenuShown, setIsMenuShown] = useState(false);
  const [isCartShown, setIsCartShown] = useState(false);

  function toggleMenu() {
    setIsMenuShown((prev) => !prev);
  }

  function toggleCart() {
    setIsCartShown((prev) => !prev);
  }

  const cartQty = props.cart.reduce((total, elem) => (total += elem.qty), 0);

  return (
    <nav className="border-Grayish-blue flex items-center justify-between gap-4 p-6 md:border-b-1 md:py-0">
      <div className="flex flex-1 items-center gap-4">
        <img
          src="/ecommerce-product-page/images/icon-menu.svg"
          alt="Open menu"
          onClick={toggleMenu}
          className="md:hidden"
          role="button"
          tabIndex="0"
          onKeyDown={(e) => e.key === "Enter" && toggleMenu()}
          aria-label="Open navigation menu"
        />

        <img
          src="/ecommerce-product-page/images/logo.svg"
          alt="Sneakers logo"
          className="cursor-pointer"
        />

        <ul className="text-Dark-grayish-blue ml-5 hidden w-full max-w-md items-center gap-4 md:flex">
          <li className="hover:border-b-Orange hover:text-Black-lighbox-bg flex min-h-20 flex-1 items-center justify-center border-t-4 border-b-4 border-white transition-colors duration-75 ease-in">
            <a href="#">Collections</a>
          </li>
          <li className="hover:border-b-Orange hover:text-Black-lighbox-bg flex min-h-20 flex-1 items-center justify-center border-t-4 border-b-4 border-white transition-colors duration-75 ease-in">
            <a href="#">Men</a>
          </li>
          <li className="hover:border-b-Orange hover:text-Black-lighbox-bg flex min-h-20 flex-1 items-center justify-center border-t-4 border-b-4 border-white transition-colors duration-75 ease-in">
            <a href="#">Women</a>
          </li>
          <li className="hover:border-b-Orange hover:text-Black-lighbox-bg flex min-h-20 flex-1 items-center justify-center border-t-4 border-b-4 border-white transition-colors duration-75 ease-in">
            <a href="#">About</a>
          </li>
          <li className="hover:border-b-Orange hover:text-Black-lighbox-bg flex min-h-20 flex-1 items-center justify-center border-t-4 border-b-4 border-white transition-colors duration-75 ease-in">
            <a href="#">Contact</a>
          </li>
        </ul>
      </div>

      <AnimatePresence>
        {isMenuShown && (
          <motion.div
            className="bg-Black-lighbox-bg absolute inset-0 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            exit={{ opacity: 0 }}
            key={"overlay"}
            aria-hidden="true"
          ></motion.div>
        )}

        {isMenuShown && (
          <motion.div
            className="bg-Light-grayish-blue absolute inset-0 z-50 w-7/10 max-w-65 p-7"
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            key={"menu"}
            transition={{ duration: 0.3, ease: "easeOut" }}
            role="dialog"
            aria-label="Main menu"
          >
            <img
              src="/ecommerce-product-page/images/icon-close.svg"
              alt="Close menu"
              onClick={toggleMenu}
              role="button"
              tabIndex="0"
              aria-label="Close menu"
              onKeyDown={(e) => e.key === "Enter" && toggleMenu()}
            />

            <ul className="my-12 space-y-4 text-xl font-bold">
              <li>
                <a href="#">Collections</a>
              </li>
              <li>
                <a href="#">Men</a>
              </li>
              <li>
                <a href="#">Women</a>
              </li>
              <li>
                <a href="#">About</a>
              </li>
              <li>
                <a href="#">Contact</a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center gap-5">
        <div
          className="relative cursor-pointer"
          onClick={toggleCart}
          role="button"
          tabIndex="0"
          aria-label="Toggle cart view"
          onKeyDown={(e) => e.key === "Enter" && toggleCart()}
        >
          <img
            src="/ecommerce-product-page/images/icon-cart.svg"
            alt="Cart icon"
          />
          <span className="bg-Orange absolute -top-2 -right-2 rounded-xl px-2 text-xs font-semibold text-white">
            {cartQty}
          </span>
        </div>

        <img
          src="/ecommerce-product-page/images/image-avatar.png"
          alt="User avatar"
          className="ring-Orange size-6 cursor-pointer rounded-full hover:ring-2 md:ml-4 md:size-10"
        />
      </div>

      <Cart
        cart={props.cart}
        setCart={props.setCart}
        isCartShown={isCartShown}
      />
    </nav>
  );
}

export default NavBar;
