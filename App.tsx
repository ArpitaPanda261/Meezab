import React, {useRef, useState, useEffect} from 'react';
import {BackHandler, SafeAreaView, Alert, StyleSheet} from 'react-native';
import {WebView} from 'react-native-webview';

function App() {
  const webViewRef = useRef<WebView>(null);
  const [canGoBack, setCanGoBack] = useState(false);

  useEffect(() => {
    const handleBackPress = () => {
      if (canGoBack) {
        webViewRef.current?.goBack();
        return true;
      } else {
        Alert.alert('Exit App', 'Do you want to close the app?', [
          {text: 'Cancel', style: 'cancel'},
          {text: 'Exit', onPress: () => BackHandler.exitApp()},
        ]);
        return true;
      }
    };

    BackHandler.addEventListener('hardwareBackPress', handleBackPress);
    return () =>
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
  }, [canGoBack]);

  return (
    <SafeAreaView style={styles.container}>
      <WebView
        ref={webViewRef}
        source={{uri: 'https://www.meezab.in'}}
        onNavigationStateChange={navState => setCanGoBack(navState.canGoBack)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
