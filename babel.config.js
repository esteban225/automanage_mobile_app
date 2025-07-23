module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      // Si tienes otros plugins, colócalos aquí arriba.
      // Por ejemplo:
      // ['@babel/plugin-proposal-decorators', { 'legacy': true }],
      // '@babel/plugin-transform-flow-strip-types',
      
      "react-native-reanimated/plugin", // ¡ESTA LÍNEA DEBE SER SIEMPRE LA ÚLTIMA EN LA LISTA DE PLUGINS!
    ],
  };
};
