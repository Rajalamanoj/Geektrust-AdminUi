import "./styles.css";
import UserTable from "./components/UserTable";
export const config = {
  endpoint:
    "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
};
export default function App() {
  return (
    <div className="App">
      <UserTable />
    </div>
  );
}
