import React, { useState } from "react";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion, AnimatePresence } from "framer-motion";

const Carousel = ({ images }: { images: string[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState("left");

  const slideVariants = {
    hiddenRight: {
      x: "100%",
      opacity: 0,
    },
    hiddenLeft: {
      x: "-100%",
      opacity: 0,
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.3, delay: 0.2 },
    },
    // exitLeft: {
    //   x: "100%",
    //   opacity: 0,
    //   transition: { duration: 0.1 },
    // },
    // exitRight: {
    //   x: "-100%",
    //   opacity: 0,
    //   transition: { duration: 0.1 },
    // },
  };

  const handleNext = () => {
    setDirection("right");
    setCurrentIndex((prev) => (prev + 1 === images.length ? 0 : prev + 1));
  };

  const handlePrevious = () => {
    setDirection("left");
    setCurrentIndex((prev) => (prev - 1 < 0 ? images.length - 1 : prev - 1));
  };

  const handleDotClick = (index: number) => {
    setDirection(index > currentIndex ? "right" : "left");
    setCurrentIndex(index);
  };

  return (
    <>
      <div className="relative rounded-md">
        <AnimatePresence>
          <motion.img
            key={currentIndex}
            className="rounded-md shadow-md"
            src={images[currentIndex]}
            variants={slideVariants}
            initial={direction === "right" ? "hiddenRight" : "hiddenLeft"}
            animate="visible"
          />
        </AnimatePresence>
        <div className="absolute top-0 bottom-0 flex justify-between items-center w-full">
          <button
            onClick={handlePrevious}
            className="mx-4 opacity-50 w-12 h-12 rounded-full bg-blue-100"
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          <button
            onClick={handleNext}
            className="mx-4 opacity-50 w-12 h-12 rounded-full bg-blue-100"
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>
      </div>
      <div className="flex justify-center items-center mt-4 gap-2 h-10">
        {images.map((image, index) => (
          <button
            key={image}
            onClick={() => handleDotClick(index)}
            className={`rounded-full bg-blue-500 ${
              index === currentIndex ? "w-5 h-5" : "w-4 h-4"
            }`}
          />
        ))}
      </div>
    </>
  );
};

export default Carousel;
