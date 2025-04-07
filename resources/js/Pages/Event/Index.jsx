import React from 'react'
import SectionHeader from '@/Components/SectionHeader'
import SectionBody from '@/Components/SectionBody'
import Card from '@/Components/Card/Card'
import CardHeader from '@/Components/Card/CardHeader'
import CardBody from '@/Components/Card/CardBody'
import SearchForm from '@/Components/Form/Search'
import Table from '@/Components/Table'
import BorderedTable from '@/Components/Table/Table'
import THead from '@/Components/Table/THead'
import TBody from '@/Components/Table/TBody'
import Pagination from '@/Components/Pagination'

export default function Index({ events, elements, hasPages, isFirstPage, hasMorePages }) {
    return (
        <>
            <SectionHeader title={'Agenda'} />
            <SectionBody>
                <Card>
                    <CardHeader faIcon={'bell'} title={'Agenda'} />
                    <CardBody>
                        <SearchForm word={'judul agenda'} />
                        <Table>
                            <BorderedTable>
                                <THead columns={['Judul Agenda', 'Lokasi', 'Tanggal']} />
                                <TBody data={events.data} from={events.from} keys={['title', 'location', 'date']} />
                            </BorderedTable>                            
                            <Pagination
                                elements={elements}
                                firstItem={events.from}
                                lastItem={events.to}
                                total={events.total}
                                hasPages={hasPages}
                                isFirstPage={isFirstPage}
                                hasMorePages={hasMorePages}
                                prevPageUrl={events.prev_page_url}
                                nextPageUrl={events.next_page_url}
                                currentPage={events.current_page}
                            />
                        </Table>
                    </CardBody>
                </Card>
            </SectionBody>
        </>
    )
}