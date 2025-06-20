
const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="relative w-full max-w-2xl bg-white rounded-lg shadow-sm">
                <div className="flex justify-between items-center border-b p-4 md:p-5 rounded-t border-gray-200">
                    <h3 className="text-lg font-semibold text-purple-950">
                        {title}
                    </h3>
                    <button
                        type="button"
                        onClick={onClose}
                        className="text-gray-400 bg-transparent hover:text-gray-900 hover:bg-gray-200 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center">
                        <svg
                            className="w-3 h-3"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 14 14"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7L1 13"
                            />
                        </svg>
                    </button>
                </div>
                <div className="p-4">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;
