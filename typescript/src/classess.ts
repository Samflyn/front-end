abstract class Person {
  private peoples: string[] = [];

  protected people: string[] = []; // availabe in class which extend this class

  constructor(private readonly id: string, public name: string) {}

  get getPeoples() {
    return this.peoples;
  }

  set setPeoples(peoples: string[]) {
    this.peoples = peoples;
  }

  static getClassName() {
    return 'Person';
  }

  // implement this in classes extending this
  abstract description(desc: string): void;
}

class Emp extends Person {
  constructor() {
    super('1', 'sam');
  }

  description(desc: string): void {
    console.log('in desc');
  }
}

let emp = new Emp();

console.log(emp.getPeoples);

emp.setPeoples = [];

console.log(Emp.getClassName());

// private constructor - singleton
class Single {
  private constructor(id: string, name: string) {}
  private static instance: Single;

  static getInstance() {
    if (Single.instance) {
      return Single.instance;
    }
    this.instance = new Single('1', 'sam');
    return this.instance;
  }
}

const single = Single.getInstance();
