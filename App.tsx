import { useState } from 'react';
import { Text, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import RNBackgroundDownloader from '@kesha-antonov/react-native-background-downloader'

RNBackgroundDownloader.setConfig({
  isLogsEnabled: true,
});

export default function App() {
  const [taskId, setTaskId] = useState(0);
  const runDownloadTask = () => {
    // Start the download task with the custom task ID.
    const task = RNBackgroundDownloader.download({
      id: taskId.toString(),
      url: 'http://ipv4.download.thinkbroadband.com/10MB.zip',
      destination: '/storage/emulated/0/Download/10MB.zip',
      isAllowedOverMetered: false,
      isAllowedOverRoaming: false,
      isNotificationVisible: true,
      notificationTitle: 'Anonymous Browser',
    });
    setTaskId((prev) => prev + 1);
    task
      .begin(async (handler) => {
        console.log(
          `Download started—expected ${handler.expectedBytes} bytes for ${fileName}.`
        );
      })
      .progress((handler) => {
        const progress = Math.floor(
          (handler.bytesDownloaded / handler.bytesTotal) * 100
        );
        console.log(`Download progress: ${progress}%`);
      })
      .done(async () => {
        console.log('Download complete!');
      })
      .error(({ error, errorCode }) => {
        console.error('Download error:', error, errorCode);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.paragraph}>
        Reproduce app for react-native-background-downloader project.
      </Text>
      <TouchableOpacity
        onPress={() => runDownloadTask()}>
        <Text>Run Background Download Task</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
