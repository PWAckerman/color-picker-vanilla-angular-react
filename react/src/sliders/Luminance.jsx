import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as colorActions from '../actions/colorActions.js';

class LuminanceSlider extends Component{

    constructor(props, context){
        super(props, context);
        this.valueChange = this.valueChange.bind(this);
    }

    valueChange(evt){
        this.props.dispatch(colorActions.updateLuminance(parseInt(evt.target.value)));
    }

    render(){
        console.log(this.props);
        return <div>
                <input type="range" onChange={this.valueChange} value={this.props.color.luminance}></input>
                <div>{this.props.color.luminance}</div>
               </div>
    }
}

function mapStateToProps(state, ownProps){
    return {
        color: state.color
    }
}

export default connect(mapStateToProps)(LuminanceSlider);
