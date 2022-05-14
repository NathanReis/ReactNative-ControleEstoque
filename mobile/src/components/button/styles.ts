import { StyleSheet } from 'react-native';
import colors from '../../styles/colors';
import sizes from '../../styles/sizes';

export default StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',

    marginVertical: sizes.button.margin.vertical,
    padding: sizes.button.padding,

    borderRadius: sizes.button.border.radius,

    backgroundColor: colors.success.background,
  },
  title: {
    color: colors.success.text,
    fontSize: sizes.font.textButton
  }
});
