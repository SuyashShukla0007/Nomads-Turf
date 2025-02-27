import React, { useState, useCallback, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useSocket } from "../context/SocketProvider"

const Lobby = () => {
  const [email, setEmail] = useState("")
  const [room, setRoom] = useState("")

  // const socket = useSocket()
  const navigate = useNavigate()

  return (
    <div>
      <h1>Lobby</h1>
      <form
        onSubmit={() => {
          navigate(`/call/room/${room}`)
        }}
      >
        <label htmlFor="email">Email ID</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <label htmlFor="room">Room Number</label>
        <input
          type="text"
          id="room"
          value={room}
          onChange={(e) => setRoom(e.target.value)}
        />
        <br />
        <button>Join</button>
      </form>
    </div>
  )
}

export default Lobby
