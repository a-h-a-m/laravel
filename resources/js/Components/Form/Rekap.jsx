import { useForm } from '@inertiajs/react'
import React, { useState } from 'react'

export default function Rekap({ word, year, month, test = false }) {
    const [loaded, setLoaded] = useState(false);
    const { data, setData, get } = useForm({
        q: null,
    });
    const params = new URLSearchParams(window.location.search);
    if(params.get('q') && !loaded) {
        setData({
            q: params.get('q'),
        });
        setLoaded(true);
    }
    function handleSubmit(e) {
        e.preventDefault();
        get('/admin/rekap', {
            preserveState: true,
        });
    }

    return (
        <form onSubmit={handleSubmit} method="GET">
            <div className="form-group">
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <a href={`/admin/rekap/create?t=${year}&b=${month}&c=${test}`} className="btn btn-primary" style={{paddingTop: '10px'}}><i className="fa fa-plus-circle"></i> Tambah</a>
                    </div>
                    <input type="text" className="form-control" placeholder={`Cari berdasarkan ${word}`} value={data.q} onChange={e => setData('q', e.target.value)} />
                    <div className="input-group-append">
                        <button type="submit" className="btn btn-primary"><i className="fa fa-search"></i> CARI
                        </button>
                    </div>
                </div>
            </div>
        </form>
    )
}