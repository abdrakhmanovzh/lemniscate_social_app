import React from 'react'
import load from '../../images/Loading.svg'

const Loading = ({ width, height }) => {
    return (
        <div className='flex flex-row justify-center'>
            <div className={`${height} ${width} h-max w-max`}>
                <img src={load} />
            </div>
        </div>
    )
}

export default Loading