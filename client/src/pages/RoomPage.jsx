import React, { useEffect, useRef } from "react"
import { useParams } from "react-router-dom"
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt"
import {useNavigate} from "react-router-dom"

const RoomPage = () => {
  const { roomId } = useParams()
  const myMeeting = useRef(null)
const navi=useNavigate()
  useEffect(() => {
    const myMeetingFunc = async () => {
      if (!roomId || !myMeeting.current) return // Ensure roomId and ref are valid

      const appId = 72908643 // Ensure it's a number
      const serverSecret = "465de0c410ab2ad9c7136210c06b0824" // Keep it as a string

      console.log("appId:", appId)
      console.log("serverSecret:", serverSecret)

      // Generate the kit token
      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        appId,
        serverSecret,
        roomId,
        Date.now().toString(),
        "Shubham"
      )

      // Initialize ZegoUIKitPrebuilt instance
      const zp = ZegoUIKitPrebuilt.create(kitToken)

      // Join the room
      zp.joinRoom({
        container: myMeeting.current, // Use the ref directly
        scenario: {
          mode: ZegoUIKitPrebuilt.OneONoneCall,
        },
        showScreenSharingButton: true,
      })
    }

    setTimeout(myMeetingFunc, 0) // Ensure execution after render
  }, [roomId])

  return (
    <div className="flex flex-col items-center justify-center h-screen  bg-gray-100 p-4">
      
      <h2 className="text-2xl font-semibold mb-4">Room ID: {roomId}</h2>
      <div ref={myMeeting} className="w-full h-96  rounded-lg shadow-sm" />
      <button 
        className="mt-4 w-ful absolute top-5 right-5 p-10 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg"
        onClick={() => navi('/workspace/space2')}
      >
        Back
      </button>
  </div>
  )
}

export default RoomPage
