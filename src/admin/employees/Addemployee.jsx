import React, { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ReactDatePicker from "react-datepicker";
import { FETCH_DEPARTMENTS, SAVE_USERS } from "../../constant/Apipath";
import { Postrequestcall } from "../../api/PostRequest";
import { EMAIL_REGULAREXPRESSION } from "../../constant/Regularexpression";
import { useSelector } from "react-redux";

export default function Addemployee() {
    const { loginData } = useSelector((state) => state?.main);
    const navigate = useNavigate();
    const [selectSeries, setSelectseries] = useState("Manual");
    const [departmentList, setDepartmentList] = useState([]);
    const [employeeInfo, setEmployeeInfo] = useState({
        employeeNo: "",
        name: "",
        gender: "",
        personalEmail: "",
        reportingManager: "",
        joinedOn: "",
        birthday: "",
        password: "",
        departmentName: "",
        departmentId: 0,
        employeeStatus: "Fresher"
    });

    const [error, setError] = useState({
        name: "",
        personalEmail: "",
        reportingManager: "",
        password: "",
    })


    useEffect(() => {
        getDepartmentList();
        console.log("loginData",loginData);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const entrySelect = (eventKey) => {
        setSelectseries(eventKey);
    }

    const departmentSelect = (item) => {
        setEmployeeInfo({
            ...employeeInfo,
            departmentName: item?.name,
            departmentId: item?.id
        });
    };

    const statusSelect = (eventKey) => {
        setEmployeeInfo({
            ...employeeInfo,
            employeeStatus: eventKey
        })
    }
 
    const infoChange = (e) => {
        setEmployeeInfo({
            ...employeeInfo,
            [e.target.name]: e.target.value
        })
        setError({
            ...error,
            [e.target.name]: ""
        })
    }

    const birthdayChange = (date) => {
        setEmployeeInfo({
            ...employeeInfo,
            birthday: date
        })
    }

    const joinedChange = (date) => {
        setEmployeeInfo({
            ...employeeInfo,
            joinedOn: date
        })
    }

    const genderChange = (e) => {
        setEmployeeInfo({
            ...employeeInfo,
            gender: e.target.id
        })
    }

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
            if (getdepartmentlistResponse?.data?.data.length > 0) {
                setDepartmentList(getdepartmentlistResponse?.data?.data);
                setEmployeeInfo({
                    ...employeeInfo,
                    departmentId: getdepartmentlistResponse?.data?.data[0]?.id,
                    departmentName: getdepartmentlistResponse?.data?.data[0]?.name,
                });
            }
        }
    };

    const checkValidation = () => {
        let value = true;
        if (employeeInfo.name === "") {
            error.name = "Enter Employee Name";
            value = false;
        }

        if (!EMAIL_REGULAREXPRESSION.test(employeeInfo.personalEmail)) {
            error.personalEmail = "Enter valid email";
            value = false;
        }
        if (employeeInfo.personalEmail === "") {
            error.personalEmail = "Enter email";
            value = false;
        }

        if (employeeInfo.reportingManager === "") {
            error.reportingManager = "Enter Reporting manager name";
            value = false;
        }

        if (employeeInfo.password === "") {
            error.password = "Enter password";
            value = false;
        }
        setError({
            ...error,
            name: error.name,
            personalEmail: error.personalEmail,
            reportingManager: error.reportingManager,
            password: error.password,
        }); // Update the error state with the new error messages
        return value;
    }

    const addEmployee = async (e) => {
        e.preventDefault();
        if (checkValidation()) {
            let request = {
                returnRecordId: true,
                returnRecordError: true,
                saveList: [
                    {
                        user: {
                            id: 0,
                            departmentId: employeeInfo.departmentId,
                        },
                        employeeInformation: {
                            id: 0,
                            employeeNo: employeeInfo.employeeNo,
                            employeeName: employeeInfo.name,
                            gender: employeeInfo.gender,
                        },
                        personalInformation: {
                            id: 0,
                            personalEmail: employeeInfo.personalEmail,
                            birthday: employeeInfo.birthday,
                        },
                        presentAddress: {
                            id: 0,
                        },
                        permanentAddress: {
                            id: 0,
                        },
                        employeeIdentity: {
                            id: 0,
                        },
                        education: {
                            id: 0,
                        },
                        personalDocuments:{
                            id: 0, 
                        },
                        joiningDetails: {
                            id: 0,
                            joinedOn: employeeInfo.joinedOn,
                            status: employeeInfo.employeeStatus,              
                        },
                        currentPosition:{
                            id: 0, 
                            reportingTo: employeeInfo.reportingManager,
                        },
                        professionalDocuments:{
                            id: 0, 
                        },
                        educationCertificates:{
                            id: 0, 
                        },
                        lastThreeSalarySlips:{
                            id: 0, 
                        },
                    }
                ],
                userId: loginData?.id,
            }
            console.log("addEmployee...", request)
            const addEmpResponse = await Postrequestcall(SAVE_USERS, request);
            console.log("addEmpResponse....", addEmpResponse)
            if (addEmpResponse.status === 201) {
                navigate(-1);
            }
        }
    }

    return (

        <main id="main" className="main add-employee">
            <div className="pagetitle">
                <h1>Add Employee</h1>
            </div>
            <section className="section">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="card addemp-card">
                            <div className="card-body">
                                <form>
                                    <div className="row mb-3 mt-3">
                                        <label className="col-sm-3 col-form-label">Employee Number Series</label>
                                        <div className="col-sm-7">
                                            <Dropdown onSelect={entrySelect}>
                                                <Dropdown.Toggle className="emp-series-list">
                                                    {selectSeries}
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu>
                                                    <Dropdown.Item eventKey="Manual">Manual</Dropdown.Item>
                                                    <Dropdown.Item eventKey="Automatic">Automatic</Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <label className="col-sm-3 col-form-label">Employee No</label>
                                        <div className="col-sm-7">
                                            <input type="text" name="employeeNo" onChange={infoChange} className="form-control" />
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <label className="col-sm-3 col-form-label">Name</label>
                                        <div className="col-sm-7">
                                            <input type="text" name="name" onChange={infoChange} className="form-control" />
                                            <p className="error-msg">{error.name}</p>
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <label htmlFor="inputPassword3" className="col-sm-3 col-form-label">Date Of Birth</label>
                                        <div className="col-sm-7">
                                            <ReactDatePicker
                                                className="form-control"
                                                selected={employeeInfo.birthday === "" ? new Date() : new Date(employeeInfo.birthday)}
                                                name="birthday"
                                                onChange={(date) => birthdayChange(date)}
                                            />
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <label className="col-form-label col-sm-3 pt-0">Gender</label>
                                        <div className="col-sm-1">
                                            <div className="form-check">
                                                <input onClick={(e) => genderChange(e)} className="form-check-input" type="radio" name="gridRadios" id="male" />
                                                <label className="form-check-label">
                                                    Male
                                                </label>
                                            </div>
                                        </div>
                                        <div className="col-sm-1">
                                            <div className="form-check">
                                                <input className="form-check-input" type="radio" name="gridRadios" id="female" onClick={(e) => genderChange(e)} />
                                                <label className="form-check-label">
                                                    Female
                                                </label>
                                            </div>
                                        </div>
                                        <div className="col-sm-1">
                                            <div className="form-check">
                                                <input className="form-check-input" type="radio" name="gridRadios" id="others" onClick={(e) => genderChange(e)} />
                                                <label className="form-check-label">
                                                    Others
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <label className="col-sm-3 col-form-label">Reporting Manager</label>
                                        <div className="col-sm-7">
                                            <input type="text" name="reportingManager" onChange={infoChange} className="form-control" />
                                            <p className="error-msg">{error.reportingManager}</p>
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <label htmlFor="inputPassword3" className="col-sm-3 col-form-label">Status</label>
                                        <div className="col-sm-7">
                                            <Dropdown onSelect={statusSelect}>
                                                <Dropdown.Toggle className="emp-series-list">
                                                    {employeeInfo.employeeStatus}
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu>
                                                    <Dropdown.Item eventKey="Fresher">Fresher</Dropdown.Item>
                                                    <Dropdown.Item eventKey="Experience">Experience</Dropdown.Item>
                                                    <Dropdown.Item eventKey="Probation">Probation</Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <label htmlFor="inputPassword3" className="col-sm-3 col-form-label">Department</label>
                                        <div className="col-sm-3">
                                            <Dropdown>
                                                <Dropdown.Toggle className="emp-dep-list">
                                                    {employeeInfo.departmentName}
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu>
                                                    {departmentList.map((item) => {
                                                        return (
                                                            <Dropdown.Item
                                                                onClick={() => departmentSelect(item)}
                                                                eventKey={item.name}
                                                                key={item.id}
                                                                data-department-id={item.id}
                                                            >
                                                                {item.name}
                                                            </Dropdown.Item>
                                                        )
                                                    })}
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <label htmlFor="inputPassword3" className="col-sm-3 col-form-label">Email</label>
                                        <div className="col-sm-7">
                                            <input type="personalEmail" name="personalEmail" className="form-control" onChange={infoChange} />
                                            <p className="error-msg">{error.personalEmail}</p>
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <label htmlFor="inputPassword3" className="col-sm-3 col-form-label">Password</label>
                                        <div className="col-sm-7">
                                            <input type="password" name="password" className="form-control" onChange={infoChange} />
                                            <p className="error-msg">{error.password}</p>
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <label htmlFor="inputPassword3" className="col-sm-3 col-form-label">Date Of Joining</label>
                                        <div className="col-sm-7">
                                            <ReactDatePicker
                                                className="form-control"
                                                selected={employeeInfo.joinedOn === "" ? new Date() : new Date(employeeInfo.joinedOn)}
                                                onChange={(date) => joinedChange(date)}
                                            />
                                        </div>
                                    </div>
                                    <div className="text-center form-footer">
                                        <button type="submit" className="btn submit-btn" onClick={(e) => addEmployee(e)}>Submit</button>
                                        <button type="reset" className="btn btn-secondary">Cancel</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}