// context/useTheme.js
import { useContext } from 'react';
import { ThemeContext } from './contextObjects';

export const useTheme = () => useContext(ThemeContext);
