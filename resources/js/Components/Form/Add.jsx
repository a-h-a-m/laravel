import React from 'react'

export default function Add({ word, route }) {
    return (
        <form action="" method="GET">
            <div className="form-group">
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <a href={`/admin/${route}/create`} className="btn btn-primary" style={{paddingTop: '10px'}}><i className="fa fa-plus-circle"></i> Tambah</a>
                    </div>
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