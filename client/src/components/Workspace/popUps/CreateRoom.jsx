import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
function CreateRoom() {
  const nav = useNavigate();

  const [roomID, setRoomID] = useState("");
  const [roomNo, setRoomNo] = useState(1);
  const createRoom = async (socketId) => {
    try {
      const response = await axios.post("http://localhost:3000/room/create", {
        id: roomID,
        roomNo: roomNo,
        users: [0],
        createdBy: 0,
      });

      nav("/workspaces");

      console.log("Room created:", response.data);
    } catch (error) {
      console.error("Error creating room:", error);
    }
  };

  return (
    <div className="flex justify-center items-center ">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-white text-2xl font-semibold text-center mb-4">
          Create a Room
        </h2>
        <form action="post" className="space-y-4">
          <div className="flex flex-col">
            <label htmlFor="roomName" className="text-white mb-1">
              Room ID
            </label>
            <input
              type="text"
              className="p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setRoomID(e.target.value)}
            />
          </div>
          {/* //drop down for room 1,2 */}
          <select
            onClick={(e) => setRoomNo(e.target.value)}
            className="p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {/* <option value="-">---</option> */}
            <option value={1}>1</option>
            <option value={2}>2</option>
          </select>
          <button
            type="button"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition"
            onClick={() => createRoom()}
          >
            Create Room
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateRoom;
