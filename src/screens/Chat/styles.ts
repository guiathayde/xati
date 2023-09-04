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
  messagesContainer: {
    flex: 1,
    width: '100%',
    paddingTop: 16,
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
  messageUserToChat: {
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 10,
    marginStart: 16,
    marginEnd: 'auto',
  },
  messageUserToChatText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#243443',
  },
  messageCurrentUser: {
    backgroundColor: '#377DFF',
    padding: 10,
    borderRadius: 10,
    marginStart: 'auto',
    marginEnd: 16,
  },
  messageCurrentUserText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#FFFFFF',
  },
});
