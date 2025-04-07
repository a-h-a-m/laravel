import React, { useEffect, useState } from 'react'
import { Head, router, usePage } from '@inertiajs/react'
import sendWa from '@/Functions/sendWa'
import SectionHeader from '@/Components/SectionHeader'
import SectionBody from '@/Components/SectionBody'
import Card from '@/Components/Card/Card'
import CardHeader from '@/Components/Card/CardHeader'
import CardBody from '@/Components/Card/CardBody'
import SearchForm from '@/Components/Form/Rekap'
import Table from '@/Components/Table'
import BorderedTable from '@/Components/Table/Table'
import THead from '@/Components/Table/THead'
import TBody from '@/Components/Table/TBody'
import Pagination from '@/Components/Pagination'

export default function Index({ rekap, elements, hasPages, isFirstPage, hasMorePages }) {
    const props = usePage().props;
    const [noButton, setNoButton] = useState(false);
    const [terkirim, setTerkirim] = useState(0);
    const [selesai, setSelesai] = useState(false);
    const [prosesKirim, setProsesKirim] = useState(false);
    const [proses2, setProses2] = useState(false);
    const [data, setData] = useState(null);

    function isValidJSON(str) {
        try {
          JSON.parse(str);
          return true;
        } catch (e) {
          return false;
        }
      }

    const tampilkan = useEffect(() => {
        if(selesai) {
            let count = 0;
            data.forEach(dt => {
                if(dt.terkirim)
                    count++;
            });
            alert('Proses pengiriman selesai.');
            setTerkirim(count);
            router.post('/selesai', {
                data: JSON.stringify(data),
            }, {
                preserveState: true,
                preserveScroll: true,
            });
        }
    }, [selesai]);

    const delay = () => new Promise((resolve) => {
      const time = Math.floor(Math.random() * (15 - 10 + 1) + 1) * 1000; // Random 10-15 s
      setTimeout(resolve, time);
    });

    const kirim2 = async() => {
        for(let i=0;i<data.length;i++) {
            if(data[i].terkirim)
                continue;
            await delay();
            try {
                await sendWa(data[i], props.waApiKey, props.caption);
                const updated = {
                    ...data[i],
                    status: 'Berhasil dikirim',
                    terkirim: true,
                }
                setData(prev => prev.map((object, index) => (index===i ? updated : object) ));
            }catch(error) {
                const updated = {
                    ...data[i],
                    status: 'Gagal dikirim',
                }
                setData(prev => prev.map((object, index) => (index===i ? updated : object) ));
            }
        }
        setSelesai(true);
        setProsesKirim(false);
        setProses2(false);
    }
    if(proses2)
        kirim2()
    if(prosesKirim && !proses2) {
        const newData = data.map(dt => {
            if(dt.terkirim)
                return dt;
            else    
                return {
                    ...dt,
                    status: 'Mengirim...'
                }
        });
        setData(newData);
        setProses2(true);
    }
    const sendAll = () => {
        if(data===null)
            setData(dataSantri);
        if(confirm('Pesan akan dikirimkan. Pastikan sudah login Whatsapp ke nomor yang akan digunakan untuk mengirim. Kirim pesan sekarang?')) {
            setProsesKirim(true);
            setNoButton(true);
        }
    }
    const handleClick = e => {
        e.preventDefault();
        setPilih(!pilih);
    }
    const [pilih, setPilih] = useState(false);
    const [tahun, setTahun] = useState('2024 / 2025');
    const [bulan, setBulan] = useState('Januari');
    const keterangan = pilih ? `Bulan ${bulan} Tahun Pelajaran ${tahun}` : 'Bulanan';
    let dataSantri = [];
    let terkirimAll = true;
    let key = 0;
    rekap.data.forEach(obj => {
        let sudah = false;
        if(obj.status=='Berhasil dikirim')
            sudah = true;
        const waParsed = isValidJSON(obj.wa) ? JSON.parse(obj.wa) : obj.wa;
        dataSantri.push({
            ...obj,
            key: ++key,
            ziyadah: JSON.parse(obj.values)['Ziyadah'],
            total: JSON.parse(obj.values)['Total Juz yang telah disetorkan'],
            juz: JSON.parse(obj.values)['Juz Ujian Al-Qur\'an Bulanan'],
            wa: waParsed['wa1'] ? waParsed['wa1'] : waParsed,
            terkirim: sudah,
        });
        if (typeof waParsed !== 'string') {
            dataSantri.push({
                ...obj,
                key: ++key,
                ziyadah: JSON.parse(obj.values)['Ziyadah'],
                total: JSON.parse(obj.values)['Total Juz yang telah disetorkan'],
                juz: JSON.parse(obj.values)['Juz Ujian Al-Qur\'an Bulanan'],
                wa: waParsed['wa2'],
                terkirim: sudah,
            });
        }
    });
    dataSantri = dataSantri.filter(obj => obj.tahun_pelajaran===tahun && obj.bulan===bulan);
    dataSantri.forEach(obj => {
        if(obj.status!='Berhasil dikirim')
            terkirimAll = false;
    });
    
    return (
        <>
            <Head title='Rekapitulasi' />
            <SectionHeader title={`Rekapitulasi ${keterangan}`} />
            <SectionBody>
                <Card>
                    <CardHeader faIcon={'pen'} title={`Rekapitulasi ${keterangan}`} />
                    <CardBody>
                    {!pilih ? (
                    <>
                    <form action="" method="GET">
                        <div className="form-group">
                            <div className="input-group mb-3">
                                <div className="input-group-append">
                                    <button disabled className="btn btn-primary">Tahun Pelajaran </button>
                                </div>
                                <input name="tahun_pelajaran" value={'2024 / 2025'} className="form-control" readOnly />
                                <div className="input-group-append">
                                    <button disabled className="btn btn-primary">Bulan </button>
                                </div>
                                <select name="bulan" className="form-control" onChange={e => setBulan(e.target.value)}>
                                    <option value={'Januari'}>Januari</option>
                                    <option value={'Februari'}>Februari</option>
                                    <option value={'Maret'}>Maret</option>
                                    <option value={'April'}>April</option>
                                    <option value={'Mei'}>Mei</option>
                                    <option value={'Juni'}>Juni</option>
                                    <option value={'Juli'}>Juli</option>
                                    <option value={'Agustus'}>Agustus</option>
                                    <option value={'September'}>September</option>
                                    <option value={'Oktober'}>Oktober</option>
                                    <option value={'November'}>November</option>
                                    <option value={'Desember'}>Desember</option>
                                </select>
                                <div className="input-group-append">
                                    <button type="submit" className="btn btn-primary" onClick={handleClick}><i className="fa fa-check"></i> PILIH
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                    Silakan memilih Bulan dan Tahun Pelajaran lalu klik tombol 'Pilih'
                    </>
                    ) : <>
                        {!prosesKirim && <SearchForm word={'nama'} year={tahun} month={bulan} />}
                        <Table>
                            <BorderedTable>
                                <THead columns={['Nama', 'Ziyadah', 'Total', 'Juz', 'No Whatsapp', 'Status']} />
                                <TBody data={data ? data : dataSantri} k={'key'} from={rekap.from} keys={['nama', 'ziyadah', 'total', 'juz', 'wa', 'status']} />
                            </BorderedTable>                            
                            <Pagination
                                elements={elements}
                                firstItem={rekap.from}
                                lastItem={rekap.to}
                                total={rekap.total}
                                hasPages={hasPages}
                                isFirstPage={isFirstPage}
                                hasMorePages={hasMorePages}
                                prevPageUrl={rekap.prev_page_url}
                                nextPageUrl={rekap.next_page_url}
                                currentPage={rekap.current_page}
                            />
                            {!selesai && !terkirimAll &&
                                (<button className="btn btn-info" onClick={sendAll} disabled={noButton}>Kirim pesan</button>)}
                        </Table>
                        </>
                    }
                    </CardBody>
                </Card>
            </SectionBody>
        </>
    )
}