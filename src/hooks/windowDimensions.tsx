import {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from 'react';

interface WindowDimensionsContextData {
  width: number;
  height: number;
  isMobile: boolean;
}

const WindowDimensionsContext = createContext<WindowDimensionsContextData>(
  {} as WindowDimensionsContextData,
);

interface WindowDimensionsProviderProps {
  children: ReactNode;
}
export function WindowDimensionsProvider({
  children,
}: WindowDimensionsProviderProps) {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions(),
  );
  const [isMobile, setIsMobile] = useState(false);

  function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height,
    };
  }

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);

    setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <WindowDimensionsContext.Provider
      value={{
        width: windowDimensions.width,
        height: windowDimensions.height,
        isMobile,
      }}
    >
      {children}
    </WindowDimensionsContext.Provider>
  );
}

export function useWindowDimensions(): WindowDimensionsContextData {
  const context = useContext(WindowDimensionsContext);

  return context;
}
