/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  AsyncStorage,
  TextInput,
  TouchableOpacity
} from 'react-native';

var varTEST1 = 'test';
var varTEST2 = 'test2';

var FrameAnim = React.createClass({


  _ballDirection: '+',
  _timer2:null,
  _ballCounter:0,
  _prevBallCounter:0,
  _ballTimeOut:25,


  _images: [
    {
      id:1,
      img: require("./images/ball1.png")
    },
    {
      id:2,
      img: require("./images/ball2.png")
    },
    {
      id:3,
      img: require("./images/ball3.png")
    },
    {
      id:4,
      img: require("./images/ball4.png")
    },
    {
      id:5,
      img: require("./images/ball5.png")
    },
    {
      id:6,
      img: require("./images/ball6.png")
    },
    {
      id:7,
      img: require("./images/ball7.png")
    },
    {
      id:8,
      img: require("./images/ball8.png")
    },
  ],

  _dwarfTimer:null,
  _dwarfCounter:0,
  _dwarfTimeOut:100,


  _imagesD: [
    {id:1,img: require("./images/dwarf_1.png")},
    {id:2,img: require("./images/dwarf_2.png")},
    {id:3,img: require("./images/dwarf_3.png")},
    {id:4,img: require("./images/dwarf_4.png")},
    {id:5,img: require("./images/dwarf_5.png")},
  ],


  componentWillMount: function(){

    this._propStyles = {
      style: {
        left:0,
        top:0,
        borderWidth:2,
      },

    };
    this._testProp = 'test';
  },

  getInitialState: function(){
    return{

      _left: 0,
      _interval: null,
      _direction: '+',
      _changeVariable:'green',
      _timeOut:1,
      _timer:null,
      _doNotStart:false,
      _interval2:null,
      _interval3:null,
      _interval4:null,

    };
  },

  //starts animation
  _start: function(){

    //disables multiple starts
    if(this._doNotStart){
      return;
    }

    //INTERVAL3 HAS NO SETSTATES:
    this._doNotStart = true;
    this._interval3 = requestAnimationFrame(this._tick3);

    this._interval4 = requestAnimationFrame(this._tick4);

    /*
    this.setState({
      _doNotStart:true,
      _left:0,
      //_interval:requestAnimationFrame(this._tick),
      //_interval2:requestAnimationFrame(this._tick2),
    });
    */

    //
  },


  //stops animation, deletes thread, hopefully
  //possible to delete ALL threads if multiple?
  //resets the text but not the ball-animation
  _stop: function(){

    this._doNotStart = false;

    //clearTimeout(this.state._timer);
    //clearTimeout(this._timer2);

    //cancelAnimationFrame(this.state._interval);
    //cancelAnimationFrame(this.state._interval2);

    cancelAnimationFrame(this._interval3);

    clearTimeout(this._dwarfTimer);
    cancelAnimationFrame(this._interval4);



    this._propStyles.style.left = 0;
    this._propStyles.style.top = 0;
    this._textBox.setNativeProps(this._propStyles);

    //this.setState(this.getInitialState());
  },


  //runs the ongoing animation, not used atm
  _tick: function(){
    //setTimeout(this._tick, 1000/this.state.fps);

    //back-forth -animationlogic
    if(this.state._direction == '+'){
      if(this.state._left == 10)
      {
        this.state._direction = '-'
        this.state._left -= 1;
        this.state._changeVariable = 'green';
      }
      else{
        this.state._left += 1;
      }
    }
    else{
      if(this.state._left == -10){
        this.state._direction = '+'
        this.state._left += 1;
        this.state._changeVariable = 'red';
      }
      else {
        this.state._left -= 1;
      }
    }

    //setting timeout between animationcalls
    this.state._timer = setTimeout(() => {
      this.setState({
        _left: this.state._left,
        _direction: this.state._direction,
        //callin recursively itself, rAF has built-in logic to wait that previous draw is finished before starting new
        //=> compare to setInterval, which pushes to next frame as soon as it can without any logic
        //to get good fps (~60), rAF-logic should not take more than ~20 ms / call
        _interval: requestAnimationFrame(this._tick),
      });
    },this.state._timeOut);
  },

  //ongoing animation for frame-animation (ball that changes size), not used atm
  _tick2: function(){

    if(this._ballDirection == '+'){
      //7 = 0-7 images
      if(this._ballCounter == 7)
      {
        this._ballDirection = '-'
        this._ballCounter -= 1;
      }
      else{
        this._ballCounter += 1;
      }
    }
    else{
      if(this._ballCounter == 0){
        this._ballDirection = '+'
        this._ballCounter += 1;
      }
      else {
        this._ballCounter -= 1;
      }
    }

    //image require from array, could be in setstate:
    this._showImage = this._images[this._ballCounter].img,

    this._timer2 = setTimeout(() => {
      this.setState({
        _interval2: requestAnimationFrame(this._tick2),
      });
    },this._ballTimeOut);

  },

  //animation with no setstates, seems to work better with more stuff in render
  _tick3: function(){

    this._propStyles.style.left += 1;

    //this._textInput.setNativeProps({text:'text input'});
    //this._image.setNativeProps({source:(require('./images/ball8.png'))});
    this._showImage = this._images[7].img,

    this._textBox.setNativeProps(this._propStyles);

    this._interval3 = requestAnimationFrame(this._tick3);

  },

  isEven: function (n) {
   return n % 2 == 0;
  },

  isOdd: function (n) {
   return Math.abs(n % 2) == 1;
  },

  _tick4: function(){

    if(this._dwarfCounter == this._imagesD.length){
      this._dwarfCounter = 0;
    }

    this._showDwarf = this._imagesD[this._dwarfCounter].img,

    this._dwarfCounter++;

    this._dwarfTimer = setTimeout(() => {
      this.setState({
        _interval4: requestAnimationFrame(this._tick4),
      });
    },80);



  },

  render: function() {

    return (
      <View style={styles.container}>

        <Image style={[styles.image]} ref={component => this._image = component}{...this.props}>

        </Image>

        <Text style={{left:this.state._left}}>AnImAtEd</Text>


  {/*
        <TextInput ref={component => this._textInput = component}{...this.props}></TextInput>*/}


        <Image style={styles.image} source={this._showDwarf}>
        </Image>

        <View ref={component => this._textBox = component}{...this.props}>
          <Text>asdads</Text>
        </View>

        <TouchableHighlight style={[styles.roundBox, {top:50, backgroundColor:'green'}]} onPress={this._start}>
          <Text style={{left:35, top:30}}>Start</Text>
        </TouchableHighlight>

        <TouchableHighlight style={[styles.roundBox, {top:50, backgroundColor:this.state._changeVariable}]} onPress={this._stop}>
          <Text style={{left:35, top:30}}>Stop</Text>
        </TouchableHighlight>

        {/* ball-images could be loaded here with width & height 0, but it slows animations down

        <Image source={require("./images/ball1.png")} style={styles.image2}></Image>
        <Image source={require("./images/ball2.png")} style={styles.image2}></Image>
        <Image source={require("./images/ball3.png")} style={styles.image2}></Image>
        <Image source={require("./images/ball4.png")} style={styles.image2}></Image>
        <Image source={require("./images/ball5.png")} style={styles.image2}></Image>
        <Image source={require("./images/ball6.png")} style={styles.image2}></Image>
        <Image source={require("./images/ball7.png")} style={styles.image2}></Image>
        <Image source={require("./images/ball8.png")} style={styles.image2}></Image>

        */}

      </View>
    );
  }

});


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  roundBox:{
    borderRadius: 30,
    width:100,
    height:100,
  },
  image:{
    position:'absolute',
    width:50,
    height:50,
  },
  image2:{
    height:0,
  }
});

AppRegistry.registerComponent('FrameAnim', () => FrameAnim);
