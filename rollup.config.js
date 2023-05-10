

export default {
  input: ['src/index.js'],
  output: {
    file: 'dist/rivar.umd.js',
    format: 'umd',
    name: 'rivarjs',
    globals: {
      rxjs: 'rxjs',
      'rxjs/operators': 'rxjs.operators'
    },
  },
  external: [],
  plugins: [],
};
