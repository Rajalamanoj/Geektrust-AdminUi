import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Admin.css";
import SearchInput from "./SearchInput";
import UserRow from "./UserRow";
import PaginationButtons from "./PaginationButtons";
import { IconButton, Button, Modal, Box } from "@mui/material";
import { config } from "../App";

const UsersTable = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const [editingIndex, setEditingIndex] = useState(-1);
  const [editedUser, setEditedUser] = useState({});

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${config.endpoint}`);
        setUsers(response.data);
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);

  const handleSearchQueryChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };

  const handleRowEditClick = (index) => {
    setEditingIndex(index);
    setEditedUser(users[index]);
  };

  const handleRowEdit = (event, field) => {
    const { value } = event.target;
    setEditedUser((prevUser) => ({
      ...prevUser,
      [field]: value
    }));
  };

  const handleRowSave = (index) => {
    const newUsers = [...users];
    newUsers[index] = editedUser;
    setUsers(newUsers);
    setEditingIndex(-1);
    setEditedUser({});
  };

  const handleRowDelete = (index) => {
    const newUsers = [...users];
    newUsers.splice(index, 1);
    setUsers(newUsers);
  };

  const handleRowSelect = (id) => {
    const newSelectedRows = selectedRows.includes(id)
      ? selectedRows.filter((rowId) => rowId !== id)
      : [...selectedRows, id];
    setSelectedRows(newSelectedRows);
  };

  const handleSelectAll = (event) => {
    const newSelectedRows = event.target.checked
      ? users.map((user) => user.id)
      : [];
    setSelectedRows(newSelectedRows);
  };

  const handleDeleteSelected = () => {
    const newUsers = users.filter((user) => !selectedRows.includes(user.id));
    setUsers(newUsers);
    setSelectedRows([]);
  };

  const filteredUsers =
    loading || !users
      ? []
      : users
          .filter((user) =>
            user.name.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .slice((currentPage - 1) * 10, currentPage * 10);

  const totalPages = loading || !users ? 0 : Math.ceil(users.length / 10);

  return (
    <div>
      <SearchInput handleSearchQueryChange={handleSearchQueryChange} />

      <table>
        <thead>
          <tr>
            <th>
              <input type="checkbox" onChange={handleSelectAll} />
            </th>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user, index) => (
            <UserRow
              key={user.id}
              user={user}
              index={index}
              selectedRows={selectedRows}
              editing={index === editingIndex}
              editedUser={editedUser}
              handleRowSelect={handleRowSelect}
              handleRowEditClick={handleRowEditClick}
              handleRowEdit={handleRowEdit}
              handleRowSave={() => handleRowSave(index)}
              handleRowDelete={() => handleRowDelete(index)}
            />
          ))}
        </tbody>
      </table>

      <PaginationButtons
        totalPages={totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />

      {selectedRows.length > 0 && (
        <div>
          <Button
            style={{ margin: "2px" }}
            variant="outlined"
            color="warning"
            onClick={handleDeleteSelected}
          >
            Delete Selected
          </Button>
        </div>
      )}
    </div>
  );
};

export default UsersTable;
