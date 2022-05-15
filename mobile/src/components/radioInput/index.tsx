import { Text, View } from 'react-native';
import { RadioButton } from 'react-native-paper';
import global from '../../styles/global';
import styles from './styles';

interface IRadioInputProps {
  label: string;
  options: string[];
  selectedOption: string;
  onValueChange: (value: string) => void;
}

export default function RadioInput(props: IRadioInputProps) {
  let { label, options, selectedOption, onValueChange } = props;

  return (
    <View style={styles.container}>
      <Text style={[global.bold, styles.label]}>{label}</Text>

      <View style={styles.radiosContainer}>
        {
          options.map((option, index) => (
            <View key={index} style={styles.radio}>
              <RadioButton
                status={selectedOption === option ? 'checked' : 'unchecked'}
                value={option}
                onPress={() => onValueChange(option)}
              />
              <Text style={styles.radioLabel}>{option}</Text>
            </View>
          ))
        }
      </View>
    </View>
  );
}
