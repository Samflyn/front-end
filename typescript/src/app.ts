enum Role {
  ADMIN,
  READ_ONLY,
  READ_WRITE,
}

const person = {
  role: Role.ADMIN,
};

function combine(
  input1: number | string,
  input2: number | string,
  result: 'text' | 'number'
) {
  if (
    typeof input1 === 'number' &&
    typeof input2 === 'number' &&
    result === 'number'
  ) {
    return input1 + input2;
  } else {
    return input1.toString() + input2.toString();
  }
}

// alias
type combine = number | string;
type resultType = 'as-number' | 'as-string';

// return type
function add(a: number, b: number): void {
  console.log(a + b);
}

// function as type
let combination: Function;

// params => return type
let combined: (a: number, b: number) => number;

// ignores return type if void is set
function addHandle(a: number, b: number, cb: (num: number) => void) {
  cb(a + b);
}

const result = addHandle(1, 2, (result) => {
  console.log(result);
  return result;
});

// unknown type
// cannot set without typechecking unlike any
let userInput: unknown;
let userName: string;
if (typeof userInput === 'string') {
  userName = userInput;
}

// never type - wont return anything not even undefined
function errors(code: number): never {
  throw { errorCode: code };
}

// declaring that it will exist
declare var GLOBAL: any;
