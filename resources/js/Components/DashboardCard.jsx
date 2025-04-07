import React from 'react'

export default function DashboardCard({ iconBg, faIcon, header, body }) {
    return (
        <div className="col-lg-4 col-md-6 col-sm-6 col-12">
            <div className="card card-statistic-1">
                <div className={`card-icon bg-${iconBg}`}>
                    <i className={`fa fa-${faIcon} text-white fa-2x`}></i>
                </div>
                <div className="card-wrap">
                    <div className="card-header">
                        <h4>{header}</h4>
                    </div>
                    <div className="card-body">
                        {body}
                    </div>
                </div>
            </div>
        </div>
    )
}