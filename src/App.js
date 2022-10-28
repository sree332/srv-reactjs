import React from 'react';
import './style.css';
import { Formik, useField } from 'formik';
import styled from 'styled-components';
import { useRef, useEffect } from 'react';

const Input = styled.input`
  padding: 10px; 
  border: "2px solid lightgrey"; 
  width: 300px; 
  margin-bottom: 5px; 
`;

const Div = styled.div`
  display: flex; 
  flex-direction: column; 

`;
const Label = styled.label`
  font-size: 16px;  
  font-weight: bold; 
  
`;

const capitalizeFirstLetter = (string) => {
  let str = string.charAt(0).toUpperCase() + string.slice(1);
  let s = str.replace(/([A-Z])/g, ' $1').trim();
  return s;
};
const Address = ({ name, setFieldValue, ...otherProps }) => {
  const [field, meta, helpers] = useField(name);
  console.log(Object.keys(field.value));
  const handleChange = (e) => {
    let taddress = { ...field.value };
    taddress[e.target.name] = e.target.value;
    setFieldValue(name, taddress);
  };

  useEffect(() => {
    if (focusRef !== null) {
      console.log(focusRef.current);

      if (focusRef.current.value.length < 10) {
        focusRef.current.style =
          'color:red ; font-size: 18px; padding: 10px;  green; border: 2px solid lightgrey; border-radius: 5px; ';
      } else {
        focusRef.current.style =
          'color:green ; padding: 10px;  green; border: 2px solid lightgrey; border-radius: 5px; ';
      }
    }
  });

  const focusRef = useRef();
  return (
    <>
      <h3> Address </h3>
      {Object.keys(field.value).map((f) => {
        if (f === 'state') {
          return (
            <Div key={f}>
              <Label htmlFor={f}>{capitalizeFirstLetter(f)}</Label>
              <Input
                ref={focusRef}
                name={f}
                onChange={handleChange}
                label={capitalizeFirstLetter(f)}
                id={f}
                type="text"
              />
            </Div>
          );
        }
        return (
          <Div key={f}>
            <Label htmlFor={f}>{capitalizeFirstLetter(f)}</Label>
            <Input
              name={f}
              onChange={handleChange}
              label={capitalizeFirstLetter(f)}
              id={f}
              type="text"
            />
          </Div>
        );
      })}
    </>
  );
};

export default function App() {
  return (
    <div>
      <h2> Address form </h2>
      <Formik
        initialValues={{
          personName: '',
          address: {
            streetName: '',
            city: '',
            state: '',
            zipCode: '',
          },
        }}
        onSubmit={(values, actions) => {
          console.log(values);
        }}
      >
        {(formik) => {
          //console.log(formik);
          return (
            <form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
              <Div>
                <Label htmlFor="name">Name:</Label>
                <Input
                  name="personName"
                  label="Name"
                  id="personName"
                  type="text"
                  onChange={formik.handleChange}
                />
              </Div>

              <Address name="address" setFieldValue={formik.setFieldValue} />
              <Input type="submit" value="Submit" />
            </form>
          );
        }}
      </Formik>
    </div>
  );
}
