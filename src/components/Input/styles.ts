import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderRadius: 8,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#aab0b7',
    backgroundColor: '#FFFFFF',
  },
  input: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    paddingEnd: 8,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconInput: {
    width: 24,
    height: 24,
    marginRight: 16,
  },
});
