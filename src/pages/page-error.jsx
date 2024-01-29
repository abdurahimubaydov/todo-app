import React from 'react';
import { Link } from 'react-router-dom';

export default function PageError() {
    return (
        <div className='error-section'>
            <h1>page doesn't exist</h1>
            <button>
                <Link to={'/'}>return to home page</Link>
            </button>
        </div>
    );
};
