angular.module('ColorPicker', ['ui.router'])

angular.module('ColorPicker')
    .config(function($stateProvider,$urlRouterProvider){
        var pickerState = {
          url: '/',
          controller: 'colorPickerCtrl',
          controllerAs: 'vm',
          templateUrl: 'partials/canvas.html',
          cache: false,
          cacheView: false
        };

        $stateProvider.state('pickerState', pickerState)

        $urlRouterProvider.otherwise('/');
    });

angular.module('ColorPicker').controller('colorPickerCtrl', function($scope, $document, HSLColorFactory){
    var self = this;

    function recalculateColor(){
        var color = HSLColorFactory.getColor(self.hue, self.saturation, self.luminance, self.alpha);
        return color;
    }
    var applying = false;

    this.message = "hey";
    this.hue = 180;this
    this.saturation = 50;
    this.luminance = 50;
    this.alpha = 1;
    this.hsl = recalculateColor();
    console.log(this.hsl);
    this.hueChange = function(newVal){
        self.hsl = recalculateColor();
        $scope.$broadcast("NEW_COLOR",{});
        updateSaturationGradient();
    }

    this.satChange = function(newVal){
        self.hsl = recalculateColor();
        $scope.$broadcast("NEW_COLOR",{});

    }

    this.lumChange = function(newVal){
        self.hsl = recalculateColor();
        $scope.$broadcast("NEW_COLOR",{});
        updateLuminanceGradient();
    }

    function updateSaturationGradient(){
        var style = document.createElement("style");
        document.head.appendChild(style);
        sheet = style.sheet
        sheet.addRule('#saturation::-webkit-slider-runnable-track',`background: linear-gradient(to right, ${self.hsl.toStringMaxSat()}, ${self.hsl.toStringMinSat()});`);
    }

    function updateLuminanceGradient(){
        var style = document.createElement("style");
        document.head.appendChild(style);
        sheet = style.sheet
        sheet.addRule('#luminance::-webkit-slider-runnable-track',`background: linear-gradient(to right, ${self.hsl.toStringMinLum()}, ${self.hsl.toStringMaxLum()});`);
    }
});

angular.module('ColorPicker').component('drawingCanvas', {
    // isolated scope binding
    bindings: {
        message: '=',
    },
    // Inline template which is binded to message variable
    // in the component controller
    templateUrl: 'partials/drawingCanvas.html',
    // The controller that handles our component logic
    controller: function () {
        this.message = "Canvas Component"
    }
});

angular.module('ColorPicker').component('hueSelector',{
    // isolated scope binding
    bindings: {
        hue: '=',
        update: '&?'
    },
    // Inline template which is binded to message variable
    // in the component controller
    templateUrl: 'partials/hueSelector.html',
    // The controller that handles our component logic
    controller: function () {
        var self = this;
        console.log(self.hue);
        this.hue = 180;
        console.log(self.update);
        this.valChange = function(){
            console.log('change');
            console.log(self.hue);
            console.log(self.update);
            self.update({newVal: self.hue});
        }
    }
});

angular.module('ColorPicker').component('saturationSelector',{
    // isolated scope binding
    bindings: {
        saturation: '=',
        update: '&'
    },
    // Inline template which is binded to message variable
    // in the component controller
    templateUrl: 'partials/saturationSelector.html',
    // The controller that handles our component logic
    controller: function () {
        var self = this;
        this.saturation = 50;
        this.valChange = function(){
            console.log('change');
            self.update({newVal: self.saturation});
        }
    }
});

angular.module('ColorPicker').component('luminanceSelector', {
    // isolated scope binding
    bindings: {
        luminance: '=',
        update: '&'
    },
    // Inline template which is binded to message variable
    // in the component controller
    templateUrl: 'partials/luminanceSelector.html',
    // The controller that handles our component logic
    controller: function () {
        var self = this;
        this.luminance = 50;
        this.valChange = function(){
            console.log('change');
            self.update({newVal: self.luminance});
        }
    }
});

angular.module('ColorPicker').component('brushSelector', {
    // isolated scope binding
    // bindings: {
    //     message: '='
    // },
    // Inline template which is binded to message variable
    // in the component controller
    templateUrl: 'partials/brushSelector.html',
    // The controller that handles our component logic
    controller: function () {
        var self = this;
        this.brush = "Brush Selector"
    }
});

angular.module('ColorPicker').component('selectedColor',{
    bindings: {
        color: '='
    },
    templateUrl: 'partials/selectedColor.html',
    controller: function($scope, $document){
        var self = this;
        this.canvas = $document[0].getElementById('selected-color');
        this.ctx = this.canvas.getContext('2d');
        this.updateCanvas = function(){
            console.log('component', self.color);
            self.ctx.fillStyle = self.color.toString();
            self.ctx.fillRect(0, 0, document.body.clientWidth, 50);
        };
        $scope.$on('NEW_COLOR', function(data){
            self.updateCanvas();
        })
    }
});

angular.module('ColorPicker').component('drawingBoard', {
    bindings: {
        color: '='
    },
    templateUrl: 'partials/brushCanvas.html',
    controller: function($document){
        var self = this;
        this.canvas = $document[0].getElementById('drawing-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.paintMode = false;
        this.paintModeOn = function(){
            this.paintMode = true;
        }
        this.paintModeOff = function(){
            this.paintMode = false;
        }
        this.painter = function(e){
            console.log(e);
            paint(e);
        }

        function paint(e){
            console.log('mouseover');
            if(self.paintMode){
                var coords = getMousePos(self.canvas, e);
                console.log('Mouse position: ' + coords.x + ',' + coords.y);
                self.ctx.fillStyle = self.color.toString();
                self.ctx.fillRect(coords.x, coords.y, 10, 10);
            }
        }

        function getMousePos(canvas, evt) {
          var rect = canvas.getBoundingClientRect();
          return {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top
          };
        }
    }
})

angular.module('ColorPicker').factory('HSLColorFactory', function(){
    var self = this;
    console.log('factory');
    function HSLColor(h, s, l, a){
        this.hue = h;
        this.saturation = s;
        this.luminance = l;
        this.toString = function(){
          return `hsl(${this.hue},${this.saturation}%,${this.luminance}%)`
        },
        this.toStringMaxSat = function(){
           return `hsl(${this.hue},0%,${this.luminance}%)`
        },
        this.toStringMinSat = function(){
          return `hsl(${this.hue},100%,${this.luminance}%)`
        },
        this.toStringMaxLum = function(){
          return `hsl(${this.hue},${this.saturation}%,100%)`
        },
        this.toStringMinLum = function(){
          return `hsl(${this.hue},${this.saturation}%,0%)`
        }
    }

    return {
        getColor: function(h,s,l,a){
            return new HSLColor(h,s,l,a);
        }
    }
})
