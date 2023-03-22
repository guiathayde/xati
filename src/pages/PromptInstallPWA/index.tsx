import { useMemo, useState } from 'react';
import Modal from 'react-modal';

import { useWindowDimensions } from '../../hooks/windowDimensions';
import { useIOSInstallPrompt } from '../../hooks/promptInstallPWA/iosInstallPrompt';
import { useWebInstallPrompt } from '../../hooks/promptInstallPWA/webInstallPrompt';

import { RectangleButton } from '../../components/RectangleButton';

import { modalStyles, Header, Body, IOSPrompt } from './styles';

export function PromptInstallPWA() {
  const { isMobile, height } = useWindowDimensions();
  const iOSInstallPrompt = useIOSInstallPrompt();
  const webInstallPrompt = useWebInstallPrompt();

  const isIOSInstallPrompt = iOSInstallPrompt.userShouldBePromptedToInstall;
  const handleIOSInstallDeclined =
    iOSInstallPrompt.handleUserSeeingInstallPrompt;

  const isWebInstallPrompt = webInstallPrompt.installPromptEvent;
  const handleWebInstallDeclined = webInstallPrompt.handleInstallDeclined;
  const handleWebInstallAccepted = webInstallPrompt.handleInstallAccepted;

  const modalMarginBottom = useMemo(() => {
    if (isMobile) return 0;

    const spaceAvailable = height * 0.05;
    return spaceAvailable / 2;
  }, [isMobile, height]);

  const [isOpen, setIsOpen] = useState(true);

  if (!isIOSInstallPrompt && !isWebInstallPrompt) return null;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => setIsOpen(false)}
      shouldCloseOnEsc
      shouldCloseOnOverlayClick
      ariaHideApp={false}
      style={{
        overlay: modalStyles.overlay,
        content: {
          ...modalStyles.content,
          marginBottom: isMobile ? 0 : modalMarginBottom,
          borderBottomLeftRadius: isMobile ? 0 : 12,
          borderBottomRightRadius: isMobile ? 0 : 12,
        },
      }}
    >
      <Header>
        <span>Install this app?</span>
        <button
          type="button"
          onClick={() => {
            handleIOSInstallDeclined();
            handleWebInstallDeclined();
            setIsOpen(false);
          }}
        >
          Cancel
        </button>
      </Header>

      <Body>
        This website has app functionality. Add it to your home screen to use it
        in fullscreen and while offline.
      </Body>

      {isWebInstallPrompt && (
        <RectangleButton onClick={handleWebInstallAccepted}>
          Download
        </RectangleButton>
      )}

      {isIOSInstallPrompt && (
        <IOSPrompt>
          <div>
            <i className="material-icons share">ios_share</i>
            <span>1) Press the 'Share' button</span>
          </div>
          <div>
            <i className="material-icons-outlined add">add_box</i>
            <span>2) Press 'Add to Home Screen'</span>
          </div>
        </IOSPrompt>
      )}
    </Modal>
  );
}
