module.exports = {
  presets: ['@react-native/babel-preset', 'nativewind/babel'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          services: './src/services',
          components: './src/components',
          screens: './src/screens',
          utils: './src/utils',
          const: './src/const',
          themes: './src/themes',
          api: './src/api',
          stores: './src/stores',
          config: './src/config',
          models: './src/models',
          helper: './src/helper',
          modules: './src/modules',
          images: './src/images',
          navigation: './src/navigation',
        },
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
      },
    ],
    'react-native-reanimated/plugin',
  ],
  env: {
    production: {
      plugins: ['ignite-ignore-reactotron', 'transform-remove-console'],
    },
  },
};
