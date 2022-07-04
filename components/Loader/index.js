/* eslint-disable @next/next/no-img-element */
import React from 'react'
import cls from './loader.module.css'
const Loader = () =>{
    return(
        <>
            <div className={cls.spans}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            </div>
        </>

    )
}

export default Loader