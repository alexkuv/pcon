import webpack from 'webpack-stream';
import miniCss from 'mini-css-extract-plugin';

export const components = () => {
  return webpack({
    mode: app.isBuild ? 'production' : 'development',
    entry: {
      filename: './src/components/index.js'
    },
    output: {
      filename: 'scripts/scripts.min.js'
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /(node_modules)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'fonts/[name][ext]'
          }
        },
        {
          test: /\.(png|jpeg|jpg|svg|gif|webp)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'images/[name][ext]'
          }
        },
        {
          test: /\.(scss)$/,
          use: [
            miniCss.loader,
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  plugins: [
                    'postcss-import',
                    "postcss-preset-env"
                  ]
                }
              }
            },
            'sass-loader',
            {
              loader: 'sass-resources-loader',
              options: {
                resources: [
                  './src/components/_vars.scss'
                ],
              },
            }
          ],
        },
        {
          test: /\.(css)$/,
          use: [
            miniCss.loader,
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  plugins: [
                    'postcss-import',
                    "postcss-preset-env"
                  ]
                }
              }
            },
            'sass-loader',
            {
              loader: 'sass-resources-loader',
              options: {
                resources: [
                  './src/components/_vars.scss'
                ],
              },
            }
          ],
        }
      ]
    },
    resolve: {
      modules: ['node_modules']
    },
    plugins: [
      new miniCss({
        filename: 'styles/style.min.css',
      })
    ]
  })
    .pipe(app.gulp.dest(app.path.buildFolder, { sourcemaps: app.isDev }))
    .pipe(app.plugins.browserSync.stream())
}