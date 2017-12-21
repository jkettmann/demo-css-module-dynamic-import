import { writeln } from './util'
import './app.css'

const a = import('./a')
const b = import('./b')
const c = import('./c')

Promise.all([ a, b, c ])
  .then(() => writeln('loaded all'))
  .catch(console.error.bind(console))
