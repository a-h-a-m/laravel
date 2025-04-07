import React, { useState } from 'react'
import { Head, useForm } from '@inertiajs/react'
import SectionHeader from '@/Components/SectionHeader'
import SectionBody from '@/Components/SectionBody'
import Card from '@/Components/Card/Card'
import CardHeader from '@/Components/Card/CardHeader'
import CardBody from '@/Components/Card/CardBody'

export default function Caption({ caption, session }) {
    const [d, setD] = useState(false);
    const { data, setData, post } = useForm({
        caption: caption,
    });
    function handleSubmit(e) {
        e.preventDefault();
        post('/caption');
    }
    if(session.success && !d) {
        alert(session.success);
        setD(true);
    }
    return (
        <>
            <Head title='Rekapitulasi' />
            <SectionHeader title={'Ubah Template Pesan Whatsapp'} />
            <SectionBody>
                <Card>
                    <CardHeader faIcon={'pen'} title={'Ubah Template Pesan Whatsapp'} />
                    <CardBody>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Caption yang digunakan saat kirim pesan melalui Whatsapp</label>
                                <textarea className="form-control" style={{height: '100px'}} value={data.caption} onChange={e => setData('caption', e.target.value)} required />
                            </div>
                            <div className="form-group">
                                <button className="btn btn-primary mr-1 btn-submit" type="submit"><i className="fa fa-paper-plane"></i> Simpan</button>
                            </div>
                        </form>
                    </CardBody>
                </Card>
            </SectionBody>
        </>
    )
}