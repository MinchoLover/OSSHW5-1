import React from "react";

function StudentList({students, onEdit}) {
    return (
        <div id="div_students">
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>이름</th>
                        <th>나이</th>
                        <th>좋아하는 음식</th>
                        <th>수정</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        students.map((student) => (
                            <tr key={student.id}>
                                <td >{student.id}</td>
                                <td>{student.name}</td>
                                <td>{student.age}</td>
                                <td>{student.favorite_food}</td>
                                <td>
                                    <button onClick={() => onEdit(student)}>수정</button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
}

export default StudentList;
