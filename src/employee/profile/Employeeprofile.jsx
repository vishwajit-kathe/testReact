import React, { useEffect, useState } from "react";
import profilePic from "../../assets/img/profile-img.jpg"
import { Nav, Tab, TabContent, TabPane } from "react-bootstrap";
import { DELETE_REMOTE_FILE, FETCH_USERS, SAVE_PICTURES, UPLOAD_REMOTE, SAVE_USERS, RESET_PASSWORD } from "../../constant/Apipath";
import { Postrequestcall } from "../../api/PostRequest";
import { useParams } from "react-router-dom";
import { DeleteRequestcall } from "../../api/DeleteRequest";
import ReactDatePicker from "react-datepicker";
import { useSelector } from "react-redux";
import { EMAIL_REGULAREXPRESSION, MOBILENUMBER_REGULAREXPRESSION } from "../../constant/Regularexpression";

export default function Employeeprofile() {
    const { id } = useParams();
    const [activeTab, setActiveTab] = useState("tab1"); // Set the initial active tab
    const { loginData } = useSelector((state) => state?.main);
    const [userInfo, setUserInfo] = useState({
        name: "",
        gender: "",
        userEmail: "",
        Username: "",
    })

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
    const [currentPosition, setCurrentPosition] = useState({
        designation: ""
    })

    const [error, setError] = useState({
        bloodGroup: "",
        personalEmail: "",
        personalMobileNumber: "",
        emergencyNumber: "",
        presentStreet: "",
        presentCity: "",
        presentState: "",
        presentCountry: "",
        presentPinCode: "",
        permanentStreet: "",
        permanentCity: "",
        permanentState: "",
        permanentCountry: "",
        permanentPinCode: "",
        aadhaarNumber: "",
        nameInAadhaar: "",
        panNumber: "",
        nameInPAN: "",
        from: "",
        to: "",
        institute: "",
        grade: "",
    })

    const [profilePics, setProfilePics] = useState([]);
    const [panCardPic, setPanCardPic] = useState([]);
    const [addressProofPic, setAddressProofPic] = useState([]);
    const [aadharCardPic, setAadharCardPic] = useState([]);
    const [resignationLetterPic, setResignationLetterPic] = useState([]);
    const [salarySlipPic, setSalarySlipPic] = useState([]);
    const [educationCertificatePic, setEducationCertificatePic] = useState([]);
    const [appointmentLetterPic, setAppointmentLetterPic] = useState([]);
    const [experienceCertificatePic, setExperienceCertificatePic] = useState([]);
    const [relievingLetterPic, setRelievingLetterPic] = useState([]);
    const [credential, setCredential] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });
    const [passwordError, setPasswordError] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    })


    useEffect(() => {
        getEmployeeList();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const getEmployeeList = async () => {
        let request = {
            nrOfRecPerPage: 0,
            pageNr: 0,
            fullSearch: "",
            userId: 0,
            fetchAllowedRecordsOnly: true,
            searchList: [{
                id: Number(id),
            }],
            sortList: [],
            typeOfObjectReturned: "",
            includeRecordNr: true,
            doNotSearchInSystemFields: true
        }
        let getEmployeeListResponse = await Postrequestcall(FETCH_USERS, request);
        console.log("getEmployeeListResponse", getEmployeeListResponse);
        if (getEmployeeListResponse?.status === 200) {
            let EmployeeListResonse = getEmployeeListResponse?.data?.data[0]
            setUserInfo({
                ...userInfo,
                name: EmployeeListResonse.name,
                gender: EmployeeListResonse.gender,
                userEmail: EmployeeListResonse.personalEmail,
                Username: EmployeeListResonse.employeeNo,
            })
            setEmployeeInformation({
                ...employeeInformation,
                employeeInfoId: EmployeeListResonse.employeeInfoId,
                professionalEmail: EmployeeListResonse.professionalEmail,
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
            setCurrentPosition({
                ...currentPosition,
                designation: EmployeeListResonse.designation,
            })
            console.log("getEmployeeListResponse",);
        }
    }

    const personalOnchange = (e) => {
        setPersonalInformation({
            ...personalInformation,
            [e.target.name]: e.target.value
        })
        setError({
            ...error,
            [e.target.name]: ""
        })
    }

    const dobChange = (date) => {
        console.log("date", date)
        setPersonalInformation({
            ...personalInformation,
            dob: date
        })
    }


    const fromChange = (date) => {
        setEducation({
            ...education,
            from: date
        })
    }

    const toChange = (date) => {
        setEducation({
            ...education,
            to: date
        })
    }

    const birthdayChange = (date) => {
        setPersonalInformation({
            ...personalInformation,
            birthday: date
        })
    }

    const presentAddressOnchange = (e) => {
        setPresentAddress({
            ...presentAddress,
            [e.target.name]: e.target.value
        })
        setError({
            ...error,
            [e.target.name]: ""
        })
    }

    const permanentAddressOnchange = (e) => {
        setPermanentAddress({
            ...permanentAddress,
            [e.target.name]: e.target.value
        })
        setError({
            ...error,
            [e.target.name]: ""
        })
    }

    const employeeIdentityOnchange = (e) => {
        setEmployeeIdentity({
            ...employeeIdentity,
            [e.target.name]: e.target.value
        })
        setError({
            ...error,
            [e.target.name]: ""
        })
    }


    const qualificationOnchange = (e) => {
        setEducation({
            ...education,
            [e.target.name]: e.target.value
        })
        setError({
            ...error,
            [e.target.name]: ""
        })
    }

    const handleTabClick = (tabKey) => {
        setActiveTab(tabKey);
    };


     //new code
    // const selectFile = async (e, key, setStateFunc) => {
    //     let getFiles = [...stateVariableForKey(key)];
    //     let getFileName = await uploadFile(e, key);
    //     if (getFileName !== "") {
    //         let getUrl = URL.createObjectURL(e.target.files[0]);
    //         getFiles.push({ url: getUrl, fileName: getFileName });
    //         setStateFunc(getFiles);
    //     }
    //     e.target.value = "";
    // };

    const removeCurrentPic = (pic, key, setStateFunc) => {
        let getUpdatedPics = stateVariableForKey(key).filter((item) => item.url !== pic.url);
        setStateFunc(getUpdatedPics);
    }

    const closeCurrentPic = async (e, pic, key, setStateFunc) => {
        let url = DELETE_REMOTE_FILE + `?EmployeeID=${userInfo.Username}`;
        let payload = [pic?.fileName];
        let getResponse = await DeleteRequestcall(url, payload);
        if (getResponse.status === 200) {
            removeCurrentPic(pic, key, setStateFunc);
        }
    }

    const stateVariableForKey = (key) => {
        switch (key) {
            case "ProfilePic":
                return profilePics;
            default:
                return [];
        }
    };

    const handleFile = (e, key) => {
        e.preventDefault();
        document.getElementById(key).click();
    };

    // const uploadFile = async (e, key) => {
    //     let formData = new FormData();
    //     let randomKey = Math.floor(Math.random() * 1000000);
    //     let getFileName = e.target.files[0].name.split(".");
    //     getFileName = getFileName[0] + "_" + randomKey + "." + getFileName[1];
    //     formData.append(key, e.target.files[0], getFileName);
    //     let url = SAVE_PICTURES + `?EmployeeID=${"ST0055"}`;
    //     let getResponse = await Postrequestcall(url, formData, true);
    //     if (getResponse.status === 200) {
    //         return getFileName;
    //     }
    // };

    //new code
    const selectPhotographs = async (e,flag) => {
        let getPhotos = [...profilePics];
        let getFileName = await uploadFile(e,flag);
        if (getFileName !== "") {
            let getUrl = URL.createObjectURL(e.target.files[0]);
            getPhotos.push({ url: getUrl, fileName: getFileName });
            setProfilePics(getPhotos);
        }
        e.target.value = "";
    };

    const uploadFile = async (e,flag) => {
        let formData = new FormData();
        let randomKey = Math.floor(Math.random() * 1000000);
        let getFileName = e.target.files[0].name.split(".");
        getFileName = getFileName[0] + "_" + randomKey + "." + getFileName[1];
        formData.append(flag, e.target.files[0], getFileName);
        let url = SAVE_PICTURES + `?EmployeeID=9`
        let getResponse = await Postrequestcall(url, formData, true);
        if (getResponse.status === 200) {
            return getFileName;
        }
    }

    // const removeCurrentPic = (pic, flag) => {
    //     switch (flag) {
    //         case "recentPhoto":
    //             let getUpdatedPics = profilePics.filter((item) => item.url !== pic.url);
    //             setProfilePics(getUpdatedPics);
    //             break;
    //         default:
    //             break;
    //     }
    // }

    // const closeCurrentPic = async (e, pic, flag) => {
    //     let url = DELETE_REMOTE_FILE + `?EmployeeID=${userInfo.Username}`;
    //     let payload = [pic?.fileName];
    //     console.log("payload", payload, pic)
    //     let getResponse = await DeleteRequestcall(url, payload);
    //     if (getResponse.status === 200) {
    //         removeCurrentPic(pic, flag);
    //     }
    //     console.log("resp", getResponse)
    // }

    // const handlePhotographs = (e) => {
    //     e.preventDefault();
    //     document.getElementById("photographs").click();
    // };

  

    // const selectPanCard = async (e) => {
    //     let getPancard = [...panCardPic];
    //     let getFileName = await uploadFile(e);
    //     if (getFileName !== "") {
    //         let getUrl = URL.createObjectURL(e.target.files[0]);
    //         getPancard.push({ url: getUrl, fileName: getFileName });
    //         setPanCardPic(getPancard);;
    //     }
    //     e.target.value = "";
    // };

    // const handlePanCard = (e) => {
    //     e.preventDefault();
    //     document.getElementById("pancard").click();
    // };

    // const selectAddressProof = async (e) => {
    //     let getAddressProof = [...addressProofPic];
    //     let getFileName = await uploadFile(e);
    //     if (getFileName !== "") {
    //         let getUrl = URL.createObjectURL(e.target.files[0]);
    //         getAddressProof.push({ url: getUrl, fileName: getFileName });
    //         setAddressProofPic(getAddressProof);;
    //     }
    //     e.target.value = "";
    // };

    // const handleAddressProof = (e) => {
    //     e.preventDefault();
    //     document.getElementById("addressproof").click();
    // };

    // const selectAadharCard = async (e) => {
    //     let getAadharcardpic = [...aadharCardPic];
    //     let getFileName = await uploadFile(e);
    //     if (getFileName !== "") {
    //         let getUrl = URL.createObjectURL(e.target.files[0]);
    //         getAadharcardpic.push({ url: getUrl, fileName: getFileName });
    //         setAadharCardPic(getAadharcardpic);;
    //     }
    //     e.target.value = "";
    // };

    // const handleAadharCard = (e) => {
    //     e.preventDefault();
    //     document.getElementById("aadharcard").click();
    // };

    // const selectResignationLetter = async (e) => {
    //     let getResignationLetterPic = [...resignationLetterPic];
    //     let getFileName = await uploadFile(e);
    //     if (getFileName !== "") {
    //         let getUrl = URL.createObjectURL(e.target.files[0]);
    //         getResignationLetterPic.push({ url: getUrl, fileName: getFileName });
    //         setResignationLetterPic(getResignationLetterPic);;
    //     }
    //     e.target.value = "";
    // };

    // const handleResignationLetter = (e) => {
    //     e.preventDefault();
    //     document.getElementById("resignationLetter").click();
    // };

    // const selectSalarySlip = async (e) => {
    //     let getSalarySlipPic = [...salarySlipPic];
    //     let getFileName = await uploadFile(e);
    //     if (getFileName !== "") {
    //         let getUrl = URL.createObjectURL(e.target.files[0]);
    //         getSalarySlipPic.push({ url: getUrl, fileName: getFileName });
    //         setSalarySlipPic(getSalarySlipPic);;
    //     }
    //     e.target.value = "";
    // };

    // const handleSalaryslip = (e) => {
    //     e.preventDefault();
    //     document.getElementById("salaryslip").click();
    // };

    // const selectEducationCertificate = async (e) => {
    //     let getEducationCertificatePic = [...educationCertificatePic];
    //     let getFileName = await uploadFile(e);
    //     if (getFileName !== "") {
    //         let getUrl = URL.createObjectURL(e.target.files[0]);
    //         getEducationCertificatePic.push({ url: getUrl, fileName: getFileName });
    //         setEducationCertificatePic(getEducationCertificatePic);;
    //     }
    //     e.target.value = "";
    // };

    // const handleEducationCertificate = (e) => {
    //     e.preventDefault();
    //     document.getElementById("educationcertificate").click();
    // };

    // const selectAppointmentLetter = async (e) => {
    //     let getaAppointmentLetterPic = [...appointmentLetterPic];
    //     let getFileName = await uploadFile(e);
    //     if (getFileName !== "") {
    //         let getUrl = URL.createObjectURL(e.target.files[0]);
    //         getaAppointmentLetterPic.push({ url: getUrl, fileName: getFileName });
    //         setAppointmentLetterPic(getaAppointmentLetterPic);;
    //     }
    //     e.target.value = "";
    // };

    // const handleAppointmentLetter = (e) => {
    //     e.preventDefault();
    //     document.getElementById("appointmentletter").click();
    // };

    // const selectExperienceCertificate = async (e) => {
    //     let getExperienceCertificatePic = [...experienceCertificatePic];
    //     let getFileName = await uploadFile(e);
    //     if (getFileName !== "") {
    //         let getUrl = URL.createObjectURL(e.target.files[0]);
    //         getExperienceCertificatePic.push({ url: getUrl, fileName: getFileName });
    //         setExperienceCertificatePic(getExperienceCertificatePic);;
    //     }
    //     e.target.value = "";
    // };

    // const handleExperienceCertificate = (e) => {
    //     e.preventDefault();
    //     document.getElementById("experiencecertificate").click();
    // };

    // const selectRelievingLetter = async (e) => {
    //     let getRelievingLetterPic = [...relievingLetterPic];
    //     let getFileName = await uploadFile(e);
    //     if (getFileName !== "") {
    //         let getUrl = URL.createObjectURL(e.target.files[0]);
    //         getRelievingLetterPic.push({ url: getUrl, fileName: getFileName });
    //         setRelievingLetterPic(getRelievingLetterPic);
    //     }
    //     e.target.value = "";
    // };

    // const handleRelievingLetter = (e) => {
    //     e.preventDefault();
    //     document.getElementById("relievingletter").click();
    // };

    const checkValidation = () => {
        let value = true;
        if (personalInformation.bloodGroup === "") {
            error.bloodGroup = "Enter your blood Group";
            value = false;
        }

        if (!EMAIL_REGULAREXPRESSION.test(personalInformation.personalEmail)) {
            error.personalEmail = "Enter valid email";
            value = false;
        }
        if (personalInformation.personalEmail === "") {
            error.personalEmail = "Enter your email";
            value = false;
        }
        if (!MOBILENUMBER_REGULAREXPRESSION.test(personalInformation.personalMobileNumber)) {
            error.personalMobileNumber = "Enter valid mobile number";
            value = false;
        }

        if (personalInformation.personalMobileNumber === "") {
            error.personalMobileNumber = "Enter your mobile number";
            value = false;
        }
        if (!MOBILENUMBER_REGULAREXPRESSION.test(personalInformation.emergencyNumber)) {
            error.emergencyNumber = "Enter valid mobile number";
            value = false;
        }
        if (personalInformation.emergencyNumber === "") {
            error.emergencyNumber = "Enter your emergency mobile number";
            value = false;
        }
        if (presentAddress.presentStreet === "") {
            error.presentStreet = "Enter your street";
            value = false;
        }
        if (presentAddress.presentCity === "") {
            error.presentCity = "Enter your city";
            value = false;
        }
        if (presentAddress.presentState === "") {
            error.presentState = "Enter your state";
            value = false;
        }
        if (presentAddress.presentCountry === "") {
            error.presentCountry = "Enter your country";
            value = false;
        }
        if (presentAddress.presentPinCode === "") {
            error.presentPinCode = "Enter your pincode";
            value = false;
        }
        if (permanentAddress.permanentStreet === "") {
            error.permanentStreet = "Enter your street";
            value = false;
        }
        if (permanentAddress.permanentCity === "") {
            error.permanentCity = "Enter your city";
            value = false;
        }
        if (permanentAddress.permanentState === "") {
            error.permanentState = "Enter your state";
            value = false;
        }
        if (permanentAddress.permanentCountry === "") {
            error.permanentCountry = "Enter your country";
            value = false;
        }
        if (permanentAddress.permanentPinCode === "") {
            error.permanentPinCode = "Enter your pincode";
            value = false;
        }
        if (employeeIdentity.aadhaarNumber === "") {
            error.aadhaarNumber = "Enter your aadhaar Number";
            value = false;
        }
        if (employeeIdentity.nameInAadhaar === "") {
            error.nameInAadhaar = "Enter your aadhaar name";
            value = false;
        }
        if (employeeIdentity.panNumber === "") {
            error.panNumber = "Enter your pan Number";
            value = false;
        }
        if (employeeIdentity.nameInPAN === "") {
            error.nameInPAN = "Enter your pan Name";
            value = false;
        }
        if (education.qualification === "") {
            error.qualification = "Enter your qualification";
            value = false;
        }
        if (education.from === "") {
            error.from = "Enter detail";
            value = false;
        }
        if (education.to === "") {
            error.to = "Enter detail";
            value = false;
        }
        if (education.institute === "") {
            error.institute = "Enter your Institute";
            value = false;
        }
        if (education.grade === "") {
            error.grade = "Enter grade";
            value = false;
        }

        setError({
            ...error,
            bloodGroup: error.bloodGroup,
            personalEmail: error.personalEmail,
            personalMobileNumber: error.personalMobileNumber,
            emergencyNumber: error.emergencyNumber,
            presentStreet: error.presentStreet,
            presentCity: error.presentCity,
            presentState: error.presentState,
            presentCountry: error.presentCountry,
            presentPinCode: error.presentPinCode,
            permanentStreet: error.permanentStreet,
            permanentCity: error.permanentCity,
            permanentState: error.permanentState,
            permanentCountry: error.permanentCountry,
            permanentPinCode: error.permanentPinCode,
            aadhaarNumber: error.aadhaarNumber,
            nameInAadhaar: error.nameInAadhaar,
            panNumber: error.panNumber,
            nameInPAN: error.nameInPAN,
            from: error.from,
            to: error.to,
            institute: error.institute,
            grade: error.grade,
        }); // Update the error state with the new error messages
        return value;
    }

    const saveEmployeeDetails = async (e) => {
        e.preventDefault();
        console.log("personalInformation.dob", personalInformation.dob)
        if (checkValidation()) {
            let request = {
                returnRecordId: true,
                returnRecordError: true,
                saveList: [
                    {
                        user: {
                            id: 0,
                            userEmail: personalInformation.personalEmail,
                            Username: userInfo.Username,
                        },
                        personalInformation: {
                            id: Number(personalInformation.personalInfoId),
                            dob: personalInformation.dob,
                            birthday: personalInformation.birthday,
                            bloodgroup: personalInformation.bloodGroup,
                            personalEmail: personalInformation.personalEmail,
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
                    }
                ],
                userId: Number(id)
            }
            console.log("request....", request)
            const addEmpResponse = await Postrequestcall(SAVE_USERS, request);
            console.log("addEmpResponse....", addEmpResponse)
        }
    }

    const inputOnchage = (e, type) => {
        setCredential({
            ...credential,
            [type]: e.target.value,
        });
        setPasswordError({
            ...passwordError,
            [type]: "",
        });
    }

    const passwordValidation = () => {
        let value = true;
        if (credential.currentPassword === "") {
            passwordError.currentPassword = "Enter your current password";
            value = false;
        }
        if (credential.newPassword === "") {
            passwordError.newPassword = "Enter your new password";
            value = false;
        }
        if (credential.newPassword === "") {
            passwordError.newPassword = "Re-enter your new password";
            value = false;
        }
        setPasswordError({
            ...passwordError,
            currentPassword: passwordError.currentPassword,
            newPassword: passwordError.newPassword,
            confirmPassword: passwordError.confirmPassword
        })
        return value;
    }

    const resetPassword = async (e) => {
        e.preventDefault();
        if (credential.newPassword !== credential.confirmPassword) {
            setPasswordError({
                ...passwordError,
                newPassword: "Passwords do not match",
                confirmPassword: "Passwords do not match",
            });
            return;
        }
        if (passwordValidation()) {
            let password = {
                userId: loginData?.id,
                currentPassword: credential.currentPassword,
                newPassword: credential.newPassword,
                confirmPassword: credential.confirmPassword,
            }

            console.log("New password", password);
            let getLoginresponse = await Postrequestcall(RESET_PASSWORD, password); // Login api call
            if (getLoginresponse.status === 200) {
                console.log("Password changed successfully....")
            }
        }
    }

    return (
        <main id="main" className="main">
            <div className="pagetitle">
                <h1>Profile</h1>
            </div>
            <section className="section profile">
                <div className="row">
                    <div className="col-xl-3">

                        <div className="card">
                            <div className="card-body profile-card pt-4 d-flex flex-column align-items-center">
                                <img src={profilePic} alt="Profile" className="rounded-circle" />
                                <h2>{userInfo.name}</h2>
                                <h3>{currentPosition.designation}</h3>
                                <div className="social-links mt-2">
                                    <a href className="twitter"><i className="bi bi-twitter"></i></a>
                                    <a href className="facebook"><i className="bi bi-facebook"></i></a>
                                    <a href className="instagram"><i className="bi bi-instagram"></i></a>
                                    <a href className="linkedin"><i className="bi bi-linkedin"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-9">
                        <div className="card">
                            <div className="card-body pt-3">
                                <Tab.Container activeKey={activeTab} onSelect={handleTabClick}>
                                    <Nav variant="tabs" className="nav-tabs-bordered">
                                        <Nav.Item>
                                            <Nav.Link eventKey="tab1">Overview</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey="tab2">Edit Profile</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey="tab3">Change Password</Nav.Link>
                                        </Nav.Item>
                                    </Nav>
                                    <TabContent>
                                        <TabPane className="profile-overview" eventKey="tab1">
                                            <h5 className="card-title">Employee Information</h5>
                                            <div className="row">
                                                <div className="col-lg-3 col-md-4 label ">Employee No</div>
                                                <div className="col-lg-9 col-md-8">{userInfo.Username}</div>
                                            </div>
                                            <div className="row">
                                                <div className="col-lg-3 col-md-4 label">Name</div>
                                                <div className="col-lg-9 col-md-8">{userInfo.name}</div>
                                            </div>
                                            <div className="row">
                                                <div className="col-lg-3 col-md-4 label">Gender</div>
                                                <div className="col-lg-9 col-md-8">{userInfo.gender}</div>
                                            </div>
                                            <div className="row">
                                                <div className="col-lg-3 col-md-4 label">Email</div>
                                                <div className="col-lg-9 col-md-8">{employeeInformation.professionalEmail}</div>
                                            </div>
                                            <div className="row">
                                                <div className="col-lg-3 col-md-4 label">Mobile Number</div>
                                                <div className="col-lg-9 col-md-8">{personalInformation.personalMobileNumber}</div>
                                            </div>
                                        </TabPane>
                                        <TabPane className="profile-edit profile-overview" eventKey="tab2">
                                            <h5 className="card-title">Personal Information</h5>
                                            <form>
                                                <div className="row mb-3">
                                                    <label for="profileImage" className="col-md-4 col-lg-3 col-form-label">Profile Image</label>
                                                    <div className="col-md-8 col-lg-9">
                                                        <img src={profilePic} alt="Profile" />
                                                        <div className="pt-2 d-flex gap-2">
                                                            <a href className="btn btn-primary btn-sm" title="Upload new profile image"><i className="bi bi-upload"></i></a>
                                                            <a href className="btn btn-danger btn-sm" title="Remove my profile image"><i className="bi bi-trash"></i></a>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row mb-3">
                                                    <label className="col-md-4 col-lg-3 col-form-label">DOB</label>
                                                    {
                                                        console.log("new Date(personalInformation.dob)", new Date(personalInformation.dob), personalInformation.dob)
                                                    }
                                                    <div className="col-md-8 col-lg-9">
                                                        <ReactDatePicker
                                                            className="form-control"
                                                            selected={personalInformation.dob === "" ? new Date() : new Date(personalInformation.dob)}
                                                            name="dob"
                                                            onChange={(date) => dobChange(date)}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="row mb-3">
                                                    <label className="col-md-4 col-lg-3 col-form-label">Birthday</label>
                                                    <div className="col-md-8 col-lg-9">
                                                        <ReactDatePicker
                                                            className="form-control"
                                                            selected={personalInformation.birthday === "" ? new Date() : new Date(personalInformation.birthday)}
                                                            name="birthday"
                                                            onChange={(date) => birthdayChange(date)}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="row mb-3">
                                                    <label className="col-md-4 col-lg-3 col-form-label">Blood Group</label>
                                                    <div className="col-md-8 col-lg-9">
                                                        <input name={"bloodGroup"} value={personalInformation.bloodGroup} onChange={personalOnchange} type="text" className="form-control" />
                                                        <p className="error-msg">{error.bloodGroup}</p>
                                                    </div>
                                                </div>
                                                <div className="row mb-3">
                                                    <label className="col-md-4 col-lg-3 col-form-label">Email</label>
                                                    <div className="col-md-8 col-lg-9">
                                                        <input name={"personalEmail"} value={personalInformation.personalEmail} onChange={personalOnchange} type="text" className="form-control" />
                                                        <p className="error-msg">{error.personalEmail}</p>
                                                    </div>
                                                </div>
                                                <div className="row mb-3">
                                                    <label className="col-md-4 col-lg-3 col-form-label">Mobile Number</label>
                                                    <div className="col-md-8 col-lg-9">
                                                        <input name={"personalMobileNumber"} value={personalInformation.personalMobileNumber} type="number" onChange={personalOnchange} className="form-control" />
                                                        <p className="error-msg">{error.personalMobileNumber}</p>
                                                    </div>
                                                </div>
                                                <div className="row mb-3">
                                                    <label className="col-md-4 col-lg-3 col-form-label">Emergency Number</label>
                                                    <div className="col-md-8 col-lg-9">
                                                        <input name={"emergencyNumber"} value={personalInformation.emergencyNumber} type="number" onChange={personalOnchange} className="form-control" />
                                                        <p className="error-msg">{error.emergencyNumber}</p>
                                                    </div>
                                                </div>
                                            </form>
                                            <h5 className="card-title">Present Address</h5>
                                            <form>
                                                <div className="row mb-3">
                                                    <label className="col-md-4 col-lg-3 col-form-label">Address</label>
                                                    <div className="col-md-8 col-lg-9">
                                                        <input name="presentStreet" value={presentAddress.presentStreet} type="text" onChange={presentAddressOnchange} className="form-control" />
                                                        <p className="error-msg">{error.presentStreet}</p>
                                                    </div>
                                                </div>
                                                <div className="row mb-3">
                                                    <label className="col-md-4 col-lg-3 col-form-label">City</label>
                                                    <div className="copresentCityl-md-8 col-lg-9">
                                                        <input name="presentCity" value={presentAddress?.presentCity} onChange={presentAddressOnchange} type="text" className="form-control" />
                                                        <p className="error-msg">{error.presentCity}</p>
                                                    </div>
                                                </div>
                                                <div className="row mb-3">
                                                    <label className="col-md-4 col-lg-3 col-form-label">State</label>
                                                    <div className="col-md-8 col-lg-9">
                                                        <input name="presentState" type="text" value={presentAddress?.presentState} className="form-control" onChange={presentAddressOnchange} />
                                                        <p className="error-msg">{error.presentState}</p>
                                                    </div>
                                                </div>
                                                <div className="row mb-3">
                                                    <label className="col-md-4 col-lg-3 col-form-label">Country</label>
                                                    <div className="col-md-8 col-lg-9">
                                                        <input name="presentCountry" type="text" value={presentAddress?.presentCountry} className="form-control" onChange={presentAddressOnchange} />
                                                        <p className="error-msg">{error.presentCountry}</p>
                                                    </div>
                                                </div>
                                                <div className="row mb-3">
                                                    <label className="col-md-4 col-lg-3 col-form-label">Pin Code</label>
                                                    <div className="col-md-8 col-lg-9">
                                                        <input name="presentPinCode" type="text" value={presentAddress?.presentPinCode} className="form-control" onChange={presentAddressOnchange} />
                                                        <p className="error-msg">{error.presentPinCode}</p>
                                                    </div>
                                                </div>
                                            </form>
                                            <h5 className="card-title">Permanent Address</h5>
                                            <form>
                                                <div className="row mb-3">
                                                    <label className="col-md-4 col-lg-3 col-form-label">Address</label>
                                                    <div className="col-md-8 col-lg-9">
                                                        <input name="permanentStreet" value={permanentAddress?.permanentStreet} type="text" className="form-control" onChange={permanentAddressOnchange} />
                                                        <p className="error-msg">{error.permanentStreet}</p>
                                                    </div>
                                                </div>
                                                <div className="row mb-3">
                                                    <label className="col-md-4 col-lg-3 col-form-label">City</label>
                                                    <div className="col-md-8 col-lg-9">
                                                        <input name="permanentCity" type="text" value={permanentAddress?.permanentCity} onChange={permanentAddressOnchange} className="form-control" />
                                                        <p className="error-msg">{error.permanentCity}</p>
                                                    </div>
                                                </div>
                                                <div className="row mb-3">
                                                    <label className="col-md-4 col-lg-3 col-form-label">State</label>
                                                    <div className="col-md-8 col-lg-9">
                                                        <input name="permanentState" type="text" value={permanentAddress?.permanentState} className="form-control" onChange={permanentAddressOnchange} />
                                                        <p className="error-msg">{error.permanentState}</p>
                                                    </div>
                                                </div>
                                                <div className="row mb-3">
                                                    <label className="col-md-4 col-lg-3 col-form-label">Country</label>
                                                    <div className="col-md-8 col-lg-9">
                                                        <input name="permanentCountry" type="text" value={permanentAddress?.permanentCountry} className="form-control" onChange={permanentAddressOnchange} />
                                                        <p className="error-msg">{error.permanentCountry}</p>
                                                    </div>
                                                </div>
                                                <div className="row mb-3">
                                                    <label className="col-md-4 col-lg-3 col-form-label">Pin Code</label>
                                                    <div className="col-md-8 col-lg-9">
                                                        <input name="permanentPinCode" type="text" value={permanentAddress?.permanentPinCode} className="form-control" onChange={permanentAddressOnchange} />
                                                        <p className="error-msg">{error.permanentPinCode}</p>
                                                    </div>
                                                </div>
                                            </form>
                                            <h5 className="card-title">Employee Identity</h5>
                                            <form>
                                                <div className="row mb-3">
                                                    <label className="col-md-4 col-lg-3 col-form-label">Aadhaar Number</label>
                                                    <div className="col-md-8 col-lg-9">
                                                        <input name="aadhaarNumber" type="text" value={employeeIdentity?.aadhaarNumber} className="form-control" onChange={employeeIdentityOnchange} />
                                                        <p className="error-msg">{error.aadhaarNumber}</p>
                                                    </div>
                                                </div>
                                                <div className="row mb-3">
                                                    <label className="col-md-4 col-lg-3 col-form-label">Name In Aadhaar</label>
                                                    <div className="col-md-8 col-lg-9">
                                                        <input name="nameInAadhaar" type="text" value={employeeIdentity?.nameInAadhaar} className="form-control" onChange={employeeIdentityOnchange} />
                                                        <p className="error-msg">{error.nameInAadhaar}</p>
                                                    </div>
                                                </div>
                                                <div className="row mb-3">
                                                    <label className="col-md-4 col-lg-3 col-form-label">PAN Number</label>
                                                    <div className="col-md-8 col-lg-9">
                                                        <input name="panNumber" type="text" value={employeeIdentity?.panNumber} className="form-control" onChange={employeeIdentityOnchange} />
                                                        <p className="error-msg">{error.panNumber}</p>
                                                    </div>
                                                </div>
                                                <div className="row mb-3">
                                                    <label className="col-md-4 col-lg-3 col-form-label">Name In PAN</label>
                                                    <div className="col-md-8 col-lg-9">
                                                        <input name="nameInPAN" type="text" value={employeeIdentity?.nameInPAN} className="form-control" onChange={employeeIdentityOnchange} />
                                                        <p className="error-msg">{error.nameInPAN}</p>
                                                    </div>
                                                </div>
                                            </form>
                                            <h5 className="card-title">Education</h5>
                                            <form>
                                                <div className="row mb-3">
                                                    <label className="col-md-4 col-lg-3 col-form-label">Qualification</label>
                                                    <div className="col-md-8 col-lg-9">
                                                        <input name="qualification" type="text" value={education?.qualification} className="form-control" onChange={qualificationOnchange} />
                                                        <p className="error-msg">{error.qualification}</p>
                                                    </div>
                                                </div>
                                                <div className="row mb-3">
                                                    <label className="col-md-4 col-lg-3 col-form-label">From</label>
                                                    <div className="col-md-8 col-lg-9">
                                                        <ReactDatePicker
                                                            className="form-control"
                                                            selected={education.from === "" ? new Date() : new Date(education.from)}
                                                            name="from"
                                                            onChange={(date) => fromChange(date)}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="row mb-3">
                                                    <label className="col-md-4 col-lg-3 col-form-label">To</label>
                                                    <div className="col-md-8 col-lg-9">
                                                        <ReactDatePicker
                                                            className="form-control"
                                                            selected={education.to === "" ? new Date() : new Date(education.to)}
                                                            name="to"
                                                            onChange={(date) => toChange(date)}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="row mb-3">
                                                    <label className="col-md-4 col-lg-3 col-form-label">Institute</label>
                                                    <div className="col-md-8 col-lg-9">
                                                        <input name="institute" type="text" value={education?.institute} className="form-control" onChange={qualificationOnchange} />
                                                        <p className="error-msg">{error.institute}</p>
                                                    </div>
                                                </div>
                                                <div className="row mb-3">
                                                    <label className="col-md-4 col-lg-3 col-form-label">Grade</label>
                                                    <div className="col-md-8 col-lg-9">
                                                        <input name="grade" type="text" value={education?.grade} className="form-control" onChange={qualificationOnchange} />
                                                        <p className="error-msg">{error.grade}</p>
                                                    </div>
                                                </div>
                                            </form>
                                            <h5 className="card-title">Personal Documents</h5>
                                            <form>
                                                <div className="row mb-3">
                                                    <label className="col-md-4 col-lg-3 col-form-label">Recent Photographs</label>
                                                    <div className="col-md-8 col-lg-9">
                                                        <div className="d-flex gap-3">
                                                            <div className="drop-box">
                                                                <input type="file" hidden accept=".png,.jpg" id="ProfilePic" style={{ display: "none" }} onChange={(e) => selectPhotographs(e, "ProfilePic")} />
                                                                <button className="choose-file-btn" onClick={(e) => handleFile(e, "ProfilePic")}>Choose File</button>
                                                            </div>
                                                            {console.log("profilePics", profilePics)}
                                                            {profilePics.map((pic, index) => (
                                                                <div className="drop-box" key={index}>
                                                                    <a href={pic.url} download>
                                                                        <img  
                                                                            alt=""
                                                                            className="uploaded-photo"
                                                                            src={pic?.url}
                                                                        />
                                                                    </a>
                                                                    <span className="close" onClick={(e) => closeCurrentPic(e, pic, "ProfilePic", setProfilePics)}><i className="bi bi-x-circle-fill icon"></i></span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* <div className="row mb-3">
                                                    <label className="col-md-4 col-lg-3 col-form-label">ID Proof – Pan Card</label>
                                                    <div className="col-md-8 col-lg-9">
                                                        <div className="d-flex gap-3">
                                                            <div className="drop-box">
                                                                <input type="file" hidden accept=".png,.jpg" id="pancard" style={{ display: "none" }} onChange={(e) => selectPanCard(e)} multiple />
                                                                <button className="choose-file-btn" onClick={(e) => handlePanCard(e)}>Choose File</button>
                                                            </div>
                                                            {panCardPic.map((pic, index) => (
                                                                <div className="drop-box">
                                                                    <a href={pic.url} download>
                                                                        <img
                                                                            key={index}
                                                                            alt=""
                                                                            className="uploaded-photo"
                                                                            src={pic?.url}
                                                                        />
                                                                    </a>
                                                                    <span className="close" onClick={(e) => closeCurrentPic(e, pic)}><i className="bi bi-x-circle-fill icon"></i></span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row mb-3">
                                                    <label className="col-md-4 col-lg-3 col-form-label">Address Proof – Electricity Bill / Election Card</label>
                                                    <div className="col-md-8 col-lg-9">
                                                        <div className="d-flex gap-3">
                                                            <div className="drop-box">
                                                                <input type="file" hidden accept=".png,.jpg" id="addressproof" style={{ display: "none" }} onChange={(e) => selectAddressProof(e)} />
                                                                <button className="choose-file-btn" onClick={(e) => handleAddressProof(e)}>Choose File</button>
                                                            </div>
                                                            {addressProofPic.map((pic, index) => (
                                                                <div className="drop-box">
                                                                    <a href={pic.url} download>
                                                                        <img
                                                                            key={index}
                                                                            alt=""
                                                                            className="uploaded-photo"
                                                                            src={pic?.url}
                                                                        />
                                                                    </a>
                                                                    <span className="close" onClick={(e) => closeCurrentPic(e, pic)}><i className="bi bi-x-circle-fill icon"></i></span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row mb-3">
                                                    <label className="col-md-4 col-lg-3 col-form-label">Aadhar Card</label>
                                                    <div className="col-md-8 col-lg-9">
                                                        <div className="d-flex gap-3">
                                                            <div className="drop-box">
                                                                <input type="file" hidden accept=".png,.jpg" id="aadharcard" style={{ display: "none" }} onChange={(e) => selectAadharCard(e)} />
                                                                <button className="choose-file-btn" onClick={(e) => handleAadharCard(e)}>Choose File</button>
                                                            </div>
                                                            {aadharCardPic.map((pic, index) => (
                                                                <div className="drop-box">
                                                                    <a href={pic.url} download>
                                                                        <img
                                                                            key={index}
                                                                            alt=""
                                                                            className="uploaded-photo"
                                                                            src={pic?.url}
                                                                        />
                                                                    </a>
                                                                    <span className="close" onClick={(e) => closeCurrentPic(e, pic)}><i className="bi bi-x-circle-fill icon"></i></span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                            <h5 className="card-title">Professional Documents</h5>
                                            <form>
                                                <div className="row mb-3">
                                                    <label className="col-md-4 col-lg-3 col-form-label">Resignation/Termination Letter</label>
                                                    <div className="col-md-8 col-lg-9">
                                                        <div className="d-flex gap-3">
                                                            <div className="drop-box">
                                                                <input type="file" hidden accept=".png,.jpg" id="resignationLetter" style={{ display: "none" }} onChange={(e) => selectResignationLetter(e)} multiple />
                                                                <button className="choose-file-btn" onClick={(e) => handleResignationLetter(e)}>Choose File</button>
                                                            </div>
                                                            {resignationLetterPic.map((pic, index) => (
                                                                <div className="drop-box">
                                                                    <a href={pic.url} download>
                                                                        <img
                                                                            key={index}
                                                                            alt=""
                                                                            className="uploaded-photo"
                                                                            src={pic?.url}
                                                                        />
                                                                    </a>
                                                                    <span className="close" onClick={(e) => closeCurrentPic(e, pic)}><i className="bi bi-x-circle-fill icon"></i></span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row mb-3">
                                                    <label className="col-md-4 col-lg-3 col-form-label">Last drawn Salary: last three Salary Slips</label>
                                                    <div className="col-md-8 col-lg-9">
                                                        <div className="d-flex gap-3">
                                                            <div className="drop-box">
                                                                <input type="file" hidden accept=".png,.jpg" id="salaryslip" style={{ display: "none" }} onChange={(e) => selectSalarySlip(e)} multiple />
                                                                <button className="choose-file-btn" onClick={(e) => handleSalaryslip(e)}>Choose File</button>
                                                            </div>
                                                            {salarySlipPic.map((pic, index) => (
                                                                <div className="drop-box">
                                                                    <a href={pic.url} download>
                                                                        <img
                                                                            key={index}
                                                                            alt=""
                                                                            className="uploaded-photo"
                                                                            src={pic?.url}
                                                                        />
                                                                    </a>
                                                                    <span className="close" onClick={(e) => closeCurrentPic(e, pic)}><i className="bi bi-x-circle-fill icon"></i></span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row mb-3">
                                                    <label className="col-md-4 col-lg-3 col-form-label">Education Certificates (SSC, HSC, Diploma, Degree)</label>
                                                    <div className="col-md-8 col-lg-9">
                                                        <div className="d-flex gap-3">
                                                            <div className="drop-box">
                                                                <input type="file" hidden accept=".png,.jpg" id="educationcertificate" style={{ display: "none" }} onChange={(e) => selectEducationCertificate(e)} multiple />
                                                                <button className="choose-file-btn" onClick={(e) => handleEducationCertificate(e)}>Choose File</button>
                                                            </div>
                                                            {educationCertificatePic.map((pic, index) => (
                                                                <div className="drop-box">
                                                                    <a href={pic.url} download>
                                                                        <img
                                                                            key={index}
                                                                            alt=""
                                                                            className="uploaded-photo"
                                                                            src={pic?.url}
                                                                        />
                                                                    </a>
                                                                    <span className="close" onClick={(e) => closeCurrentPic(e, pic)}><i className="bi bi-x-circle-fill icon"></i></span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row mb-3">
                                                    <label className="col-md-4 col-lg-3 col-form-label">Previous Organization – Appointment Letter</label>
                                                    <div className="col-md-8 col-lg-9">
                                                        <div className="d-flex gap-3">
                                                            <div className="drop-box">
                                                                <input type="file" hidden accept=".png,.jpg" id="appointmentletter" style={{ display: "none" }} onChange={(e) => selectAppointmentLetter(e)} multiple />
                                                                <button className="choose-file-btn" onClick={(e) => handleAppointmentLetter(e)}>Choose File</button>
                                                            </div>
                                                            {appointmentLetterPic.map((pic, index) => (
                                                                <div className="drop-box">
                                                                    <a href={pic.url} download>
                                                                        <img
                                                                            key={index}
                                                                            alt=""
                                                                            className="uploaded-photo"
                                                                            src={pic?.url}
                                                                        />
                                                                    </a>
                                                                    <span className="close" onClick={(e) => closeCurrentPic(e, pic)}><i className="bi bi-x-circle-fill icon"></i></span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row mb-3">
                                                    <label className="col-md-4 col-lg-3 col-form-label">Previous Organization – Experience Certificate</label>
                                                    <div className="col-md-8 col-lg-9">
                                                        <div className="d-flex gap-3">
                                                            <div className="drop-box">
                                                                <input type="file" hidden accept=".png,.jpg" id="experiencecertificate" style={{ display: "none" }} onChange={(e) => selectExperienceCertificate(e)} multiple />
                                                                <button className="choose-file-btn" onClick={(e) => handleExperienceCertificate(e)}>Choose File</button>
                                                            </div>
                                                            {experienceCertificatePic.map((pic, index) => (
                                                                <div className="drop-box">
                                                                    <a href={pic.url} download>
                                                                        <img
                                                                            key={index}
                                                                            alt=""
                                                                            className="uploaded-photo"
                                                                            src={pic?.url}
                                                                        />
                                                                    </a>
                                                                    <span className="close" onClick={(e) => closeCurrentPic(e, pic)}><i className="bi bi-x-circle-fill icon"></i></span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row mb-3">
                                                    <label className="col-md-4 col-lg-3 col-form-label">Previous Organization – Relieving Letter</label>
                                                    <div className="col-md-8 col-lg-9">
                                                        <div className="d-flex gap-3">
                                                            <div className="drop-box">
                                                                <input type="file" hidden accept=".png,.jpg" id="relievingletter" style={{ display: "none" }} onChange={(e) => selectRelievingLetter(e)} multiple />
                                                                <button className="choose-file-btn" onClick={(e) => handleRelievingLetter(e)}>Choose File</button>
                                                            </div>
                                                            {relievingLetterPic.map((pic, index) => (
                                                                <div className="drop-box">
                                                                    <a href={pic.url} download>
                                                                        <img
                                                                            key={index}
                                                                            alt=""
                                                                            className="uploaded-photo"
                                                                            src={pic?.url}
                                                                        />
                                                                    </a>
                                                                    <span className="close" onClick={(e) => closeCurrentPic(e, pic)}><i className="bi bi-x-circle-fill icon"></i></span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div> */}
                                                <div className="text-end">
                                                    <button type="submit" onClick={(e) => saveEmployeeDetails(e)} className="btn btn-primary">Save</button>
                                                </div>
                                            </form>
                                        </TabPane>
                                        <TabPane className="pt-4" eventKey="tab3">
                                            <form>
                                                <div className="row mb-3">
                                                    <label for="currentPassword" className="col-md-4 col-lg-3 col-form-label">Current Password</label>
                                                    <div className="col-md-8 col-lg-9">
                                                        <input name="currentPassword" value={credential.currentPassword} type="password" className="form-control" id="currentPassword" onChange={(e) => inputOnchage(e, "currentPassword")} />
                                                    </div>
                                                    <p className="error-msg">{passwordError.currentPassword}</p>
                                                </div>
                                                <div className="row mb-3">
                                                    <label for="newPassword" className="col-md-4 col-lg-3 col-form-label">New Password</label>
                                                    <div className="col-md-8 col-lg-9">
                                                        <input name="newPassword" value={credential.newPassword} type="password" className="form-control" id="newPassword" onChange={(e) => inputOnchage(e, "newPassword")} />
                                                    </div>
                                                    <p className="error-msg">{passwordError.newPassword}</p>
                                                </div>
                                                <div className="row mb-3">
                                                    <label for="confirmPassword" className="col-md-4 col-lg-3 col-form-label">Re-enter New Password</label>
                                                    <div className="col-md-8 col-lg-9">
                                                        <input name="confirmPassword" value={credential.confirmPassword} type="password" className="form-control" id="confirmPassword" onChange={(e) => inputOnchage(e, "confirmPassword")} />
                                                    </div>
                                                    <p className="error-msg">{passwordError.confirmPassword}</p>
                                                </div>
                                                <div className="text-center">
                                                    <button type="submit" onClick={(e) => resetPassword(e)} className="btn btn-primary">Change Password</button>
                                                </div>
                                            </form>
                                        </TabPane>
                                    </TabContent>
                                </Tab.Container>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </main>
    )
}