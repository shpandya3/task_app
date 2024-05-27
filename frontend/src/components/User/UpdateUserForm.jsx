import React from "react";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { RadioButton } from "primereact/radiobutton";
import { Checkbox } from "primereact/checkbox";
import UploadFile from "../common/UploadFile";

const UpdateUserForm = () => {
  return (
    <div class="formgrid grid">
      <div class="field col-12 md:col-4">
        <label htmlFor="username">Username</label>
        <InputText
          id="username"
          aria-describedby="username-help"
          className="w-full p-inputtext-sm"
        />
      </div>
      <div class="field col-12 md:col-4">
        <label htmlFor="email">Email</label>
        <InputText
          id="email"
          aria-describedby="email-help"
          className="w-full p-inputtext-sm"
        />
      </div>
      <div class="field col-12 md:col-4">
        <label htmlFor="phone">Phone</label>
        <InputText
          id="phone"
          aria-describedby="phone-help"
          className="w-full p-inputtext-sm"
        />
      </div>
      <div class="field col-6 md:col-4">
        <label htmlFor="phone">Age</label>
        <InputNumber
          className="w-full p-inputtext-sm"
          mode="decimal"
          showButtons
          min={0}
          max={100}
        />
      </div>
      <div class="field col-6 md:col-4">
        <label htmlFor="phone">Usage</label>
        <div class="formgroup-inline pt-1">
          <div class="field-checkbox">
            <Checkbox inputId="office" name="usage" value="office" />
            <label htmlFor="office" className="ml-2 pt-1">
              Office
            </label>
          </div>
          <div class="field-checkbox">
            <Checkbox inputId="personal" name="usage" value="personal" />
            <label htmlFor="personal" className="ml-2 pt-1">
              Personal
            </label>
          </div>
          <div class="field-checkbox">
            <Checkbox inputId="others" name="usage" value="others" />
            <label htmlFor="others" className="ml-2 pt-1">
              Others
            </label>
          </div>
        </div>
      </div>
      <div class="field col-6 md:col-4">
        <label htmlFor="phone">Gender</label>
        <div class="formgroup-inline pt-1">
          <div class="field-radiobutton">
            <RadioButton
              inputId="male"
              name="gender"
              value="male"
              // onChange={(e) => setIngredient(e.value)}
              // checked={ingredient === "Cheese"}
            />
            <label htmlFor="male" className="ml-2 pt-1">
              Male
            </label>
          </div>
          <div class="field-radiobutton">
            <RadioButton
              inputId="female"
              name="gender"
              value="female"
              // onChange={(e) => setIngredient(e.value)}
              // checked={ingredient === "Cheese"}
            />
            <label htmlFor="female" className="ml-2 pt-1">
              Female
            </label>
          </div>
        </div>
      </div>
      <div class="field col-6 md:col-4">
        <label htmlFor="phone">Avatar Image</label>
        <UploadFile />
      </div>
      <div class="field col-6 md:col-4">
        <label htmlFor="phone">Introduction Pdf</label>
        <UploadFile />
      </div>
      
    </div>
  );
};

export default UpdateUserForm;
