import { StyleSheet } from 'react-native';
import sizes from '../../styles/sizes';

export default StyleSheet.create({
  content: {
    alignSelf: 'center',

    marginBottom: sizes.title.margin.bottom,
    marginTop: sizes.title.margin.top,

    fontSize: sizes.font.pageTitle
  }
});
