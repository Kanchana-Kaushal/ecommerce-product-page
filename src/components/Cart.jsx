import { AnimatePresence, motion } from "motion/react";

function Cart(props) {
  function removeFromCart() {
    props.setCart([]);
  }

  function CartItems() {
    return props.cart.map((item, index) => {
      const price = (item.priceCents / 100).toFixed(2);
      const qty = item.qty;
      const total = ((item.priceCents * qty) / 100).toFixed(2);

      return (
        <li
          className="flex items-center justify-between gap-4"
          key={index}
          role="group"
          aria-label={`Cart item: ${item.name}`}
        >
          <img
            src={item.img}
            alt={`Image of ${item.name}`}
            className="size-14 rounded-md"
          />

          <div>
            <p className="text-Dark-grayish-blue font-semibold">{item.name}</p>
            <p className="text-Dark-grayish-blue float-left">
              {`$${price} x ${qty} `}
              <span className="text-Black-lighbox-bg font-bold">{`$${total}`}</span>
            </p>
          </div>

          <img
            src="/ecommerce-product-page/images/icon-delete.svg"
            alt={`Remove ${item.name} from cart`}
            className="cursor-pointer"
            role="button"
            tabIndex={0}
            aria-label={`Remove ${item.name}`}
            onClick={removeFromCart}
            onKeyDown={(e) => e.key === "Enter" && removeFromCart()}
          />
        </li>
      );
    });
  }

  return (
    <AnimatePresence>
      {props.isCartShown && (
        <motion.div
          className="bg-White absolute top-18 left-1/2 z-40 min-h-60 w-9/10 max-w-96 -translate-x-1/2 space-y-6 rounded-2xl p-5 shadow-2xl md:right-0 md:left-auto md:-translate-x-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.075 }}
          role="region"
          aria-label="Shopping cart"
        >
          <p className="text-Black-lighbox-bg text-xl font-extrabold">Cart</p>
          <hr className="text-Grayish-blue" />

          <ul className="space-y-4 text-center">
            {props.cart.length !== 0 ? (
              <CartItems />
            ) : (
              <li
                className="text-Dark-grayish-blue mt-18"
                role="status"
                aria-live="polite"
              >
                Your cart is empty
              </li>
            )}
          </ul>

          {props.cart.length !== 0 && (
            <button
              className="bg-Orange w-full cursor-pointer rounded-lg p-3 text-lg font-bold transition-all duration-75 ease-in hover:opacity-80 active:scale-95"
              aria-label="Proceed to checkout"
            >
              Checkout
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Cart;
