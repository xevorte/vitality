interface Reactotron {
  log: (message: string | Record<string, any> | undefined) => void;
  warn: (message: string | Record<string, any> | undefined) => void;
  error: (message: string | Record<string, any> | undefined) => void;
}

interface Console {
  tron: ReactotronReactNative;
}
