import React, { useContext, useState } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { ChevronDownIcon } from "primereact/icons/chevrondown";
import { ChevronRightIcon } from "primereact/icons/chevronright";
import { Dropdown } from "primereact/dropdown";
import { Tag } from "primereact/tag";

import "./CreateNewTaskForm.css"
import LoginDialogue from "../Home/LoginDialogue";
import { LoginDialogueContext } from "../../context/LoginDialogueContext";
import { isJwtExpired } from "../../utils/checkJwtExpired";

const CreateTaskForm = ({ visible, setVisible }) => {
  //   const [visible, setVisible] = useState(false);


  const [selectedStatus, setSelectedStatus] = useState(null);

  const selectedStatusTemplate = (option, props) => {
    console.log("🚀 ~ selectedStatusTemplate ~ option:", option);
    
    if (option === true) {
      return (
        <Tag
          className="mr-2"
          icon="pi pi-check"
          severity="success"
          value="Completed"
        ></Tag>
      );
    } else if (option === false) {
      return (
        <Tag
          className="mr-2"
          icon="pi pi-info-circle"
          severity="info"
          value="InComplete"
        ></Tag>
      );
    }
    // if (option) {
    //   return (
    //     <Tag
    //       className="mr-2"
    //       icon={option === true ? "pi pi-check" : "pi pi-info-circle"}
    //       severity={option === true ? "success" : "info"}
    //       value={option === true ? "Completed" : "InComplete"}
    //     ></Tag>
    //   );
    // }

    return <span>{props.placeholder}</span>;
  };

  const taskStatus = [true, false];

  const itemTemplate = (option) => {
    return (
      <Tag
        className="mr-2"
        icon={option === true ? "pi pi-check" : "pi pi-info-circle"}
        severity={option === true ? "success" : "info"}
        value={option === true ? "Completed" : "InComplete"}
      ></Tag>
    );
  };

  const { showLoginDialogue, toggleLoginDialogue} = useContext(LoginDialogueContext)

  return (
    <div className="card flex justify-content-center">
      {/* <Button
        label="Login"
        icon="pi pi-user"
        onClick={() => setVisible(true)}
      /> */}
     
      <Dialog
        visible={visible}
        modal
        maximizable
        onHide={() => setVisible(false)}
        content={({ hide }) => (
          <div
            className="flex flex-column px-8 py-5 gap-4"
            style={{
              borderRadius: "12px",
              backgroundImage:
                "radial-gradient(circle at left top, var(--primary-400), var(--primary-700))",
              width: "50vw",
            }}
          >
            <div className="inline-flex flex-column gap-2">
              <h1 className="text-primary-50 font-semibold text-center">
                <u>Create New</u>
              </h1>
            </div>
            <div className="inline-flex gap-2">
              <div className="inline-flex flex-column gap-2">
                <label
                  htmlFor="title"
                  className="text-primary-50 font-semibold"
                >
                  Title
                </label>
                <InputText
                  id="title"
                  label="title"
                  className="bg-white-alpha-20 border-none p-3 text-primary-50"
                ></InputText>
              </div>

              <div className="inline-flex flex-column gap-2 flex-auto">
                <label
                  htmlFor="status"
                  className="text-primary-50 font-semibold"
                >
                  Status
                </label>
                <Dropdown
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.value)}
                  options={taskStatus}
                  optionLabel="title"
                  placeholder="Select a Status"
                  valueTemplate={selectedStatusTemplate}
                  itemTemplate={itemTemplate}
                  className={`bg-white-alpha-20 border-none text-primary-50 ${
                    selectedStatus === null ? "p-1" : ""
                  }`}
                  //   className="w-full md:w-14rem"
                  //   panelFooterTemplate={panelFooterTemplate}
                  dropdownIcon={(opts) => {
                    return opts.iconProps["data-pr-overlay-visible"] ? (
                      <ChevronRightIcon {...opts.iconProps} />
                    ) : (
                      <ChevronDownIcon {...opts.iconProps} />
                    );
                  }}
                />
                {/* <InputText
                  id="title"
                  label="title"
                  className="bg-white-alpha-20 border-none p-3 text-primary-50"
                ></InputText> */}
              </div>
            </div>

            <div className="inline-flex flex-column gap-2">
              <label
                htmlFor="description"
                className="text-primary-50 font-semibold"
              >
                Description
              </label>
              <InputText
                id="description"
                label="description"
                className="bg-white-alpha-20 border-none p-3 text-primary-50"
              ></InputText>
            </div>
            <div className="flex align-items-center gap-2">
              <Button
                label="Create"
                onClick={(e) => {
                  if(isJwtExpired()) {
                    toggleLoginDialogue(true)
                  }
                  hide(e)
                }}
                text
                className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"
              ></Button>
              <Button
                label="Cancel"
                onClick={(e) => hide(e)}
                text
                className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"
              ></Button>
            </div>
          </div>
        )}
      ></Dialog>
      {showLoginDialogue && <LoginDialogue />} 
    </div>
  );
};

export default CreateTaskForm;
