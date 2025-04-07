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

export default function Index({ videos, elements, hasPages, isFirstPage, hasMorePages }) {
    return (
        <>
            <SectionHeader title={'Video'} />
            <SectionBody>
                <Card>
                    <CardHeader faIcon={'video'} title={'Video'} />
                    <CardBody>
                        <SearchForm word={'judul video'} />
                        <Table>
                            <BorderedTable>
                                <THead columns={['Judul Video', 'Video']} />
                                <TBody data={videos.data} from={videos.from} keys={['title', 'embed']} />
                            </BorderedTable>                            
                            <Pagination
                                elements={elements}
                                firstItem={videos.from}
                                lastItem={videos.to}
                                total={videos.total}
                                hasPages={hasPages}
                                isFirstPage={isFirstPage}
                                hasMorePages={hasMorePages}
                                prevPageUrl={videos.prev_page_url}
                                nextPageUrl={videos.next_page_url}
                                currentPage={videos.current_page}
                            />
                        </Table>
                    </CardBody>
                </Card>
            </SectionBody>
        </>
    )
}