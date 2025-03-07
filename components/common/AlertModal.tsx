const AlertModal: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <>
            <div className="fixed inset-0 z-[9999] bg-black bg-opacity-20"></div>
            <div className="fixed inset-0 z-[99999] flex items-center justify-center h-full">
                {children}
            </div>
        </>
    )
}

export default AlertModal;