
import { Icon } from '@iconify/react/dist/iconify.js';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSocket } from '../hook/useSocket';
import { clippingParents } from '@popperjs/core';
import { setResult } from '../utils/apiService';


const SOCKET_SERVER_URL = 'https://api.strikecolor1.com/admin';


const PredictionManagement = () => {
  const navigate = useNavigate()
  const [timeLeft, setTimeLeft] = useState(0);
  const [activeRoomKey, setActiveRoomKey] = useState('wingo-30s');
  const [rooms, setRooms] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [activePeriod, setActivePeriod] = useState('30s');
  const [selectedBet, setSelectedBet] = useState(null);
  const [showResultModal, setShowResultModal] = useState(false);
  const [selectedResult, setSelectedResult] = useState('');

  const { socket, connected } = useSocket(SOCKET_SERVER_URL, '/admin/exposure/wingo/all');

  // Handle socket events
  useEffect(() => {
    if (!socket || !connected) return;

    // Subscribe to all wingo rooms after connection
    socket.emit('subscribeToAllWingoRoooms');

    // Listen for room updates
    socket.on('allWingoRoomsUpdate', (data) => {
      console.log('📡 allWingoRoomsUpdate:', data);
      if (data.rooms) {
        setRooms(data.rooms);
        setIsLoading(false);
      }
    });

    // Handle any errors
    socket.on('error', (error) => {
      console.error('Socket error:', error);
    });

    return () => {
      socket.off('allWingoRoomsUpdate');
      socket.off('error');
    };
  }, [socket, connected]);

  // Timer logic - recalculate every second
  useEffect(() => {
    if (!rooms[activeRoomKey]) return;

    const calculateTimeLeft = () => {
      const roomData = rooms[activeRoomKey];
      setTimeLeft(roomData?.periodInfo.timeRemaining);

      // If timer reaches 0, it will reset with new data from websocket
      if (roomData?.periodInfo.timeRemaining === 0) {
        console.log('⏰ Timer finished for period:', roomData.periodId);
      }
    };

    calculateTimeLeft(); // Calculate immediately
    const interval = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, [rooms, activeRoomKey]);

  const formatDurationLabel = (duration) => {
    if (duration < 60) return `${duration}s`;
    if (duration === 60) return '1m';
    return `${Math.floor(duration / 60)}m`;
  };
  const getCurrentRoom = () => rooms[activeRoomKey];


  const handleSetResult = async () => {
    try {
      let payload = {
        periodId: rooms[activeRoomKey].periodId,
        number: selectedBet
      }
      let data = await setResult(payload)
      console.log(data);
    } catch (error) {
      console.log(error);

    }


  }
  return (
    <div className="card">
      <div className="card-header bg-primary-100">
        <h5 className="mb-0 text-primary-600 fw-semibold">Wingo Prediction</h5>
      </div>
      <div className="card-body p-4">
        <button className="btn btn-outline-primary mb-3" onClick={() => navigate(-1)}>
          ← Back
        </button>

        {/* Period Selector and Timer */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <select
            className="form-select w-auto bg-white border-primary-300 text-primary-600"
            value={activeRoomKey}
            onChange={(e) => setActiveRoomKey(e.target.value)}
          >
            {Object.entries(rooms).map(([key, room]) => (
              <option key={key} value={key}>
                {formatDurationLabel(room.duration)} ({room.room})
              </option>
            ))}
          </select>

          <div className="d-flex align-items-center gap-3">
            <span className="text-xl fw-bold text-danger">#{rooms[activeRoomKey]?.periodId || '-'}</span>
            <span className="text-lg fw-medium text-secondary-600">
              Time Left: {Math.floor(timeLeft / 60)}:{timeLeft % 60 < 10 ? '0' : ''}{timeLeft % 60}
            </span>
          </div>
        </div>

        {/* Bet Display */}
        <div className="p-4 bg-white rounded-lg shadow-sm border border-primary-200 mb-4">
          <h6 className="mb-3 text-primary-600 fw-semibold">Numbers</h6>
          <div className="d-flex flex-wrap gap-4 justify-content-center">
            {[...Array(10).keys()].map((number) => {
              const currentRoom = getCurrentRoom();
              const exposure = currentRoom?.exposures?.[`number:${number}`] || "0.00";
              let colorClass = '';
              if (number === 0) {
                colorClass = 'gradient-red-violet';
              } else if (number === 5) {
                colorClass = 'gradient-green-violet';
              } else if (number > 0) {
                colorClass = number % 2 === 0 ? 'bg-danger' : 'bg-success';
              }

              return (
                <div key={number} className="d-flex flex-column align-items-center">
                  <button
                    className={`btn btn-lg text-white ${selectedBet === number ? 'border border-dark' : ''} ${colorClass}`}
                    style={{
                      width: '80px',
                      height: '80px',
                      fontSize: '1.5rem',
                      borderRadius: '10px',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
                    }}
                    onClick={() => setSelectedBet(number)}
                  >
                    {number}
                  </button>
                  <button
                    className="btn btn-sm btn-secondary mt-2"
                    disabled
                    style={{
                      width: '80px',
                      fontSize: '0.875rem',
                      borderRadius: '6px',
                      cursor: 'default',
                    }}
                  >
                    ₹ {exposure}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Set Result Box */}
        <div className="p-4 bg-white rounded-lg shadow-sm border border-primary-200 mb-4 d-flex justify-around" style={{ gap: '1rem', display: 'flex' }}>
          <div className="text-center d-flex justify-around" style={{ gap: '1rem', display: 'flex' }}>
            <button
              className="btn btn-lg btn-success w-40 py-3 me-2"
              style={{ fontSize: '1.25rem', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.15)' }}
              onClick={handleSetResult}
            >
              Set Result
            </button>
            <button
              className="btn btn-lg btn-danger w-40 py-3"
              style={{ fontSize: '1.25rem', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.15)' }}

            >
              Unset Result
            </button>
          </div>
        </div>

        {/* Bet List (Visible when a bet is selected) */}
        {/* {selectedBet && (
          <div className="p-4 bg-white rounded-lg shadow-sm border border-primary-200 mb-4">
            <h6 className="mb-3 text-primary-600 fw-semibold">
              Users Betting on {selectedBet.type === 'number' ? `Number ${selectedBet.value}` : selectedBet.value}
            </h6>
            <div className="table-responsive" style={{ overflowX: 'auto' }}>
              <table className="table bordered-table mb-0" style={{ minWidth: '600px' }}>
                <thead>
                  <tr>
                    <th>User ID</th>
                    <th>Mobile Number</th>
                    <th>Bet Amount</th>
                    <th>Bet Time</th>
                  </tr>
                </thead>
                <tbody>
                  {currentBets.users[selectedBet.value]?.length > 0 ? (
                    currentBets.users[selectedBet.value].map((user, index) => (
                      <tr key={index}>
                        <td>{user.userId}</td>
                        <td>{user.mobile}</td>
                        <td>${user.amount.toLocaleString()}</td>
                        <td>{user.betTime}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="text-center text-secondary-600">
                        No users betting on this option
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )} */}

        {/* High Risk Users */}


        {/* Bet Distribution Table */}
        {/* <div className="p-4 bg-white rounded-lg shadow-sm border border-primary-200">
          <h6 className="mb-3 text-primary-600 fw-semibold">Bet Distribution</h6>
          <div className="table-responsive" style={{ overflowX: 'auto' }}>
            <table className="table bordered-table mb-0" style={{ minWidth: '800px' }}>
              <thead>
                <tr>
                  <th>User ID</th>
                  <th>Mobile Number</th>
                  <th>Bet Amount</th>
                  <th>Selection</th>
                  <th>Balance After Bet</th>
                </tr>
              </thead>
              <tbody>
                {userBets.length > 0 ? (
                  userBets.map((bet, index) => (
                    <tr key={index}>
                      <td>{bet.userId}</td>
                      <td>{bet.mobile}</td>
                      <td>${bet.amount.toLocaleString()}</td>
                      <td>{bet.selection}</td>
                      <td>${bet.balanceAfterBet.toLocaleString()}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center text-secondary-600">
                      No bets placed for this period
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div> */}
        {/* Result Modal */}
        {/* {showResultModal && (
          <div
            className="modal fade show d-block"
            style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
            tabIndex="-1"
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title text-primary-600">Set Manual Result</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowResultModal(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label text-secondary-600">Select Result (0-9)</label>
                    <select
                      className="form-select"
                      value={selectedResult}
                      onChange={(e) => setSelectedResult(e.target.value)}
                    >
                      <option value="">Select a number</option>
                      {[...Array(10).keys()].map((num) => (
                        <option key={num} value={num}>{num}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowResultModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={handleSubmitResult}
                    disabled={!selectedResult}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}  */}
      </div>
    </div>
  );
};

// Add custom CSS for gradients and styling
const styles = `
  .gradient-red-violet {
    background: linear-gradient(to right, #ff0000 50%, #800080 50%);
    color: #fff;
    transition: transform 0.2s;
  }
  .gradient-red-violet:hover {
    transform: scale(1.05);
  }
  .gradient-green-violet {
    background: linear-gradient(to right, #00ff00 50%, #800080 50%);
    color: #fff;
    transition: transform 0.2s;
  }
  .gradient-green-violet:hover {
    transform: scale(1.05);
  }
  .big { background-color: #ffa500; color: #fff; }
  .small { background-color: #00ff00; color: #fff; }
  .green { background-color: #00ff00; color: #fff; }
  .violet { background-color: #800080; color: #fff; }
  .red { background-color: #ff0000; color: #fff; }
  .btn-success { 
    background-color: #28a745; 
    transition: transform 0.2s; 
  }
  .btn-success:hover { 
    transform: scale(1.05); 
    opacity: 0.9; 
  }
  .btn-secondary { 
    background-color: #6c757d; 
    transition: transform 0.2s; 
  }
  .btn-secondary:hover { 
    transform: scale(1.05); 
    opacity: 0.9; 
  }
  .btn-danger { 
    background-color: #dc3545; 
    transition: transform 0.2s; 
  }
  .btn-danger:hover { 
    transform: scale(1.05); 
    opacity: 0.9; 
  }
  .bg-gray-200 { background-color: #e5e7eb; }
  .badge.bg-dark { 
    background-color: #343a40; 
    color: #fff; 
  }
`;

const styleSheet = new CSSStyleSheet();
styleSheet.replaceSync(styles);
document.adoptedStyleSheets = [styleSheet];

export default PredictionManagement;
