const nextTranslate = require("next-translate");

module.exports = {
  reactStrictMode: true,

  images: {
    domains: ['api.rrpo.uz', 'dl.bs365.uz', 'api.bs365.uz'],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  ...nextTranslate(),
  compress: false,
  "plugins": [
    "postcss-flexbugs-fixes",
    [
      "postcss-preset-env",
      {
        "autoprefixer": {
          "flexbox": "no-2009"
        },
        "stage": 3,
        "features": {
          "custom-properties": false
        }
      }
    ],
    [
      '@fullhuman/postcss-purgecss',
      {
        content: [
            './pages/**/*.{js,jsx,ts,tsx}',
            './components/**/*.{js,jsx,ts,tsx}'
        ],
        defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
        safelist: ["html", "body"]
      }
    ],
  ]
}
