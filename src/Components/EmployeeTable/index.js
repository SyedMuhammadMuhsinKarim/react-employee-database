import React, { Component } from "react";
import Button from "../Button/";

const EmployeeTable = ({ pattern, onEdit, onDismiss, isSearched, list }) => (
  <table className="mx-auto responsive table">
    <tbody>
      <tr>
        <th scope="col">S#</th>
        <th scope="col">Name</th>
        <th scope="col">Salary</th>
        <th scope="col">Age</th>
        <th scope="col">Edit</th>
        <th scope="col">Remove</th>
      </tr>
      {list.filter(isSearched(pattern)).map((item, index) => {
        return (
          <tr key={index}>
            <td>{index + 1}</td>
            {/* <td>{item.id}</td> */}
            <td itemScope="row">{item.employee_name}</td>
            <td>{item.employee_salary}</td>
            <td>{item.employee_age}</td>
            <td>
              <Button className="btn btn-warning" onClick={() => onEdit(index)}>
                Edit
              </Button>
            </td>
            <td>
              <Button
                className="btn btn-danger"
                onClick={() => onDismiss(item.id)}
              >
                Remove
              </Button>
            </td>
          </tr>
        );
      })}
    </tbody>
  </table>
);

export default EmployeeTable;
