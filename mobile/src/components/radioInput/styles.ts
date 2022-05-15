import { StyleSheet } from 'react-native';
import sizes from '../../styles/sizes';

export default StyleSheet.create({
  container: {
    flexDirection: 'column',

    width: sizes.input.width
  },
  label: {
    marginBottom: sizes.inputLabel.margin.bottom,

    fontSize: sizes.font.inputLabel,

    zIndex: 8000
  },
  radiosContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',

    width: sizes.input.width
  },
  radio: {
    alignItems: 'center'
  },
  radioLabel: {
    fontSize: sizes.font.inputContent
  }
});
