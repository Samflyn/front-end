import * as ss from './htttpps.js';
import { testing as sss } from './htttpps.js';
import some, { testing } from './htttpps.js'; //default export - some

ss.testing();

export function something() {}

console.log(globalThis.name); //this dosen't work in modules, instead globalThis can be used to refer window object

//dynamic importing
function name(params) {
  import('./htttpps.js').then((module) => {
    module.testing();
  });
}
