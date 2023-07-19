import React, { useState } from "react";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion, AnimatePresence } from "framer-motion";

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
  exit: {
    scale: 0.8,
    opacity: 0,
    transition: { duration: 0.2 },
  },
};
const slidersVariants = {
  hover: {
    scale: 1.2,
    opacity: 1,
  },
};
const dotsVariants = {
  initial: {
    y: 0,
  },
  animate: {
    y: -2,
    scale: 1.2,
    transition: { type: "spring", stiffness: 1000, damping: "10" },
  },
  hover: {
    scale: 1.1,
    transition: { duration: 0.2 },
  },
};

const Carousel = ({ images }: { images: string[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState("");

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
      <div className="relative flex rounded-md overflow-hidden">
        <AnimatePresence>
          <motion.img
            key={currentIndex}
            className="rounded-md shadow-md"
            src={images[currentIndex]}
            variants={slideVariants}
            initial={direction === "right" ? "hiddenRight" : "hiddenLeft"}
            animate="visible"
            exit="exit"
          />
        </AnimatePresence>
        <div className="absolute top-0 bottom-0 flex justify-between items-center w-full">
          <motion.button
            onClick={handlePrevious}
            variants={slidersVariants}
            whileHover="hover"
            className="mx-4 w-10 h-10 opacity-50 rounded-full bg-blue-100"
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </motion.button>
          <motion.button
            onClick={handleNext}
            variants={slidersVariants}
            whileHover="hover"
            className="mx-4 w-10 h-10 opacity-50 rounded-full bg-blue-100"
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </motion.button>
        </div>
      </div>
      <div className="flex justify-center items-center mt-4 gap-2 h-10">
        {images.map((image, index) => (
          <motion.button
            key={index}
            onClick={() => handleDotClick(index)}
            variants={dotsVariants}
            animate={currentIndex === index ? "animate" : ""}
            whileHover="hover"
            className={`rounded-full w-3 h-3 ${
              index === currentIndex ? "bg-blue-500" : "bg-slate-400"
            }`}
          />
        ))}
      </div>
    </>
  );
};

export default Carousel;
