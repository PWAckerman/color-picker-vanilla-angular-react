import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as colorActions from '../actions/colorActions.js';

class SelectedColor extends Component{

    componentDidMount() {
        this.updateCanvas();
    }

    componentDidUpdate() {
        this.updateCanvas();
    }

    updateCanvas() {
        const ctx = this.refs.selection.getContext('2d');
        ctx.fillStyle = this.props.hsl;
        ctx.fillRect(0,0, 100, 100);
    }

    render(){
        console.log(this.props);
        return <canvas ref="selection"></canvas>
    }
}

function mapStateToProps(state, ownProps){
    return {
        hsl: `hsl(${state.color.hue},${state.color.saturation}%,${state.color.luminance}%)`
    }
}

export default connect(mapStateToProps)(SelectedColor);
