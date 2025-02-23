import React from 'react'
import img1 from '../assets//space1/space1.png'
import img2 from '../assets//space2/space2.png'
import WorkspaceCard from '../components/Workspace/WorkspaceCard'
const ChooseWorkspace = () => {
  return (
    <div className='flex flex-col justify-center items-center h-screen'>

      <div className='text-4xl h-[10%] font-bold text-white py-5 bg-black'>Choose Workspace</div>
      <div className='h-[90%] w-[100%] flex justify-evenly pt-10 gap-10 bg-gray-900'>
        <WorkspaceCard img={img1} workspace='space1' url={'/workspace/space1'} ></WorkspaceCard>
        <WorkspaceCard img={img2} workspace='space2' url='/workspace/space2'></WorkspaceCard>
      </div>


    </div>
  )
}

export default ChooseWorkspace