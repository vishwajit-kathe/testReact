import React, { useEffect, useState } from "react";
import { FETCH_DEPARTMENTS, SAVE_DEPARTMENTS } from "../../constant/Apipath";
import { Postrequestcall } from "../../api/PostRequest";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

export default function Departmentlist() {

    const [departmentList, setDepartmentList] = useState([]);
    const [showAddDepartment, setShowAddDepartment] = useState(false);
    const [departmentInfo, setDepartmentInfo] = useState({
        id: 0,
        name:""
    });

    useEffect(() => {
        getDepartmentList();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    //fetch department list
    const getDepartmentList = async () => {
        let request = {
            id: 0,
            nrOfRecPerPage: 0,
            pageNr: 0,
            fullSearch: "",
            userId: 0,
            fetchAllowedRecordsOnly: true,
            searchList: [
                {

                }
            ],
            sortList: [
                {
                    FieldName: "Id",
                    Direction: "ASC"
                }
            ],
            typeOfObjectReturned: "",
            includeRecordNr: true,
            doNotSearchInSystemFields: true
        }

        let getdepartmentlistResponse = await Postrequestcall(FETCH_DEPARTMENTS, request);
        console.log("getdepartmentlistResponse....", getdepartmentlistResponse);
        if (getdepartmentlistResponse.status === 200) {
            let getData = getdepartmentlistResponse?.data?.data.map((item) => {
                return {
                    ...item,
                    dateCreated: new Date(item.dateCreated).toLocaleString("en-US", {
                        day: "numeric",
                        month: "short",
                        year: "numeric"
                    }),
                    dateModified:
                        new Date(item.dateModified).toLocaleString("en-US", {
                            day: "numeric",
                            month: "short",
                            year: "numeric"
                        }),
                };
            });
            setDepartmentList(getData);
        }
    }

    const openAddDepartment = () => {
        setShowAddDepartment(true);
    }

    const closeAddDepartment = () => {
        setShowAddDepartment(false);
         setDepartmentInfo ({
            id: 0,
            name:""
        });
    }

    const handleOnChange = (e) => {
        setDepartmentInfo({
            ...departmentInfo,
            [e.target.name]: e.target.value
        });
    }

    
    //Add new Department
    const addDepartment = async () => {
        let request = {
            returnRecordId: true,
            returnRecordError: true,
            saveList: [
              {
                id: 0,
                name: departmentInfo?.name,
                createdBy: 0,
                dateCreated: "2023-09-14T11:00:03.907Z",
                modifiedBy: 0,
                dateModified: "2023-09-14T11:00:03.907Z"
              }
            ],
        }
        console.log("request",request)
        let addDepartmentResponse = await Postrequestcall(SAVE_DEPARTMENTS, request);
        await getDepartmentList();
        setShowAddDepartment(false);
        setDepartmentInfo ({
            id: 0,
            name:""
        });
        console.log("addDepartmentResponse....",addDepartmentResponse)
    }

    return (

        <main id="main" className="main emp-list">

            <div className="pagetitle emplist-header">
                <h1>Departments</h1>
                <button onClick={openAddDepartment} className="btn btn-primary">Add Department</button>
            </div>

            <section className="section">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="card">
                            <div className="card-body">
                                <table className="table emplist-table">
                                    <thead>
                                        <tr>
                                            <th scope="col">Name</th>
                                            <th scope="col">Created By</th>
                                            <th scope="col">Date Created</th>
                                            <th scope="col">Modified By</th>
                                            <th scope="col">Date Modified</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {departmentList.map((item, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>{item.name}</td>
                                                    <td>{item.createdBy}</td>
                                                    <td>{item.dateCreated}</td>
                                                    <td>{item.modifiedBy}</td>
                                                    <td>{item.dateModified}</td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Add department modal start*/}
                <Modal show={showAddDepartment} onHide={closeAddDepartment} >
                    <Modal.Header closeButton>
                        <Modal.Title>Add Department</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Department Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Add Department Name"
                                    autoFocus
                                    name="name"
                                    value={departmentInfo?.name}
                                    onChange={handleOnChange}
                                />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={closeAddDepartment}>
                            Cancel
                        </Button>
                        <Button variant="primary" onClick={addDepartment}>
                            Add
                        </Button>
                    </Modal.Footer>
                </Modal>
                {/* Add department modal end*/}
            </section>


        </main>

    )

}