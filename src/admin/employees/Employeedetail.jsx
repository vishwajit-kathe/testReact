import React, { useEffect, useState } from "react";
import profile_img from "../../assets/img/profile-img.jpg";
import { FETCH_USERS, SAVE_USERS } from "../../constant/Apipath";
import { Postrequestcall } from "../../api/PostRequest";
import { useParams } from "react-router-dom";
import ReactDatePicker from "react-datepicker";
import { useSelector } from "react-redux";
import { Dropdown } from "react-bootstrap";
import { ConvertDate } from "../../common/export/Returndata";

export default function Employeedetail() {
    const { id } = useParams();
    const { loginData } = useSelector((state) => state?.main);
    const [isEmpInfoEditing, setIsEmpInfoEditing] = useState(false);
    const [isPersonalInfoEditing, setIsPersonalInfoEditing] = useState(false);
    const [isJoiningDetailEditing, setIsJoiningDetailEditing] = useState(false);
    const [isCurrentPositionEditing, setIsCurrentPositionEditing] = useState(false);
    const [isPresentAddressEditing, setIsPresentAddressEditing] = useState(false);
    const [isPermanentAddressEditing, setIsPermanentAddressEditing] = useState(false);
    const [isEmployeeIdentityEditing, setIsEmployeeIdentityEditing] = useState(false);
    const [isEducationEditing, setIsEducationEditing] = useState(false);
    const [userInfo, setUserInfo] = useState({
        name: "",
        gender: "",
        userEmail: "",
        Username: "",
    })

    // const [startDate, setStartDate] = useState(new Date());

    const [employeeInformation, setEmployeeInformation] = useState({
        employeeInfoId: "",
        professionalMobile: "",
        professionalEmail: "",
    })
    const [personalInformation, setPersonalInformation] = useState({
        personalInfoId: "",
        profileImage: "",
        dob: "",
        birthday: "",
        bloodGroup: "",
        personalEmail: "",
        personalMobileNumber: "",
        emergencyNumber: ""
    });
    const [presentAddress, setPresentAddress] = useState({
        presentAddressId: "",
        presentStreet: "",
        presentCity: "",
        presentState: "",
        presentCountry: "",
        presentPinCode: "",
    });
    const [permanentAddress, setPermanentAddress] = useState({
        permanentAddressId: "",
        permanentStreet: "",
        permanentCity: "",
        permanentState: "",
        permanentCountry: "",
        permanentPinCode: "",
    });
    const [employeeIdentity, setEmployeeIdentity] = useState({
        empIdentityId: "",
        aadhaarNumber: "",
        nameInAadhaar: "",
        panNumber: "",
        nameInPAN: "",
    })

    const [education, setEducation] = useState({
        educationId: "",
        qualification: "",
        from: "",
        to: "",
        institute: "",
        grade: "",
    })
    const [personalDocuments, setPersonalDocumnets] = useState({
        personalDocId: "",
        recentPhotographs: "",
        idProofPanCard: "",
        addressProof: "",
        aadharCard: ""
    })
    const [joiningDetails, setJoiningDetails] = useState({
        joiningDetailsId: "",
        joinedOn: "",
        confirmationDate: "",
        employeeStatus: "",
        probationPeriod: "",
        noticePeriod: ""
    })
    const [currentPosition, setCurrentPosition] = useState({
        currentPositionId: "",
        location: "",
        designation: "",
        reportingTo: "",
        weekOff: "",
        geoTracking: ""
    })

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
            searchList: [{ id: id }],
            sortList: [],
            typeOfObjectReturned: "",
            includeRecordNr: true,
            doNotSearchInSystemFields: true
        }
        let getEmployeeListResponse = await Postrequestcall(FETCH_USERS, request);
        console.log("getEmployeeListResponse", getEmployeeListResponse)
        if (typeof getEmployeeListResponse !== "undefined") {
            if (getEmployeeListResponse.status === 200) {
                let EmployeeListResonse = getEmployeeListResponse?.data?.data[0]
                setUserInfo({
                    ...userInfo,
                    name: EmployeeListResonse.employeeName,
                    gender: EmployeeListResonse.gender,
                    userEmail: EmployeeListResonse.personalEmail,
                    Username: EmployeeListResonse.employeeNo,
                })
                setEmployeeInformation({
                    ...employeeInformation,
                    employeeInfoId: EmployeeListResonse.employeeInfoId,
                    professionalEmail: EmployeeListResonse.professionalEmail,
                    professionalMobile: EmployeeListResonse.professionalMobile,
                })
                setPersonalInformation({
                    ...personalInformation,
                    personalInfoId: EmployeeListResonse.personalInfoId,
                    profileImage: EmployeeListResonse.profileImage,
                    dob: EmployeeListResonse.dob,
                    birthday: EmployeeListResonse.birthday,
                    bloodGroup: EmployeeListResonse.bloodGroup,
                    personalEmail: EmployeeListResonse.personalEmail,
                    personalMobileNumber: EmployeeListResonse.personalMobileNumber,
                    emergencyNumber: EmployeeListResonse.emergencyNumber,
                });
                setPresentAddress({
                    ...presentAddress,
                    presentAddressId: EmployeeListResonse.presentAddressId,
                    presentStreet: EmployeeListResonse.presentStreet,
                    presentCity: EmployeeListResonse.presentCity,
                    presentState: EmployeeListResonse.presentState,
                    presentCountry: EmployeeListResonse.presentCountry,
                    presentPinCode: EmployeeListResonse.presentPinCode,
                })
                setPermanentAddress({
                    ...permanentAddress,
                    permanentAddressId: EmployeeListResonse.permanentAddressId,
                    permanentStreet: EmployeeListResonse.permanentStreet,
                    permanentCity: EmployeeListResonse.permanentCity,
                    permanentState: EmployeeListResonse.permanentState,
                    permanentCountry: EmployeeListResonse.permanentCountry,
                    permanentPinCode: EmployeeListResonse.permanentPinCode,
                })
                setEmployeeIdentity({
                    ...employeeIdentity,
                    empIdentityId: EmployeeListResonse.empIdentityId,
                    aadhaarNumber: EmployeeListResonse.aadhaarNumber,
                    nameInAadhaar: EmployeeListResonse.nameInAadhaar,
                    panNumber: EmployeeListResonse.panNumber,
                    nameInPAN: EmployeeListResonse.nameInPAN,
                })
                setEducation({
                    ...education,
                    educationId: EmployeeListResonse.educationId,
                    qualification: EmployeeListResonse.qualification,
                    from: EmployeeListResonse.from,
                    to: EmployeeListResonse.to,
                    institute: EmployeeListResonse.institute,
                    grade: EmployeeListResonse.grade,
                })
                setPersonalDocumnets({
                    ...personalDocuments,
                    personalDocId: EmployeeListResonse.personalDocId,
                    recentPhotographs: EmployeeListResonse.recentPhotographs,
                    idProofPanCard: EmployeeListResonse.idProofPanCard,
                    addressProof: EmployeeListResonse.addressProof,
                    aadharCard: EmployeeListResonse.aadharCard,
                })
                setJoiningDetails({
                    ...joiningDetails,
                    joiningDetailsId: EmployeeListResonse.joiningDetailsId,
                    joinedOn: EmployeeListResonse.joinedOn,
                    confirmationDate: EmployeeListResonse.confirmationDate,
                    employeeStatus: EmployeeListResonse.employeeStatus,
                    probationPeriod: EmployeeListResonse.probationPeriod,
                    noticePeriod: EmployeeListResonse.noticePeriod,
                })
                setCurrentPosition({
                    ...currentPosition,
                    currentPositionId: EmployeeListResonse.currentPositionId,
                    location: EmployeeListResonse.location,
                    designation: EmployeeListResonse.designation,
                    reportingTo: EmployeeListResonse.reportingTo,
                    weekOff: EmployeeListResonse.weekOff,
                    geoTracking: EmployeeListResonse.geoTracking
                })
            }
        }
    }


    const handleEditClick = () => {
        setIsEmpInfoEditing(true);
    };

    const handleEditPersonalInfo = () => {
        setIsPersonalInfoEditing(true);
    };
    const handleEditJoiningDetail = () => {
        setIsJoiningDetailEditing(true);
    };
    const handleEditCurrentPosition = () => {
        setIsCurrentPositionEditing(true);
    };
    const handleEditPresentAddress = () => {
        setIsPresentAddressEditing(true);
    };
    const handleEditPermanentAddress = () => {
        setIsPermanentAddressEditing(true);
    };
    const handleEditEmployeeIdentity = () => {
        setIsEmployeeIdentityEditing(true);
    };
    const handleEditEducation = () => {
        setIsEducationEditing(true);
    };

    const handleCancelClick = () => {
        setIsEmpInfoEditing(false);
    };

    const handleCancelPersonalInfo = () => {
        setIsPersonalInfoEditing(false);
    };
    const handleCancelJoiningDetail = () => {
        setIsJoiningDetailEditing(false);
    };
    const handleCancelCurrentPosition = () => {
        setIsCurrentPositionEditing(false);
    };
    const handleCancelPresentAddress = () => {
        setIsPresentAddressEditing(false);
    };
    const handleCancelPermanentAddress = () => {
        setIsPermanentAddressEditing(false);
    };
    const handleCancelEmployeeIdentity = () => {
        setIsEmployeeIdentityEditing(false);
    };
    const handleCancelEducation = () => {
        setIsEducationEditing(false);
    };

    const handleSaveEmployeeInfo = (e) => {
        setIsEmpInfoEditing(false);
        saveEmployeeDetails(e)
    }

    const handleSavePersonalInfo = (e) => {
        setIsPersonalInfoEditing(false);
        saveEmployeeDetails(e)
    }

    const handleSaveJoiningDetails = (e) => {
        e.preventDefault();
        setIsJoiningDetailEditing(false);
        saveEmployeeDetails();
    }

    const handleSaveCurrentPosition = (e) => {
        setIsCurrentPositionEditing(false);
        saveEmployeeDetails(e)
    }

    const handleSavePresentAddress = (e) => {
        setIsPresentAddressEditing(false);
        saveEmployeeDetails(e)
    }

    const handleSavePermanentAddress = (e) => {
        setIsPermanentAddressEditing(false);
        saveEmployeeDetails(e)
    }

    const handleSaveEmployeeIdentity = (e) => {
        setIsEmployeeIdentityEditing(false);
        saveEmployeeDetails(e)
    }

    const handleSaveEducation = (e) => {
        setIsEducationEditing(false);
        saveEmployeeDetails(e)
    }


    const employeeInfoOnchange = (e) => {
        setEmployeeInformation({
            ...employeeInformation,
            [e.target.name]: e.target.value
        })
        setUserInfo({
            ...userInfo,
            [e.target.name]: e.target.value
        })
    }

    const personalOnchange = (e) => {
        setPersonalInformation({
            ...personalInformation,
            [e.target.name]: e.target.value
        })
    }

    const dobChange = (date) => {
        const formattedDate = ConvertDate(date);
        setPersonalInformation({
            ...personalInformation,
            dob: formattedDate
        });
    }

    const birthdayChange = (date) => {
        const formattedDate = ConvertDate(date);
        setPersonalInformation({
            ...personalInformation,
            birthday: formattedDate
        });
    }

    const joiningOnchange = (e) => {
        setJoiningDetails({
            ...joiningDetails,
            [e.target.name]: e.target.value
        })
    }

    const joinedOnChange = (date) => {
        const formattedDate = ConvertDate(date);
        setJoiningDetails({
            ...joiningDetails,
            joinedOn: formattedDate
        });
    }

    const confirmationOnChange = (date) => {
        const formattedDate = ConvertDate(date);
        setJoiningDetails({
            ...joiningDetails,
            confirmationDate: formattedDate
        });
    }

    const currentPositionOnchange = (e) => {
        setCurrentPosition({
            ...currentPosition,
            [e.target.name]: e.target.value
        })
    }

    const presentAddressOnchange = (e) => {
        setPresentAddress({
            ...presentAddress,
            [e.target.name]: e.target.value
        })
    }

    const permanentAddressOnchange = (e) => {
        setPermanentAddress({
            ...permanentAddress,
            [e.target.name]: e.target.value
        })
    }

    const IdentityOnchange = (e) => {
        setEmployeeIdentity({
            ...employeeIdentity,
            [e.target.name]: e.target.value
        })
    }

    const EducationOnchange = (e) => {
        setEducation({
            ...education,
            [e.target.name]: e.target.value
        })
    }

    const fromOnChange = (date) => {
        const formattedDate = ConvertDate(date);
        setEducation({
            ...education,
            from: formattedDate
        });
    }

    const toOnChange = (date) => {
        const formattedDate = ConvertDate(date);
        setEducation({
            ...education,
            to: formattedDate
        });
    }


    const genderChange = (e) => {
        setUserInfo({
            ...userInfo,
            gender: e.target.id
        })
    }

    const statusSelect = (eventKey) => {
        setJoiningDetails({
            ...joiningDetails,
            employeeStatus: eventKey
        })
    }

    const saveEmployeeDetails = async () => {
        let request = {
            returnRecordId: true,
            returnRecordError: true,
            saveList: [
                {
                    user: {
                        id: 0,
                        departmentId: Number(currentPosition.departmentId),
                        userEmail: personalInformation.personalEmail,
                        Username: userInfo.Username,
                        name: userInfo.name,
                    },
                    employeeInformation: {
                        id: Number(employeeInformation.employeeInfoId),
                        employeeNo: userInfo.Username,
                        employeeName: userInfo.name,
                        gender: userInfo.gender,
                        professionalEmail: employeeInformation.professionalEmail,
                        professionalMobile: employeeInformation.professionalMobile
                    },
                    personalInformation: {
                        id: Number(personalInformation.personalInfoId),
                        personalEmail: personalInformation.personalEmail,
                        dob: personalInformation.dob,
                        birthday: personalInformation.birthday,
                        bloodGroup: personalInformation.bloodGroup,
                        personalMobileNumber: personalInformation.personalMobileNumber,
                        emergencyNumber: personalInformation.emergencyNumber,
                    },
                    presentAddress: {
                        id: Number(presentAddress.presentAddressId),
                        street: presentAddress.presentStreet,
                        city: presentAddress.presentCity,
                        state: presentAddress.presentState,
                        country: presentAddress.presentCountry,
                        pinCode: presentAddress.presentPinCode,
                    },
                    permanentAddress: {
                        id: Number(permanentAddress.permanentAddressId),
                        street: permanentAddress.permanentStreet,
                        city: permanentAddress.permanentCity,
                        state: permanentAddress.permanentState,
                        country: permanentAddress.permanentCountry,
                        pinCode: permanentAddress.permanentPinCode,
                    },
                    employeeIdentity: {
                        id: Number(employeeIdentity.empIdentityId),
                        aadhaarNumber: employeeIdentity.aadhaarNumber,
                        nameInAadhaar: employeeIdentity.nameInAadhaar,
                        panNumber: employeeIdentity.panNumber,
                        nameInPAN: employeeIdentity.nameInPAN,
                    },
                    education: {
                        id: Number(education.educationId),
                        qualification: education.qualification,
                        from: education.from,
                        to: education.to,
                        institute: education.institute,
                        grade: education.grade,
                    },
                    joiningDetails: {
                        id: Number(joiningDetails.joiningDetailsId),
                        joinedOn: joiningDetails.joinedOn,
                        confirmationDate: joiningDetails.confirmationDate,
                        status: joiningDetails.employeeStatus,
                        probationPeriod: joiningDetails.probationPeriod,
                        noticePeriod: joiningDetails.noticePeriod,
                    },
                    currentPosition: {
                        id: Number(currentPosition.currentPositionId),
                        location: currentPosition.location,
                        designation: currentPosition.designation,
                        reportingTo: currentPosition.reportingTo,
                        weekOff: currentPosition.weekOff,
                        geoTracking: currentPosition.geoTracking,
                    },
                }
            ],
            userId: loginData?.id,
        }
        console.log("request....", request)
        const addEmpResponse = await Postrequestcall(SAVE_USERS, request);
        console.log("addEmpResponse....", addEmpResponse)
    }

    return (
        <main id="main" className="main emp-detail">
            <div className="pagetitle emplist-header">
                <h1>Employee Profile</h1>
            </div>

            <section className="section">
                <div className="row">
                    <div className="col-xl-12">
                        <div className="card profile-card">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-sm-12 col-md-12 col-lg-12 col-xl-10">
                                        <div className="d-flex">
                                            <img src={profile_img} alt="Profile" className="profile-img rounded-circle" />
                                            <div className="basic-info">
                                                <h5>{userInfo.name}</h5>
                                                <span>#{userInfo.Username}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-md-12 col-lg-12 col-xl-2 d-flex align-items-center">
                                        <button type="button" className="btn btn-primary upload-photo"><i className="bi bi-camera-fill"></i>Update Photo</button>
                                        <span className="delete-profile">
                                            <i className="bi bi-trash" style={{ color: "#ffff" }} />
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-12">
                        <div className="card info-card">
                            <div className="card-body">
                                <header>
                                    <h5>Employee Information</h5>
                                    {!isEmpInfoEditing && (
                                        <div onClick={handleEditClick}>
                                            <i className="bi bi-pencil"></i>
                                        </div>
                                    )}
                                </header>
                                <div className="row">
                                    <div className="col-xl-4">
                                        <label className="col-form-label empinfo-label">Employee No</label>
                                        {!isEmpInfoEditing ? (
                                            <div className="empinfo-label">{userInfo.Username}</div>
                                        ) : (
                                            <input
                                                name="Username"
                                                type="text"
                                                className="form-control empinfo-control"
                                                value={userInfo.Username}
                                                onChange={employeeInfoOnchange}
                                            />
                                        )}
                                    </div>
                                    <div className="col-xl-4">
                                        <label className="col-form-label empinfo-label">Name</label>
                                        {!isEmpInfoEditing ? (
                                            <div className="empinfo-label">{userInfo.name}</div>
                                        ) : (
                                            <input
                                                name="name"
                                                type="text"
                                                className="form-control empinfo-control"
                                                value={userInfo.name}
                                                onChange={employeeInfoOnchange}
                                            />
                                        )}
                                    </div>
                                    <div className="col-xl-4">
                                        <label className="col-form-label empinfo-label">Gender</label>
                                        {!isEmpInfoEditing ? (
                                            <div className="empinfo-label">{userInfo.gender}</div>
                                        ) : (
                                            <div className="row mb-3">
                                                <div className="col-sm-1">
                                                    <div className="form-check">
                                                        <input onClick={(e) => genderChange(e)} className="form-check-input" type="radio" name="gridRadios" id="male" checked={userInfo.gender === "male"} />
                                                        <label className="form-check-label">
                                                            Male
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className="col-sm-1 ms-5">
                                                    <div className="form-check">
                                                        <input onClick={(e) => genderChange(e)} className="form-check-input" type="radio" name="gridRadios" id="female" checked={userInfo.gender === "female"} />
                                                        <label className="form-check-label">
                                                            Female
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-xl-4">
                                        <label className="col-form-label empinfo-label">Mobile</label>
                                        {!isEmpInfoEditing ? (
                                            <div className="empinfo-label">{employeeInformation.professionalMobile}</div>
                                        ) : (
                                            <input
                                                name="professionalMobile"
                                                type="text"
                                                className="form-control empinfo-control"
                                                value={employeeInformation.professionalMobile}
                                                onChange={employeeInfoOnchange}
                                            />
                                        )}
                                    </div>
                                    <div className="col-xl-4">
                                        <label className="col-form-label empinfo-label">Email</label>
                                        {!isEmpInfoEditing ? (
                                            <div className="empinfo-label">{employeeInformation.professionalEmail}</div>
                                        ) : (
                                            <input
                                                name="professionalEmail"
                                                type="text"
                                                className="form-control empinfo-control"
                                                value={employeeInformation.professionalEmail}
                                                onChange={employeeInfoOnchange}
                                            />
                                        )}
                                    </div>
                                </div>
                                {isEmpInfoEditing && (
                                    <div className="row mt-3">
                                        <div className="col-xl-12 d-flex justify-content-end" style={{ gap: "14px" }}>
                                            <button type="submit" class="btn cancel-btn" onClick={handleCancelClick}>Cancel</button>
                                            <button type="submit" class="btn save-btn" onClick={handleSaveEmployeeInfo}>Save</button>
                                        </div>
                                    </div>
                                )}

                            </div>
                        </div>
                    </div>

                    <div className="col-xl-12">
                        <div className="card info-card">
                            <div className="card-body">
                                <header className="personal-info-header">
                                    <h5>Personal Information</h5>
                                    {!isPersonalInfoEditing && (
                                        <div onClick={handleEditPersonalInfo}>
                                            <i className="bi bi-pencil"></i>
                                        </div>
                                    )}
                                </header>
                                <div className="row">
                                    <div className="col-xl-4">
                                        <label className="col-form-label empinfo-label">DOB</label>
                                        {!isPersonalInfoEditing ? (
                                            <div className="empinfo-label">{personalInformation?.dob}</div>
                                        ) : (
                                            <div className="col-md-8 col-lg-9">
                                                  <ReactDatePicker
                                                    dateFormat="dd/MM/yyyy"
                                                    className="form-control"
                                                    selected={personalInformation.dob ? new Date(personalInformation.dob) : null}
                                                    name="dob"
                                                    onChange={(date) => dobChange(date)}
                                                />
                                            </div>
                                        )}
                                    </div>
                                    <div className="col-xl-4">
                                        <label className="col-form-label empinfo-label">Birthday</label>
                                        {!isPersonalInfoEditing ? (
                                            <div className="empinfo-label">{personalInformation?.birthday}</div>
                                        ) : (
                                            <div className="col-md-8 col-lg-9">
                                                  <ReactDatePicker
                                                    dateFormat="dd/MM/yyyy"
                                                    className="form-control"
                                                    selected={personalInformation.birthday ? new Date(personalInformation.birthday) : null}
                                                    name="birthday"
                                                    onChange={(date) => birthdayChange(date)}
                                                />
                                            </div>
                                        )}
                                    </div>
                                    <div className="col-xl-4">
                                        <label className="col-form-label empinfo-label">Blood Group</label>
                                        {!isPersonalInfoEditing ? (
                                            <div className="empinfo-label">{personalInformation.bloodGroup}</div>
                                        ) : (
                                            <input
                                                name="bloodGroup"
                                                type="text"
                                                className="form-control empinfo-control"
                                                value={personalInformation.bloodGroup}
                                                onChange={personalOnchange}
                                            />
                                        )}
                                    </div>

                                </div>
                                <div className="row">
                                    <div className="col-xl-4">
                                        <label className="col-form-label empinfo-label">Email</label>
                                        {!isPersonalInfoEditing ? (
                                            <div className="empinfo-label">{personalInformation.personalEmail}</div>
                                        ) : (
                                            <input
                                                name="personalEmail"
                                                type="email"
                                                className="form-control empinfo-control"
                                                value={personalInformation.personalEmail}
                                                onChange={personalOnchange}
                                            />
                                        )}
                                    </div>
                                    <div className="col-xl-4">
                                        <label className="col-form-label empinfo-label">Mobile Number</label>
                                        {!isPersonalInfoEditing ? (
                                            <div className="empinfo-label">{personalInformation.personalMobileNumber}</div>
                                        ) : (
                                            <input
                                                name="personalMobileNumber"
                                                type="number"
                                                className="form-control empinfo-control"
                                                value={personalInformation.personalMobileNumber}
                                                onChange={personalOnchange}
                                            />
                                        )}
                                    </div>
                                    <div className="col-xl-4">
                                        <label className="col-form-label empinfo-label">Emergency Number</label>
                                        {!isPersonalInfoEditing ? (
                                            <div className="empinfo-label">{personalInformation.emergencyNumber}</div>
                                        ) : (
                                            <input
                                                name="emergencyNumber"
                                                type="number"
                                                className="form-control empinfo-control"
                                                value={personalInformation.emergencyNumber}
                                                onChange={personalOnchange}
                                            />
                                        )}
                                    </div>
                                </div>
                                {isPersonalInfoEditing && (
                                    <div className="row mt-3">
                                        <div className="col-xl-12 d-flex justify-content-end" style={{ gap: "14px" }}>
                                            <button type="submit" class="btn cancel-btn" onClick={handleCancelPersonalInfo}>Cancel</button>
                                            <button type="submit" class="btn save-btn" onClick={handleSavePersonalInfo}>Save</button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-12">
                        <div className="card info-card">
                            <div className="card-body">
                                <header className="joining-header">
                                    <h5>Joining Details</h5>
                                    {!isJoiningDetailEditing && (
                                        <div onClick={handleEditJoiningDetail}>
                                            <i className="bi bi-pencil"></i>
                                        </div>
                                    )}
                                </header>
                                <div className="row">
                                    {console.log("joiningDetails?.joinedOn", joiningDetails?.joinedOn)}
                                    <div className="col-xl-3">
                                        <label className="col-form-label empinfo-label">Joined On</label>
                                        {!isJoiningDetailEditing ? (
                                            <div className="empinfo-label">{joiningDetails?.joinedOn}</div>
                                        ) : (
                                            <div className="col-md-8 col-lg-9">
                                                <ReactDatePicker
                                                    dateFormat="dd/MM/yyyy"
                                                    className="form-control"
                                                    selected={joiningDetails.joinedOn ? new Date(joiningDetails.joinedOn) : null}
                                                    name="joinedOn"
                                                    onChange={(date) => joinedOnChange(date)}
                                                />
                                            </div>
                                        )}
                                    </div>
                                    <div className="col-xl-3">
                                        <label className="col-form-label empinfo-label">Confirmation Date</label>
                                        {!isJoiningDetailEditing ? (
                                            <div className="empinfo-label">{joiningDetails?.confirmationDate}</div>
                                        ) : (
                                            <div className="col-md-8 col-lg-9">
                                                  <ReactDatePicker
                                                    dateFormat="dd/MM/yyyy"
                                                    className="form-control"
                                                    selected={joiningDetails.confirmationDate ? new Date(joiningDetails.confirmationDate) : null}
                                                    name="confirmationDate"
                                                    onChange={(date) => confirmationOnChange(date)}
                                                />
                                            </div>
                                        )}
                                    </div>
                                    <div className="col-xl-3">
                                        <label className="col-form-label empinfo-label">Status</label>
                                        {!isJoiningDetailEditing ? (
                                            <div className="empinfo-label">{joiningDetails.employeeStatus}</div>
                                        ) : (
                                            <Dropdown onSelect={statusSelect}>
                                                <Dropdown.Toggle className="emp-series-list">
                                                    {joiningDetails.employeeStatus}
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu>
                                                    <Dropdown.Item eventKey="Fresher">Fresher</Dropdown.Item>
                                                    <Dropdown.Item eventKey="Experience">Experience</Dropdown.Item>
                                                    <Dropdown.Item eventKey="Probation">Probation</Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        )}
                                    </div>
                                    <div className="col-xl-3">
                                        <label className="col-form-label empinfo-label">Probation Period</label>
                                        {!isJoiningDetailEditing ? (
                                            <div className="empinfo-label">{joiningDetails.probationPeriod}</div>
                                        ) : (
                                            <input
                                                name="probationPeriod"
                                                type="text"
                                                className="form-control empinfo-control"
                                                value={joiningDetails.probationPeriod}
                                                onChange={joiningOnchange}
                                            />
                                        )}
                                    </div>
                                </div>
                                <div className="row">

                                    <div className="col-xl-3">
                                        <label className="col-form-label empinfo-label">Notice Period</label>
                                        {!isJoiningDetailEditing ? (
                                            <div className="empinfo-label">{joiningDetails.noticePeriod}</div>
                                        ) : (
                                            <input
                                                name="noticePeriod"
                                                type="text"
                                                className="form-control empinfo-control"
                                                value={joiningDetails.noticePeriod}
                                                onChange={joiningOnchange}
                                            />
                                        )}
                                    </div>

                                </div>
                                {isJoiningDetailEditing && (
                                    <div className="row mt-3">
                                        <div className="col-xl-12 d-flex justify-content-end" style={{ gap: "14px" }}>
                                            <button type="submit" class="btn cancel-btn" onClick={handleCancelJoiningDetail}>Cancel</button>
                                            <button type="submit" class="btn save-btn" onClick={(e) => handleSaveJoiningDetails(e)}>Save</button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-12">
                        <div className="card info-card">
                            <div className="card-body">
                                <header className="joining-header">
                                    <h5>Current Position</h5>
                                    {!isCurrentPositionEditing && (
                                        <div onClick={handleEditCurrentPosition}>
                                            <i className="bi bi-pencil"></i>
                                        </div>
                                    )}
                                </header>
                                <div className="row">
                                    <div className="col-xl-3">
                                        <label className="col-form-label empinfo-label">Department</label>
                                        {!isCurrentPositionEditing ? (
                                            <div className="empinfo-label">{currentPosition.departmentId}</div>
                                        ) : (
                                            <input
                                                name="departmentId"
                                                type="text"
                                                className="form-control empinfo-control"
                                                value={currentPosition.departmentId}
                                                onChange={currentPositionOnchange}
                                            />
                                        )}
                                    </div>
                                    <div className="col-xl-3">
                                        <label className="col-form-label empinfo-label">Location</label>
                                        {!isCurrentPositionEditing ? (
                                            <div className="empinfo-label">{currentPosition.location}</div>
                                        ) : (
                                            <input
                                                name="location"
                                                type="text"
                                                className="form-control empinfo-control"
                                                value={currentPosition.location}
                                                onChange={currentPositionOnchange}
                                            />
                                        )}
                                    </div>
                                    <div className="col-xl-3">
                                        <label className="col-form-label empinfo-label">Designation</label>
                                        {!isCurrentPositionEditing ? (
                                            <div className="empinfo-label">{currentPosition.designation}</div>
                                        ) : (
                                            <input
                                                name="designation"
                                                type="text"
                                                className="form-control empinfo-control"
                                                value={currentPosition.designation}
                                                onChange={currentPositionOnchange}
                                            />
                                        )}
                                    </div>
                                    <div className="col-xl-3">
                                        <label className="col-form-label empinfo-label">Reporting To</label>
                                        {!isCurrentPositionEditing ? (
                                            <div className="empinfo-label">{currentPosition.reportingTo}</div>
                                        ) : (
                                            <input
                                                name="reportingTo"
                                                type="text"
                                                className="form-control empinfo-control"
                                                value={currentPosition.reportingTo}
                                                onChange={currentPositionOnchange}
                                            />
                                        )}
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-xl-3">
                                        <label className="col-form-label empinfo-label">Week Off</label>
                                        {!isCurrentPositionEditing ? (
                                            <div className="empinfo-label">{currentPosition.weekOff}</div>
                                        ) : (
                                            <input
                                                name="weekOff"
                                                type="text"
                                                className="form-control empinfo-control"
                                                value={currentPosition.weekOff}
                                                onChange={currentPositionOnchange}
                                            />
                                        )}
                                    </div>
                                    <div className="col-xl-3">
                                        <label className="col-form-label empinfo-label">Geo Tracking</label>
                                        {!isCurrentPositionEditing ? (
                                            <div className="empinfo-label">{currentPosition.geoTracking}</div>
                                        ) : (
                                            <input
                                                name="geoTracking"
                                                type="text"
                                                className="form-control empinfo-control"
                                                value={currentPosition.geoTracking}
                                                onChange={currentPositionOnchange}
                                            />
                                        )}
                                    </div>
                                </div>
                                {isCurrentPositionEditing && (
                                    <div className="row mt-3">
                                        <div className="col-xl-12 d-flex justify-content-end" style={{ gap: "14px" }}>
                                            <button type="submit" class="btn cancel-btn" onClick={handleCancelCurrentPosition}>Cancel</button>
                                            <button type="submit" class="btn save-btn" onClick={handleSaveCurrentPosition}>Save</button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-12">
                        <div className="card info-card">
                            <div className="card-body">
                                <header className="joining-header">
                                    <h5>Present Address</h5>
                                    {!isPresentAddressEditing && (
                                        <div onClick={handleEditPresentAddress}>
                                            <i className="bi bi-pencil"></i>
                                        </div>
                                    )}
                                </header>
                                <div className="row">
                                    <div className="col-xl-3">
                                        <label className="col-form-label empinfo-label">Address</label>
                                        {!isPresentAddressEditing ? (
                                            <div className="empinfo-label">{presentAddress.presentStreet}</div>
                                        ) : (
                                            <input
                                                name="presentStreet"
                                                type="text"
                                                className="form-control empinfo-control"
                                                value={presentAddress.presentStreet}
                                                onChange={presentAddressOnchange}
                                            />
                                        )}
                                    </div>
                                    <div className="col-xl-3">
                                        <label className="col-form-label empinfo-label">City</label>
                                        {!isPresentAddressEditing ? (
                                            <div className="empinfo-label">{presentAddress.presentCity}</div>
                                        ) : (
                                            <input
                                                name="presentCity"
                                                type="text"
                                                className="form-control empinfo-control"
                                                value={presentAddress.presentCity}
                                                onChange={presentAddressOnchange}
                                            />
                                        )}
                                    </div>
                                    <div className="col-xl-3">
                                        <label className="col-form-label empinfo-label">State</label>
                                        {!isPresentAddressEditing ? (
                                            <div className="empinfo-label">{presentAddress.presentState}</div>
                                        ) : (
                                            <input
                                                name="presentState"
                                                type="text"
                                                className="form-control empinfo-control"
                                                value={presentAddress.presentState}
                                                onChange={presentAddressOnchange}
                                            />
                                        )}
                                    </div>
                                    <div className="col-xl-3">
                                        <label className="col-form-label empinfo-label">Country</label>
                                        {!isPresentAddressEditing ? (
                                            <div className="empinfo-label">{presentAddress.presentCountry}</div>
                                        ) : (
                                            <input
                                                name="presentCountry"
                                                type="text"
                                                className="form-control empinfo-control"
                                                value={presentAddress.presentCountry}
                                                onChange={presentAddressOnchange}
                                            />
                                        )}
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-xl-3">
                                        <label className="col-form-label empinfo-label">Pin Code</label>
                                        {!isPresentAddressEditing ? (
                                            <div className="empinfo-label">{presentAddress.presentPinCode}</div>
                                        ) : (
                                            <input
                                                name="presentPinCode"
                                                type="number"
                                                className="form-control empinfo-control"
                                                value={presentAddress.presentPinCode}
                                                onChange={presentAddressOnchange}
                                            />
                                        )}
                                    </div>
                                </div>
                                {isPresentAddressEditing && (
                                    <div className="row mt-3">
                                        <div className="col-xl-12 d-flex justify-content-end" style={{ gap: "14px" }}>
                                            <button type="submit" class="btn cancel-btn" onClick={handleCancelPresentAddress}>Cancel</button>
                                            <button type="submit" class="btn save-btn" onClick={handleSavePresentAddress}>Save</button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-12">
                        <div className="card info-card">
                            <div className="card-body">
                                <header className="joining-header">
                                    <h5>Permanent Address</h5>
                                    {!isPermanentAddressEditing && (
                                        <div onClick={handleEditPermanentAddress}>
                                            <i className="bi bi-pencil"></i>
                                        </div>
                                    )}
                                </header>
                                <div className="row">
                                    <div className="col-xl-3">
                                        <label className="col-form-label empinfo-label">Address</label>
                                        {!isPermanentAddressEditing ? (
                                            <div className="empinfo-label">{permanentAddress.permanentStreet}</div>
                                        ) : (
                                            <input
                                                name="permanentStreet"
                                                type="text"
                                                className="form-control empinfo-control"
                                                value={permanentAddress.permanentStreet}
                                                onChange={permanentAddressOnchange}
                                            />
                                        )}
                                    </div>
                                    <div className="col-xl-3">
                                        <label className="col-form-label empinfo-label">City</label>
                                        {!isPermanentAddressEditing ? (
                                            <div className="empinfo-label">{permanentAddress.permanentCity}</div>
                                        ) : (
                                            <input
                                                name="permanentCity"
                                                type="text"
                                                className="form-control empinfo-control"
                                                value={permanentAddress.permanentCity}
                                                onChange={permanentAddressOnchange}
                                            />
                                        )}
                                    </div>
                                    <div className="col-xl-3">
                                        <label className="col-form-label empinfo-label">State</label>
                                        {!isPermanentAddressEditing ? (
                                            <div className="empinfo-label">{permanentAddress.permanentState}</div>
                                        ) : (
                                            <input
                                                name="permanentState"
                                                type="text"
                                                className="form-control empinfo-control"
                                                value={permanentAddress.permanentState}
                                                onChange={permanentAddressOnchange}
                                            />
                                        )}
                                    </div>
                                    <div className="col-xl-3">
                                        <label className="col-form-label empinfo-label">Country</label>
                                        {!isPermanentAddressEditing ? (
                                            <div className="empinfo-label">{permanentAddress.permanentCountry}</div>
                                        ) : (
                                            <input
                                                name="permanentCountry"
                                                type="text"
                                                className="form-control empinfo-control"
                                                value={permanentAddress.permanentCountry}
                                                onChange={permanentAddressOnchange}
                                            />
                                        )}
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-xl-3">
                                        <label className="col-form-label empinfo-label">Pin Code</label>
                                        {!isPermanentAddressEditing ? (
                                            <div className="empinfo-label">{permanentAddress.permanentPinCode}</div>
                                        ) : (
                                            <input
                                                name="permanentPinCode"
                                                type="number"
                                                className="form-control empinfo-control"
                                                value={permanentAddress.permanentPinCode}
                                                onChange={permanentAddressOnchange}
                                            />
                                        )}
                                    </div>
                                </div>
                                {isPermanentAddressEditing && (
                                    <div className="row mt-3">
                                        <div className="col-xl-12 d-flex justify-content-end" style={{ gap: "14px" }}>
                                            <button type="submit" class="btn cancel-btn" onClick={handleCancelPermanentAddress}>Cancel</button>
                                            <button type="submit" class="btn save-btn" onClick={handleSavePermanentAddress}>Save</button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-12">
                        <div className="card info-card">
                            <div className="card-body">
                                <header className="joining-header">
                                    <h5>Employee Identity</h5>
                                    {!isEmployeeIdentityEditing && (
                                        <div onClick={handleEditEmployeeIdentity}>
                                            <i className="bi bi-pencil"></i>
                                        </div>
                                    )}
                                </header>
                                <div className="row">
                                    <div className="col-xl-3 d-flex flex-column">
                                        <label className="col-form-label empinfo-label">Document Type</label>
                                        <span className="info-value">AADHAAR</span>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-xl-3">
                                        <label className="col-form-label empinfo-label">Aadhaar Number</label>
                                        {!isEmployeeIdentityEditing ? (
                                            <div className="empinfo-label">{employeeIdentity.aadhaarNumber}</div>
                                        ) : (
                                            <input
                                                name="aadharNumber"
                                                type="number"
                                                className="form-control empinfo-control"
                                                value={employeeIdentity.aadhaarNumber}
                                                onChange={IdentityOnchange}
                                            />
                                        )}
                                    </div>
                                    <div className="col-xl-3">
                                        <label className="col-form-label empinfo-label">Name In Aadhaar</label>
                                        {!isEmployeeIdentityEditing ? (
                                            <div className="empinfo-label">{employeeIdentity.nameInAadhaar}</div>
                                        ) : (
                                            <input
                                                name="nameInAadhar"
                                                type="text"
                                                className="form-control empinfo-control"
                                                value={employeeIdentity.nameInAadhaar}
                                                onChange={IdentityOnchange}
                                            />
                                        )}
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-xl-3 d-flex flex-column">
                                        <label className="col-form-label empinfo-label"></label>
                                        <span className="info-value">PAN</span>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-xl-3">
                                        <label className="col-form-label empinfo-label">PAN Number</label>
                                        {!isEmployeeIdentityEditing ? (
                                            <div className="empinfo-label">{employeeIdentity.panNumber}</div>
                                        ) : (
                                            <input
                                                name="panNumber"
                                                type="text"
                                                className="form-control empinfo-control"
                                                value={employeeIdentity.panNumber}
                                                onChange={IdentityOnchange}
                                            />
                                        )}
                                    </div>
                                    <div className="col-xl-3">
                                        <label className="col-form-label empinfo-label">Name In PAN</label>
                                        {!isEmployeeIdentityEditing ? (
                                            <div className="empinfo-label">{employeeIdentity.nameInPAN}</div>
                                        ) : (
                                            <input

                                                name="nameInPAN"
                                                type="text"
                                                className="form-control empinfo-control"
                                                value={employeeIdentity.nameInPAN}
                                                onChange={IdentityOnchange}
                                            />
                                        )}
                                    </div>
                                </div>
                                {isEmployeeIdentityEditing && (
                                    <div className="row mt-3">
                                        <div className="col-xl-12 d-flex justify-content-end" style={{ gap: "14px" }}>
                                            <button type="submit" class="btn cancel-btn" onClick={handleCancelEmployeeIdentity}>Cancel</button>
                                            <button type="submit" class="btn save-btn" onClick={handleSaveEmployeeIdentity}>Save</button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-12">
                        <div className="card info-card">
                            <div className="card-body">
                                <header className="joining-header">
                                    <h5>Education</h5>
                                    {!isEducationEditing && (
                                        <div onClick={handleEditEducation}>
                                            <i className="bi bi-pencil"></i>
                                        </div>
                                    )}
                                </header>
                                <div className="row">
                                    <div className="col-xl-3">
                                        <label className="col-form-label empinfo-label">Qualification</label>
                                        {!isEducationEditing ? (
                                            <div className="empinfo-label">{education.qualification}</div>
                                        ) : (
                                            <input
                                                name="qualification"
                                                type="text"
                                                className="form-control empinfo-control"
                                                value={education.qualification}
                                                onChange={EducationOnchange}
                                            />
                                        )}
                                    </div>
                                    <div className="col-xl-3">
                                        <label className="col-form-label empinfo-label">From</label>
                                        {!isEducationEditing ? (
                                            <div className="empinfo-label">{education?.from}</div>
                                        ) : (
                                            <div className="col-md-8 col-lg-9">
                                                <ReactDatePicker
                                                    dateFormat="dd/MM/yyyy"
                                                    className="form-control"
                                                    selected={education.from ? new Date(education.from) : null}
                                                    name="from"
                                                    onChange={(date) => fromOnChange(date)}
                                                />
                                            </div>
                                        )}
                                    </div>
                                    <div className="col-xl-3">
                                        <label className="col-form-label empinfo-label">To</label>
                                        {!isEducationEditing ? (
                                            <div className="empinfo-label">{education?.to}</div>
                                        ) : (
                                            <div className="col-md-8 col-lg-9">
                                                 <ReactDatePicker
                                                    dateFormat="dd/MM/yyyy"
                                                    className="form-control"
                                                    selected={education.to ? new Date(education.to) : null}
                                                    name="to"
                                                    onChange={(date) => toOnChange(date)}
                                                />
                                            </div>
                                        )}
                                    </div>
                                    <div className="col-xl-3">
                                        <label className="col-form-label empinfo-label">Institute</label>
                                        {!isEducationEditing ? (
                                            <div className="empinfo-label">{education.institute}</div>
                                        ) : (
                                            <input
                                                name="institute"
                                                type="text"
                                                className="form-control empinfo-control"
                                                value={education.institute}
                                                onChange={EducationOnchange}
                                            />
                                        )}
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-xl-3">
                                        <label className="col-form-label empinfo-label">Grade</label>
                                        {!isEducationEditing ? (
                                            <div className="empinfo-label">{education.grade}</div>
                                        ) : (
                                            <input
                                                name="grade"
                                                type="text"
                                                className="form-control empinfo-control"
                                                value={education.grade}
                                                onChange={EducationOnchange}
                                            />
                                        )}
                                    </div>
                                </div>
                                {isEducationEditing && (
                                    <div className="row mt-3">
                                        <div className="col-xl-12 d-flex justify-content-end" style={{ gap: "14px" }}>
                                            <button type="submit" class="btn cancel-btn" onClick={handleCancelEducation}>Cancel</button>
                                            <button type="submit" class="btn save-btn" onClick={handleSaveEducation}>Save</button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-12">
                        <div className="card info-card">
                            <div className="card-body">
                                <header className="joining-header">
                                    <h5>Personal Documents</h5>
                                    <i className="bi bi-pencil"></i>
                                </header>
                                <div className="row profile">
                                    <div className="col-xl-12">
                                        <label className="col-form-label empinfo-label">Recent Photographs</label>
                                        <div className="drop-box">
                                            <input type="file" hidden accept=".png,.jpg" id="fileID" style={{ display: "none" }} />
                                            <img alt="" className="uploaded-photo" src={profile_img} />
                                        </div>
                                    </div>
                                    <div className="col-xl-12">
                                        <label className="col-form-label empinfo-label">ID Proof – Pan Card</label>
                                        <div className="drop-box">
                                            <input type="file" hidden accept=".png,.jpg" id="fileID" style={{ display: "none" }} />
                                            <img alt="" className="uploaded-photo" src={profile_img} />
                                        </div>
                                    </div>
                                    <div className="col-xl-12">
                                        <label className="col-form-label empinfo-label">Address Proof – Electricity Bill / Election Card</label>
                                        <div className="drop-box">
                                            <input type="file" hidden accept=".png,.jpg" id="fileID" style={{ display: "none" }} />
                                            <img alt="" className="uploaded-photo" src={profile_img} />
                                        </div>
                                    </div>
                                    <div className="col-xl-12">
                                        <label className="col-form-label empinfo-label">Aadhar Card</label>
                                        <div className="drop-box">
                                            <input type="file" hidden accept=".png,.jpg" id="fileID" style={{ display: "none" }} />
                                            <img alt="" className="uploaded-photo" src={profile_img} />
                                        </div>
                                    </div>
                                </div>

                                {isEmpInfoEditing && (
                                    <div className="row mt-3">
                                        <div className="col-xl-12 d-flex justify-content-end" style={{ gap: "14px" }}>
                                            <button type="submit" class="btn cancel-btn">Cancel</button>
                                            <button type="submit" class="btn save-btn" >Save</button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-12">
                        <div className="card info-card">
                            <div className="card-body">
                                <header className="joining-header">
                                    <h5>Professional Documents</h5>
                                    {!isEmpInfoEditing && (
                                        <div onClick={handleEditClick}>
                                            <i className="bi bi-pencil"></i>
                                        </div>
                                    )}
                                </header>
                                <div className="row profile">
                                    <div className="col-xl-12">
                                        <label className="col-form-label empinfo-label">Resignation/Termination Letter</label>
                                        <div className="drop-box">
                                            <input type="file" hidden accept=".png,.jpg" id="fileID" style={{ display: "none" }} />
                                            <img alt="" className="uploaded-photo" src={profile_img} />
                                        </div>
                                    </div>
                                    <div className="col-xl-12">
                                        <label className="col-form-label empinfo-label">Last drawn Salary: last three Salary Slips</label>
                                        <div className="drop-box">
                                            <input type="file" hidden accept=".png,.jpg" id="fileID" style={{ display: "none" }} />
                                            <img alt="" className="uploaded-photo" src={profile_img} />
                                        </div>
                                    </div>
                                    <div className="col-xl-12">
                                        <label className="col-form-label empinfo-label">Education Certificates (SSC, HSC, Diploma, Degree)</label>
                                        <div className="d-flex gap-3">
                                            <div className="drop-box">
                                                <input type="file" hidden accept=".png,.jpg" id="fileID" style={{ display: "none" }} />
                                                <img alt="" className="uploaded-photo" src={profile_img} />
                                            </div>
                                            <div className="drop-box">
                                                <input type="file" hidden accept=".png,.jpg" id="fileID" style={{ display: "none" }} />
                                                <img alt="" className="uploaded-photo" src={profile_img} />
                                            </div>
                                            <div className="drop-box">
                                                <input type="file" hidden accept=".png,.jpg" id="fileID" style={{ display: "none" }} />
                                                <img alt="" className="uploaded-photo" src={profile_img} />
                                            </div>
                                            <div className="drop-box">
                                                <input type="file" hidden accept=".png,.jpg" id="fileID" style={{ display: "none" }} />
                                                <img alt="" className="uploaded-photo" src={profile_img} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-12">
                                        <label className="col-form-label empinfo-label">Previous Organization – Appointment Letter</label>
                                        <div className="drop-box">
                                            <input type="file" hidden accept=".png,.jpg" id="fileID" style={{ display: "none" }} />
                                            <img alt="" className="uploaded-photo" src={profile_img} />
                                        </div>
                                    </div>
                                    <div className="col-xl-12">
                                        <label className="col-form-label empinfo-label">Previous Organization – Experience Certificate</label>
                                        <div className="drop-box">
                                            <input type="file" hidden accept=".png,.jpg" id="fileID" style={{ display: "none" }} />
                                            <img alt="" className="uploaded-photo" src={profile_img} />
                                        </div>
                                    </div>
                                    <div className="col-xl-12">
                                        <label className="col-form-label empinfo-label">Previous Organization – Relieving Letter</label>
                                        <div className="drop-box">
                                            <input type="file" hidden accept=".png,.jpg" id="fileID" style={{ display: "none" }} />
                                            <img alt="" className="uploaded-photo" src={profile_img} />
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