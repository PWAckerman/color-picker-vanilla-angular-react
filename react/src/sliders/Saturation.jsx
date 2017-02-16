import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as colorActions from '../actions/colorActions.js';

class SaturationSlider extends Component{

    constructor(props, context){
        super(props, context);
        this.valueChange = this.valueChange.bind(this);
    }

    valueChange(evt){
        this.props.dispatch(colorActions.updateSaturation(parseInt(evt.target.value)));
    }

    render(){
        console.log(this.props);
        return <div>
                 <input type="range" onChange={this.valueChange} value={this.props.color.saturation}></input>
                 <div>{this.props.color.saturation}</div>
               </div>
    }
}

function mapStateToProps(state, ownProps){
    return {
        color: state.color
    }
}

export default connect(mapStateToProps)(SaturationSlider);
