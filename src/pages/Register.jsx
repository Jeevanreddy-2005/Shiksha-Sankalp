import { SignUp } from "@clerk/clerk-react";
import { Title } from "../components/Title/Title";

export default function Register() {
  return (
    <>
      <Title />
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "70px" }}
      >
        <SignUp />
      </div>
    </>
  );
}
