import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as colorActions from '../actions/colorActions.js';

class HueSlider extends Component{

    constructor(props, context){
        super(props, context);
        this.valueChange = this.valueChange.bind(this);
    }

    valueChange(evt){
        this.props.dispatch(colorActions.updateHue(parseInt(evt.target.value)));
    }

    render(){
        console.log(this.props);
        return <div>
                <input type="range" onChange={this.valueChange} value={this.props.color.hue} min={0} max={360}></input>
                <div>{this.props.color.hue}</div>
               </div>
    }
}

function mapStateToProps(state, ownProps){
    return {
        color: state.color
    }
}

// function mapDispatchToProps(dispatch){
//     return {
//         updateHue: bindActionCreators(colorActions, dispatch)
//     }
// }

export default connect(mapStateToProps)(HueSlider);
