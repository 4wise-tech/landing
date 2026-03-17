// Disable Watchman usage to avoid startup stalls on machines without Watchman.
// Expo will still watch files using Node's filesystem watchers.
const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

config.watcher = {
  ...(config.watcher || {}),
  useWatchman: false,
};

module.exports = config;

