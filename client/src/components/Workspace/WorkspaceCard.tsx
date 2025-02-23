import React from 'react'
import { useNavigate } from 'react-router-dom'
type WorkspaceCardProps = {
  img: string;
  workspace: string;
  url:string
}



function WorkspaceCard(props: WorkspaceCardProps) {
  const navigate = useNavigate()
  const handleClick = () => { 
    navigate(props.url)
  }

  return (
    <div onClick={()=>handleClick()}>
      <div className='h-[40%] w-80 border-white border-2 rounded-lg cursor-pointer hover:scale-105 transition-transform duration-300'> 
        <img src={props.img} className='h-full w-full' alt="" />
      </div>
      <div className='text-xl text-white text-center'>{props.workspace}</div>
    </div>
  )
}

export default WorkspaceCard
