// Type<T>
const names: Array<string> = []; // same as string[]

const promise: Promise<string> = new Promise(() => {});

// creating generic func
function merge<T, U>(a: T, b: U) {
  return Object.assign(a, b);
}

const merged = merge({ name: 'sam' }, { status: 'alive' });

console.log(merge({ name: 'sam' }, 10)); // fails to merge but runs without errors

// constraints
function merges<T extends object, U extends object>(a: T, b: U) {}

interface Lenghty {
  length: number;
}

function mergesd<T extends Lenghty>(a: T): [T, number] {
  return [a, a.length];
}

function keysof<T extends object, U extends keyof T>(a: T, b: U) {}

// generic classes
// can set generic types and constraints to methods
class DataStorage<T extends string | number | boolean> {
  private data: T[] = [];

  addItem(item: T) {
    this.data.push(item);
  }

  removeItem(item: T) {
    if (this.data.indexOf(item) === -1) return;
    this.data.splice(this.data.indexOf(item), 1);
  }
}

// utility types
// partial treats all properties as optional in the begining
// we can then build the object
interface CreateType {
  name: string;
  type: string;
  status: string;
}

function createType(name: string, type: string, status: string): CreateType {
  let createType: Partial<CreateType> = {};
  createType.name = 'sam';
  createType.type = 'oododo';
  createType.status = 'alive';
  return createType as CreateType;
}

const namess: Readonly<string[]> = ['sam', 'sammy'];
