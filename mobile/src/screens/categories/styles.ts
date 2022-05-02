import { StyleSheet } from 'react-native';
import colors from '../../styles/colors';
import sizes from '../../styles/sizes';

export default StyleSheet.create({
  listContainer: {
    height: '80%',
    width: '100%',

    marginTop: sizes.cardListContainer.margin.top
  },
  card: {
    marginVertical: sizes.card.margin.vertical,
    padding: sizes.card.padding,

    backgroundColor: colors.card.background
  }
});
