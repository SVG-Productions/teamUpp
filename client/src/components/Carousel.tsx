import React, { useState } from "react";

const Carousel = ({ images }: { images: string[] }) => {
  const [currentIndex, setCurrentIndex] = useState("");

  console.log(images);

  return <div>Carousel</div>;
};

export default Carousel;
