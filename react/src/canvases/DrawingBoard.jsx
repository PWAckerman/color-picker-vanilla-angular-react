import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as imageActions from '../actions/imageActions.js';
import getMousePos from '../helpers/mouseposition.js';
import serialize from '../helpers/serializecanvas.js';
import deserialize from '../helpers/deserializecanvas.js';

class DrawingBoard extends Component{
    constructor(props, context){
        super(props, context);
        this.paintMode = false;
        this.turnOnPaintMode = this.turnOnPaintMode.bind(this);
        this.turnOffPaintMode = this.turnOffPaintMode.bind(this);
        this.draw = this.draw.bind(this);
        this.undo = this.undo.bind(this);
    }

    componentDidMount() {
        this.updateCanvas();
    }
    //
    componentDidUpdate() {
        this.updateCanvas();
    }

    turnOnPaintMode(){
        this.paintMode = true;
    }

    turnOffPaintMode(){
        this.paintMode = false;
        this.props.dispatch(imageActions.saveImage(serialize(this.refs.board)));
    }

    draw(evt){
        if(this.paintMode){
            const ctx = this.refs.board.getContext('2d');
            const brushSize = 10;
            let coords = getMousePos(this.refs.board,evt);
            ctx.fillStyle = this.props.hsl;
            ctx.fillRect(coords.x, coords.y, brushSize, brushSize);
        }
    }

    undo(){
        this.props.dispatch(imageActions.loadPrevious());
    }

    updateCanvas(){
        deserialize(this.props.image, this.refs.board);
    }

    render(){
        console.log(this.props);
        return <div>
                <canvas ref="board" onMouseDown={this.turnOnPaintMode} onMouseLeave={this.turnOffPaintMode} onMouseUp={this.turnOffPaintMode} onMouseMove={this.draw}></canvas>
                <button onClick={this.undo}>UNDO</button>
               </div>
    }
}

function mapStateToProps(state, ownProps){
    return {
        hsl: `hsl(${state.color.hue},${state.color.saturation}%,${state.color.luminance}%)`,
        image: state.imageHistory[state.imageHistory.length - 1]
    }
}

export default connect(mapStateToProps)(DrawingBoard );
