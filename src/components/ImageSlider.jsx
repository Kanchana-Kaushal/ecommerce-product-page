import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

function ImageSlider(props) {
  const product = props.product;
  const [prodImgIndex, setProdImgIndex] = useState(0);

  function nextImg() {
    setProdImgIndex((prev) => (prev + 1) % product.images.length);
  }

  function prevImg() {
    setProdImgIndex(
      (prev) => (prev - 1 + product.images.length) % product.images.length,
    );
  }

  function ThumbNails() {
    return product.images.map((set, index) => (
      <div
        className={`ring-Orange w-fit rounded-md ${index === prodImgIndex ? "ring-2" : ""} cursor-pointer`}
        onClick={() => setProdImgIndex(index)}
        onKeyDown={(e) => e.key === "Enter" && setProdImgIndex(index)}
        role="button"
        tabIndex={0}
        aria-label={`View thumbnail ${index + 1}`}
        key={index}
      >
        <img
          src={set.thumbnail}
          alt={`product thumbnail ${index + 1}`}
          className={`rounded-md ${index === prodImgIndex ? "opacity-20" : ""}`}
        />
      </div>
    ));
  }

  function toggleSlide() {
    props.setViewSlide((prev) => !prev);
  }

  return (
    <section className="md:space-y-8">
      <div className="relative">
        <img
          src={product.images[prodImgIndex].main}
          alt={`Main product image ${prodImgIndex + 1}`}
          className="max-h-85 w-full cursor-pointer object-cover md:max-h-full md:rounded-lg"
          onClick={toggleSlide}
          role="button"
          tabIndex={0}
          aria-label="Open image viewer"
          onKeyDown={(e) => e.key === "Enter" && toggleSlide()}
        />

        <div
          className="absolute top-1/2 right-4 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-white p-4 shadow-lg md:hidden"
          onClick={nextImg}
          onKeyDown={(e) => e.key === "Enter" && nextImg()}
          role="button"
          tabIndex={0}
          aria-label="Next image"
        >
          <img
            src="/ecommerce-product-page/images/icon-next.svg"
            alt="next image"
          />
        </div>

        <div
          className="absolute top-1/2 left-4 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-white p-4 shadow-lg md:hidden"
          onClick={prevImg}
          onKeyDown={(e) => e.key === "Enter" && prevImg()}
          role="button"
          tabIndex={0}
          aria-label="Previous image"
        >
          <img
            src="/ecommerce-product-page/images/icon-previous.svg"
            alt="previous image"
          />
        </div>
      </div>

      <div
        className="hidden justify-between gap-6 md:flex"
        role="group"
        aria-label="Thumbnail navigation"
      >
        <ThumbNails />
      </div>

      <AnimatePresence>
        {props.viewSlide && (
          <motion.div
            className="absolute inset-0 top-0 z-40 hidden h-50 md:block"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
          >
            <div className="mx-auto w-4/10">
              <div className="relative">
                <img
                  src="/ecommerce-product-page/images/icon-close.svg"
                  alt="Close image viewer"
                  className="float-right my-4 size-5 cursor-pointer"
                  onClick={toggleSlide}
                  onKeyDown={(e) => e.key === "Enter" && toggleSlide()}
                  role="button"
                  tabIndex={0}
                  aria-label="Close image viewer"
                />

                <img
                  src={product.images[prodImgIndex].main}
                  alt={`Enlarged product image ${prodImgIndex + 1}`}
                  className="max-h-85 w-full object-cover md:max-h-full md:rounded-lg"
                />

                <div
                  className="absolute top-1/2 -right-4 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-white p-4 shadow-lg"
                  onClick={nextImg}
                  onKeyDown={(e) => e.key === "Enter" && nextImg()}
                  role="button"
                  tabIndex={0}
                  aria-label="Next image"
                >
                  <img
                    src="/ecommerce-product-page/images/icon-next.svg"
                    alt="next image"
                  />
                </div>

                <div
                  className="absolute top-1/2 -left-4 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-white p-4 shadow-lg"
                  onClick={prevImg}
                  onKeyDown={(e) => e.key === "Enter" && prevImg()}
                  role="button"
                  tabIndex={0}
                  aria-label="Previous image"
                >
                  <img
                    src="/ecommerce-product-page/images/icon-previous.svg"
                    alt="previous image"
                  />
                </div>
              </div>
              <div
                className="mx-auto mt-4 hidden w-8/10 justify-between gap-6 md:flex"
                role="group"
                aria-label="Thumbnail navigation"
              >
                <ThumbNails />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default ImageSlider;
