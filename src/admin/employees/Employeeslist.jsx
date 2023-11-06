import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Postrequestcall } from "../../api/PostRequest";
import { DELETE_USERS, FETCH_USERS } from "../../constant/Apipath";

export default function Employeeslist() {
    const [employeeList, setEmployeeList] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
    const [deleteEnable, setDeleteEnable] = useState(true);
    const navigate = useNavigate();
    const addEmployee = () => {
        navigate("add");
    }
    useEffect(() => {
        getEmployeeList();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const getEmployeeList = async () => {
        let request = {
            id: 0,
            nrOfRecPerPage: 0,
            pageNr: 0,
            fullSearch: "",
            userId: 0,
            fetchAllowedRecordsOnly: true,
            searchList: [],
            sortList: [],
            typeOfObjectReturned: "",
            includeRecordNr: true,
            doNotSearchInSystemFields: true
        }
        let getEmployeeListResponse = await Postrequestcall(FETCH_USERS, request);
        console.log("getEmployeeListResponse", getEmployeeListResponse)
        if (typeof getEmployeeListResponse !== "undefined") {
            if (getEmployeeListResponse.status === 200) {
                let getData = (getEmployeeListResponse?.data?.data.map((item) => {
                    return {
                        ...item,
                        selected: false,
                        joiningDate: new Date(item.joiningDate).toLocaleString("en-US", {
                            day: "numeric",
                            month: "short",
                            year: "numeric"
                        }),
                    }
                }))
                setEmployeeList(getData);
            }
        }

    }

    const handleCheckboxChange = () => {
        setSelectAll(!selectAll);
        if (!selectAll) {
            setDeleteEnable(false);
        } else {
            setDeleteEnable(true);
        }
        let getUpdatedemplyeelist = employeeList?.map((item) => {
            return {
                ...item,
                selected: !selectAll
            }
        });
        setEmployeeList(getUpdatedemplyeelist)

    };

    const handleIndividualCheckbox = (getItem, index, event) => {
        console.log("event",event);
        event.stopPropagation();
       // event.preventDefault();
        if (employeeList.length > 0) {
            let getList = [...employeeList]
            getList[index].selected = getItem.selected === true ? false : true;
            setEmployeeList(getList);
            const anySelected = getList.some((item) => item.selected);
            if (anySelected) {
                setDeleteEnable(false);
            }
            else {
                setDeleteEnable(true);
            }
            const allSelected = getList.every((item) => item.selected);
            setSelectAll(allSelected);
        }
    };

    const deleteEmployee = async () => {
        let getDeletedemployee = employeeList?.filter((item) => item?.selected === true).map((item) => { return { id: item.id } });
        let deleteData = {
            userId: 0,
            returnRecordError: true,
            softDelete: true,
            deleteList: getDeletedemployee
        }
        let getDeleteEmployeeResponse = await Postrequestcall(DELETE_USERS, deleteData);
        console.log("response", getDeleteEmployeeResponse)
        if (getDeleteEmployeeResponse.status === 201) {
            setSelectAll(false);
            await getEmployeeList();
        }
    }

    const employeeDetails = (e,item) =>{
        e.preventDefault();
        e.stopPropagation();
       
        navigate(`${item?.id}`);
    }

    return (
        <main id="main" className="main emp-list">
            <div className="pagetitle emplist-header">
                <h1>Employees</h1>
                <div>
                    {console.log("deleteEnable", deleteEnable)}
                    <button onClick={deleteEmployee} disabled={deleteEnable} className="btn btn-danger me-3">Delete Employee</button>
                    <button onClick={addEmployee} className="btn btn-primary">Add Employee</button>
                </div>
            </div>

            <section className="section">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="card">
                            <div className="card-body">
                                <table className="table emplist-table">
                                    <thead>
                                        <tr>
                                            <th scope="col"><input type="checkbox" checked={selectAll} onClick={handleCheckboxChange} /></th>
                                            <th scope="col">Name</th>
                                            <th scope="col">Email</th>
                                            <th scope="col">Joining Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {employeeList.map((item, index) => {
                                            return (
                                                <tr key={index} onClick={(e)=>employeeDetails(e,item)}>
                                                    <td><input type="checkbox" checked={item?.selected} onClick={(event) => handleIndividualCheckbox(item, index,event)} /></td>
                                                    <td>{item.employeeName}</td>
                                                    <td>{item.personalEmail}</td>
                                                    <td>{item.joiningDate}</td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )

}