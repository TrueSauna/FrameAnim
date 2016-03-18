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
      _direction: '+',
      _changeVariable:'green',
      _timeOut:10,
      _timer:null,
      _doNotStart:false,
    };
  },


  //starts animation
  _start: function(){
    varTEST1 = '_start';

    //disables multiple starts
    if(this.state._doNotStart){
      return;
    }

    this.setState({
      _doNotStart:true,
      _left:0,
      _interval:requestAnimationFrame(this._tick),
    });
  },


  //stops animation, deletes thread, hopefully
  //possible to delete ALL threads if multiple?
  _stop: function(){
    _doNotStart:false,
    clearTimeout(this.state._timer);
    cancelAnimationFrame(this.state._interval);
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

    //setting timeout for animation (milliseconds)
    this.state._timer = setTimeout(() => {
      this.setState({
        _left: this.state._left,
        _direction: this.state._direction,
        _interval: requestAnimationFrame(this._tick),
      });
    },this.state._timeOut);
  },

  render: function() {

    return (
      <View style={styles.container}>
        <Text>THIS1</Text>
        <Text>THIS3</Text>

        <Text style={{left:this.state._left}}>Animated</Text>

        <Text>{varTEST1}</Text>
        <Text>{this.state._left}</Text>

        <TouchableHighlight style={[styles.roundBox, {top:20, backgroundColor:'green'}]} onPress={this._start}>
          <Text style={{left:35, top:30}}>Start</Text>
        </TouchableHighlight>

        <TouchableHighlight style={[styles.roundBox, {top:50, backgroundColor:this.state._changeVariable}]} onPress={this._stop}>
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
  }
});

AppRegistry.registerComponent('FrameAnim', () => FrameAnim);
