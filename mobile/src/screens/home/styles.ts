import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  amountInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    marginVertical: 16
  },
  amountInfoDescription: {
    marginEnd: 16,

    fontSize: 16,
    textAlign: 'center'
  },
  amountInfoValue: {
    fontSize: 24,
    textAlign: 'center'
  },
  alertIcon: {
    marginTop: -16
  }
});
