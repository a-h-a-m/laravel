import React from 'react'
import SectionHeader from '@/Components/SectionHeader'
import Row from '@/Components/Row'
import DashboardCard from '@/Components/DashboardCard'
import { Head } from '@inertiajs/react';

export default function Index() {
    const cards = [
        {id: 1, iconBg: 'primary', faIcon: 'users', header: 'VII Wustho', body: 0},
        {id: 2, iconBg: 'danger', faIcon: 'users', header: 'VIII Wustho', body: 0},
        {id: 3, iconBg: 'warning', faIcon: 'users', header: 'IX Wustho', body: 0},
        {id: 4, iconBg: 'primary', faIcon: 'users', header: 'X Ulya', body: 0},
        {id: 5, iconBg: 'danger', faIcon: 'users', header: 'XI Ulya', body: 0},
        {id: 6, iconBg: 'warning', faIcon: 'users', header: 'XII Ulya', body: 0},
    ];
    
    return (
        <>
            <Head title='Dashboard' />
            <SectionHeader title={'Dashboard'} />
            <Row>
                {cards.map(({id, iconBg, faIcon, header, body}) => 
                    (
                        <DashboardCard 
                            key={id} 
                            iconBg={iconBg} 
                            faIcon={faIcon} 
                            header={header} 
                            body={body} />
                    )
                )}
            </Row>
        </>
    )
}