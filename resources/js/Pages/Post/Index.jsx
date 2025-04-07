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

export default function Index({ posts, elements, hasPages, isFirstPage, hasMorePages }) {
    return (
        <>
            <SectionHeader title={'Berita'} />
            <SectionBody>
                <Card>
                    <CardHeader faIcon={'book-open'} title={'Berita'} />
                    <CardBody>
                        <SearchForm word={'judul berita'} />
                        <Table>
                            <BorderedTable>
                                <THead columns={['Judul Berita', 'Kategori']} />
                                <TBody data={posts.data} from={posts.from} keys={['name', 'name']} />
                            </BorderedTable>                            
                            <Pagination
                                elements={elements}
                                firstItem={posts.from}
                                lastItem={posts.to}
                                total={posts.total}
                                hasPages={hasPages}
                                isFirstPage={isFirstPage}
                                hasMorePages={hasMorePages}
                                prevPageUrl={posts.prev_page_url}
                                nextPageUrl={posts.next_page_url}
                                currentPage={posts.current_page}
                            />
                        </Table>
                    </CardBody>
                </Card>
            </SectionBody>
        </>
    )
}