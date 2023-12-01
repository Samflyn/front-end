// decorator runs when class is parsed not when init

// decorator factory
// function Logger(constructor: Function) {
//   console.log('logging...');
//   console.log(constructor);
// }

function Logger(logString: string) {
  // decorator function
  return function (constructor: Function) {
    console.log(logString);
  };
}

function RenderThis(logString: string) {
  // i'm aware of it but i don't use it '_'
  return function (_: Function) {
    console.log(logString);
  };
}

@Logger('some-param')
class Perso {
  name = 'sam';
  constructor() {
    console.log('perso class');
  }
}

// const perso = new Perso();

// factory decorators run from top
// function decorators run from bottom
@Logger('logger')
@RenderThis('rendering')
class Multip {
  name = 'sam';
  constructor() {}
}

// property decorator

function Email(target: any, email: string) {
  // property dec
  console.log(target);
}

function SetName(target: any, name: string, descriptor: PropertyDescriptor) {
  //accessor dec
  console.log(target);
  console.log(descriptor);
}

function GetName(
  target: any,
  name: string | symbol,
  descriptior: PropertyDescriptor
) {
  //method
  console.log(target);
  console.log(name);
  console.log(descriptior);
}

function Name(target: any, name: string | symbol, position: number) {
  //param
  console.log(target);
  console.log(name);
  console.log(position);
}

class PropDec {
  @Email
  email: string;
  constructor(private _name: string, public age: number, email: string) {
    this.email = email;
  }

  @SetName
  set setName(@Name name: string) {
    this._name = name;
  }

  @GetName
  getName() {
    console.log(this._name);
    console.log(this.age);
  }
}

// change class in decorator
// extends and replaces the old class
function WithTemplate(template: string, hookId: string) {
  console.log('template factory');
  return function <T extends { new (...args: any[]): { name: string } }>(
    originalConstructor: T
  ) {
    return class extends originalConstructor {
      constructor(..._: any[]) {
        super();
        console.log('rendering template');
        const hookEl = document.getElementById(hookId);
        if (hookEl) {
          hookEl.innerHTML = template;
          hookEl.querySelector('h1')!.textContent = this.name;
        }
      }
    };
  };
}

@WithTemplate('<h1>My Personn Object</h1>', 'apps')
class Personn {
  name = 'sam';

  constructor() {
    console.log('creating personn');
  }
}

const personn = new Personn();

// autobind using decorator

function Autobind(
  target: any,
  methodName: string,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;
  const adjustedDescriptor: PropertyDescriptor = {
    configurable: true,
    enumerable: false,
    get() {
      // this inside getter is the concrete object itself
      const boundFn = originalMethod.bind(this);
      return boundFn;
    },
  };
  return adjustedDescriptor;
}

class Print {
  message = 'works';

  @Autobind
  showMessage() {
    console.log(this.message);
  }
}

const printer = new Print();

const btn1 = document.querySelector('button')!;
btn1.addEventListener('click', printer.showMessage);

// truthy to true
// falsy to false

const treue = '';

function isTrue() {
  return !!treue;
}
