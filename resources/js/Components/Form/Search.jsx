import React from 'react'

export default function Search({ word }) {
    return (
        <form action="" method="GET">
            <div className="form-group">
                <div className="input-group mb-3">
                    <input type="text" className="form-control" name="q"
                        placeholder={`Cari berdasarkan ${word}`} />
                    <div className="input-group-append">
                        <button type="submit" className="btn btn-primary" disabled><i className="fa fa-search"></i> CARI
                        </button>
                    </div>
                </div>
            </div>
        </form>
    )
}