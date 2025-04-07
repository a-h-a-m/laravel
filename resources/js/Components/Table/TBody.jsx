import React from 'react'

export default function TBody({ data, from = 1, keys, k = 'id' }) {
    return (
        <tbody>
            {data.map((dt, index) => (
                <tr key={dt[k]}>
                    <th scope="row" style={{textAlign: 'center'}}>{from + index}</th>
                    {keys.map((column, index) => (
                        <td key={index}>
                            <span className={dt[column]==='Berhasil dikirim' ? 'badge badge-success' : ''}>
                                {dt[column]}
                            </span>
                        </td>
                    ))}
                </tr>
            ))}
        </tbody>
    )
}