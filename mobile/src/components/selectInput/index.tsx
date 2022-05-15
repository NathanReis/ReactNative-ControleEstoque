import { Picker } from '@react-native-picker/picker';
import { Text, View } from 'react-native';
import global from '../../styles/global';
import styles from './styles';

interface ISelectInputProps {
  label: string;
  options: ISelectOptionsProps[];
  selectedValue: string;
  onValueChange: (value: string) => void;
}

interface ISelectOptionsProps {
  label: string;
  value: string;
}

export default function SelectInput(props: ISelectInputProps) {
  let { label, options, selectedValue, onValueChange } = props;

  return (
    <View style={styles.container}>
      <Text style={[global.bold, styles.label]}>{label}</Text>

      <View style={styles.pickerContainer}>
        <Picker
          style={styles.picker}
          selectedValue={selectedValue}
          onValueChange={onValueChange}
        >
          <Picker.Item
            style={styles.option}
            label='Escolha uma...'
            value=''
          />
          {
            options.map((option, index) => (
              <Picker.Item
                key={index}
                style={styles.option}
                label={option.label}
                value={option.value}
              />
            ))
          }
        </Picker>
      </View>
    </View>
  );
}
