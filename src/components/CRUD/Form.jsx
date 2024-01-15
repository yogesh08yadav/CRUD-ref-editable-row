import React, { useState } from "react";

const Form = ({data,formData,setData,setFormData, searchTerm, setSearchTerm}) => {
  const [onHover ,setOnHover] = useState(false)
  const inputStyle = {
    width: "40%",
    height: "50px",
    borderRadius: "12px",
    outline: "none",
    border: "none",
    backgroundColor: "aliceblue",
    padding: "16px",
    fontSize: "20px",
    margin: "10px",
  };
  const btnStyle = {
    width: "20%",
    height: "44px",
    border: "none",
    outline: "none",
    fontSize: "medium",
    backgroundColor: "aquamarine",
    margin:'auto',
    borderRadius:'12px'
  };

  const onChangeFunc = (e) =>{
    setFormData({...formData,[e.target.name] : e.target.value})
  }

  const addBtnFunction = () =>{
    if(formData.name && formData.email && formData.contact){
      let value = {
        id : Date.now(),
        name: formData.name,
        email: formData.email,
        contact: formData.contact
      }
      setData([...data, value])
      setFormData({name:'',email:'',contact:''})
    }
  }

  const searchHandle = (e) =>{
   setSearchTerm(e.target.value)
  }
  return (
    <>
    <div style={{ display: "flex" }}>
      <input style={inputStyle}  onChange={onChangeFunc} value={formData.name} type="text" name="name" placeholder="Name" />
      <input style={inputStyle} onChange={onChangeFunc} value={formData.email} type="email" name="email" placeholder="Email" />
      <input
        style={inputStyle}
        value={formData.contact}
        onChange={onChangeFunc}
        type="number"
        name="contact"
        placeholder="Contact"
      />
      <button style={btnStyle} onClick={addBtnFunction}>Add</button>
    </div>
    <div className="search">
    <input style={{...inputStyle, width:'100%'}} onChange={searchHandle} value={searchTerm} type="text" name="search" placeholder="Search" />
    </div>
    </>
  );
};

export default Form;
