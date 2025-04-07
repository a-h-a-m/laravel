import React from 'react'
import SectionHeader from '@/Components/SectionHeader'
import SectionBody from '@/Components/SectionBody'
import Card from '@/Components/Card/Card'
import CardHeader from '@/Components/Card/CardHeader'
import CardBody from '@/Components/Card/CardBody'
import Table from '@/Components/Table'
import BorderedTable from '@/Components/Table/Table'
import THead from '@/Components/Table/THead'
import TBody from '@/Components/Table/TBody'
import Pagination from '@/Components/Pagination'

export default function Index({ photos, elements, hasPages, isFirstPage, hasMorePages }) {
    return (
        <>
            <SectionHeader title={'Foto'} />
            <SectionBody>
                <Card>
                    <CardHeader faIcon={'image'} title={'Foto'} />
                    <CardBody>
                        <Table>
                            <BorderedTable>
                                <THead columns={['Foto', 'Caption']} />
                                <TBody data={photos.data} from={photos.from} keys={['image', 'caption']} />
                            </BorderedTable>                            
                            <Pagination
                                elements={elements}
                                firstItem={photos.from}
                                lastItem={photos.to}
                                total={photos.total}
                                hasPages={hasPages}
                                isFirstPage={isFirstPage}
                                hasMorePages={hasMorePages}
                                prevPageUrl={photos.prev_page_url}
                                nextPageUrl={photos.next_page_url}
                                currentPage={photos.current_page}
                            />
                        </Table>
                    </CardBody>
                </Card>
            </SectionBody>
        </>
    )
}