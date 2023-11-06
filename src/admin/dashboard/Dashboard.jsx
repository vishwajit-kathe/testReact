import React from "react";


export default function Dashboard() {

    return (

        <main id="main" className="main">

            <div className="pagetitle">
                <h1>Dashboard</h1>
               
            </div>

            <section className="section dashboard">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="row">
                            <div className="col-xxl-4 col-xl-12">

                                <div className="card info-card customers-card">

                                    <div className="filter">
                                        <a className="icon" href data-bs-toggle="dropdown"><i className="bi bi-three-dots"></i></a>
                                        <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                                            <li className="dropdown-header text-start">
                                                <h6>Filter</h6>
                                            </li>

                                            <li><a className="dropdown-item" href>Today</a></li>
                                            <li><a className="dropdown-item" href>This Month</a></li>
                                            <li><a className="dropdown-item" href>This Year</a></li>
                                        </ul>
                                    </div>

                                    <div className="card-body">
                                        <h5 className="card-title">Employee </h5>

                                        <div className="d-flex align-items-center">
                                            <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                                <i className="bi bi-people"></i>
                                            </div>
                                            <div className="ps-3">
                                                <h6>50</h6>
                                            </div>
                                        </div>

                                    </div>
                                </div>

                            </div>

                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}