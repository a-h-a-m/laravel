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

export default function Index({ sliders, elements, hasPages, isFirstPage, hasMorePages }) {
    return (
        <>
            <SectionHeader title={'Slider'} />
            <SectionBody>
                <Card>
                    <CardHeader faIcon={'laptop'} title={'Slider'} />
                    <CardBody>
                        <Table>
                            <BorderedTable>
                                <THead columns={['Foto']} />
                                <TBody data={sliders.data} from={sliders.from} keys={['image']} />
                            </BorderedTable>                            
                            <Pagination
                                elements={elements}
                                firstItem={sliders.from}
                                lastItem={sliders.to}
                                total={sliders.total}
                                hasPages={hasPages}
                                isFirstPage={isFirstPage}
                                hasMorePages={hasMorePages}
                                prevPageUrl={sliders.prev_page_url}
                                nextPageUrl={sliders.next_page_url}
                                currentPage={sliders.current_page}
                            />
                        </Table>
                    </CardBody>
                </Card>
            </SectionBody>
        </>
    )
}