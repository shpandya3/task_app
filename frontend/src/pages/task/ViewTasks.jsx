import React from "react";
import ViewTaskTable from "../../components/Task/ViewTaskTable";
import CreateNewTask from "../../components/Task/CreateNewTask";

const ViewTasks = () => {
  return (
    <div className="grid p-6 grid-nogutter">
      <div className="col-offset-6"></div>
      <div className="col-6 flex justify-content-end">

      <CreateNewTask />
      </div>
      <div className="col-12 pt-2">
        <ViewTaskTable />
      </div>
    </div>
  );
};

export default ViewTasks;
