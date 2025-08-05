import { HelpCircle, SettingsIcon, SunIcon } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';
import logo from "../../assets/icons/logo.png"; 

function Sidebar() {
    return (
        <>
            <aside className="flex flex-col justify-between px-6 py-6 shadow w-40 bg-white h-full">
                {/* Logo */}
                <Link to="https://prebuiltui.com" className="mb-8 flex justify-center">
                    <img
                        src={logo}
                        alt="Logo"
                        className="w-30 h-15 object-cover "
                    />
                </Link>

                {/* Navigation */}
                <nav className="flex flex-col gap-6 justify-between items-center text-gray-900 text-sm font-normal">
                    <Link className="hover:text-indigo-600" to="/notes">
                        Notes
                    </Link>
                    <Link className="hover:text-indigo-600" to="/tasks">
                        Tasks
                    </Link>
                    <Link className="hover:text-indigo-600" to="/calendar">
                        Calendar
                    </Link>
                    <Link className="hover:text-indigo-600" to="/flashcards">
                        Flashcards
                    </Link>
                    <Link className="hover:text-indigo-600" to="/analytics">
                        Analytics
                    </Link>
                    <Link className="hover:text-indigo-600" to="/clips">
                        Clips
                    </Link>
                    <Link className="hover:text-indigo-600" to="/tasks">
                        Tasks
                    </Link>
                </nav>

                {/* Bottom Actions */}
                <div className="flex  gap-3 mt-auto">
                    <button className="size-7 flex items-center justify-center hover:bg-gray-100 transition border border-slate-300 rounded-md">
                       <SunIcon className='w-4 h-4' />
                    </button>
                    <Link to="/settings">
                        <button className="size-7 flex items-center justify-center hover:bg-gray-100 transition border border-slate-300 rounded-md">
                            <SettingsIcon className='w-4 h-4' />
                        </button>
                    </Link>
                    <Link to="/help">
                        <button className="size-7 flex items-center justify-center hover:bg-gray-100 transition border border-slate-300 rounded-md">
                            <HelpCircle className='w-4 h-4' />
                        </button>
                    </Link>
                </div>
            </aside>
        </>
    );
}

export default Sidebar;
