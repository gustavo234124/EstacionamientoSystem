import React from 'react';

export default function SearchBar({ onSearch }) {
    return (
        <div className="w-full max-w-md mx-auto mb-6">
            <input
                type="text"
                placeholder="Buscar por placas..."
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => onSearch(e.target.value)}
            />
        </div>
    );
}