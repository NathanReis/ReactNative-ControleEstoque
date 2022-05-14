import { Text, TextInput as TextInputRN, View } from 'react-native';
import global from '../../styles/global';
import styles from './styles';

interface ITextInputProps {
  editable?: boolean;
  label: string;
  value: string;
  onChangeText?: (text: string) => void;
}

export default function TextInput(props: ITextInputProps) {
  let { editable, label, value, onChangeText } = props;

  return (
    <View style={styles.container}>
      <Text style={[global.bold, styles.label]}>{label}</Text>

      <TextInputRN
        style={styles.input}
        editable={editable}
        keyboardType='default'
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
}
