import React from 'react'

const Searchbar = () => {
  return (
    <div>
         <input
        type="text"
        placeholder="Buscar..."
        className="w-full max-w-md px-4 py-2 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  )
}

export default Searchbar