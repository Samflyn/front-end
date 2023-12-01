// union type - common types
// object type = combination

type Combinable = string | number;
type Numeric = number | boolean;

type Universe = Combinable & Numeric;

type At1 = {
  name: string;
  rights: string[];
};

type At2 = {
  name: string;
  dob: Date;
};

type At = At1 & At2;

let at: At;
at = {
  name: 'sam',
  rights: ['one'],
  dob: new Date(),
};

type Orr = At1 | At2;

// type guards
function printAt(at: Orr) {
  console.log(at.name);

  if ('rights' in at) {
    console.log(at.rights);
  }

  if ('dob' in at) {
    console.log(at.dob);
  }
}

class Car {
  type() {
    console.log('type of car');
  }
}

class Truck {
  type() {
    console.log('type of truck');
  }

  isCargo() {
    console.log(true);
  }
}

type Vehicle = Car | Truck;

function vehicleType(vehicle: Vehicle) {
  vehicle.type();
  if (vehicle instanceof Truck) {
    vehicle.isCargo();
  }
}

// discriminated unions - set description as type or kind
interface Bird {
  // kind:'bird'
  type: 'bird';
  flyingSpeed: number;
}

interface Horse {
  type: 'horse';
  groundSpeed: number;
}

type Animal = Bird | Horse;

function moveAnimal(animal: Animal) {
  switch (animal.type) {
    case 'bird':
      console.log(animal.flyingSpeed);
      break;

    case 'horse':
      console.log(animal.groundSpeed);

    default:
      break;
  }
}

moveAnimal({ type: 'bird', flyingSpeed: 100 });

// type casting
// ! -> will never yeild null

// const userInputElement = <HTMLInputElement>document.getElementById('user-input')!;
const userInputElement = document.getElementById(
  'user-input'
)! as HTMLInputElement;

userInputElement.value = 'hello there';

// index properties
interface ErrorList {
  [prop: string]: string;
}

const errorss: ErrorList = {
  email: 'must be a email',
  name: 'must be name',
  3: 'three',
};

// function overloads

type Both = number | string;

function addss(a: number, b: number): number;
function addss(a: string, b: number): string;
function addss(a: number, b: string): string;
function addss(a: string, b: string): string;
function addss(a: Both, b: Both): Both {
  if (typeof a === 'string' || typeof b === 'string') {
    return a.toString() + b.toString();
  }
  return a + b;
}

const myName = addss('sam', 'flynn');

myName.split(' ');

// optional chaining

const myNa = {
  name: 'sam',
};

// console.log(myNa?.age);

// nullish coalescing
const userInpu = '';

console.log(userInpu || 'default'); // default is used for empty string null and undefined

console.log(userInpu ?? 'default'); // default for null and undefined
