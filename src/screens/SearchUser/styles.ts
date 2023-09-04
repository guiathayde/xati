import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#F7F7F9',
    alignItems: 'center',
  },
  header: {
    marginTop: 32,
    marginBottom: 44,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    width: '100%',
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
  },
  userNotFoundContainer: {
    marginTop: 'auto',
    marginBottom: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userNotFoundText: {
    fontFamily: 'Inter-Bold',
    fontSize: 32,
    color: '#243443',
  },
  userNotFoundIcon: {
    width: 84,
    height: 84,
  },
  userFoundContainer: {
    marginTop: 44,
    width: '100%',
    paddingHorizontal: 28,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  userFoundProfilePhoto: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  userFoundName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#243443',
  },
  userFoundChevronRight: {
    width: 24,
    height: 24,
  },
});
