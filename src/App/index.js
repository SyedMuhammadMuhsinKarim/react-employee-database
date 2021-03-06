import React, { Component } from "react";
import "./index.css";
import swal from "sweetalert";
import Login from "../Components/Login";
import EmployeeAdd from "../Components/AddEmployee";
import SearchEmployee from "../Components/SearchEmployee";
import EmployeeTable from "../Components/EmployeeTable";
import list from "../Const/List/";
import { Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";
// import PopUpModal from "./../Components/Modal/index";

const isSearched = searchTerm => item => {
  // console.log(item);
  return item.employee_name.toLowerCase().includes(searchTerm.toLowerCase());
};

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      list,
      email: "",
      password: "",
      login: false,
      current_index: list.length,
      EmployeeName: "",
      EmployeeSalary: "",
      EmployeeAge: "",
      searchTerm: "",
      ModalShow: false
    };

    this.getEmail = this.getEmail.bind(this);
    this.getPass = this.getPass.bind(this);
    this.onLogin = this.onLogin.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
    this.getEmployeeName = this.getEmployeeName.bind(this);
    this.getEmployeeSalary = this.getEmployeeSalary.bind(this);
    this.getEmployeeAge = this.getEmployeeAge.bind(this);
    this.add = this.add.bind(this);
    this.update = this.update.bind(this);
    this.cancel = this.cancel.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.onEdit = this.onEdit.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  /* Login Form Area Start*/
  getEmail(event) {
    this.setState({ email: event.target.value });
  }

  getPass(event) {
    this.setState({ password: event.target.value });
  }

  onLogin(event) {
    if (!this.state.email && !this.state.password) {
      swal("Something Wrong!", "Your Username/Password is Wrong", "error");
    } else {
      if (
        this.state.email === "admin@gmail.com" &&
        this.state.password === "admin"
      ) {
        this.setState({ login: true });
        swal("Welcome", "You are successfully Login", "success");
      } else {
        swal("Something Went Wrong", "You are not in our database", "error");
      }
    }
    event.preventDefault();
  }
  /* Login Form Area Ends */

  /* Employe DataBase Control Starts Here*/
  //*Delete Item (Now Uses Filter)
  onDismiss(id) {
    const isNotId = item => item.id !== id;
    const updatedList = this.state.list.filter(isNotId);
    this.setState({
      list: updatedList,
      current_index: this.state.current_index - 1
    });
  }

  onEdit(id) {
    const { list } = this.state;
    this.setState({
      EmployeeName: list[id].employee_name,
      EmployeeSalary: list[id].employee_salary,
      EmployeeAge: list[id].employee_age,
      current_index: id
    });
    this.handleShow();
    console.log(this.state.current_index);
  }
  /* Employe DataBase Control Ends Here*/

  /* Add Employee Form Starts Here */
  getEmployeeName(event) {
    this.setState({
      EmployeeName: event.target.value
    });
    console.log(this.state.EmployeeName);
  }

  getEmployeeSalary(event) {
    this.setState({
      EmployeeSalary: event.target.value
    });
    console.log(this.state.EmployeeSalary);
  }

  getEmployeeAge(event) {
    this.setState({
      EmployeeAge: event.target.value
    });
    console.log(this.state.EmployeeAge);
  }

  add(event) {
    const {
      current_index,
      EmployeeSalary,
      EmployeeName,
      EmployeeAge,
      list
    } = this.state;
    if (
      EmployeeAge >= 18 &&
      EmployeeAge <= 60 &&
      (EmployeeSalary >= 0 && EmployeeSalary <= 10000) &&
      EmployeeName !== ""
    ) {
      this.setState({ current_index: current_index + 1 });
      list.push({
        id: current_index + 1,
        employee_name: EmployeeName,
        employee_salary: EmployeeSalary,
        employee_age: EmployeeAge
      });
      this.setState({ list });
      this.handleClose();
    } else if (!EmployeeAge || EmployeeAge < 18 || EmployeeAge > 60) {
      swal("Something Went Wrong", "Age limit is 18 to 60", "error");
      this.setState({ EmployeeAge: "" });
    } else if (EmployeeName === "" || EmployeeName !== "") {
      swal("Something Went Wrong", " Your Name is Not Provided ", "error");
      this.setState({ EmployeeName: "" });
    } else if (
      EmployeeSalary === "" ||
      EmployeeSalary <= 1 ||
      EmployeeSalary >= 10000
    ) {
      swal("Something Went Wrong", "Salary Range is 1 - 10K", "error");
      this.setState({ EmployeeSalary: "" });
    }
    event.preventDefault();
  }
  /* Add Employee Form Ends Here */

  /* Update Employee Form Starts Here */
  update(event) {
    const {
      current_index,
      EmployeeSalary,
      EmployeeName,
      EmployeeAge,
      list
    } = this.state;
    //this.setState({current_index: current_index + 1});
    list[current_index] = {
      id: current_index,
      employee_name: EmployeeName,
      employee_salary: EmployeeSalary,
      employee_age: EmployeeAge
    };
    this.setState({ list, current_index: list.length });
    this.setState({ EmployeeAge: "", EmployeeName: "", EmployeeSalary: "" });
    this.handleClose();
    event.preventDefault();
  }

  cancel(event) {
    // this.setState({ current_index: list.length });
    console.log(list.length);
    this.setState({
      list,
      current_index: list.length,
      EmployeeAge: "",
      EmployeeName: "",
      EmployeeSalary: ""
    });
    console.log(this.state.current_index);
    this.handleClose();
    event.preventDefault();
  }
  /* Add Employee Form Ends Here */

  /*Search Component Form Control S*/
  onSearch = event =>
    this.setState({
      searchTerm: event.target.value
    });
  /*Search Component Form Control End Here*/

  handleClose() {
    this.setState({ ModalShow: false });
  }

  handleShow() {
    this.setState({ ModalShow: true });
  }

  /*Render Function */
  render() {
    const {
      login,
      list,
      searchTerm,
      EmployeeName,
      EmployeeAge,
      EmployeeSalary,
      current_index,
      ModalShow
    } = this.state;
    return (
      <div className="App">
        {!login && (
          <div>
            <Login
              onClick={this.onLogin}
              onChangeEmail={this.getEmail}
              onChangePass={this.getPass}
            />

            <p>
              For Login Use This <br /> Email: admin@gmail.com <br /> password:
              admin{" "}
            </p>
          </div>
        )}

        {login && (
          <div>
            <p>Employee DataBase</p>
            <Button variant="primary" onClick={this.handleShow}>
              Add Employees Data
            </Button>

            <Modal show={ModalShow} onHide={this.handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Entry Form</Modal.Title>
              </Modal.Header>

              <Modal.Body>
                <EmployeeAdd
                  show={this.state.show}
                  handleClose={this.handleClose}
                  onChangeAge={this.getEmployeeAge}
                  onChangeName={this.getEmployeeName}
                  onChangeSalary={this.getEmployeeSalary}
                  EmployeeNameValue={EmployeeName}
                  EmployeeSalaryValue={EmployeeSalary}
                  EmployeeAgeValue={EmployeeAge}
                  currentIndex={current_index}
                  listLength={list.length}
                  addItem={this.add}
                  updateItem={this.update}
                  cancelItem={this.cancel}
                />
              </Modal.Body>

              <Modal.Footer>
                <Button variant="secondary" onClick={this.handleClose}>
                  بند کریں
                </Button>
              </Modal.Footer>
            </Modal>

            {/* <PopUpModal
              show={this.state.show}
              handleClose={this.handleClose}
              onChangeAge={this.getEmployeeAge}
              onChangeName={this.getEmployeeName}
              onChangeSalary={this.getEmployeeSalary}
              EmployeeNameValue={EmployeeName}
              EmployeeSalaryValue={EmployeeSalary}
              EmployeeAgeValue={EmployeeAge}
              currentIndex={current_index}
              listLength={list.length}o
              addItem={this.add}
              updateItem={this.update}
              cancelItem={this.cancel}
            /> */}

            <SearchEmployee onSearch={this.onSearch} searchTerm={searchTerm} />

            <EmployeeTable
              pattern={searchTerm}
              onEdit={this.onEdit}
              onDismiss={this.onDismiss}
              list={list}
              isSearched={isSearched}
            />
          </div>
        )}
      </div>
    );
  }
}

export default App;
