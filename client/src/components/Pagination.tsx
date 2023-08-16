import React from "react";
import { useSearchParams } from "react-router-dom";

interface PaginationProps {
  count: string;
}

const Pagination = ({ count }: PaginationProps) => {
  const [searchParams, setSearchParams] = useSearchParams({ page: "1" });

  const totalPages = Math.ceil(Number(count) / 10);

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) {
      return;
    }
    setSearchParams((prev) => {
      searchParams.set("page", newPage.toLocaleString());
      return prev;
    });
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
        Number(searchParams.get("page")) - Math.floor(visiblePages / 2)
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

  if (totalPages > 1) {
    return (
      <div className="flex flex-wrap items-center justify-center text-sm mt-8 mb-2">
        <button
          className={`px-2 py-1 rounded-lg ${
            Number(searchParams.get("page")) === 1 || !searchParams.get("page")
              ? "text-tertiary"
              : "text-blue-500 hover:bg-secondary"
          }`}
          disabled={Number(searchParams.get("page")) === 1}
          onClick={() => handlePageChange(Number(searchParams.get("page")) - 1)}
        >
          {Number(searchParams.get("page")) !== 1 && "< "}Previous
        </button>

        {getPageNumbers().map((pageNumber, index) => (
          <button
            key={index}
            className={`mx-0.5 px-2.5 py-1 text-primary rounded-lg hover:bg-secondary ${
              pageNumber === Number(searchParams.get("page")) &&
              "bg-tertiary text-white hover:bg-tertiary"
            } ${pageNumber === "..." && "hover:bg-primary cursor-default"}`}
            onClick={() => {
              if (pageNumber !== "...") {
                handlePageChange(Number(pageNumber));
              }
            }}
            disabled={pageNumber === Number(searchParams.get("page"))}
          >
            {pageNumber}
          </button>
        ))}

        <button
          className={`px-2.5 py-1 rounded-lg ${
            Number(searchParams.get("page")) === totalPages
              ? "text-tertiary"
              : "text-blue-500 hover:bg-secondary"
          }`}
          disabled={Number(searchParams.get("page")) === totalPages}
          onClick={() => handlePageChange(Number(searchParams.get("page")) + 1)}
        >
          Next{Number(searchParams.get("page")) !== totalPages && " >"}
        </button>
      </div>
    );
  } else return null;
};

export default Pagination;
