import { KeyboardTypeOptions, Text, TextInput as TextInputRN, View } from 'react-native';
import global from '../../styles/global';
import styles from './styles';

export interface ITextInputProps {
  editable?: boolean;
  keyboardType?: KeyboardTypeOptions;
  label: string;
  maxLength?: number;
  value: string;
  onChangeText?: (text: string) => void;
}

export default function TextInput(props: ITextInputProps) {
  let { editable, keyboardType, label, maxLength, value, onChangeText } = props;

  return (
    <View style={styles.container}>
      <Text style={[global.bold, styles.label]}>{label}</Text>

      <TextInputRN
        style={styles.input}
        editable={editable}
        keyboardType={keyboardType}
        maxLength={maxLength}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
}
