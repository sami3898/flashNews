import React, { useState } from 'react';
import { View, Modal, ActivityIndicator, StyleSheet, Platform } from 'react-native';
import { WebView } from 'react-native-webview';
import CustomStatusBar from './CustomStatusBar';
import { COLORS } from '../utils/Colors';
import NavigationHeader from './NavigationHeader';

interface WebViewModalProps {
  isVisible: boolean;
  source: string;
  toggleModal: (visible: boolean) => void;
}

const WebViewModal: React.FC<WebViewModalProps> = ({
  isVisible,
  source,
  toggleModal,
}: WebViewModalProps) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Modal visible={isVisible} animationType="slide" onRequestClose={() => toggleModal(!isVisible)}>
      <View style={styles.container}>
        {Platform.OS === 'ios' && <CustomStatusBar backgroundColor={COLORS.RED_COLOR} contentType='light-content' />}
        <NavigationHeader onPress={() => toggleModal(!isVisible)} />
        <WebView
          source={{ uri: source }}
          onLoadStart={() => setIsLoading(true)}
          onLoadEnd={() => setIsLoading(false)}
          originWhitelist={['*']}
          mediaPlaybackRequiresUserAction={false}
          androidLayerType="hardware"
          mixedContentMode="always"
          textZoom={100}
          decelerationRate={0.998}
          allowsInlineMediaPlayback
          cacheEnabled
        />
        {isLoading && <ActivityIndicator style={styles.loaderStyle} size='large' color={COLORS.RED_COLOR} />}
      </View>
    </Modal>
  );
};

export default WebViewModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loaderStyle: {
    ...StyleSheet.absoluteFillObject,
  },
});
