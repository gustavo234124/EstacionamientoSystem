import React from 'react';

export default function SearchBar({ onSearch }) {
    return (
        <div className="w-full max-w-md mx-auto">
            <input
                type="text"
                placeholder="Buscar placas o nombre..."
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-4 focus:ring-blue-500  border-4  border-gray-500"
                onChange={(e) => onSearch(e.target.value)}
            />
        </div>
    );
}