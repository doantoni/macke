import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './style.css'

function Welcome(){

    return (
        <div className='h-100 d-flex flex-column justify-content-center align-items-center'>
            <h1 className="main-title">Eksplodirajuće mačke</h1>
            <Link to='/play'>
                <button>igraj</button>
            </Link>
        </div>
    )
}

export default Welcome