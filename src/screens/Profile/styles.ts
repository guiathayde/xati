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
  photoContainer: {
    width: 190,
    height: 190,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  photoImage: {
    width: 190,
    height: 190,
    borderRadius: 95,
    alignItems: 'center',
    justifyContent: 'center',
  },
  photoEditButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 50,
    height: 50,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
    backgroundColor: '#377DFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  photoEditIcon: {
    width: 24,
    height: 24,
  },
  selectPhotoModalContainer: {
    width: '100%',
    marginTop: 'auto',
    paddingTop: 16,
    paddingBottom: 32,
    backgroundColor: 'white',
    alignItems: 'center',
    borderTopStartRadius: 40,
    borderTopEndRadius: 40,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  selectPhotoModalHandler: {
    width: 3.375 * 16,
    height: 0.5 * 16,
    borderRadius: 2.5 * 16,
    backgroundColor: '#377DFF',
    marginBottom: 16,
  },
  selectPhotoModalButton: {
    width: '100%',
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectPhotoModalButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 1.25 * 16,
    textAlign: 'center',
    color: '#243443',
  },
  selectPhotoModalDivider: {
    width: '80%',
    height: 1,
    backgroundColor: '#243443',
    marginTop: 16,
    marginBottom: 16,
  },
});
