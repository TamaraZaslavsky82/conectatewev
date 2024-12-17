// src/Pagination.js
import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <div className="flex justify-center mt-6 mb-6"> {/* Aumentado a mt-6 y mb-6 */}
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-4 py-2 mx-1 text-white bg-blue-500 rounded ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        Anterior
      </button>

      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index + 1}
          onClick={() => handlePageChange(index + 1)}
          className={`px-4 py-2 mx-1 text-white rounded ${currentPage === index + 1 ? 'bg-blue-700' : 'bg-blue-500'}`}
        >
          {index + 1}
        </button>
      ))}

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 mx-1 text-white bg-blue-500 rounded ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        Siguiente
      </button>
    </div>
  );
};

export default Pagination;