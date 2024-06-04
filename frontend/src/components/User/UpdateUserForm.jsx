import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { RadioButton } from "primereact/radiobutton";
import { Checkbox } from "primereact/checkbox";
import UploadImage from "../common/UploadImage";
import UploadPdf from "../common/UploadPdf";
import { useForm, Controller } from "react-hook-form";
import { Button } from "primereact/button";
import { updateUser } from "../../api/user/UserApi";
import { useMutation } from "@tanstack/react-query";

const UpdateUserForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    getValues,
  } = useForm();

  const updateUserMutation = useMutation({
    mutationFn: (data) => updateUser(data),
  });

  const handlePdfUpload = async (data) => {
    const reader = new FileReader();
    let blob = await fetch(data?.files[0]?.objectURL).then((r) => r.blob());
    reader.readAsDataURL(blob);
    reader.onloadend = function () {
      const base64data = reader.result;
      setValue("introPdf",btoa(base64data));
    };
  };

  const handleImageUpload = async (data) => {
    const reader = new FileReader();
    let blob = await fetch(data?.files[0]?.objectURL).then((r) => r.blob());
    reader.readAsDataURL(blob);
    reader.onloadend = function () {
      const base64data = reader.result;
      setValue("avatar", btoa(base64data));
    };
  };

  const onSubmit = (data) => {
    updateUserMutation.mutate(data);
  };

  return (
    <form
      className="formGrid grid"
      onSubmit={handleSubmit(onSubmit)}
      encType="multipart/form-data"
    >
      <div className="field col-12 md:col-4">
        <label htmlFor="username">Username</label>
        <InputText
          id="username"
          aria-describedby="username-help"
          className="w-full p-inputText-sm"
          {...register("username", { required: "Username is required" })}
        />
        {errors.username && (
          <small className="p-error">{errors.username.message}</small>
        )}
      </div>
      <div className="field col-12 md:col-4">
        <label htmlFor="email">Email</label>
        <InputText
          id="email"
          aria-describedby="email-help"
          className="w-full p-inputText-sm"
          {...register("email", { required: "Email is required" })}
        />
        {errors.email && (
          <small className="p-error">{errors.email.message}</small>
        )}
      </div>
      <div className="field col-12 md:col-4">
        <label htmlFor="phone">Phone</label>
        <InputText
          id="phone"
          aria-describedby="phone-help"
          className="w-full p-inputText-sm"
          {...register("phone", { required: "Phone number is required" })}
        />
        {errors.phone && (
          <small className="p-error">{errors.phone.message}</small>
        )}
      </div>
      <div className="field col-6 md:col-4">
        <label htmlFor="age">Age</label>
        <Controller
          name="age"
          control={control}
          rules={{
            required: "Age is required",
            validate: (value) =>
              value >= 0 || "Age must be a non-negative number",
          }}
          render={({ field }) => (
            <InputNumber
              id="age"
              value={field?.value}
              onChange={(e) => {
                field.onChange(e.value);
              }}
              className="w-full p-inputText-sm"
              mode="decimal"
              showButtons
              min={0}
              max={100}
            />
          )}
        />
        {errors.age && <small className="p-error">{errors.age.message}</small>}
      </div>
      <div className="field col-6 md:col-4">
        <label htmlFor="usage">Usage</label>
        <div className="formGroup-inline pt-1">
          <Controller
            name="usage"
            control={control}
            rules={{ required: "Usage is required" }}
            render={({ field, fieldState }) => (
              <>
                <div className="field-checkbox">
                  <Checkbox
                    inputId="office"
                    {...field}
                    name={field.name}
                    value="PROFESSIONAL"
                    checked={field.value?.includes("PROFESSIONAL")}
                    onChange={(e) => {
                      const value = e.checked
                        ? [...(field.value || []), e.value]
                        : field.value.filter((val) => val !== e.value);
                      field.onChange(value);
                    }}
                  />
                  <label htmlFor="office" className="ml-2 pt-1">
                    Office
                  </label>
                </div>

                <div className="field-checkbox">
                  <Checkbox
                    inputId="personal"
                    {...field}
                    name={field.name}
                    value="PERSONAL"
                    checked={field.value?.includes("PERSONAL")}
                    onChange={(e) => {
                      const value = e.checked
                        ? [...(field.value || []), e.value]
                        : field.value.filter((val) => val !== e.value);
                      field.onChange(value);
                    }}
                  />
                  <label htmlFor="personal" className="ml-2 pt-1">
                    Personal
                  </label>
                </div>

                <div className="field-checkbox">
                  <Checkbox
                    inputId="others"
                    {...field}
                    name={field.name}
                    value="TEAM"
                    checked={field.value?.includes("TEAM")}
                    onChange={(e) => {
                      const value = e.checked
                        ? [...(field.value || []), e.value]
                        : field.value.filter((val) => val !== e.value);
                      field.onChange(value);
                    }}
                  />
                  <label htmlFor="others" className="ml-2 pt-1">
                    Others
                  </label>
                </div>

                {errors.usage && (
                  <small className="p-error">{errors.usage.message}</small>
                )}
              </>
            )}
          />
        </div>
      </div>
      <div className="field col-6 md:col-4">
        <label htmlFor="gender">Gender</label>
        <div className="formGroup-inline pt-1">
          <Controller
            name="gender"
            control={control}
            rules={{ required: "Gender is required" }}
            render={({ field, fieldState }) => (
              <>
                <div className="field-radiobutton">
                  <RadioButton
                    inputId="male"
                    {...field}
                    name={field.name}
                    inputRef={field.ref}
                    value="MALE"
                    checked={field.value === "MALE"}
                  />
                  <label htmlFor="male" className="ml-2 pt-1">
                    Male
                  </label>
                </div>
                <div className="field-radiobutton">
                  <RadioButton
                    inputId="female"
                    {...field}
                    name={field.name}
                    value="FEMALE"
                    checked={field.value === "FEMALE"}
                  />
                  <label htmlFor="female" className="ml-2 pt-1">
                    Female
                  </label>
                </div>
                {errors.gender && (
                  <small className="p-error">{errors.gender.message}</small>
                )}
              </>
            )}
          />
        </div>
      </div>
      <div className="field col-6 md:col-6">
        <label htmlFor="image">Avatar Image</label>
        <UploadImage handleImageUpload={handleImageUpload} />
      </div>
      <div className="field col-6 md:col-6">
        <label htmlFor="pdf">Introduction Pdf</label>
        <UploadPdf handlePdfUpload={handlePdfUpload} />
      </div>
      <div className="col-offset-8"></div>
      <div className="col-2">
        <Button type="submit" label="Submit" className="w-full" />
      </div>
      <div className="col-2">
        <Button type="button" label="Reset" className="w-full" />
      </div>
    </form>
  );
};

export default UpdateUserForm;
