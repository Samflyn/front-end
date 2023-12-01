interface Name {
  readonly name: string;
}

interface Age {
  age: number;
}

interface Pers extends Name, Age {
  greet(greeting: string): void;
}

let user: Pers;

user = {
  name: 'sam',
  age: 1,
  greet(greetings: string): void {
    console.log(greetings);
  },
};

class users implements Pers {
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
  name: string;
  age: number;
  greet(greeting: string): void {
    throw new Error('Method not implemented.');
  }
}

interface addFn {
  (a: number, b: number): number;
}

let adds: addFn;

adds = (a: number, b: number) => {
  return a + b;
};

interface OptionalParam {
  name: string;
  lastName?: string;
  getLastName?(a: string, b?: string): string;
}
