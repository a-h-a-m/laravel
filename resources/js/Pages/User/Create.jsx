import React from 'react'
import SectionHeader from '@/Components/SectionHeader'
import SectionBody from '@/Components/SectionBody'
import Card from '@/Components/Card/Card'
import CardHeader from '@/Components/Card/CardHeader'
import CardBody from '@/Components/Card/CardBody'
import Row from '@/Components/Row'

export default function Create({ roles }) {
    const csrf = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    return (
        <>
            <SectionHeader title={'Tambah User'} />
            <SectionBody>
                <Card>
                    <CardHeader faIcon={'unlock'} title={'Tambah User'} />
                    <CardBody>
                    <form action="/admin/user" method="POST">
                        <input type="hidden" name="_token" value={csrf} />
                        <div className="form-group">
                            <label>NAMA USER</label>
                            <input type="text" name="name" placeholder="Masukkan Nama User"
                                className="form-control" />
                        </div>
                        <div className="form-group">
                            <label>NO WA</label>
                            <input type="text" name="email" placeholder="Masukkan WA"
                                className="form-control" />
                        </div>
                        <Row>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>PASSWORD</label>
                                    <input type="password" name="password" placeholder="Masukkan Password"
                                        className="form-control" />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>PASSWORD</label>
                                    <input type="password" name="password_confirmation" placeholder="Masukkan Konfirmasi Password"
                                        className="form-control" />
                                </div>
                            </div>
                        </Row>
                        <div className="form-group">
                            <label className="font-weight-bold">ROLE</label>
                            {roles.map(role => (
                                <div key={role.id} className="form-check form-check-inline">
                                    <input className="form-check-input" type="checkbox" name="role[]" id={`check-${role.id}`} />
                                    <label className="form-check-label" htmlFor={`check-${role.id}`}>
                                        {role.name}
                                    </label>
                                </div>
                            ))}
                        </div>
                        <button className="btn btn-primary mr-1 btn-submit" type="submit"><i className="fa fa-paper-plane"></i>
                            SIMPAN</button>
                        <button className="btn btn-warning btn-reset" type="reset"><i className="fa fa-redo"></i> RESET</button>
                    </form>
                    </CardBody>
                </Card>
            </SectionBody>
        </>
    )
}