import React, { useState } from "react";
import "./table.css";

export const Table = ({
  data,
  formData,
  setData,
  setFormData,
  deleteBtn,
  editableId,
  setEditableid,
  handleEdit,
  outSideClickRef,
  filteredData,
}) => {
  const [currentpage, setCurrentpage] = useState(1);
  const pageSize = 2;
  return (
    <>
      <table className="" ref={outSideClickRef}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Contact</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            filteredData
              .slice(currentpage * pageSize - pageSize, currentpage * pageSize)
              .map((candidate) => (
                <tr key={candidate.id}>
                  <td
                    id={candidate.id}
                    contentEditable={editableId == candidate.id}
                    onBlur={(e) =>
                      handleEdit(candidate.id, { name: e.target.innerText })
                    }
                  >
                    {candidate.name}
                  </td>
                  <td
                    id={candidate.id}
                    contentEditable={editableId == candidate.id}
                    onBlur={(e) =>
                      handleEdit(candidate.id, { email: e.target.innerText })
                    }
                  >
                    {candidate.email}
                  </td>
                  <td
                    id={candidate.id}
                    contentEditable={editableId == candidate.id}
                    onBlur={(e) =>
                      handleEdit(candidate.id, { contact: e.target.innerText })
                    }
                  >
                    {candidate.contact}
                  </td>
                  <td>
                    <button
                      className="edit"
                      onClick={() => setEditableid(candidate.id)}
                    >
                      Edit
                    </button>
                    <button
                      className="delete"
                      onClick={() => deleteBtn(candidate.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
        </tbody>
      </table>
      <div className="pagination">
        {[...Array(Math.round(filteredData.length / 2))].map((_, idx) => (
          <button key={idx} onClick={() => setCurrentpage(idx + 1)} style={{backgroundColor:currentpage == idx + 1 && 'lightgreen'}}>
            {idx + 1}
          </button>
        ))}
      </div>
    </>
  );
};
