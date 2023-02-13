let numbers = [0, 1, 2];
numbers = new Proxy(numbers, {
    get(target, prop) {
        if (prop in target) {
            return target[prop];
        } else {
            return 0; // default value
        }
    }
});
console.log(numbers[1]); // 1
console.log(numbers[123]); // 0 (no such item)

let dictionary = {
    'Hello': 'Hola',
    'Bye': 'Adiós'
};
dictionary = new Proxy(dictionary, {
    get(target, phrase) {
        if (phrase in target) {
            return target[phrase];
        } else {
            return phrase;
        }
    }
});
console.log(dictionary['Hello']); // Hola
console.log(dictionary['Welcome to Proxy']); // Welcome to Proxy 


numbers = [];
numbers = new Proxy(numbers, { // (*)
    set(target, prop, val) { // to intercept property writing
        if (typeof val == 'number') {
            target[prop] = val;
            return true;
        } else {
            return false;
        }
    }
});
numbers.push(1);
numbers.push(2);
console.log("Length is: " + numbers.length); // 2
//numbers.push("test"); // TypeError ('set' on proxy returned false)

let user = {
    name: "John",
    age: 30,
    _password: "***"
};
user = new Proxy(user, {
    ownKeys(target) {
        return Object.keys(target).filter(key => !key.startsWith('_'));
    }
});
for (let key in user) console.log(key); // name, then: age       // "ownKeys" filters out _password
console.log(Object.keys(user)); // name,age
console.log(Object.values(user)); // John,30

user = {};
user = new Proxy(user, {
    ownKeys(target) {
        return ['a', 'b', 'c'];
    }
});
console.log(Object.keys(user)); // <empty>

user = {};
user = new Proxy(user, {
    ownKeys(target) {
        return ['a', 'b', 'c'];
    },
    getOwnPropertyDescriptor(target, prop) {
        return {
            enumerable: true,
            configurable: true
            /* ...other flags, probable "value:..." */
        };
    }
});
console.log(Object.keys(user)); // a, b, c

user = {
    name: "John",
    _password: "***"
};
user = new Proxy(user, {
    get(target, prop) {
        if (prop.startsWith('_')) {
            throw new Error("Access denied");
        }
        let value = target[prop];
        return (typeof value === 'function') ? value.bind(target) : value; // (*)
    },
    set(target, prop, val) { // to intercept property writing
        if (prop.startsWith('_')) {
            throw new Error("Access denied");
        } else {
            target[prop] = val;
            return true;
        }
    },
    deleteProperty(target, prop) { // to intercept property deletion
        if (prop.startsWith('_')) {
            throw new Error("Access denied");
        } else {
            delete target[prop];
            return true;
        }
    },
    ownKeys(target) { // to intercept property list
        return Object.keys(target).filter(key => !key.startsWith('_'));
    }
});
try {
    console.log(user._password); // Error: Access denied
} catch (e) { console.log(e.message); }
try {
    user._password = "test";
} catch (e) { console.log(e.message); }
try {
    delete user._password;
} catch (e) { console.log(e.message); }
for (let key in user) console.log(key);

let range = {
    start: 1,
    end: 10
};
range = new Proxy(range, {
    has(target, prop) {
        return prop >= target.start && prop <= target.end;
    }
});
console.log(5 in range); // true
console.log(50 in range); // false

function delay(f, ms) {
    return new Proxy(f, {
        apply(target, thisArg, args) {
            setTimeout(() => target.apply(thisArg, args), ms);
        }
    });
}
function sayHi(user) {
    console.log(`Hello, ${user}!`);
}
sayHi = delay(sayHi, 3000);
console.log(sayHi.length); // 1
sayHi("John");

user = {
    name: "John",
};

user = new Proxy(user, {
    get(target, prop, receiver) {
        console.log(`GET ${prop}`);
        return Reflect.get(target, prop, receiver); // (1)
    },
    set(target, prop, val, receiver) {
        console.log(`SET ${prop}=${val}`);
        return Reflect.set(target, prop, val, receiver); // (2)
    }
});
let name = user.name; // shows "GET name"
user.name = "Pete"; // shows "SET name=Pete"

user = {
    _name: "Guest",
    get name() {
        return this._name;
    }
};
let userProxy = new Proxy(user, {
    get(target, prop, receiver) { // receiver = admin
        return Reflect.get(target, prop, receiver);
    }
});
let admin = {
    __proto__: userProxy,
    _name: "Admin"
};
console.log(admin.name); // Admin


let map = new Map();
let proxy = new Proxy(map, {
    get(target, prop, receiver) {
        let value = Reflect.get(...arguments);
        return typeof value == 'function' ? value.bind(target) : value;
    }
});
proxy.set('test', 1);
console.log(proxy.get('test'));


class User {
    #name = "Guest";
    getName() {
        return this.#name;
    }
}
user = new User();
user = new Proxy(user, {
    get(target, prop, receiver) {
        let value = Reflect.get(...arguments);
        return typeof value == 'function' ? value.bind(target) : value;
    }
});
console.log(user.getName()); // Guest

let object = {
    data: "Valuable data"
};
let revoke;
({ proxy, revoke } = Proxy.revocable(object, {}));
// pass the proxy somewhere instead of object...
console.log(proxy.data); // Valuable data
// later in our code
revoke();
// the proxy isn't working any more (revoked)
//console.log(proxy.data); // Error

let revokes = new WeakMap();
object = {
    data: "Valuable data"
};
({ proxy, revoke } = Proxy.revocable(object, {}));
revokes.set(proxy, revoke);
revoke = revokes.get(proxy);
revoke();
//console.log(proxy.data); // Error (revoked)