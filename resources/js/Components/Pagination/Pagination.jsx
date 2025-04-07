import React from 'react'
import { prevLabel, nextLabel } from './label'

export default function Pagination({ elements, firstItem, lastItem, total, isFirstPage, hasMorePages, prevPageUrl, nextPageUrl, currentPage }) {
    return (
        <div className="d-none flex-sm-fill d-sm-flex align-items-sm-center justify-content-sm-between">
            <div>
                <p className="small text-muted">
                    {'Showing '}
                    <span className="fw-semibold">{firstItem}</span>
                    {' to '}
                    <span className="fw-semibold">{lastItem}</span>
                    {' of '}
                    <span className="fw-semibold">{total}</span>
                    {' results'}
                </p>
            </div>
            <div>
                <ul className="pagination">
                    {/* Previous Page Link */}
                    {isFirstPage ? (
                        <li className="page-item disabled" aria-disabled="true" aria-label={prevLabel}>
                            <span className="page-link" aria-hidden="true" dangerouslySetInnerHTML={{__html: '&laquo;'}}></span>
                        </li>
                    ) : (
                        <li className="page-item">
                            <a className="page-link" href={prevPageUrl} rel="prev" aria-label={prevLabel} dangerouslySetInnerHTML={{__html: '&laquo;'}}></a>
                        </li>
                    )}

                    {/* Pagination Elements */}
                    {elements.map((element) => {
                        {/* "Three Dots" Separator */}
                        if (typeof element === 'string')
                            return (
                                <li key={'first'} className="page-item disabled" aria-disabled="true"><span className="page-link">{element}</span></li>
                            );

                        {/* Array Of Links */}
                        if (typeof element === 'object') {
                            let result = [];
                            for (let e in element) {
                                if (e == currentPage)
                                    result.push(
                                        <li key={e} className="page-item active" aria-current="page"><span className="page-link">{e}</span></li>
                                    );
                                else
                                    result.push(
                                        <li key={e} className="page-item"><a className="page-link" href={element[e]}>{e}</a></li>
                                    );
                            }
                            return result;
                        }
                    })}

                    {/* Next Page Link */}
                    {hasMorePages ? (
                        <li key={'last'} className="page-item">
                            <a className="page-link" href={nextPageUrl} rel="next" aria-label={nextLabel} dangerouslySetInnerHTML={{__html: '&raquo;'}}></a>
                        </li>
                    ) : (
                        <li key={'last'} className="page-item disabled" aria-disabled="true" aria-label={nextLabel}>
                            <span className="page-link" aria-hidden="true" dangerouslySetInnerHTML={{__html: '&raquo;'}}></span>
                        </li>
                    )}
                </ul>
            </div>
        </div>
    )
}