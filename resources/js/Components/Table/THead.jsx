import React from 'react'

export default function THead({ columns }) {
    return (
        <thead>
            <tr>
                <th scope="col" style={{textAlign: 'center', width: '6%'}}>No.</th>
                {columns.map((column, index) => (
                    <th key={index} scope="col">{column}</th>
                ))}
            </tr>
        </thead>
    )
}