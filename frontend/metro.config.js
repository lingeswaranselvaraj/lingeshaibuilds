const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

// Apply NativeWind first, then override resolver AFTER so our settings aren't clobbered.
const nwConfig = withNativeWind(config, { input: "./global.css" });

// Enable package exports resolution.
// Use "react-native" condition first so Zustand (and similar packages) resolve
// to their CJS builds (.js) instead of ESM (.mjs) which contains import.meta
// and crashes Metro's web bundler.
nwConfig.resolver = {
  ...nwConfig.resolver,
  unstable_enablePackageExports: true,
  unstable_conditionNames: ["react-native", "require", "default"],
};

module.exports = nwConfig;
