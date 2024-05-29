import React, { useRef } from "react";
import { Toast } from "primereact/toast";
import { FileUpload } from "primereact/fileupload";
import { Tooltip } from "primereact/tooltip";

export default function UploadPdf({ handlePdfUpload }) {
  const toast = useRef(null);
  const fileUploadRef = useRef(null);

  const handleFilesUpload = (files) => {
    handlePdfUpload(files);
  };

  return (
    <div>
      <Toast ref={toast}></Toast>

      <Tooltip target=".custom-choose-btn" content="Choose" position="bottom" />
      <Tooltip target=".custom-upload-btn" content="Upload" position="bottom" />
      <Tooltip target=".custom-cancel-btn" content="Clear" position="bottom" />

      <FileUpload
        auto
        chooseLabel="Browse PDF"
        accept=".pdf"
        ref={fileUploadRef}
        name="demo[]"
        multiple={false}
        uploadHandler={handleFilesUpload}
        maxFileSize={1000000}
        customUpload={true}
      />
    </div>
  );
}
