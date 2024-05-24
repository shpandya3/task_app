import React, { useState } from "react";
import { Button } from "primereact/button";
import CreateTaskForm from "./CreateTaskForm";

const CreateNewTask = () => {
  const [showCreateTask, setShowCreateTask] = useState(false);
  return (
    <>
      <Button
        label="Create A New Task"
        icon="pi pi-pencil"
        onClick={() => setShowCreateTask((prev) => !prev)}
      />
      {showCreateTask && <CreateTaskForm visible={showCreateTask} setVisible={setShowCreateTask}/>}
    </>
  );
};

export default CreateNewTask;
