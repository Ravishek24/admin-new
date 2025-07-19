import React, { useEffect } from "react";

const ProfitModal = ({ showModal, handleClose, gameWiseProfit }) => {
  // Prevent background scroll
  useEffect(() => {
    if (showModal) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showModal]);

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center px-4">
      {/* Modal Container */}
      <div className="bg-white rounded-2xl p-6 w-full max-w-lg relative shadow-lg animate-fadeIn" style={{position:'relative'}}>
        {/* Close Button */}
        <button
          className="absolute right-3 text-2xl text-gray-500 hover:text-red-600" style={{position:'absolute' ,right:20,top:-2}}
          onClick={handleClose}
          aria-label="Close Modal"
        >
          ✕
        </button>

        <h3 className="text-xl font-semibold mb-5 text-center">Profit Details</h3>

        {/* Modal Content */}
        <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
          {gameWiseProfit?.map((item, index) => (
            <div
              key={index}
              className="p-4 rounded-lg border border-gray-200 bg-gray-50"
            >
              <p><strong>Game Type:</strong> {item.game_type}</p>
              <p><strong>Total Bet:</strong> ₹{item.total_bet}</p>
              <p><strong>Total Win:</strong> ₹{item.total_win}</p>
              <p><strong>Profit:</strong> ₹{item.profit}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfitModal;
