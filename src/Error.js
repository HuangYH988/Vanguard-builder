import { Link } from "react-router-dom";

export default function Error() {
  return (
    <div>
      <h1>Oops, you are not suppose to see this page</h1>
      <Link to="/">Return home</Link>{" "}
    </div>
  );
}
