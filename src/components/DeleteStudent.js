import React from "react";

function DeleteStudent({onClose, onRefresh}) {
    
  const API_URL = "https://67281988270bd0b975545c66.mockapi.io/api/v1/students";

    function handleDelete() {
      const id = prompt("삭제할 학생의 ID를 입력하세요:");
      if (id) {
          const xhr = new XMLHttpRequest();
          xhr.open("DELETE", `${API_URL}/${id}`, true);
          xhr.setRequestHeader("Content-Type", "application/json");
  
          xhr.send();
  
          xhr.onload = function() {
              if (xhr.status === 200 || xhr.status === 204) {
                  alert("학생 데이터가 삭제되었습니다!");
                  onRefresh();
                  onClose();
              } else {
                  console.error("삭제 실패: " + xhr.statusText);
                  alert("학생 삭제에 실패했습니다.");
              }
          };
  
          xhr.onerror = function() {
              console.log("네트워크 오류 발생");
              alert("네트워크 오류로 삭제를 진행할 수 없습니다.");
          };
      }
  }

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h3>학생 삭제</h3>
                <button onClick={handleDelete}>삭제</button>
            </div>
        </div>
    );
}

export default DeleteStudent;
