import React from 'react'
import SectionHeader from '@/Components/SectionHeader'
import SectionBody from '@/Components/SectionBody'
import Card from '@/Components/Card/Card'
import CardHeader from '@/Components/Card/CardHeader'
import CardBody from '@/Components/Card/CardBody'
import SearchForm from '@/Components/Form/Add'
import Table from '@/Components/Table'
import BorderedTable from '@/Components/Table/Table'
import THead from '@/Components/Table/THead'
import TBody from '@/Components/Table/TBody'
import Pagination from '@/Components/Pagination'

export default function Index({ users, elements, hasPages, isFirstPage, hasMorePages }) {
    return (
        <>
            <SectionHeader title={'Users'} />
            <SectionBody>
                <Card>
                    <CardHeader faIcon={'users'} title={'Users'} />
                    <CardBody>
                        <SearchForm word={'nama user'} route={'user'} />
                        <Table>
                            <BorderedTable>
                                <THead columns={['Nama User', 'Role']} />
                                <TBody data={users.data} from={users.from} keys={['name', 'name']} />
                            </BorderedTable>                            
                            <Pagination
                                elements={elements}
                                firstItem={users.from}
                                lastItem={users.to}
                                total={users.total}
                                hasPages={hasPages}
                                isFirstPage={isFirstPage}
                                hasMorePages={hasMorePages}
                                prevPageUrl={users.prev_page_url}
                                nextPageUrl={users.next_page_url}
                                currentPage={users.current_page}
                            />
                        </Table>
                    </CardBody>
                </Card>
            </SectionBody>
        </>
    )
}