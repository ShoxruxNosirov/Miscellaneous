let user = {
    name: "John",
    hi() { console.log(this.name); },
    bye() { console.log("Bye"); }
};
user.hi(); // works
// now let's call user.hi or user.bye depending on the name
//  (user.name == "John" ? user.hi : user.bye)(); // Error!


let obj, method;
obj = {
    go: function () { console.log(this); }
};
obj.go();               // (1) [object Object]
(obj.go)();             // (2) [object Object]
(method = obj.go)();    // (3) undefined
(obj.go || obj.stop)(); // (4) undefined