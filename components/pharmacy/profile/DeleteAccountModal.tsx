import AlertModal from "@/components/common/AlertModal";
import InputField from "@/components/common/form/InputField";
import { SubmitButton } from "@/components/submit-button";
import { Button } from "@/components/ui/button";
import { Form, Formik } from "formik";
import { useState } from "react";

type DeleteAccountModalProps = {
    handleClose: () => void;
    handleSuccess: (password: string) => void;
    title: string
    description: string
};

const DeleteAccountModal: React.FC<DeleteAccountModalProps> = ({ title, description, handleClose, handleSuccess }) => {
    const [password, setPassword] = useState("");

    return (
        <AlertModal>
            <div className="bg-white rounded-3xl p-6 xl:p-8 w-[500px] flex flex-col gap-6">
                <div className="text-center">
                    <h1 className="text-3xl font-semibold pb-4">Delete {title}</h1>
                    <p className="text-[#1C1C1CCC] ">{description}</p></div>
                <Formik initialValues={{ password: "" }} onSubmit={() => { }}>
                    <Form>
                        <InputField name="password" type="password" label="Type Your  Password" />
                    </Form>
                </Formik>
                <div className="flex justify-center space-x-4 mt-4 w-full">
                    <SubmitButton onClick={handleClose} className="bg-btnLight hover:bg-primaryRed flex-1 hover:text-white text-grey min-w-32 max-w-full rounded-full">Cancel</SubmitButton>
                    <SubmitButton className="bg-primaryRed hover:bg-btnLight flex-1 hover:text-grey text-white min-w-32 max-w-full rounded-full">Delete</SubmitButton>
                </div>
            </div>
        </AlertModal>
    );
};

export default DeleteAccountModal;
