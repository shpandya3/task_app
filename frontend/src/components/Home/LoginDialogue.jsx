import React, { useContext, useRef } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { LoginDialogueContext } from "../../context/LoginDialogueContext";
import { useAuth } from "../../context/AuthContext";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../../api/user/UserApi";
import { Toast } from 'primereact/toast';

export default function LoginDialogue() {
  // const [visible, setVisible] = useState(false);
  const toast = useRef(null);

  const show = () => {
    console.log("shopw ")
    toast.current.show({ severity: 'info', summary: 'Info', detail: 'Message Content' });
};

  const { showLoginDialogue, toggleLoginDialogue } =
    useContext(LoginDialogueContext);

  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  const loginMutation = useMutation({
    mutationFn: (loginData) => loginUser(loginData),
    onSuccess: (data) => {
      login(data);
      toggleLoginDialogue(false)
    },
    onError: (error) => {
        show()
      console.error("🚀 ~ LoginForm ~ error:", error);
    },
  });

  const onSubmit = (e,hide) => {
    e.preventDefault()
    // console.log()
    const data = getValues()
    console.log(e)
    console.log(loginMutation.mutate(data)) ;
    // show()
    // hide(e)
  };

  return (
    <div className="card flex justify-content-center">
      {/* <Button label="Login" icon="pi pi-user" onClick={() => setVisible(true)} /> */}
      <Toast ref={toast} />
      <Dialog
        visible={showLoginDialogue}
        blockScroll={true}
        closeOnEscape={false}
        modal
        onHide={() => toggleLoginDialogue(false)}
        content={({ hide }) => (
          <div
            className="flex flex-column px-8 py-5 gap-4"
            style={{
              borderRadius: "12px",
              backgroundImage:
                "radial-gradient(circle at left top, var(--primary-400), var(--primary-700))",
            }}
          >
            <div className="inline-flex flex-column gap-2">
              <h1 className="text-primary-50 font-semibold text-center">
                <u>Login</u>
              </h1>
            </div>
            <form >
            <div className={`flex flex-column gap-3 pt-1`}>
              <div className="inline-flex flex-column gap-2">
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
              <div className="inline-flex flex-column gap-2">
                <label htmlFor="password">Password</label>
                <InputText
                  id="password"
                  {...register("password", {
                    required: "Password is required",
                  })}
                  aria-describedby="password-help"
                />
                {/* <small id="username-help">
                    Enter your username to reset your password.
                </small> */}
                {errors.password && (
                  <small className="p-error">{errors.password.message}</small>
                )}
              </div>
              <div className="flex align-items-center gap-2">
                <Button
                  label="Login"
                  onClick={(e) => {
                    handleSubmit(onSubmit(e,hide));
                    // hide(e);
                  }}
                  className="w-full"
                />
              </div>
              </div>
            </form>
          </div>
        )}
      ></Dialog>
    </div>
  );
}
