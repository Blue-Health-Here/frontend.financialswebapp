const Modal: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <>
            <div className="fixed inset-0 z-[999] bg-black bg-opacity-50"></div>
            <div className="fixed inset-y-0 right-0 z-[1000] w-full sm:w-96 h-full bg-white overflow-y-auto">
                {children}
            </div>
        </>
    )
}

export default Modal;