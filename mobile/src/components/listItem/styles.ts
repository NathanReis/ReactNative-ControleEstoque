import { StyleSheet } from 'react-native';
import colors from '../../styles/colors';
import sizes from '../../styles/sizes';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    marginVertical: sizes.listItem.margin.vertical,
    padding: sizes.listItem.padding,

    borderRadius: sizes.listItem.border.radius,

    backgroundColor: colors.card.background
  },
  mainContent: {
    fontSize: sizes.font.listItemMainContent
  },
  secondaryContent: {
    fontSize: sizes.font.listItemSecondaryContent
  },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  button: {
    marginHorizontal: sizes.listItemButton.margin.horizontal,
    padding: sizes.listItemButton.padding,

    borderRadius: sizes.listItemButton.border.radius
  },
  editButton: {
    backgroundColor: colors.warning.background
  },
  removeButton: {
    backgroundColor: colors.danger.background
  }
});
