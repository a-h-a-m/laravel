import React from 'react'

export default function CardHeader({ faIcon, title }) {
    return (
        <div className="card-header">
            <h4><i className={`fas fa-${faIcon}`}></i> {title}</h4>
        </div>
    )
}