import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';

export default [
  {
    input: 'src/handlers/index.ts',
    output: {
      file: './dist/cjs/index.js',
      format: 'cjs',
      exports: 'named',
    },
    plugins: [
      resolve({
        extensions: ['.ts'],
      }),
      typescript(),
      commonjs(),
      json()
    ],
  },
];