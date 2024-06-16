module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    ["module-resolver", {
      "root": ["."],
      extensions: ['.ts', '.tsx', '.js', 'jsx', '.ios.js', '.android.js'],
      alias: {
          '@components': './src/lib/components',
          '@theme': './src/lib/theme',
          '@utils': './src/lib/utils',
          '@hooks': './src/lib/hooks',
          '@core': './src/core',
          '@lang': './src/lang',
          '@lib': './src/lib',
          '@screens': './src/screens',
          '@routes': './src/routes',
          '@navigation': './src/navigation',
          '@store': './src/store/',
          "@types": "./src/lib/types",
      },
    }],
    
  ],
};
