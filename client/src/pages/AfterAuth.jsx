import React from "react";
import JoinRoom from "../components/Workspace/popUps/JoinRoom";
import CreateRoom from "../components/Workspace/popUps/CreateRoom";
function AfterAuth() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex gap-4">
        <CreateRoom></CreateRoom>
        <JoinRoom></JoinRoom>
      </div>
    </div>
  );
}

export default AfterAuth;
