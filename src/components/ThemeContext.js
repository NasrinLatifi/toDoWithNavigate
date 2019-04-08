import React from 'react';
export const themes = {
    light: {
        backgroundColor: '#E8EAED',
        itemColor : '#F9F9F8',
        drawerColor : '#EDEFF2',
        drawerFontColor : '#303451',
        fontColor:'#707070',
        greenFont:'red',
        inputBackground:'#cccccc',
        tabNavigator:'#cccccc',
        items:'#f4f4f4',
        inputArea:'#fff',
        placeholderTextColor:'#474747',
        burgerMenu:'#282c34',
        headerColor:"#ff0"
    },
    dark: {
        backgroundColor: '#8f97a3',
        itemColor : 'rgb(235,235,235)',
        drawerColor : '#8f97a3',
        drawerFontColor : '#F9F9F8',
        borderColor:'#77849b',
        fontColor:'#333333',
        borderWidth:1,
        purpleBackground:'blue',
        inputBackground:'#282c34',
        tabNavigator:'#282c34',
        items:'#282c34',
        inputArea:'#77849b',
        placeholderTextColor:'#dedede',
        burgerMenu:'#fff',
        headerColor:"#00f"
    }
};

export const ThemeContext = React.createContext({
    theme: themes.light
});