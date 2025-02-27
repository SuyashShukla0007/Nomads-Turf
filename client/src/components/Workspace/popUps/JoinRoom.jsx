import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
function JoinRoom(socketId) {
  const nav = useNavigate();
  const [workspaceNo, setWorkspaceNo] = useState(1);
  const joinRoom = async (roomId, userId) => {

    const [roomID, setRoomId] = useState("");
    // const [userId,setUserId]=useState('');
    try {
      const response = await axios.post("http://localhost:3000/room/join", {
        roomId: roomID,
        userId: socketId,
      });

      nav(`/workspaces/:${workspaceNo}`);

      console.log("Room joined:", response.data);
    } catch (error) {
      console.error("Error joining room:", error);
    }
  };

  return (
    <div className="flex justify-center items-center bg-gray-900">
      <div className="bg-gray-800 p-12 rounded-lg shadow-lg w-96">
        <h2 className="text-white text-2xl font-semibold text-center mb-4">
          Join a Room
        </h2>
        <form action="" method="post" className="space-y-4">
          <div className="flex flex-col">
            <label className="text-white mb-1">Room ID</label>
            <input
              type="text"
              className="p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setRoomId(e.target.value)}
            />
          </div>
          <button
            type="button"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded transition"
            onClick={() => joinRoom()}
          >
            Join Room
          </button>
        </form>
      </div>
    </div>
  );
}

export default JoinRoom;
