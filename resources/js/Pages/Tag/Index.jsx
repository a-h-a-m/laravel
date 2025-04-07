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

export default function Index({ tags, elements, hasPages, isFirstPage, hasMorePages }) {
    return (
        <>
            <SectionHeader title={'Tags'} />
            <SectionBody>
                <Card>
                    <CardHeader faIcon={'tags'} title={'Tags'} />
                    <CardBody>
                        <SearchForm word={'nama tag'} />
                        <Table>
                            <BorderedTable>
                                <THead columns={['Nama Tag']} />
                                <TBody data={tags.data} from={tags.from} keys={['name']} />
                            </BorderedTable>                            
                            <Pagination
                                elements={elements}
                                firstItem={tags.from}
                                lastItem={tags.to}
                                total={tags.total}
                                hasPages={hasPages}
                                isFirstPage={isFirstPage}
                                hasMorePages={hasMorePages}
                                prevPageUrl={tags.prev_page_url}
                                nextPageUrl={tags.next_page_url}
                                currentPage={tags.current_page}
                            />
                        </Table>
                    </CardBody>
                </Card>
            </SectionBody>
        </>
    )
}