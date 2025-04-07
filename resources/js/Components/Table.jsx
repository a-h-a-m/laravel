import React from 'react'

export default function Table({ children }) {
    return (
        <div className="table-responsive">
            {children}
        </div>
    )
}