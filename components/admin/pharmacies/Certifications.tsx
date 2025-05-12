import FileUploadField from "@/components/common/form/FileUploadField";
import TextMessage from "@/components/common/TextMessage";
import { Label } from "@/components/ui/label";
import { RootState } from "@/store/store";
import { License } from "@/utils/types";
import { Form, Formik } from "formik";
import { useSelector } from "react-redux";
import { fileDownload } from "./Licensing";

const Certifications: React.FC<any> = ({
    handleDeleteFile, handleFileUpload, setUploadedFile
}) => {
    const { certificationsData } = useSelector((state: RootState) => state.global);
        return (
        <Formik
            initialValues={{ documents: [] }}
            onSubmit={(values) => console.log(values)}
        >
            {() => (
                <Form className="w-full ">
                    <Label className=" font-semibold text-lg ">
                        Certifications
                    </Label>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
                        {certificationsData?.length > 0 ? certificationsData?.map((license: License) => (
                            <div
                                key={license.id}
                                className="flex items-center justify-between p-2 rounded-md border border-grey-500"
                            >
                                <span className="text-sm truncate">
                                    {license.filename}
                                </span>

                                <div className="flex items-center gap-x-2 ml-2 flex-shrink-0">
                                    <button className="p-1 text-blue-500 hover:text-blue-700"
                                        type="button"
                                        onClick={() => fileDownload(license)}>
                                        <img
                                            src="/downloadFile.svg"
                                            alt="Download"
                                            className="w-3 h-3 sm:w-4 sm:h-4"
                                        />
                                    </button>
                                    <button className="p-1 text-red-500 hover:text-red-700">
                                        <img
                                            src="/delete-icon.svg"
                                            onClick={() =>
                                                handleDeleteFile(license.id, "certification")
                                            }
                                            alt="Delete"
                                            className="w-3 h-3 sm:w-4 sm:h-4"
                                        />
                                    </button>
                                </div>
                            </div>
                        )) : <TextMessage text="Certifications not found." />}
                    </div>

                    <FileUploadField
                        title="Upload Certification"
                        name="certificate"
                        handleFileUpload={(e, setValue) =>
                            handleFileUpload(e, setValue, "certification")
                        }
                        className="sm:w-60 border-primary mt-4"
                    />
                </Form>
            )}
        </Formik>
    )
}

export default Certifications;