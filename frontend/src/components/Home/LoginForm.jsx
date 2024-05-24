import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { ToggleButton } from "primereact/togglebutton";
import { useForm } from "react-hook-form";

import "./LoginForm.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../../api/user/UserApi";


function LoginForm({ checked, setChecked }) {
  const { login } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const loginMutation = useMutation({
    mutationFn: (loginData) => loginUser(loginData),
    onSuccess: (data) => {
      login(data);
      if (data?.role === "ADMIN") {
        navigate("/admin");
      } else {
        navigate("/users");
      }
    },
    onError: (error) => {
      console.error("🚀 ~ LoginForm ~ error:", error);
    },
  });

  
  const onSubmit = (data) => {
    loginMutation.mutate(data);
  };
  

  return (
    <Card
      title={<div className="text-center">Login</div>}
      subTitle={
        <div className="text-center pt-2">
          <div className="flex align-center justify-content-center pt-2">
            <span className="mr-3 mt-2">Don't Have an Account?</span>
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
      className={`h-30rem p-4 scroll-right custom-card`}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={`flex flex-column gap-3 pt-1`}>
          <div className="flex flex-column gap-2">
          <label htmlFor="email">Email</label>
            <InputText
              className="p-inputtext-sm"
              id="email"
              {...register("email", {
                required: "Email is required",
              })}
              aria-describedby="email-help"
            />
            {/* <small id="username-help">
                        Enter your username to reset your password.
                    </small> */}
            {errors.email && (
              <small className="p-error">{errors.email.message}</small>
            )}
          </div>

          <div className="flex flex-column gap-2">
            <label htmlFor="password">Password</label>
            <InputText
              id="password"
              {...register("password", { required: "Password is required" })}
              aria-describedby="password-help"
            />
            {/* <small id="username-help">
                    Enter your username to reset your password.
                </small> */}
            {errors.password && (
              <small className="p-error">{errors.password.message}</small>
            )}
          </div>

          <div className="flex flex-column gap-2">
            <Button label="Login" className="w-full" />
          </div>
        </div>
      </form>
    </Card>
  );
}

export default LoginForm;
