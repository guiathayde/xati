import { createContext, useContext, useMemo } from 'react';

interface TranslateContextData {
  language: string;

  strings: {
    signin: {
      signinWithPhone: {
        button: string;
      };
      enterPhoneNumber: {
        title: string;
        phoneNumberInputPlaceholder: string;
        button: string;
      };
      enterCode: {
        title: string;
        inputCodePlaceholder: string;
        button: string;
      };
    };
    promptInstallPWA: {
      header: {
        title: string;
        button: string;
      };
      body: string;
      web: {
        button: string;
      };
      ios: {
        share: string;
        addHome: string;
      };
    };
    profile: {
      selectPhotoModal: {
        takePhoto: string;
        chooseGallery: string;
      };
      imageCropModal: {
        rotation: string;
        cancel: string;
        continue: string;
        save: string;
        back: string;
      };
      title: string;
      inputNamePlaceholder: string;
      saveButton: string;
      inputPhonePlaceholder: string;
      logoutButton: string;
    };
    dashboard: {
      noChatFound: string;
      findUsersHere: string;
    };
    chat: {
      inputMessagePlaceholder: string;
      typing: string;
    };
    addUser: {
      title: string;
      inputPhonePlaceholder: string;
      userNotFound: string;
      unableTalkToYourself: string;
    };
  };
}

interface TranslateProviderProps {
  children: React.ReactNode;
}

const TranslateContext = createContext<TranslateContextData>(
  {} as TranslateContextData,
);

export function TranslateProvider({ children }: TranslateProviderProps) {
  const language = useMemo(() => navigator.language, [navigator.language]);

  const strings = useMemo(() => {
    switch (language) {
      case 'pt-BR' || 'pt-br':
        return {
          signin: {
            signinWithPhone: {
              button: 'Entrar com seu número de telefone',
            },
            enterPhoneNumber: {
              title: 'Continue com o número de telefone',
              phoneNumberInputPlaceholder: 'Digite o número do telefone',
              button: 'Continuar',
            },
            enterCode: {
              title: 'Digite o código enviado para o seu telefone',
              inputCodePlaceholder: 'Digite o código',
              button: 'Continuar',
            },
          },
          promptInstallPWA: {
            header: {
              title: 'Instalar o app',
              button: 'Cancelar',
            },
            body: 'Este site tem funcionalidade de aplicativo. Adicione-o à sua tela inicial para usá-lo em tela cheia e offline.',
            web: {
              button: 'Baixar',
            },
            ios: {
              share: "Presione o botão de 'Compartilhar'",
              addHome: "Pressione 'Adicionar à Tela de Início'",
            },
          },
          profile: {
            selectPhotoModal: {
              takePhoto: 'Tirar foto',
              chooseGallery: 'Escolher da galeria',
            },
            imageCropModal: {
              rotation: 'Girar',
              cancel: 'Cancelar',
              continue: 'Continuar',
              save: 'Salvar',
              back: 'Voltar',
            },
            title: 'Perfil',
            inputNamePlaceholder: 'Nome',
            saveButton: 'Salvar',
            inputPhonePlaceholder: 'Telefone',
            logoutButton: 'Sair',
          },
          dashboard: {
            noChatFound: 'Nenhum chat encontrado',
            findUsersHere: 'Encontre usuários aqui',
          },
          chat: {
            inputMessagePlaceholder: 'Mensagem',
            typing: 'Digitando...',
          },
          addUser: {
            title: 'Adicionar contato',
            inputPhonePlaceholder: 'Telefone',
            userNotFound: 'Contato não encontrado',
            unableTalkToYourself: 'Você não consegue conversar com você mesmo',
          },
        };

      default:
        return {
          signin: {
            signinWithPhone: {
              button: 'Sign in with your phone number',
            },
            enterPhoneNumber: {
              title: 'Continue with phone number',
              phoneNumberInputPlaceholder: 'Enter your phone number',
              button: 'Continue',
            },
            enterCode: {
              title: 'Enter the code sent to your phone',
              inputCodePlaceholder: 'Enter the code',
              button: 'Continue',
            },
          },
          promptInstallPWA: {
            header: {
              title: 'Instalar o app',
              button: 'Cancelar',
            },
            body: 'Este site tem funcionalidade de aplicativo. Adicione-o à sua tela inicial para usá-lo em tela cheia e offline.',
            web: {
              button: 'Baixar',
            },
            ios: {
              share: "Press the 'Share' button",
              addHome: "Press 'Add to Home Screen'",
            },
          },
          profile: {
            selectPhotoModal: {
              takePhoto: 'Take a photo',
              chooseGallery: 'Choose from gallery',
            },
            imageCropModal: {
              rotation: 'Rotation',
              cancel: 'Cancel',
              continue: 'Continue',
              save: 'Save',
              back: 'Back',
            },
            title: 'Profile',
            inputNamePlaceholder: 'Name',
            saveButton: 'Save',
            inputPhonePlaceholder: 'Phone',
            logoutButton: 'Logout',
          },
          dashboard: {
            noChatFound: 'No chat found',
            findUsersHere: 'Find users here',
          },
          chat: {
            inputMessagePlaceholder: 'Message',
            typing: 'Typing...',
          },
          addUser: {
            title: 'Add contact',
            inputPhonePlaceholder: 'Phone',
            userNotFound: 'Contact not found',
            unableTalkToYourself: 'Unable to talk to yourself',
          },
        };
    }
  }, [language]);

  return (
    <TranslateContext.Provider
      value={{
        language,
        strings,
      }}
    >
      {children}
    </TranslateContext.Provider>
  );
}

export function useTranslate() {
  const context = useContext(TranslateContext);

  if (!context) {
    throw new Error('useTranslate must be used within an TranslateProvider');
  }

  return context;
}
