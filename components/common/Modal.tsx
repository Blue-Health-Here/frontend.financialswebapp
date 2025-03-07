const Modal: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <>
            <div className="fixed inset-0 z-[999] bg-black bg-opacity-50"></div>
            <div className="fixed inset-0 z-[1000] top-0 right-0 bottom-0 left-auto h-full">
                {children}
            </div>
        </>
    )
}

export default Modal;