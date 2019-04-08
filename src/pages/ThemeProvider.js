import React, { Component } from 'react'
import Start from '../routes/index';
import {ThemeContext, themes} from "../components/ThemeContext";
import {connect} from "react-redux";



class ThemeProvider extends Component {
    render() {
        return (
            <ThemeContext.Provider value={this.props.themeData.theme}>
                <Start theme={this.props.themeData.theme}/>
            </ThemeContext.Provider>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        themeData: state.UIReducer
    }
}
export default connect(mapStateToProps)(ThemeProvider)