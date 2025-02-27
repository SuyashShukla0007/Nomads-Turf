import React, { useEffect, useRef } from "react"
import { useParams } from "react-router-dom"
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt"

const RoomPage = () => {
  const { roomId } = useParams()
  const myMeeting = useRef(null)

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
    <div>
      <h2>Room ID: {roomId}</h2>
      <div ref={myMeeting} style={{ width: "100%", height: "100vh" }} />
    </div>
  )
}

export default RoomPage
