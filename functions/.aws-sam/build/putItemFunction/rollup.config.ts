import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';

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
    ],
  },
];