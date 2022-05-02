import { GestureResponderEvent, Text, TouchableOpacity } from 'react-native';
import global from '../../styles/global';
import styles from './styles';

interface IButtonProps {
  colors?: {
    background: string,
    text: string
  };
  title: string;
  onPress: (event: GestureResponderEvent) => void;
}

export default function Button(props: IButtonProps) {
  let { colors, title, onPress } = props;

  return (
    <TouchableOpacity
      style={[
        styles.button,
        colors && { backgroundColor: colors.background }
      ]}
      onPress={onPress}
    >
      <Text
        style={[
          global.bold,
          styles.title,
          colors && { color: colors.text }
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}
