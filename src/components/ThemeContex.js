import React from 'react';
export const themes = {
    light: {
        backgroundColor: '#f4f4f4',
        color : ''
    },
    dark: {
        backgroundColor: '#575757',
    },
    lightFont:{
        color:'#fff',
    },
    darkFont:{
        color:'#000',
    }
};

export const ThemeContext = React.createContext({
    theme: themes.dark
});