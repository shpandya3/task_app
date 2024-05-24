import React, { useContext } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { editTaskById, getTasks } from "../../api/task/TaskApi";
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { Tag } from "primereact/tag";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { isJwtExpired } from "../../utils/checkJwtExpired";
import LoginDialogue from "../Home/LoginDialogue";
import { LoginDialogueContext } from "../../context/LoginDialogueContext";

const ViewTaskTable = () => {
  const { showLoginDialogue, toggleLoginDialogue} = useContext(LoginDialogueContext)
  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ["tasks"],
    queryFn: getTasks,
  });

  const updateTaskMutation = useMutation({
    mutationFn: (taskData) => editTaskById(taskData),
    onSuccess: (data) => {
        queryClient.setQueryData(['tasks', data.id], data)
      queryClient.invalidateQueries(["tasks"], { exact: true });
    },
  });


  const textEditor = (options) => {
    return (
      <InputText
        type="text"
        value={options.value}
        onChange={(e) => options.editorCallback(e.target.value)}
      />
    );
  };

  const statusBodyTemplate = (rowData) => {
    console.log("🚀 ~ statusBodyTemplate ~ rowData.isCompleted:", rowData.isCompleted)

    return rowData.isCompleted === true ? (
      <Tag
        className="mr-2"
        icon="pi pi-check"
        severity="success"
        value="Completed"
      ></Tag>
    ) : (
      <Tag
        className="mr-2"
        icon="pi pi-info-circle"
        severity="info"
        value="InComplete"
      ></Tag>
    );
  };

  const onRowEditComplete = (e) => {
    if(isJwtExpired()) {
      toggleLoginDialogue(true) 
    }
    updateTaskMutation.mutate({
      title: e.newData.title,
      description: e.newData.description,
      isCompleted: e.newData.isCompleted,
      id: e.data.id,
    });
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

  const statusEditor = (options) => {
    return (
      <Dropdown
        value={options.value}
        options={[true, false]}
        onChange={(e) => options.editorCallback(e.value)}
        placeholder="Select a Status"
        itemTemplate={(option) => {
          return (
            <Tag
              className="mr-2"
              icon={option === true ? "pi pi-check" : "pi pi-info-circle"}
              severity={option === true ? "success" : "info"}
              value={option === true ? "Completed" : "InComplete"}
            ></Tag>
          );
        }}
      />
    );
  };

  const sortMeta = [
    { field: 'isCompleted', sort: -1 }, // Sort by name ascending
    { field: 'title', sort: 1 }, // Sort by category descending
  ];
  

  return (
    <div className="card h-30rem">
      {showLoginDialogue && <LoginDialogue/>}
      <DataTable
        stripedRows
        showGridlines
        scrollable
        scrollHeight="30rem"
        value={data?.data}
        size="large"
        editMode="row"
        dataKey="id"
        onRowEditComplete={onRowEditComplete}
        // sortField="title"
        // sortOrder={1}
        sortMode="multiple"
        multiSortMeta={sortMeta}
      >
        <Column
          field="title"
          header="Title"
          style={{ width: "250px" }}
          editor={(options) => textEditor(options)}
        ></Column>
        <Column
          field="description"
          header="Description"
          style={{ width: "250px" }}
          editor={(options) => textEditor(options)}
        ></Column>
        <Column
          field="isCompleted"
          header="Status"
          body={statusBodyTemplate}
          style={{ width: "50px" }}
          editor={(options) => statusEditor(options)}
        ></Column>
        <Column
          rowEditor
          headerStyle={{ width: "10%", minWidth: "8rem" }}
          bodyStyle={{ textAlign: "center" }}
        ></Column>
      </DataTable>
    </div>
  );
};

export default ViewTaskTable;
