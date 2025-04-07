import React from 'react'

export default function Table({ children }) {
    return (
        <table className="table table-bordered">
            {children}
        </table>
    )
}