import React from "react";

function Header({onAdd, onDelete}) {
    return (
        <div
            style={{
                textAlign: "center",
                padding: "20px"
            }}>
            <h2>학생 데이터 관리</h2>
            <button onClick={onAdd}>데이터 추가하기</button>
            <button onClick={onDelete}>데이터 삭제하기</button>
        </div>
    );
}

export default Header;
