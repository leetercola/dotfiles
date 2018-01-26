import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import postcss from 'rollup-plugin-postcss'
import postcssModules from 'postcss-modules';
import resolve from 'rollup-plugin-node-resolve'

import pkg from './package.json'
const cssExportMap = {};
export default {
  input: 'src/index.js',
  output: [
    {
      file: pkg.main,
      format: 'cjs'
    },
    {
      file: pkg.module,
      format: 'es'
    }
  ],
  external: [
    'react',
    'react-dom',
    'prop-types',
    'reactstrap'
  ],
  plugins: [
    postcss({
      plugins:[
        postcssModules({
          getJSON(id, exportTokens) {
            cssExportMap[id] = exportTokens;
          }
        })
      ],
      getExportNamed: false,
      getExport (id) {
        return cssExportMap[id];
      }
    }),
    babel({
      exclude: 'node_modules/**'
    }),
    resolve(),
    commonjs()
  ]
}
