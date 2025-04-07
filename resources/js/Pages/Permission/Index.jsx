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

export default function Index({ permissions, elements, hasPages, isFirstPage, hasMorePages }) {
    return (
        <>
            <SectionHeader title={'Permissions'} />
            <SectionBody>
                <Card>
                    <CardHeader faIcon={'key'} title={'Permissions'} />
                    <CardBody>
                        <SearchForm word={'nama permission'} />
                        <Table>
                            <BorderedTable>
                                <THead columns={['Nama Permission']} />
                                <TBody data={permissions.data} from={permissions.from} keys={['name']} />
                            </BorderedTable>                            
                            <Pagination
                                elements={elements}
                                firstItem={permissions.from}
                                lastItem={permissions.to}
                                total={permissions.total}
                                hasPages={hasPages}
                                isFirstPage={isFirstPage}
                                hasMorePages={hasMorePages}
                                prevPageUrl={permissions.prev_page_url}
                                nextPageUrl={permissions.next_page_url}
                                currentPage={permissions.current_page}
                            />
                        </Table>
                    </CardBody>
                </Card>
            </SectionBody>
        </>
    )
}