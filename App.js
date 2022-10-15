import React, { Component } from 'react';
import { Feather } from 'react-native-vector-icons';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { Audio, InterruptionModeAndroid, InterruptionModeIOS } from 'expo-av';
/* import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();
setTimeout(SplashScreen.hideAsync, 2000); */

import ukulele from './assets/ukulele.png'
import drums from './assets/drums.png'

export default class App extends Component {
  state = {
    isPlayingUku: false,
    isPlayingDru: false,
    playbackInstance: null,
    volume: 1.0,
    filePath: './music/ukulele.mp3',
    isBuffering: false,
  }

	async componentDidMount() {
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      playThroughEarpieceAndroid: true,
      //interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      interruptionModeIOS: InterruptionModeIOS.DoNotMix,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      //interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      interruptionModeAndroid: InterruptionModeAndroid.DoNotMix,
    });
/*     this.setState({
      filePath: './music/ukulele.mp3',
    });
 */    this.loadAudio();
  }

  handlePlayPauseUku = async () => {
    let { isPlayingUku, playbackInstance } = this.state;
    if (playbackInstance) {
      await playbackInstance.unloadAsync();
      playbackInstance = new Audio.Sound();
      const source = require('./music/ukulele.mp3');
        const status = {
          shouldPlay: this.state.isPlayingDru,
          volume: this.state.volume,
        };
    
      playbackInstance.setOnPlaybackStatusUpdate(this.onPlaybackStatusUpdate);
      await playbackInstance.loadAsync(source, status, false);
      await playbackInstance. playAsync();
      
      isPlayingUku ? await playbackInstance.pauseAsync() : await playbackInstance.playAsync();

      this.setState({
        playbackInstance,
        isPlayingUku: !isPlayingUku,
      });
    }
  }

  handlePlayPauseDru = async () => {
    let { isPlayingDru, playbackInstance } = this.state;
    if (playbackInstance) {
      await playbackInstance.unloadAsync();
      playbackInstance = new Audio.Sound();
      const source = require('./music/drums.mp3');
        const status = {
          shouldPlay: this.state.isPlayingDru,
          volume: this.state.volume,
        };
    
      playbackInstance.setOnPlaybackStatusUpdate(this.onPlaybackStatusUpdate);
      await playbackInstance.loadAsync(source, status, false);
      await playbackInstance. playAsync();
      
      isPlayingDru ? await playbackInstance.pauseAsync() : await playbackInstance.playAsync();

      this.setState({
        playbackInstance,
        isPlayingDru: !isPlayingDru,
      });
    }
  }

  onPlaybackStatusUpdate = (status) => {
    this.setState({
      isBuffering: status.isBuffering
    });
  }

  async loadAudio() {
    const playbackInstance = new Audio.Sound();
    const source = require('./music/ukulele.mp3');
		  const status = {
			  shouldPlay: this.state.isPlayingUku,
			  volume: this.state.volume,
    };
    playbackInstance.setOnPlaybackStatusUpdate(this.onPlaybackStatusUpdate);
    await playbackInstance.loadAsync(source, status, false);
    this.setState({
      playbackInstance
    });
  }

  render() {
    return (
      <View style={styles.container}>

      <View style={styles.containerHeader}>

        <Text style={styles.header}>
          Aloha Music
        </Text>
        </View>

        <View style={styles.containerBody}>
          <Image style={styles.image} source={ukulele} />
          <TouchableOpacity
            style={styles.control}
            onPress={this.handlePlayPauseUku}
          >
            {this.state.isPlayingUku ?
              <Feather name="pause" size={32} color="#563822"/> 
              :
              <Feather name="play"  size={32} color="#563822"/>
            }
          </TouchableOpacity>

          <Image style={styles.image} source={drums} />
          <TouchableOpacity
            style={styles.control}
            onPress={this.handlePlayPauseDru}
          >
            {this.state.isPlayingDru ?
              <Feather name="pause" size={32} color="#563822"/> :
              <Feather name="play"  size={32} color="#563822"/>
            }
          </TouchableOpacity>
          </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4e3cf',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerHeader: {
    flex: 1,
    marginTop: 150,
    backgroundColor: '#da9547',
  },
  containerBody: {
    flex: 18,
    backgroundColor: '#f4e3cf',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    color: '#563822',
    fontSize: 30,
    fontWeight: 'bold',
    alignSelf: 'center',
    textAlign: 'center',
    width: 350
  },
  image: {
    height: 210,
    width: 350
  },
  control: {
    margin: 20
  },
});