import { StyleSheet } from 'react-native';
import colors from '../../styles/colors';
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
  pickerContainer: {
    paddingStart: sizes.input.padding / 2,

    borderColor: colors.input.border,
    borderRadius: sizes.input.border.radius,
    borderStyle: 'solid',
    borderBottomWidth: sizes.input.border.width,

    backgroundColor: colors.input.background
  },
  picker: {
    minWidth: '100%',
    maxWidth: '100%'
  },
  option: {
    fontSize: sizes.font.inputContent
  }
});
