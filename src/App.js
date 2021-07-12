import React, { useState } from "react";
import Container from "react-bootstrap/Container";

import Header from "./components/Header";
import UserModal from "./components/UserModal";
import UserTable from "./components/UserTable";

import "./App.css";
import usersData from "./data/_users";

const App = () => {
  let [users, updateUsers] = useState(usersData);
  let [user, updateUser] = useState({
    name: "",
    email: "",
    role: "User",
    id: ""
  });
  let [showModal, updateShowModal] = useState(false);
  let [editMode, setEditMode] = useState(false);

  const handleCreateUser = () => {
    let id = new Date().getTime();

    updateUsers([
      ...users,
      {
        ...user,
        id
      }
    ]);
    handleClose();
  };

  const handleUpdateUser = () => {
    const filteredUsers = users.filter((u) => u.id !== user.id);
    updateUsers([...filteredUsers, user]);
    handleClose();
  };

  const handleDeleteUser = (id) => {
    const filteredUsers = users.filter((user) => user.id !== id);
    updateUsers(filteredUsers);
  };

  const handleEdit = (id) => {
    setEditMode(true);
    updateShowModal(true);

    const { name, email, role } = users.filter((user) => user.id === id)[0];

    updateUser({
      name,
      email,
      role,
      id
    });
  };

  const handleClose = () => {
    setEditMode(false);
    updateShowModal(false);
    updateUser({
      name: "",
      email: "",
      role: "",
      id: ""
    });
  };
  
  return (
    <Container className="p-3">
      <Header updateShowModal={updateShowModal} />
      <UserModal
        showModal={showModal}
        handleClose={handleClose}
        editMode={editMode}
        user={user}
        updateUser={updateUser}
        handleUpdateUser={handleUpdateUser}
        handleCreateUser={handleCreateUser}
      />
      <UserTable
        users={users}
        handleEdit={handleEdit}
        handleDeleteUser={handleDeleteUser}
      />
    </Container>
  );
};

export default App;
