import Banner from "../components/molecules/Banner";
import { Button, Checkbox, Label, Modal, TextInput } from "flowbite-react";
import { useRef, useState } from "react";
//import useAuthState from "../hooks/useAuth";
import useProviderAuth from "../hooks/useProviderAuth";
// import { useToast } from "../components/ui/use-toast";
import SectionFeatures from "../components/molecules/SectionFeatures";

import { useToast } from "../components/ui/use-toast";
function LandingPage() {
  const [openModal, setOpenModal] = useState(false);
  const emailInputRef = useRef<HTMLInputElement>(null);

  const UserNameRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const confirmPasswordInputRef = useRef<HTMLInputElement>(null);
  const [openModelRegister, setOpenModelRegister] = useState(false);

  const { toast } = useToast();
  const { Login, register } = useProviderAuth();

  const handelRegister = () => {
    const email = emailInputRef.current?.value || "";
    const userName = UserNameRef.current?.value || "";
    const password = passwordInputRef.current?.value || "";
    const confirmPassword = confirmPasswordInputRef.current?.value || "";
    console.log(password);
    console.log(confirmPassword);

    if (password != confirmPassword) {
      toast({
        title: "please verify your password",
      });
    } else {
      const RegisterData = {
        userName,
        email,
        password,
      };
      register(RegisterData);
      setOpenModal(true);
      setOpenModelRegister(false);
    }
    // const LoginData = { email, password };
  };

  const handleLogin = () => {
    const email = emailInputRef.current?.value || "";
    const password = passwordInputRef.current?.value || "";
    const LoginData = { email, password };

    Login(LoginData);
  };

  return (
    <>
      {/* login model */}
      <Modal
        show={openModal}
        size="md"
        popup
        onClose={() => setOpenModal(false)}
        initialFocus={emailInputRef}
      >
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Sign in to our platform
            </h3>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email" value="Your email" />
              </div>
              <TextInput
                id="email"
                ref={emailInputRef}
                placeholder="name@company.com"
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password" value="Your password" />
              </div>
              <TextInput id="password" type="password" ref={passwordInputRef} />
            </div>
            <div className="flex justify-between">
              <div className="flex items-center gap-2">
                <Checkbox id="remember" />
                <Label htmlFor="remember">Remember me</Label>
              </div>
              <a
                href="#"
                className="text-sm text-cyan-700 hover:underline dark:text-cyan-500"
              >
                Lost Password?
              </a>
            </div>
            <div className="w-full">
              <Button onClick={handleLogin}>Log in to your account</Button>
            </div>
            <div className="flex justify-between text-sm font-medium text-gray-500 dark:text-gray-300">
              Not registered?&nbsp;
              <a
                href="#"
                className="text-cyan-700 hover:underline dark:text-cyan-500"
                onClick={() => {
                  setOpenModal(false);
                  setOpenModelRegister(true);
                }}
              >
                Create account
              </a>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      {/* Register model */}

      <Modal
        show={openModelRegister}
        size="md"
        popup
        onClose={() => setOpenModelRegister(false)}
        initialFocus={emailInputRef}
      >
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Sign up to our platform
            </h3>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="UserName" value="Your UserName" />
              </div>
              <TextInput
                autoComplete="off"
                id="UserName"
                ref={UserNameRef}
                placeholder="name"
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email" value="Your email" />
              </div>
              <TextInput
                autoComplete="off"
                id="email"
                ref={emailInputRef}
                placeholder="name@company.com"
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password" value="Your password" />
              </div>
              <TextInput
                id="password"
                type="password"
                required
                ref={passwordInputRef}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password" value="Confirm Your password" />
              </div>
              <TextInput
                ref={confirmPasswordInputRef}
                id="ConfirmPassword"
                type="password"
                required
              />
            </div>
            <div className="w-full">
              <Button onClick={handelRegister}>Create your account</Button>
            </div>
            <div className="flex justify-between text-sm font-medium text-gray-500 dark:text-gray-300">
              Already have an account?&nbsp;
              <a
                href="#"
                className="text-cyan-700 hover:underline dark:text-cyan-500"
                onClick={() => {
                  setOpenModal(true);
                  setOpenModelRegister(false);
                }}
              >
                Log In
              </a>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      {/* start of the landing page */}
      <Banner
        openModel={openModal}
        setOpenModal={setOpenModal}
        openModelRegister={openModelRegister}
        setOpenModelRegister={setOpenModelRegister}
      />
      <SectionFeatures />
    </>
  );
}

export default LandingPage;
