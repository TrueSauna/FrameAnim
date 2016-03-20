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
  TouchableHighlight
} from 'react-native';

var varTEST1 = 'test';
var varTEST2 = 'test2';


var FrameAnim = React.createClass({


  getInitialState: function(){
    return{
      _left: 0,
      _interval: null,
      _interval2:null,
      _direction: '+',
      _ballDirection: '+',
      _changeVariable:'green',
      _timeOut:10,
      _timer:null,
      _timer2:null,
      _doNotStart:false,
      _ballCounter:0,
      _prevBallCounter:0,
      _ballTimeOut:150,
/*
      _images: {
        ball1: require('./images/ball1.png'),
        ball2: require('./images/ball2.png'),
        ball3: require('./images/ball3.png'),
      },
*/
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
    };
  },

  //starts animation
  _tick1Start: function(){
    varTEST1 = '_start';

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
  },


  //stops animation, deletes thread, hopefully
  //possible to delete ALL threads if multiple?
  _tick1Stop: function(){
    _doNotStart:false,

    clearTimeout(this.state._timer);
    clearTimeout(this.state._timer2);

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



  _tick2: function(){


    if(this.state._ballDirection == '+'){
      if(this.state._ballCounter == 7)
      {
        this.state._ballDirection = '-'
        this.state._ballCounter -= 1;
      }
      else{
        this.state._ballCounter += 1;
      }
    }
    else{
      if(this.state._ballCounter == 0){
        this.state._ballDirection = '+'
        this.state._ballCounter += 1;
      }
      else {
        this.state._ballCounter -= 1;
      }
    }

    this.state._timer2 = setTimeout(() => {
      this.setState({
        _ballCounter: this.state._ballCounter,
        _ballDirection: this.state._ballDirection,
        _showImage: this.state._images[this.state._ballCounter].img,
        _interval2: requestAnimationFrame(this._tick2),
      });
    },50);

  },


  render: function() {

    return (
      <View style={styles.container}>

        <Image source={this.state._showImage} style={styles.image}></Image>

        <Text style={{left:this.state._left}}>Animated</Text>

        <Text>{varTEST1}</Text>
        <Text>{this.state._left}</Text>

        <TouchableHighlight style={[styles.roundBox, {top:20, backgroundColor:'green'}]} onPress={this._tick1Start}>
          <Text style={{left:35, top:30}}>Start</Text>
        </TouchableHighlight>

        <TouchableHighlight style={[styles.roundBox, {top:50, backgroundColor:this.state._changeVariable}]} onPress={this._tick1Stop}>
          <Text style={{left:35, top:30}}>Stop</Text>
        </TouchableHighlight>

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
    height:50
  }
});

AppRegistry.registerComponent('FrameAnim', () => FrameAnim);
