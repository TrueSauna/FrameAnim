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


  componentWillMount: function(){

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
    };
  },

  //starts animation
  _start: function(){

    //disables multiple starts
    if(this.state._doNotStart){
      return;
    }

    this.setState({
      _doNotStart:true,
      _left:0,
      _interval:requestAnimationFrame(this._tick),
      _interval2:requestAnimationFrame(this._tick2),
    });


    //
  },


  //stops animation, deletes thread, hopefully
  //possible to delete ALL threads if multiple?
  //resets the text but not the ball-animation
  _stop: function(){

    _doNotStart:false,

    clearTimeout(this.state._timer);
    clearTimeout(this._timer2);

    cancelAnimationFrame(this.state._interval);
    cancelAnimationFrame(this.state._interval2);

    this.setState(this.getInitialState());
  },


  //runs the ongoing animation
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

    this.state._timer = setTimeout(() => {
      this.setState({
        _left: this.state._left,
        _direction: this.state._direction,
        _interval: requestAnimationFrame(this._tick),
      });
    },this.state._timeOut);
  },

  //ongoing animation for frame-animation (ball that changes size)
  //no setstates:
  _tick2: function(){

    if(this._ballDirection == '+'){
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

    this._showImage = this._images[this._ballCounter].img,

    this._timer2 = setTimeout(() => {
      this.setState({
        _interval2: requestAnimationFrame(this._tick2),
      });
    },this._ballTimeOut);

  },


  render: function() {

    return (
      <View style={styles.container}>

        <Image source={this._showImage} style={[styles.image]}>

        </Image>

        <Text style={{left:this.state._left}}>AnImAtEd</Text>

        <TouchableHighlight style={[styles.roundBox, {top:20, backgroundColor:'green'}]} onPress={this._start}>
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
    width:50,
    height:50,
  },
  image2:{
    height:0,
  }
});

AppRegistry.registerComponent('FrameAnim', () => FrameAnim);
