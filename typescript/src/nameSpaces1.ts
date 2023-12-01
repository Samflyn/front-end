// three slashes is not comment

/// <reference path="nameSpaces.ts" />

// exported things can only be used in same namespace
namespace SomeThing {
  class Things implements Thing {
    type: string = 'one';
    matter: string = 'two';
  }
}
