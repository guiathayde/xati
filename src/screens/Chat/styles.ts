import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F9',
    alignItems: 'center',
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  backButton: {
    position: 'relative',
    top: 0,
    left: 0,
  },
  userToChatName: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
  },
  userToChatProfilePhoto: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  messagesContainer: {
    flexDirection: 'column-reverse',
    padding: 16,
  },
  messageText: {
    maxWidth: '85%',
    padding: 10,
    borderRadius: 10,
    fontFamily: 'Inter-Medium',
    fontSize: 16,
  },
});
