function LogoutModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className={`fixed inset-0 bg-slate-900/40 backdrop-blur-md flex items-center justify-center z-[2000] transition-all duration-300 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
      <div className={`bg-white w-[90%] max-w-[440px] rounded-[2rem] p-10 text-center shadow-2xl transition-all duration-300 ${isOpen ? 'translate-y-0' : 'translate-y-5'}`}>
        <div className="w-16 h-16 bg-red-50 text-primary rounded-[1.25rem] flex items-center justify-center text-2xl mx-auto mb-6">
          <i className="fa-solid fa-circle-exclamation"></i>
        </div>
        <h2 className="text-[1.5rem] font-extrabold text-slate-900 mb-3">Wait, are you sure?</h2>
        <p className="text-slate-500 leading-relaxed mb-8">You're about to log out from your account. You'll need to log in again to place orders.</p>
        <div className="flex gap-4">
          <button 
            className="flex-1 p-3.5 rounded-2xl border border-glass-border bg-white text-slate-900 font-bold cursor-pointer transition-all duration-200 hover:bg-slate-50 hover:border-slate-300 outline-none" 
            onClick={onClose}
          >
            Cancel
          </button>
          <button 
            className="flex-1 p-3.5 rounded-2xl border-none bg-primary text-white font-bold cursor-pointer transition-all duration-200 shadow-[0_4px_12px_rgba(220,38,38,0.2)] hover:bg-primary-hover hover:-translate-y-0.5 outline-none" 
            onClick={onConfirm}
          >
            Yes, Log Out
          </button>
        </div>
      </div>
    </div>
  );
}

export default LogoutModal;
