import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { ToggleButton } from "primereact/togglebutton";
import { useForm } from "react-hook-form";

import "./SignUpForm.css";

import { useMutation } from "@tanstack/react-query";
import { signUpUser } from "../../api/user/UserApi";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function SignUpForm({ checked, setChecked }) {
  const { login } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const signupMutation = useMutation({
    mutationFn: (signupData) => signUpUser(signupData),
    onSuccess: (data) => {
      login(data);
      // if (data?.role === "ADMIN") {
      //   navigate("/admin");
      // } else {
      navigate("/users/dashboard");
      // }
    },
    onError: (error) => {
      console.error("🚀 ~ LoginForm ~ error:", error);
    },
  });

  const onSubmit = (data) => {
    signupMutation.mutate(data);
  };

  return (
    <Card
      title={<div className="text-center">Sign Up</div>}
      subTitle={
        <div className="text-center pt-2">
          <div className="flex align-center justify-content-center pt-2">
            <span className="mr-3 mt-2">Already Have an Account?</span>
            <ToggleButton
              checked={checked}
              onLabel="Sign Up"
              offLabel="Login"
              onChange={(e) => setChecked(e.value)}
              className="w-8rem"
            />
          </div>
        </div>
      }
      className={`h-30rem p-3 scroll-right`}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div
          className={`flex flex-column gap-3 pt-1 ${
            checked ? "scroll-left" : "scroll-right"
          }`}
        >

          <div className="flex flex-column">
            <label htmlFor="username">Username</label>
            <InputText
              className="p-inputtext-sm"
              id="username"
              {...register("username", { required: "Username is required" })}
              aria-describedby="username-help"
            />
            {errors.username && (
              <small className="p-error">{errors.username.message}</small>
            )}
          </div>


          <div className="flex flex-column">
            <label htmlFor="email">Email</label>
            <InputText
              className="p-inputtext-sm"
              id="email"
              {...register("email", {
                required: "Email is required",
              })}
              aria-describedby="email-help"
            />
            {errors.email && (
              <small className="p-error">{errors.email.message}</small>
            )}
          </div>

          <div className="flex flex-column">
            <label htmlFor="password">Password</label>
            <InputText
              className="p-inputtext-sm"
              id="password"
              {...register("password", { required: "Password is required" })}
              aria-describedby="password-help"
            />
            {errors.password && (
              <small className="p-error">{errors.password.message}</small>
            )}
          </div>

          <div className="flex flex-column gap-2">
            <Button type="submit" label="Sign Up" className="w-full" />
          </div>
        </div>
      </form>
    </Card>
  );
}

export default SignUpForm;
