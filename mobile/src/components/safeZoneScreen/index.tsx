import { ReactNode } from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, SafeAreaView, View } from 'react-native';
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import styles from './styles';

interface ISafeZoneScreenProps {
  children: ReactNode;
  isWithoutScroll?: boolean;
}

export default function SafeZoneScreen(props: ISafeZoneScreenProps) {
  let { children, isWithoutScroll } = props;

  return (
    <SafeAreaView>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          {
            isWithoutScroll
              ? (
                <View style={styles.container}>
                  {children}
                </View>
              )
              : (
                <ScrollView contentContainerStyle={styles.container}>
                  {children}
                </ScrollView>
              )
          }
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView >
  );
}
