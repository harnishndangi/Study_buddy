// context/useApp.js
import { useContext } from 'react';
import { AppContext } from './contextObjects';

export const useApp = () => useContext(AppContext);
