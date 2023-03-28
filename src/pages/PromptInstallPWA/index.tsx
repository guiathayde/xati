import { useMemo, useState } from 'react';
import Modal from 'react-modal';

import { useWindowDimensions } from '../../hooks/windowDimensions';
import { useIOSInstallPrompt } from '../../hooks/promptInstallPWA/iosInstallPrompt';
import { useWebInstallPrompt } from '../../hooks/promptInstallPWA/webInstallPrompt';
import { useTranslate } from '../../hooks/translate';

import { RectangleButton } from '../../components/RectangleButton';

import { modalStyles, Header, Body, IOSPrompt } from './styles';

export function PromptInstallPWA() {
  const { isMobile, height } = useWindowDimensions();
  const iOSInstallPrompt = useIOSInstallPrompt();
  const webInstallPrompt = useWebInstallPrompt();
  const { strings } = useTranslate();

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
        <span>{strings.promptInstallPWA.header.title}</span>
        <button
          type="button"
          onClick={() => {
            handleIOSInstallDeclined();
            handleWebInstallDeclined();
            setIsOpen(false);
          }}
        >
          {strings.promptInstallPWA.header.button}
        </button>
      </Header>

      <Body>{strings.promptInstallPWA.body}</Body>

      {isWebInstallPrompt && (
        <RectangleButton onClick={handleWebInstallAccepted}>
          {strings.promptInstallPWA.web.button}
        </RectangleButton>
      )}

      {isIOSInstallPrompt && (
        <IOSPrompt>
          <div>
            <i className="material-icons share">ios_share</i>
            <span>1) {strings.promptInstallPWA.ios.share}</span>
          </div>
          <div>
            <i className="material-icons-outlined add">add_box</i>
            <span>2) {strings.promptInstallPWA.ios.addHome}</span>
          </div>
        </IOSPrompt>
      )}
    </Modal>
  );
}
