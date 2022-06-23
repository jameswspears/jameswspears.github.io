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
    inlineDynamicImports: true,
    plugins: [
      resolve({
        preferBuiltins: true,
        extensions: ['.ts'],
      }),
      typescript(),
      commonjs(),
      json()
    ],
  },
];