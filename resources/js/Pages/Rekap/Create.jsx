import React from 'react'
import { Head, useForm } from '@inertiajs/react'
import SectionHeader from '@/Components/SectionHeader'
import SectionBody from '@/Components/SectionBody'
import Card from '@/Components/Card/Card'
import CardHeader from '@/Components/Card/CardHeader'
import CardBody from '@/Components/Card/CardBody'

export default function Create() {
    const params = new URLSearchParams(window.location.search);
    const { data, setData, post, progress } = useForm({
        tahun: params.get('t'),
        bulan: params.get('b'),
        file: null,
        test: params.get('c'),
    });
    function handleSubmit(e) {
        e.preventDefault();
        post('/admin/rekap');
    }
    return (
        <>
            <Head title='Rekapitulasi' />
            <SectionHeader title={'Unggah Rekapitulasi Bulanan'} />
            <SectionBody>
                <Card>
                    <CardHeader faIcon={'pen'} title={'Unggah Rekapitulasi Bulanan'} />
                    <CardBody>
                        <div className="form-group">
                            <a href="http://localhost:8000/template.xlsx" target="_blank" className="btn btn-success">Unduh Format Excel</a>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label><strong>Unggah File Excel</strong></label>
                                <input type="file" className="form-control" onChange={e => setData('file', e.target.files[0])} required />
                            </div>
                            <div className="form-group">
                                <button className="btn btn-primary mr-1 btn-submit" type="submit" disabled={progress}><i className="fa fa-paper-plane"></i> Simpan</button>
                                <button className="btn btn-warning btn-reset" type="reset" disabled={progress}><i className="fa fa-redo"></i> Reset</button>
                                {progress && (
                                    <div>
                                        Mengunggah file...
                                    </div>
                                    )}
                            </div>
                            <div>
                                Langkah-langkah untuk mengunggah file
                                <br/>1. Unduh file template (Excel) terlebih dahulu dengan cara klik tombol <span className="badge badge-success">Unduh Format Excel</span> di bagian atas formulir
                                <br/>2. Isi file Excel tersebut dengan data yang sesuai
                                <br/>3. Unggah file yang sudah diisi ke bagian 'Unggah File Excel' pada formulir
                                <br/>4. Klik tombol 'Simpan' jika data yang diunggah sudah benar
                            </div>
                        </form>
                    </CardBody>
                </Card>
            </SectionBody>
        </>
    )
}