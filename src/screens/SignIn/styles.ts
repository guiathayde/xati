import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F9',
    flexDirection: 'column',
    alignItems: 'center',
  },
  signInButton: {
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 16,
    minWidth: '85%',
    padding: 20,
    marginBottom: 16,
    backgroundColor: '#FFFFFF',
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  signInButtonText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#243443',
  },
});
