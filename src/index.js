let str = require('./a');
console.log(str+'1');
require('./shouye.css');
require('./index.less');

let fn=()=>{
    console.log('123')
}
fn();
class A{//new A() a=1
    a=1;
}
let a = new A();
console.log(a.a)
