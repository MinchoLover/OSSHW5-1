import React, {useState, useEffect} from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import StudentList from "./components/StudentList";
import StudentModal from "./components/StudentModal";
import DeleteStudent from "./components/DeleteStudent";
import "./index.css";

const API_URL = "https://67281988270bd0b975545c66.mockapi.io/api/v1/students";

const Index = () => {
    const [students, setStudents] = useState([]);
    const [modalType, setModalType] = useState(null);
    const [selectedStudent, setSelectedStudent] = useState(null);

    useEffect(() => {
        getStudents();
    }, []);

    function getStudents() {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", API_URL, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send();

        xhr.onload = () => {
            if (xhr.status === 200) {
                const data = JSON.parse(xhr.responseText);
                setStudents(data);
            } else {
                console.log(xhr.status, xhr.statusText);
            }
        };
        xhr.onerror = () => {
            console.log("네트워크 오류 발생");
        };
    }

    const openModal = (type, student = null) => {
        setModalType(type);
        setSelectedStudent(student);
    };

    const closeModal = () => {
        setModalType(null);
        setSelectedStudent(null);
    };

    return (
        <div>
            <Header onAdd={() => openModal("add")} onDelete={() => openModal("delete")}/>
            <StudentList
                students={students}
                onEdit={(student) => openModal("edit", student)}/> {
                modalType && modalType !== "delete" && (
                    <StudentModal
                        type={modalType}
                        student={selectedStudent}
                        onClose={closeModal}
                        onRefresh={getStudents}/>
                )
            }
            {
                modalType === "delete" && (
                    <DeleteStudent onClose={closeModal} onRefresh={getStudents}/>
                )
            }
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Index/>);
