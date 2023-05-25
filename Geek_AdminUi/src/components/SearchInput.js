import { TextField } from "@mui/material";

const SearchInput = ({ handleSearchQueryChange }) => {
  return (
    <TextField
      placeholder="Search by your Name, Email or Role"
      style={{ margin: "5px", width: "500px" }}
      color="info"
      onChange={handleSearchQueryChange}
    />
  );
};

export default SearchInput;
