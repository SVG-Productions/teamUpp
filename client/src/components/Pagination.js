import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";

const Pagination = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(searchParams.get("page") || 1);
  const totalPages = Math.ceil(100);

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) {
      return;
    }
    setCurrentPage(newPage);
    setSearchParams({ page: newPage });
  };

  const getPageNumbers = () => {
    const pageNumbers = [];
    const visiblePages = 5; // Number of visible page numbers

    // Case 1: Total pages less than or equal to visible pages
    if (totalPages <= visiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    }
    // Case 2: Total pages greater than visible pages
    else {
      const leftBoundary = Math.max(
        1,
        currentPage - Math.floor(visiblePages / 2)
      );
      const rightBoundary = Math.min(
        totalPages,
        leftBoundary + visiblePages - 1
      );

      // Display left ellipsis if needed
      if (leftBoundary > 1) {
        pageNumbers.push(1);
        if (leftBoundary > 2) {
          pageNumbers.push("...");
        }
      }

      // Display page numbers between left and right boundaries
      for (let i = leftBoundary; i <= rightBoundary; i++) {
        pageNumbers.push(i);
      }

      // Display right ellipsis if needed
      if (rightBoundary < totalPages) {
        if (rightBoundary < totalPages - 1) {
          pageNumbers.push("...");
        }
        pageNumbers.push(totalPages);
      }
    }

    return pageNumbers;
  };

  return (
    <div className="flex flex-wrap items-center justify-center text-sm mt-8">
      <button
        className={`px-2 py-1 rounded-lg ${
          currentPage === 1
            ? "text-tertiary"
            : "text-blue-500 hover:bg-secondary"
        }`}
        disabled={currentPage === 1}
        onClick={() => handlePageChange(currentPage - 1)}
      >
        {currentPage !== 1 && "< "}Previous
      </button>

      {getPageNumbers().map((pageNumber, index) => (
        <button
          key={index}
          className={`mx-0.5 px-2.5 py-1 text-primary rounded-lg hover:bg-secondary ${
            pageNumber === currentPage &&
            "bg-tertiary text-white hover:bg-tertiary"
          } ${pageNumber === "..." && "hover:bg-primary cursor-default"}`}
          onClick={() => {
            if (pageNumber !== "...") {
              handlePageChange(pageNumber);
            }
          }}
          disabled={pageNumber === currentPage}
        >
          {pageNumber}
        </button>
      ))}

      <button
        className={`px-2.5 py-1 rounded-lg ${
          currentPage === totalPages
            ? "text-tertiary"
            : "text-blue-500 hover:bg-secondary"
        }`}
        disabled={currentPage === totalPages}
        onClick={() => handlePageChange(currentPage + 1)}
      >
        Next{currentPage !== totalPages && " >"}
      </button>
    </div>
  );
};

export default Pagination;
