class _Node {
    constructor(key, value) {
        this.key = key;
        this.value = value;
        this.next = null;
    }
}

class HashMapChain {
    constructor(initialCapacity=8) {
        this.size = 0;
        this._hashTable = new Array(initialCapacity);
        this._capacity = initialCapacity;
      }
    // hash a string and output a number, djb2 algorithm
    static _hashString(string) {
        let hash = 5381;
        for (let i = 0; i < string.length; i++) {
            //Bitwise left shift with 5 0s - this would be similar to
            //hash*31, 31 being the decent prime number
            //but bit shifting is a faster way to do this
            //tradeoff is understandability
            hash = (hash << 5) + hash + string.charCodeAt(i);
            //converting hash to a 32 bit integer
            hash = hash & hash;
        }
        //making sure hash is unsigned - meaning non-negtive number
        return hash >>> 0;
    }

    set(key, value) {
        let k = HashMapChain._hashString(key);
        let node = new _Node(k, value);
        if (this._hashTable[key]) {
            node.next = this._hashTable[key];
        }
        this._hashTable[key] = node;
    }
    
    get(key) {
        let hash = HashMapChain._hashString(key);
        if (!this._hashTable[hash]) return null;

        let chain = this._hashTable[hash];
        if (chain.hasOwnProperty(key)) return chain[key];

        return null;
    }
    
    remove(item) {
        let key = HashMapChain._hashString(item);
        if (this._hashTable[key]) {
            if (this._hashTable[key].data === item) {
                this._hashTable[key] = this._hashTable[key].next;
            } else {
                let current = this._hashTable[key].next;
                let prev = this._hashTable[key];
                while(current) {
                    if ( current.data === item ) {
                        prev.next = current.next;
                    }
                    prev = current;
                    current = current.next;
                }
            }
        }
    }
}

HashMapChain.MAX_LOAD_RATIO = 0.9;
HashMapChain.SIZE_RATIO = 3;

module.exports = HashMapChain;