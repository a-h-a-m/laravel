import React, { useState, useEffect } from 'react'
import SectionHeader from '@/Components/SectionHeader'
import Row from '@/Components/Row'
import axios from 'axios'
import { Head } from '@inertiajs/react';

export default function Index({ waApiKey, waDeviceId, waAccessToken }) {
    const [login, setLogin] = useState(null);
    const [wait, setWait] = useState(false);
    const [src, setSrc] = useState('http://localhost:8000/wa.jpg');
    const generateQr = () => {
        setSrc('http://localhost:8000/wa.jpg');
        setWait(true);
        axios.get(`https://api.chat-wa.com/whatsapp-device/new-session/${waDeviceId}`, {
                headers: {
                    Authorization: `Bearer ${waAccessToken}`
                }
            })
            .then(response => {
                setWait('img');
                setSrc(response.data.data.qrCode);
            });
    }
    const getQr = useEffect(() => {
        axios.get('https://api.chat-wa.com/message/check-number/6285877035941', {
            headers: {
                'x-api-key': waApiKey,
            }
        })
        .then(response => {
            if(response.data.success)
                setLogin('Whatsapp device status is connected');
        })
        .catch(error => {
            setLogin(error.response.data.message);
            generateQr();
        });
    }, []);
    return (
        <>
            <Head title='Akun Whatsapp' />
            <SectionHeader title={'Akun Whatsapp'} />
            {(wait==='img') && <button className="btn btn-warning" onClick={generateQr}>Reload QR Code</button>}
            <Row>
                <img src={src} />
            </Row>
            <div>{login ? login : 'Loading...'}</div>
            {wait && wait!=='img' && (<div>Waiting for QR Code...</div>)}
        </>
    )
}