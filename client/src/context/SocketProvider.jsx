import React, { createContext, useContext, useMemo } from "react"
import { io } from "socket.io-client"
const socketContext = createContext()

const SocketProvider = ({ children }) => {
  const socket = useMemo(() => io("http://localhost:5001"), [])
  return (
    <socketContext.Provider value={socket}>{children}</socketContext.Provider>
  )
}
export const useSocket = () => {
  const socket = useContext(socketContext)
  return socket
}

export default SocketProvider
