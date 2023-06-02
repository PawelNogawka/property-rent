const path = require("path");

module.exports = {
  images: {
    domains: ["res.cloudinary.com"],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.module.rules.push({
        test: /\.html$/,
        use: "html-loader",
      });
    }

    config.module.rules.push({
      test: /@mapbox\/node-pre-gyp\/lib\/.*\.js$/,
      loader: "null-loader",
    });

    config.resolve.alias["@mapbox/node-pre-gyp"] = path.resolve(
      __dirname,
      "node_modules/@mapbox/node-pre-gyp/lib/util/nw-pre-gyp"
    );

    return config;
  },
  swcMinify: false,
  swcLoaderOptions: {
    jsc: {
      externalHelpers: true,
    },
  },
};
