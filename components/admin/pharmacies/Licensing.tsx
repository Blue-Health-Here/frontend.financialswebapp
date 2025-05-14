import FileUploadField from "@/components/common/form/FileUploadField";
import TextMessage from "@/components/common/TextMessage";
import { Label } from "@/components/ui/label";
import { axiosAdmin } from "@/lib/axiosAdmin";
import { RootState } from "@/store/store";
import { License } from "@/utils/types";
import { Form, Formik } from "formik";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

export const fileDownload = async (file: any) => {
    try {
        const response = await axiosAdmin.get(file.file_url, { responseType: "blob", });
        const contentType = response.headers["content-type"] || "application/octet-stream";

        const blob = new Blob([response.data], { type: contentType });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");

        link.href = url;
        link.download = file.filename;
        link.click();

        window.URL.revokeObjectURL(url);
        toast.success("File download Successfully.");
    } catch (error: any) {
        toast.error(error?.message || "Failed to download file.");
    }
};

const Licensing: React.FC<any> = ({
    handleDeleteFile, handleFileUpload, setUploadedFile
}) => {
    const { licenseData } = useSelector((state: RootState) => state.global);


    return (
        <Formik
            initialValues={{ documents: [] }}
            onSubmit={(values) => console.log(values)}
        >
            {() => (
                <Form>
                    <div className="w-full">
                        <Label className="font-semibold text-lg">Licensing</Label>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
                            {licenseData?.length > 0 ? licenseData?.map((license: License) => (
                                <div
                                    key={license.id}
                                    className="flex items-center justify-between p-2 rounded-md border border-grey-500"
                                >
                                    <span className="text-xs md:text-sm truncate">
                                        {license.filename}
                                    </span>

                                    <div className="flex items-center gap-x-2 ml-2 flex-shrink-0">
                                        <button className="sm:p-1 text-blue-500 hover:text-blue-700"
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
                                                    handleDeleteFile(license.id, "license")
                                                }
                                                alt="Delete"
                                                className="w-3 h-3 sm:w-4 sm:h-4"
                                            />
                                        </button>
                                    </div>
                                </div>
                            )) : <TextMessage text="License not found." />}
                        </div>

                        <FileUploadField
                            title="Upload License"
                            name="license"
                            setUploadedFile={setUploadedFile}
                            handleFileUpload={(e, setValue) =>
                                handleFileUpload(e, setValue, "license")
                            }
                            className="sm:w-60 border-primary mt-4 mb-4"
                        />
                    </div>
                </Form>
            )}
        </Formik>
    )
}

export default Licensing;