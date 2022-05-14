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
  input: {
    minWidth: '100%',
    maxWidth: '100%',

    padding: sizes.input.padding,

    borderColor: colors.input.border,
    borderRadius: sizes.input.border.radius,
    borderStyle: 'solid',
    borderBottomWidth: sizes.input.border.width,

    backgroundColor: colors.input.background,

    fontSize: sizes.font.inputContent
  }
});
