import React, {useEffect, useRef, useState} from 'react';
import {View, Text, Image} from 'react-native';
import * as tf from '@tensorflow/tfjs';
import {decodeJpeg} from '@tensorflow/tfjs-react-native';
import Canvas from "react-native-canvas"
import {Human} from "@vladmandic/human/dist/human.esm-nobundle"

const App = () => {
    const [isTfReady, setIsTfReady] = useState(false);
    const [result, setResult] = useState('');
    const image = useRef(null);

    const load = async () => {
        try {
            // Load mobilenet.
            await tf.ready();
            setIsTfReady(true);
            const human = new Human({
                modelBasePath: 'https://vladmandic.github.io/human/model/',
                backend: "cpu",
            debug: true});
            human.env.Canvas = Canvas;
            await human.load()
            console.log(human.models.stats())

        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        load();
    }, []);

    return (
      <View
        style={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
        }}
      >
          <Image
            ref={image}
            source={require('./basketball.jpg')}
            style={{width: 200, height: 200}}
          />
          {!isTfReady && <Text>Loading TFJS model...</Text>}
          {isTfReady && result === '' && <Text>Classifying...</Text>}
          {result !== '' && <Text>{result}</Text>}
      </View>
    );
};

export default App;
