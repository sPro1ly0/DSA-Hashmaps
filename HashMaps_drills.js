const HashMap = require('./hashmap');
const HashMapChain = require('./hash-separate-chain');

function main() {
    // const lotr = new HashMap();
    const lotr = new HashMapChain();
    HashMap.MAX_LOAD_RATIO = 0.5;
    HashMap.SIZE_RATIO = 3;

    lotr.set('Hobbit', 'Bilbo');
    lotr.set('Hobbit', 'Frodo');
    lotr.set('Wizard', 'Gandolf');
    lotr.set('Human', 'Aragorn');
    lotr.set('Elf', 'Legolas');
    lotr.set('Maiar', 'The Necromancer');
    lotr.set('Maiar', 'Sauron');
    lotr.set('RingBearer', 'Gollum');
    lotr.set('LadyOfLight', 'Galadriel');
    lotr.set('HalfElven', 'Arwen');
    lotr.set('Ent', 'Treebeard');
    return lotr; 

    // Retrieve the value that is hashed in the key "Maiar" and "Hobbit".
    // console.log(lotr.get('Maiar')); // Sauron
    // console.log(lotr.get('Hobbit')); // Frodo
    // When a duplicate key is set with a new value, 
    // the new value will replace the old value. The get method will return
    // the newest values which are Sauron and Frodo.
}

console.log(main()); 

/* Print your hash map and notice the length and items 
that are hashed in your hash map. Have you hashed all the items you were asked to? */
// HashMap length = 21, Capacity = 72
// _HashTable length is 62 and all items were hashed. The duplicate keys had their values changed.

// The capacity starts with 8 and will be multiplied by 3 (SIZE_RATIO) when the 
// loadRatio is greater than MAX_SIZE_RATIO of 0.5.
// loadRatio = (this.length + this._deleted + 1) / this._capacity;
// When the this.length of the HashMap is half of the _hashTable array length or capacity, it will resize.
// 8 * 3 = 24 * 3 = 72;

// 2. WhatDoesThisDo
const WhatDoesThisDo = function(){
    let str1 = 'Hello World.';
    let str2 = 'Hello World.';
    let map1 = new HashMap();
    map1.set(str1,10);
    map1.set(str2,20);
    let map2 = new HashMap();
    let str3 = str1;
    let str4 = str2;
    map2.set(str3,20);
    map2.set(str4,10);

    console.log(map1.get(str1));
    console.log(map2.get(str3));
}
// The strings will be treated as duplicate keys since they are the same
// so the latest or newest value being set will be returned in the get methods.
// There are two HashMaps. The first will return a value of 20.
// The second HashMap will return a value of 10.

/*
3. Demonstrate understanding of Hash maps
*You don't need to write code for the following two drills. use any drawing app or simple pen and paper *

1) Show your hash map after the insertion of keys 10, 22, 31, 4, 15, 28, 17, 88, 59 into a hash map of length 11 using open addressing and a hash function k mod m, where k is the key and m is the length.
[22, 88, _, _, 4, 15, 28, 17, 59, 31, 10]

2) Show your hash map after the insertion of the keys 5, 28, 19, 15, 20, 33, 12, 17, 10 into the hash map with collisions resolved by separate chaining. Let the hash table have a length m = 9, and let the hash function be k mod m.
[_, [28 -> 19 -> 10], 20, 12, _, 5, [15 -> 33], _, 17]
*/

// 4. Remove duplicates
function removeDuplicates(str) {
    let map = new HashMap();
    let newStr = '';
    for (let i = 0; i < str.length; i++) {
        map.set(str[i], str[i]);
        if (!newStr.includes(str[i])) {
            newStr += map.get(str[i]);
        }
    }

    return newStr;
}

// console.log(removeDuplicates('google')); // gole
// console.log(removeDuplicates('google all that you think can think of')); // gole athyuinkcf

// 5. Any permutation a palindrome
function palindrome(str) {
    let map = new HashMap();
    let oddNumberStr = 0;

    for (let i = 0; i < str.length; i++) {
        if (map.get(str[i]) === undefined) {
            map.set(str[i], 1);
        } else {
            let char = map.get(str[i]);
            map.set(str[i], char+=1);
        }
    }
    // odd numbered strings can only have one letter without a pair
    // even number strings must be in pairs
    for (let i = 0; i < map.length; i++) {
        if (map.get(str[i]) % 2 !==0) {
            oddNumberStr++;
            console.log('odd number', oddNumberStr);
        }
        if (oddNumberStr > 1) {
            return false;
        }
    }
    return true;
}
// console.log(palindrome('acecarr')); // true
// console.log(palindrome('north')); // false

// 6. Anagram grouping
function anagramGroups(list) {
    const map = new Map();

    list.forEach((word) => {
        let sorted = alphabetize(word);

        if (map.has(sorted)) {
            map.get(sorted).push(word);
        } else {
            map.set(sorted, [word]);
        }
    });

    return [...map.values()];
};

const alphabetize = word => {
    let alphebtized = word.split('').sort().join('');
    return alphebtized;
};

let east = ['east', 'cars', 'acre', 'arcs', 'teas', 'eats', 'race'];
// console.log(anagramGroups(east)); // [['east', 'eats', 'teas'], ['race', 'acre'], ['cars', 'arcs']]