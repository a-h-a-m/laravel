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

export default function Index({ categories, elements, hasPages, isFirstPage, hasMorePages }) {
    return (
        <>
            <SectionHeader title={'Kategori'} />
            <SectionBody>
                <Card>
                    <CardHeader faIcon={'folder'} title={'Kategori'} />
                    <CardBody>
                        <SearchForm word={'nama kategori'} />
                        <Table>
                            <BorderedTable>
                                <THead columns={['Nama Kategori']} />
                                <TBody data={categories.data} from={categories.from} keys={['name']} />
                            </BorderedTable>                            
                            <Pagination
                                elements={elements}
                                firstItem={categories.from}
                                lastItem={categories.to}
                                total={categories.total}
                                hasPages={hasPages}
                                isFirstPage={isFirstPage}
                                hasMorePages={hasMorePages}
                                prevPageUrl={categories.prev_page_url}
                                nextPageUrl={categories.next_page_url}
                                currentPage={categories.current_page}
                            />
                        </Table>
                    </CardBody>
                </Card>
            </SectionBody>
        </>
    )
}