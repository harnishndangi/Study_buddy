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
                <div >
                    <Link to={"/signup"}>
                        <button className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition">
                            Sign Up
                        </button>
                    </Link>
                    <Link to={"/login"}>
                        <button className="mt-2 w-full bg-gray-200 text-gray-900 py-2 rounded-md hover:bg-gray-300 transition">
                            Login
                        </button>
                    </Link>
                </div>
            </aside>
        </>
    );
}

export default Sidebar;
