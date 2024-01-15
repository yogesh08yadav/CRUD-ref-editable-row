import React, { useEffect, useRef, useState } from "react";
import Form from "./Form";
import { Table } from "./Table";

const Index = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
  });
  const [data, setData] = useState([]);
  const [editableId, setEditableid] = useState(false);
  const outSideClickRef = useRef();
  const [searchTerm, setSearchTerm] = useState("");
  const filteredData = data.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm) ||
      item.email.toLowerCase().includes(searchTerm) ||
      item.contact.toLowerCase().includes(searchTerm)
  );

  const deleteBtn = (id) => {
    setData(data.filter((elem) => elem.id !== id));
  };

  const handleEdit = (id, updatedData) => {
    if (!editableId || editableId !== id) return;

    const newData = data.map((elem) =>
      elem.id == id ? { ...elem, ...updatedData } : elem
    );
    setData(newData);
  };

  useEffect(() => {
    if (!editableId) return;

    let selectedRow = document.querySelectorAll(`[id='${editableId}']`);
    selectedRow[0].focus();
  }, [editableId]);

  useEffect(() => {
    const outsideClickHandler = (e) => {
      if (
        outSideClickRef.current &&
        !outSideClickRef.current.contains(e.target)
      ) {
        setEditableid(false);
      }
    };

    document.addEventListener("click", outsideClickHandler);

    return () => removeEventListener("click", outsideClickHandler);
  }, []);

  return (
    <div>
      <Form
        formData={formData}
        setFormData={setFormData}
        data={data}
        setData={setData}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      <Table
        formData={formData}
        setFormData={setFormData}
        data={data}
        setData={setData}
        deleteBtn={deleteBtn}
        editableId={editableId}
        setEditableid={setEditableid}
        handleEdit={handleEdit}
        outSideClickRef={outSideClickRef}
        filteredData={filteredData}
      />
    </div>
  );
};

export default Index;
