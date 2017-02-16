import React, { Component } from 'react';
import HueSlider from './sliders/Hue.jsx';
import LuminanceSlider from './sliders/Luminance.jsx';
import SaturationSlider from './sliders/Saturation.jsx';
import DrawingBoard from './canvases/DrawingBoard.jsx';
import SelectedColor from './canvases/SelectedColor.jsx';

class App extends Component {
    render(){
        return <div>
                    <HueSlider></HueSlider>
                    <LuminanceSlider></LuminanceSlider>
                    <SaturationSlider></SaturationSlider>
                    <SelectedColor></SelectedColor>
                    <DrawingBoard></DrawingBoard>
               </div>
    }
}

export default App;
