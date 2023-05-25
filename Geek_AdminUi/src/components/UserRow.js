import React from "react";
import { IconButton } from "@mui/material";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const UserRow = ({
  user,
  index,
  selectedRows,
  editing,
  editedUser,
  handleRowSelect,
  handleRowEditClick,
  handleRowEdit,
  handleRowSave,
  handleRowDelete
}) => {
  return (
    <tr>
      <td>
        <input
          type="checkbox"
          checked={selectedRows.includes(user.id)}
          onChange={() => handleRowSelect(user.id)}
        />
      </td>
      <td>{user.id}</td>
      <td>
        {editing && editedUser.id === user.id ? (
          <input
            type="text"
            value={editedUser.name}
            onChange={(event) => handleRowEdit(event, "name")}
          />
        ) : (
          user.name
        )}
      </td>
      <td>
        {editing && editedUser.id === user.id ? (
          <input
            type="text"
            value={editedUser.email}
            onChange={(event) => handleRowEdit(event, "email")}
          />
        ) : (
          user.email
        )}
      </td>
      <td>
        {editing && editedUser.id === user.id ? (
          <input
            type="text"
            value={editedUser.role}
            onChange={(event) => handleRowEdit(event, "role")}
          />
        ) : (
          user.role
        )}
      </td>
      <td>
        {editing && editedUser.id === user.id ? (
          <IconButton
            onClick={() => handleRowSave(index)}
            disabled={!editedUser.name || !editedUser.email || !editedUser.role}
          >
            Save
          </IconButton>
        ) : (
          <IconButton onClick={() => handleRowEditClick(index)}>
            <EditOutlined />
          </IconButton>
        )}
      </td>
      <td>
        <IconButton onClick={() => handleRowDelete(index)}>
          <DeleteOutlined />
        </IconButton>
      </td>
    </tr>
  );
};

export default UserRow;
