// import React, { useState, useEffect } from 'react';
// import { View, Text, TouchableOpacity } from 'react-native';
// import Voice from '@react-native-voice/voice';
// import { PermissionsAndroid } from 'react-native';
// import { Platform, ToastAndroid } from 'react-native';

// const VoiceRecognition = () => {
//   const [isRecording, setIsRecording] = useState(false);
//   const [result, setResult] = useState('');
//   const [error, setError] = useState('');

//   useEffect(() => {
//     requestMicrophonePermission();
//   }, []);

//   if (Platform.OS === 'android') {
//     // Check if the Android speech recognition service is available
//     if (Voice.isAvailable()) {
//       console.log('Android speech recognition service is available.');
//     } else {
//       console.log('Android speech recognition service is not available.');
//       // Display a message to the user (you can use a different UI element like a Toast)
//       ToastAndroid.show('Speech recognition is not available on this device.', ToastAndroid.SHORT);
//     }
//   }

//   const requestMicrophonePermission = async () => {
//     try {
//       const granted = await PermissionsAndroid.request(
//         PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
//         {
//           title: 'Microphone Permission',
//           message: 'This app requires access to your microphone for voice recognition.',
//           buttonNeutral: 'Ask Me Later',
//           buttonNegative: 'Cancel',
//           buttonPositive: 'OK',
//         }
//       );

//       if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//         console.log('Microphone permission is granted.');
//       } else {
//         console.log('Microphone permission denied.');
//       }
//     } catch (error) {
//       console.error('Microphone permission error:', error);
//     }
//   };

//   Voice.onSpeechStart = () => setIsRecording(true);
//   Voice.onSpeechEnd = () => setIsRecording(false);
//   Voice.onSpeechError = (err) => setError(err.error);
//   Voice.onSpeechResults = (result) => setResult(result.value[0]);

//   const Start = async () => {
//     try {
//       if (isRecording) return;
//       await Voice.start('en-US');
//     } catch (err) {
//       setError(err);
//     }
//   };

//   const Stop = async () => {
//     try {
//       if (!isRecording) return;
//       await Voice.stop();
//     } catch (err) {
//       setError(err);
//     }
//   };

//   return (
//     <View style={{ alignItems: 'center', margin: 20 }}>
//       <Text>Voice</Text>
//       <Text>{result}</Text>
//       <Text>{error}</Text>
//       <TouchableOpacity onPress={isRecording ? Stop : Start}>
//         <Text>{isRecording ? 'Stop Recording' : 'Start Recording'}</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default VoiceRecognition;







// import React, { useState, useEffect } from 'react';
// import { View, Text, TouchableOpacity } from 'react-native';
//  import Voice from '@react-native-voice/voice';
// import Tts from 'react-native-tts';
// import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';

// const VoiceToTextConverter = () => {
//   const [isListening, setIsListening] = useState(false);
//   const [recognizedText, setRecognizedText] = useState('');

//   useEffect(() => {
//     Voice.onSpeechResults = onSpeechResults;

//     // Request microphone permission when the component mounts.
//     request(PERMISSIONS.ANDROID.RECORD_AUDIO)
//       .then((result) => {
//         if (result === RESULTS.GRANTED) {
//           console.log('Microphone permission granted');
//         } else {
//           console.error('Microphone permission denied');
//         }
//       });

//     return () => {
//       Voice.destroy().then(Voice.removeAllListeners);
//     };
//   }, []);

//   const startListening = async () => {
//     try {
//       await Voice.start('en-US');
//       setIsListening(true);
//       setRecognizedText('');
//     } catch (e) {
//       console.error(e);
//     }
//   };

//   const stopListening = async () => {
//     try {
//       await Voice.stop();
//       setIsListening(false);
//     } catch (e) {
//       console.error(e);
//     }
//   };

//   const onSpeechResults = (e) => {
//     setRecognizedText(e.value[0]);
//     Tts.speak(e.value[0]);
//   };

//   return (
//     <View>
//       <TouchableOpacity onPress={isListening ? stopListening : startListening}>
//         <Text>{isListening ? 'Stop Listening' : 'Start Listening'}</Text>
//       </TouchableOpacity>
//       <Text>Recognized Text: {recognizedText}</Text>
//     </View>
//   );
// };

// export default VoiceToTextConverter;

import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  ScrollView,
} from 'react-native';

// import Voice
//import Voice from 'react-native-voice';
import Voice from '@react-native-voice/voice';
const VoiceToTextConverter = () => {
  const [pitch, setPitch] = useState('');
  const [error, setError] = useState('');
  const [end, setEnd] = useState('');
  const [started, setStarted] = useState('');
  const [results, setResults] = useState([]);
  const [partialResults, setPartialResults] = useState([]);

  useEffect(() => {
    //Setting callbacks for the process status
    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechEnd = onSpeechEnd;
    Voice.onSpeechError = onSpeechError;
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechPartialResults = onSpeechPartialResults;
    Voice.onSpeechVolumeChanged = onSpeechVolumeChanged;

    return () => {
      //destroy the process after switching the screen
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const onSpeechStart = (e) => {
    //Invoked when .start() is called without error
    console.log('onSpeechStart: ', e);
    setStarted('√');
  };

  const onSpeechEnd = (e) => {
    //Invoked when SpeechRecognizer stops recognition
    console.log('onSpeechEnd: ', e);
    setEnd('√');
  };

  const onSpeechError = (e) => {
    //Invoked when an error occurs.
    console.log('onSpeechError: ', e);
    setError(JSON.stringify(e.error));
  };

  const onSpeechResults = (e) => {
    //Invoked when SpeechRecognizer is finished recognizing
    console.log('onSpeechResults: ', e);
    setResults(e.value);
  };

  const onSpeechPartialResults = (e) => {
    //Invoked when any results are computed
    console.log('onSpeechPartialResults: ', e);
    setPartialResults(e.value);
  };

  const onSpeechVolumeChanged = (e) => {
    //Invoked when pitch that is recognized changed
    console.log('onSpeechVolumeChanged: ', e);
    setPitch(e.value);
  };

  const startRecognizing = async () => {
    //Starts listening for speech for a specific locale
    try {
      await Voice.start('en-US');
      setPitch('');
      setError('');
      setStarted('');
      setResults([]);
      setPartialResults([]);
      setEnd('');
    } catch (e) {
      //eslint-disable-next-line
      console.error(e);
    }
  };

  const stopRecognizing = async () => {
    //Stops listening for speech
    try {
      await Voice.stop();
    } catch (e) {
      //eslint-disable-next-line
      console.error(e);
    }
  };

  const cancelRecognizing = async () => {
    //Cancels the speech recognition
    try {
      await Voice.cancel();
    } catch (e) {
      //eslint-disable-next-line
      console.error(e);
    }
  };

  const destroyRecognizer = async () => {
    //Destroys the current SpeechRecognizer instance
    try {
      await Voice.destroy();
      setPitch('');
      setError('');
      setStarted('');
      setResults([]);
      setPartialResults([]);
      setEnd('');
    } catch (e) {
      //eslint-disable-next-line
      console.error(e);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Text style={styles.titleText}>
          Speech to Text Conversion in React Native |
          Voice Recognition
        </Text>
        <Text style={styles.textStyle}>
          Press mike to start Recognition
        </Text>
        <View style={styles.headerContainer}>
          <Text style={styles.textWithSpaceStyle}>
            {`Started: ${started}`}
          </Text>
          <Text style={styles.textWithSpaceStyle}>
            {`End: ${end}`}
          </Text>
        </View>
        <View style={styles.headerContainer}>
          <Text style={styles.textWithSpaceStyle}>
            {`Pitch: \n ${pitch}`}
          </Text>
          <Text style={styles.textWithSpaceStyle}>
            {`Error: \n ${error}`}
          </Text>
        </View>
        <TouchableHighlight onPress={startRecognizing}>
          <Image
            style={styles.imageButton}
            source={{
              uri:
                'https://raw.githubusercontent.com/AboutReact/sampleresource/master/microphone.png',
            }}
          />
        </TouchableHighlight>
        <Text style={styles.textStyle}>
          Partial Results
        </Text>
        <ScrollView>
          {partialResults.map((result, index) => {
            return (
              <Text
                key={`partial-result-${index}`}
                style={styles.textStyle}>
                {result}
              </Text>
            );
          })}
        </ScrollView>
        <Text style={styles.textStyle}>
          Results
        </Text>
        <ScrollView style={{marginBottom: 42}}>
          {results.map((result, index) => {
            return (
              <Text
                key={`result-${index}`}
                style={styles.textStyle}>
                {result}
              </Text>
            );
          })}
        </ScrollView>
        <View style={styles.horizontalView}>
          <TouchableHighlight
            onPress={stopRecognizing}
            style={styles.buttonStyle}>
            <Text style={styles.buttonTextStyle}>
              Stop
            </Text>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={cancelRecognizing}
            style={styles.buttonStyle}>
            <Text style={styles.buttonTextStyle}>
              Cancel
            </Text>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={destroyRecognizer}
            style={styles.buttonStyle}>
            <Text style={styles.buttonTextStyle}>
              Destroy
            </Text>
          </TouchableHighlight>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default VoiceToTextConverter;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    padding: 5,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  titleText: {
    fontSize: 22,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  buttonStyle: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 15,
    padding: 10,
    backgroundColor: '#8ad24e',
    marginRight: 2,
    marginLeft: 2,
  },
  buttonTextStyle: {
    color: '#fff',
    textAlign: 'center',
  },
  horizontalView: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
  },
  textStyle: {
    textAlign: 'center',
    padding: 12,
  },
  imageButton: {
    width: 50,
    height: 50,
  },
  textWithSpaceStyle: {
    flex: 1,
    textAlign: 'center',
    color: '#B0171F',
  },
});