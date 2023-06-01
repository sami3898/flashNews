import { View, Text, Modal, ActivityIndicator, StyleSheet, Platform } from 'react-native'
import React, { useState } from 'react'
import {WebView} from 'react-native-webview';
import CustomStatusBar from './CustomStatusBar';
import { COLORS } from '../utils/Colors';
import AppHeader from './AppHeader';
import NavigationHeader from './NavigationHeader';

interface WebViewModalProps {
    isVisible: boolean;
    source: string;
    toggleModal: (visible: boolean) => void;
}

const WebViewModal: React.FC<WebViewModalProps> = (props: WebViewModalProps) => {

    const {isVisible, source, toggleModal} = props;

    const [isLoading, setIsLoading] = useState<Boolean>(false)

  return (
    <Modal
        visible={isVisible}
        animationType='slide'
        onRequestClose={() => toggleModal(!isVisible)}
    >
        <View style={{flex: 1}}>
      {Platform.OS === 'ios' && <CustomStatusBar backgroundColor={COLORS.RED_COLOR} contentType='light-content' />}
      <NavigationHeader onPress={() => toggleModal(!isVisible)} />
      <WebView 
        source={{uri: source }}
        onLoadStart={() => setIsLoading(true)}
        onLoadEnd={() => setIsLoading(false)}
        originWhitelist={['*']}
        mediaPlaybackRequiresUserAction={false}
        androidLayerType="hardware"
        mixedContentMode="always"
        textZoom={100}
        decelerationRate={0.998}
        allowsInlineMediaPlayback={true}
        cacheEnabled
        // onShouldStartLoadWithRequest={(val) => console.log(val) }
      />
      {isLoading && <ActivityIndicator style={styles.loaderStye} size={'large'} color={COLORS.RED_COLOR} />}
      </View>
    </Modal>
  )
}

export default WebViewModal

const styles = StyleSheet.create({
    loaderStye: {
        ...StyleSheet.absoluteFillObject
    }
})