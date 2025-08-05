import React from 'react'
import Sidebar from '../components/Layout/Sidebar'

function Flashcards() {
    return (
        <>
            <div className="flex h-screen ">
                <Sidebar />
                <main className="flex-1 p-8   bg-gray-50 ">
                    Dashboard
                </main>
            </div>
        </>
    )
}

export default Flashcards