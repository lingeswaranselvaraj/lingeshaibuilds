const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

// Fix: enable package exports so Metro resolves zustand (and other ESM-only
// packages that use import.meta) to their CJS builds via package.json exports.
config.resolver = {
  ...config.resolver,
  unstable_enablePackageExports: true,
};

module.exports = withNativeWind(config, { input: "./global.css" });
