import React from 'react'
import { prevLabel, nextLabel } from './label'

export default function PaginationSmall({ isFirstPage, hasMorePages, prevPageUrl, nextPageUrl }) {
    return (
        <div className="d-flex justify-content-between flex-fill d-sm-none">
            <ul className="pagination">
                {/* Previous Page Link */}
                {isFirstPage ? (
                    <li className="page-item disabled" aria-disabled="true">
                        <span className="page-link" dangerouslySetInnerHTML={{__html: prevLabel}}></span>
                    </li>
                ) : (
                    <li className="page-item">
                        <a className="page-link" href={prevPageUrl} rel="prev" dangerouslySetInnerHTML={{__html: prevLabel}}></a>
                    </li>
                )}
                {/* Next Page Link */}
                {hasMorePages ? (
                    <li className="page-item">
                        <a className="page-link" href={nextPageUrl} rel="next" dangerouslySetInnerHTML={{__html: nextLabel}}></a>
                    </li>
                ) : (
                    <li className="page-item disabled" aria-disabled="true">
                        <span className="page-link" dangerouslySetInnerHTML={{__html: nextLabel}}></span>
                    </li>
                )}
            </ul>
        </div>
    )
}