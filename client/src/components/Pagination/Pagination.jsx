import React from "react";

const Pagination = ({ totalItems, itemsPerPage, currentPage, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div className="flex justify-center mt-4">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 mx-1 bg-blue-600 text-white rounded disabled:bg-gray-400"
      >
        Anterior
      </button>
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index + 1}
          onClick={() => onPageChange(index + 1)}
          className={`px-4 py-2 mx-1 ${
            currentPage === index + 1
              ? "bg-blue-700 text-white"
              : "bg-white text-blue-600"
          } rounded border border-blue-600`}
        >
          {index + 1}
        </button>
      ))}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 mx-1 bg-blue-600 text-white rounded disabled:bg-gray-400"
      >
        Siguiente
      </button>
    </div>
  );
};

export default Pagination;
