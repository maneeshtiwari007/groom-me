// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig: getExpoDefaultConfig } = require('expo/metro-config');
const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = {}//getDefaultConfig(__dirname);

//module.exports = config;
module.exports = mergeConfig(getDefaultConfig(__dirname), getExpoDefaultConfig(__dirname), config);
