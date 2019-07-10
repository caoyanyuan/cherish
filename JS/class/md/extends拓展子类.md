extends 关键字在类声明或类表达式中用于创建一个类作为另一个类的一个子类。
```
class Animal { 
  constructor(name) {
    this.name = name;
  }
  
  speak() {
    console.log(this.name + ' makes a noise.');
  }
}

class Dog extends Animal {
  speak() {
    console.log(this.name + ' barks.');
  }
}

var d = new Dog('Mitzie');
d.speak();// 'Mitzie barks.'
```
> 如果子类中存在构造函数，则需要在使用“this”之前首先调用 super()。

也可以扩展传统的基于函数的“类”：
```
function Animal (name) {
  this.name = name;  
}
Animal.prototype.speak = function () {
  console.log(this.name + ' makes a noise.');
}

class Dog extends Animal {
  speak() {
    super.speak();
    console.log(this.name + ' barks.');
  }
}

var d = new Dog('Mitzie');
d.speak();//Mitzie makes a noise.  Mitzie barks.
```
请注意，类不能继承常规（非可构造）对象。如果要继承常规对象，可以改用 Object.setPrototypeOf()：

```
var Animal = {
  speak() {
    console.log(this.name + ' makes a noise.');
  }
};

class Dog {
  constructor(name) {
    this.name = name;
  }
}

Object.setPrototypeOf(Dog.prototype, Animal);// If you do not do this you will get a TypeError when you invoke speak

var d = new Dog('Mitzie');
d.speak(); // Mitzie makes a noise.
```
##### 使用 super 调用超类
super 关键字用于调用对象的父对象上的函数。
```
class Cat { 
  constructor(name) {
    this.name = name;
  }
  
  speak() {
    console.log(this.name + ' makes a noise.');
  }
}

class Lion extends Cat {
  speak() {
    super.speak();
    console.log(this.name + ' roars.');
  }
}
```
