import Banner from "../components/molecules/Banner";
import { Button, Checkbox, Label, Modal, TextInput } from "flowbite-react";
import { useRef, useState } from "react";
function LandingPage() {
    const [openModal, setOpenModal] = useState(false);
    const emailInputRef = useRef<HTMLInputElement>(null);

    const [openModelRegister, setOpenModelRegister] = useState(false);

    return (
        <>
            {/* login model */}
            <Modal show={openModal} size="md" popup onClose={() => setOpenModal(false)} initialFocus={emailInputRef}>
                <Modal.Header />
                <Modal.Body>
                    <div className="space-y-6">
                        <h3 className="text-xl font-medium text-gray-900 dark:text-white">Sign in to our platform</h3>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="email" value="Your email" />
                            </div>
                            <TextInput id="email" ref={emailInputRef} placeholder="name@company.com" required />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="password" value="Your password" />
                            </div>
                            <TextInput id="password" type="password" required />
                        </div>
                        <div className="flex justify-between">
                            <div className="flex items-center gap-2">
                                <Checkbox id="remember" />
                                <Label htmlFor="remember">Remember me</Label>
                            </div>
                            <a href="#" className="text-sm text-cyan-700 hover:underline dark:text-cyan-500">
                                Lost Password?
                            </a>
                        </div>
                        <div className="w-full">
                            <Button>Log in to your account</Button>
                        </div>
                        <div className="flex justify-between text-sm font-medium text-gray-500 dark:text-gray-300">
                            Not registered?&nbsp;
                            <a href="#" className="text-cyan-700 hover:underline dark:text-cyan-500" onClick={() => { setOpenModal(false); setOpenModelRegister(true) }}>
                                Create account
                            </a>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>

            {/* Register model */}

            <Modal show={openModelRegister} size="md" popup onClose={() => setOpenModelRegister(false)} initialFocus={emailInputRef}>
                <Modal.Header />
                <Modal.Body>
                    <div className="space-y-6">
                        <h3 className="text-xl font-medium text-gray-900 dark:text-white">Sign up to our platform</h3>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="email" value="Your email" />
                            </div>
                            <TextInput id="email" ref={emailInputRef} placeholder="name@company.com" required />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="password" value="Your password" />
                            </div>
                            <TextInput id="password" type="password" required />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="password" value="Confirm Your password" />
                            </div>
                            <TextInput id="ConfirmPassword" type="ConfirmPassword" required />
                        </div>
                        <div className="w-full">
                            <Button>Create your account</Button>
                        </div>
                        <div className="flex justify-between text-sm font-medium text-gray-500 dark:text-gray-300">
                            Already have an account?&nbsp;
                            <a href="#" className="text-cyan-700 hover:underline dark:text-cyan-500" onClick={() => { setOpenModal(true); setOpenModelRegister(false) }} >
                                Log In
                            </a>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>

            {/* start of the landing page */}


            <Banner openModel={openModal} setOpenModal={setOpenModal} openModelRegister={openModelRegister} setOpenModelRegister={setOpenModelRegister} />

        </>
    );
}

export default LandingPage;
