// const Modal = ({ isOpen, onClose, children }) => {
//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center">
      
//       {/* Overlay */}
//       <div
//         className="absolute inset-0 bg-black/50 bg-red"
//         onClick={onClose}
//       />

//       {/* Modal Content */}
//       <div
//         className="relative z-10 pointer-events-auto"
//         onClick={(e) => e.stopPropagation()}
//       >
//         {children}
//       </div>
//     </div>
//   );
// };

// export default Modal;
