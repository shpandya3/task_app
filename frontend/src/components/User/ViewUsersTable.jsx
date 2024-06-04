import React, { useContext } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useQuery } from "@tanstack/react-query";
import LoginDialogue from "../Home/LoginDialogue";
import { LoginDialogueContext } from "../../context/LoginDialogueContext";
import { getUsers } from "../../api/user/UserApi";

const ViewUsersTable = () => {
  const { showLoginDialogue, toggleLoginDialogue } =
    useContext(LoginDialogueContext);

  const { isLoading, error, data } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  const handlePdfDownload = (pdfBase64) => {
    console.log("🚀 ~ handlePdfDownload ~ pdfBase64:", pdfBase64);
  };

  if (isLoading) {
    return (
      <div className="h-30rem card">
        <h1>Loading..</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-30rem card">
        <h1>Error..</h1>
      </div>
    );
  }

  const avatarBodyTemplate = (userData) => {
    return (
      <img
        src={`${atob(userData.avatar)}`}
        alt={"avatar"}
        className="w-6rem shadow-2 border-round"
      />
    );
  };

  const introPdfBodyTemplate = (userData) => {
    return (
      <a
        href={`${atob(userData?.introPdf)}`}
        rel="noopener noreferrer"
        className="p-button font-bold justify-content-center"
        download="File.pdf"
      >
        <i className="pi pi-download "></i>
      </a>
      // <Button
      //   icon="pi pi-download"
      //   onClick={() => window.open(`${atob(userData?.introPdf)}`, "_blank")}
      // ></Button>
    );
  };

  return (
    <div className="card h-30rem">
      {showLoginDialogue && <LoginDialogue />}
      <DataTable
        stripedRows
        showGridlines
        scrollable
        scrollHeight="30rem"
        value={data?.data}
        size="large"
        editMode="row"
        dataKey="id"
      >
        <Column
          header="Avatar"
          style={{ width: "250px" }}
          body={avatarBodyTemplate}
        ></Column>
        <Column
          field="username"
          header="Username"
          style={{ width: "250px" }}
        ></Column>
        <Column field="phone" header="Phone" style={{ width: "50px" }}></Column>
        <Column field="age" header="Age" style={{ width: "250px" }}></Column>
        <Column
          field="email"
          header="Email"
          style={{ width: "250px" }}
        ></Column>
        <Column
          field="introPdf"
          header="Introduction"
          style={{ width: "250px" }}
          body={introPdfBodyTemplate}
        ></Column>
        <Column
          field="gender"
          header="Gender"
          style={{ width: "250px" }}
        ></Column>
        <Column
          field="usage"
          header="Usage"
          style={{ width: "250px" }}
        ></Column>
      </DataTable>
    </div>
  );
};

export default ViewUsersTable;
