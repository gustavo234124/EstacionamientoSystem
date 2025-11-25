import React from 'react';

export default function CountPrice({ totalRecaudado }) {
    return (
        <>
            <span className="text-2xl font-bold text-gray-800">
                ${totalRecaudado?.toFixed(2) || '0.00'}
            </span>
        </>
    )
}