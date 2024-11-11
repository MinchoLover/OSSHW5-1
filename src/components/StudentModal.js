import React, {useState, useEffect} from "react";

function StudentModal({type, student, onClose, onRefresh}) {
    const API_URL = "https://67281988270bd0b975545c66.mockapi.io/api/v1/students";
    const [formData, setFormData] = useState(
        {name: "", age: "", favorite_food: "", id: ""}
    );

    useEffect(() => {
        if (student) 
            setFormData(student);
        }
    , [student]);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    function handleSubmit() {
      const method = type === "add" ? "POST" : "PUT";
      const url = type === "add" ? API_URL : `${API_URL}/${student.id}`;
      
      const xhr = new XMLHttpRequest();
      xhr.open(method, url, true);  // Asynchronous request
      xhr.setRequestHeader("Content-Type", "application/json");
  
      xhr.send(JSON.stringify(formData));
  
      xhr.onload = function() {
          if (xhr.status === 200 || xhr.status === 201) {
              alert(
                  `학생이 ${type === "add" ? "추가" : "수정"}되었습니다!`
              );
              onRefresh();  
              onClose();   
          } else {
              console.error("오류 발생:", xhr.statusText);
              alert("학생 정보를 처리하는 중 오류가 발생했습니다.");
          }
      };
  
      xhr.onerror = function() {
          console.log("네트워크 오류 발생");
          alert("네트워크 오류로 학생을 추가/수정할 수 없습니다.");
      };
  }
  

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h3>{
                        type === "add"
                            ? "학생 추가"
                            : "학생 수정"
                    }</h3>
                <label>이름:</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange}/><br/>
                <label>나이:</label>
                <input type="number" name="age" value={formData.age} onChange={handleChange}/><br/>
                <label>좋아하는 음식:</label>
                <input
                    type="text"
                    name="favorite_food"
                    value={formData.favorite_food}
                    onChange={handleChange}/><br/>
                <button onClick={handleSubmit}>{
                        type === "add"
                            ? "추가"
                            : "수정"
                    }</button>
            </div>
        </div>
    );
}

export default StudentModal;
