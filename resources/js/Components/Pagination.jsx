import React from 'react'
import PaginationSmall from './Pagination/PaginationSmall';
import PaginationLarge from './Pagination/Pagination';

export default function Pagination({ elements, firstItem, lastItem, total, hasPages, isFirstPage, hasMorePages, prevPageUrl, nextPageUrl, currentPage }) {
    return hasPages && (
        <div style={{textAlign: 'center'}}>
            <nav className="d-flex justify-items-center justify-content-between">
                <PaginationSmall
                    isFirstPage={isFirstPage}
                    hasMorePages={hasMorePages}
                    prevPageUrl={prevPageUrl}
                    nextPageUrl={nextPageUrl}
                />
                <PaginationLarge
                    elements={elements}
                    firstItem={firstItem}
                    lastItem={lastItem}
                    total={total}
                    isFirstPage={isFirstPage}
                    hasMorePages={hasMorePages}
                    prevPageUrl={prevPageUrl}
                    nextPageUrl={nextPageUrl}
                    currentPage={currentPage}
                />
            </nav>
        </div>
    )
}