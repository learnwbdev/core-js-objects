/* ************************************************************************************************
 *                                                                                                *
 * Please read the following tutorial before implementing tasks:                                   *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object        *
 *                                                                                                *
 ************************************************************************************************ */

/**
 * Returns shallow copy of an object.
 *
 * @param {Object} obj - an object to copy
 * @return {Object}
 *
 * @example
 *    shallowCopy({a: 2, b: 5}) => {a: 2, b: 5}
 *    shallowCopy({a: 2, b: { a: [1, 2, 3]}}) => {a: 2, b: { a: [1, 2, 3]}}
 *    shallowCopy({}) => {}
 */
function shallowCopy(obj) {
  const shallowCopyObj = {};
  Object.assign(shallowCopyObj, obj);
  return shallowCopyObj;
}

/**
 * Merges array of objects into a single object. If there are overlapping keys, the values
 * should be summed.
 *
 * @param {Object[]} objects - The array of objects to merge
 * @return {Object} - The merged object
 *
 * @example
 *    mergeObjects([{a: 1, b: 2}, {b: 3, c: 5}]) => {a: 1, b: 5, c: 5}
 *    mergeObjects([]) => {}
 */
function mergeObjects(objects) {
  if (!Array.isArray(objects)) {
    throw new Error('mergeObjects: input parameter should be an array');
  }
  const mergedObj = objects.reduce((merged, obj) => {
    const mergedRef = merged;
    Object.entries(obj).forEach(([key, value]) => {
      mergedRef[key] = (merged[key] ?? 0) + value;
    });
    return mergedRef;
  }, {});
  return mergedObj;
}

/**
 * Removes a properties from an object.
 *
 * @param {Object} obj - The object from which to remove the property
 * @param {Array} keys - The keys of the properties to remove
 * @return {Object} - The object with the specified key removed
 *
 * @example
 *    removeProperties({a: 1, b: 2, c: 3}, ['b', 'c']) => {a: 1}
 *    removeProperties({a: 1, b: 2, c: 3}, ['d', 'e']) => {a: 1, b: 2, c: 3}
 *    removeProperties({name: 'John', age: 30, city: 'New York'}, 'age') => {name: 'John', city: 'New York'}
 *
 */
function removeProperties(obj, keys) {
  const objRef = obj;
  keys.forEach((key) => {
    delete objRef[key];
  });
  return objRef;
}

/**
 * Compares two source objects. Returns true if the objects are equal and false otherwise.
 * There are no nested objects.
 *
 * @param {Object} obj1 - The first object to compare
 * @param {Object} obj2 - The second object to compare
 * @return {boolean} - True if the objects are equal, false otherwise
 *
 * @example
 *    compareObjects({a: 1, b: 2}, {a: 1, b: 2}) => true
 *    compareObjects({a: 1, b: 2}, {a: 1, b: 3}) => false
 */
function compareObjects(obj1, obj2) {
  let isEqual = true;
  if (Object.keys(obj1).length !== Object.keys(obj2).length) {
    return !isEqual;
  }

  const entriesFrstObj = Object.entries(obj1);
  isEqual = entriesFrstObj.every(([key, value]) => obj2[key] === value);

  return isEqual;
}

/**
 * Checks if the source object is empty.
 * Returns true if the object contains no enumerable own properties, false otherwise.
 *
 * @param {Object} obj - The object to check
 * @return {boolean} - True if the object is empty, false otherwise
 *
 * @example
 *    isEmptyObject({}) => true
 *    isEmptyObject({a: 1}) => false
 */
function isEmptyObject(obj) {
  const isEmpty = Object.keys(obj).length === 0;
  return isEmpty;
}

/**
 * Makes the source object immutable by preventing any changes to its properties.
 *
 * @param {Object} obj - The source object to make immutable
 * @return {Object} - The immutable version of the object
 *
 * @example
 *    const obj = {a: 1, b: 2};
 *    const immutableObj = makeImmutable(obj);
 *    immutableObj.a = 5;
 *    console.log(immutableObj) => {a: 1, b: 2}
 *    delete immutableObj.a;
 *    console.log(immutableObj) => {a: 1, b: 2}
 *    immutableObj.newProp = 'new';
 *    console.log(immutableObj) => {a: 1, b: 2}
 */
function makeImmutable(obj) {
  return Object.freeze(obj);
}

/**
 * Returns a word from letters whose positions are provided as an object.
 *
 * @param {Object} lettersObject - An object where keys are letters and values are arrays of positions
 * @return {string} - The constructed word
 *
 * @example
 *    makeWord({ a: [0, 1], b: [2, 3], c: [4, 5] }) => 'aabbcc'
 *    makeWord({ H:[0], e: [1], l: [2, 3, 8], o: [4, 6], W:[5], r:[7], d:[9]}) => 'HelloWorld'
 */
function makeWord(lettersObject) {
  const lettersArr = Object.entries(lettersObject).reduce(
    (word, [letter, posArr]) => {
      const wordRef = word;
      posArr.forEach((position) => {
        wordRef[position] = letter;
      });
      return wordRef;
    },
    []
  );
  const constructedWord = lettersArr.join('');
  return constructedWord;
}

/**
 * There is a queue for tickets to a popular movie.
 * The ticket seller sells one ticket at a time strictly in order and give the change.
 * The ticket costs 25. Customers pay with bills of 25, 50, or 100.
 * Initially the seller has no money for change.
 * Return true if the seller can sell tickets, false otherwise
 *
 * @param {number[]} queue - The array representing the bills each customer pays with
 * @return {boolean} - True if the seller can sell tickets to everyone, false otherwise
 *
 * @example
 *    sellTickets([25, 25, 50]) => true
 *    sellTickets([25, 100]) => false (The seller does not have enough money to give change.)
 */
function sellTickets(queue, banknotes = { b25: 0, b50: 0 }, canSell = true) {
  if (queue.length === 0 || !canSell) {
    return canSell;
  }
  let canSellCurr = canSell;
  const banknotesCurr = banknotes;
  const currBanknote = queue.shift();
  switch (currBanknote) {
    case 100:
      canSellCurr =
        banknotes.b25 >= 3 || (banknotes.b25 >= 1 && banknotes.b50 >= 1);
      if (canSellCurr) {
        banknotesCurr.b50 -= banknotes.b50 >= 1 ? 1 : 0;
        banknotesCurr.b25 -= banknotes.b50 >= 1 ? 1 : 3;
      }
      break;
    case 50:
      canSellCurr = banknotes.b25 >= 1;
      if (canSellCurr) {
        banknotesCurr.b25 -= 1;
        banknotesCurr.b50 += 1;
      }
      break;
    case 25:
    default:
      canSellCurr = true;
      banknotesCurr.b25 += 1;
  }
  return sellTickets(queue, banknotesCurr, canSellCurr);
}

/**
 * Returns the rectangle object with width and height parameters and getArea() method
 *
 * @param {number} width
 * @param {number} height
 * @return {Object}
 *
 * @example
 *    const r = new Rectangle(10,20);
 *    console.log(r.width);       // => 10
 *    console.log(r.height);      // => 20
 *    console.log(r.getArea());   // => 200
 */
function Rectangle(width, height) {
  this.width = width;
  this.height = height;
  this.getArea = () => this.width * this.height;
}

/**
 * Returns the JSON representation of specified object
 *
 * @param {object} obj
 * @return {string}
 *
 * @example
 *    [1,2,3]   =>  '[1,2,3]'
 *    { width: 10, height : 20 } => '{"height":10,"width":20}'
 */
function getJSON(obj) {
  return JSON.stringify(obj);
}

/**
 * Returns the object of specified type from JSON representation
 *
 * @param {Object} proto
 * @param {string} json
 * @return {object}
 *
 * @example
 *    const r = fromJSON(Circle.prototype, '{"radius":10}');
 *
 */
function fromJSON(proto, json) {
  const parsedObj = JSON.parse(json);
  const newObjProto = Object.create(proto);
  Object.assign(newObjProto, parsedObj);
  return newObjProto;
}

/**
 * Sorts the specified array by country name first and city name
 * (if countries are equal) in ascending order.
 *
 * @param {array} arr
 * @return {array}
 *
 * @example
 *    [
 *      { country: 'Russia',  city: 'Moscow' },
 *      { country: 'Belarus', city: 'Minsk' },
 *      { country: 'Poland',  city: 'Warsaw' },
 *      { country: 'Russia',  city: 'Saint Petersburg' },
 *      { country: 'Poland',  city: 'Krakow' },
 *      { country: 'Belarus', city: 'Brest' }
 *    ]
 *                      =>
 *    [
 *      { country: 'Belarus', city: 'Brest' },
 *      { country: 'Belarus', city: 'Minsk' },
 *      { country: 'Poland',  city: 'Krakow' },
 *      { country: 'Poland',  city: 'Warsaw' },
 *      { country: 'Russia',  city: 'Moscow' },
 *      { country: 'Russia',  city: 'Saint Petersburg' }
 *    ]
 */
function sortCitiesArray(arr) {
  const compareFn = (objA, objB) => {
    const countryA = objA.country.toUpperCase();
    const countryB = objB.country.toUpperCase();
    const cityA = objA.city.toUpperCase();
    const cityB = objB.city.toUpperCase();
    if (countryA < countryB || (countryA === countryB && cityA < cityB)) {
      return -1;
    }
    if (countryA > countryB || (countryA === countryB && cityA > cityB)) {
      return 1;
    }

    return 0;
  };

  return arr.sort(compareFn);
}

/**
 * Groups elements of the specified array by key.
 * Returns multimap of keys extracted from array elements via keySelector callback
 * and values extracted via valueSelector callback.
 * See: https://en.wikipedia.org/wiki/Multimap
 *
 * @param {array} array
 * @param {Function} keySelector
 * @param {Function} valueSelector
 * @return {Map}
 *
 * @example
 *   group([
 *      { country: 'Belarus', city: 'Brest' },
 *      { country: 'Russia', city: 'Omsk' },
 *      { country: 'Russia', city: 'Samara' },
 *      { country: 'Belarus', city: 'Grodno' },
 *      { country: 'Belarus', city: 'Minsk' },
 *      { country: 'Poland', city: 'Lodz' }
 *     ],
 *     item => item.country,
 *     item => item.city
 *   )
 *            =>
 *   Map {
 *    "Belarus" => ["Brest", "Grodno", "Minsk"],
 *    "Russia" => ["Omsk", "Samara"],
 *    "Poland" => ["Lodz"]
 *   }
 */
function group(array, keySelector, valueSelector) {
  const result = new Map();
  const mapKeys = new Set(array.map(keySelector));
  mapKeys.forEach((key) => {
    const values = array
      .filter((item) => keySelector(item) === key)
      .map(valueSelector);
    result.set(key, values);
  });
  return result;
}

/**
 * Css selectors builder
 *
 * Each complex selector can consists of type, id, class, attribute, pseudo-class
 * and pseudo-element selectors:
 *
 *    element#id.class[attr]:pseudoClass::pseudoElement
 *              \----/\----/\----------/
 *              Can be several occurrences
 *
 * All types of selectors can be combined using the combination ' ','+','~','>' .
 *
 * The task is to design a single class, independent classes or classes hierarchy
 * and implement the functionality to build the css selectors using the provided cssSelectorBuilder.
 * Each selector should have the stringify() method to output the string representation
 * according to css specification.
 *
 * Provided cssSelectorBuilder should be used as facade only to create your own classes,
 * for example the first method of cssSelectorBuilder can be like this:
 *   element: function(value) {
 *       return new MySuperBaseElementSelector(...)...
 *   },
 *
 * The design of class(es) is totally up to you, but try to make it as simple,
 * clear and readable as possible.
 *
 * @example
 *
 *  const builder = cssSelectorBuilder;
 *
 *  builder.id('main').class('container').class('editable').stringify()
 *    => '#main.container.editable'
 *
 *  builder.element('a').attr('href$=".png"').pseudoClass('focus').stringify()
 *    => 'a[href$=".png"]:focus'
 *
 *  builder.combine(
 *      builder.element('div').id('main').class('container').class('draggable'),
 *      '+',
 *      builder.combine(
 *          builder.element('table').id('data'),
 *          '~',
 *           builder.combine(
 *               builder.element('tr').pseudoClass('nth-of-type(even)'),
 *               ' ',
 *               builder.element('td').pseudoClass('nth-of-type(even)')
 *           )
 *      )
 *  ).stringify()
 *    => 'div#main.container.draggable + table#data ~ tr:nth-of-type(even)   td:nth-of-type(even)'
 *
 *  For more examples see unit tests.
 */

class CompoundSelector {
  selectors = [];

  includedTypes = new Set();

  SelectorType = {
    ELEMENT: 'element',
    ID: 'id',
    CLASS: 'class',
    ATTRIBUTE: 'attribute',
    PSEUDO_CLASS: 'pseudoClass',
    PSEUDO_ELEMENT: 'pseudoElement',
    COMPOUND: 'compound',
  };

  ErrorType = {
    SINGLE_TYPE: 'single-type',
    INVALID_ORDER: 'invalid-order',
  };

  SELECTOR_FORMAT = {
    [this.SelectorType.ELEMENT]: (selectoValue) => selectoValue,
    [this.SelectorType.ID]: (selectoValue) => `#${selectoValue}`,
    [this.SelectorType.CLASS]: (selectoValue) => `.${selectoValue}`,
    [this.SelectorType.ATTRIBUTE]: (selectoValue) => `[${selectoValue}]`,
    [this.SelectorType.PSEUDO_CLASS]: (selectoValue) => `:${selectoValue}`,
    [this.SelectorType.PSEUDO_ELEMENT]: (selectoValue) => `::${selectoValue}`,
    [this.SelectorType.COMPOUND]: (selectoValue) => selectoValue,
  };

  VALID_ORDER = [
    this.SelectorType.ELEMENT,
    this.SelectorType.ID,
    this.SelectorType.CLASS,
    this.SelectorType.ATTRIBUTE,
    this.SelectorType.PSEUDO_CLASS,
    this.SelectorType.PSEUDO_ELEMENT,
  ];

  constructor(selectorType, selectorValue) {
    this.selectors.push({ selectorType, selectorValue });
    this.includedTypes.add(selectorType);
  }

  element(selectorValue) {
    this.addSelectorSingleType(this.SelectorType.ELEMENT, selectorValue);
    return this;
  }

  id(selectorValue) {
    this.addSelectorSingleType(this.SelectorType.ID, selectorValue);
    return this;
  }

  class(selectorValue) {
    this.addSelector(this.SelectorType.CLASS, selectorValue);
    return this;
  }

  attr(selectorValue) {
    this.addSelector(this.SelectorType.ATTRIBUTE, selectorValue);
    return this;
  }

  pseudoClass(selectorValue) {
    this.addSelector(this.SelectorType.PSEUDO_CLASS, selectorValue);
    return this;
  }

  pseudoElement(selectorValue) {
    this.addSelectorSingleType(this.SelectorType.PSEUDO_ELEMENT, selectorValue);
    return this;
  }

  stringify() {
    return this.selectors.reduce(
      (outputStr, selector) =>
        `${outputStr}${this.stringifySelector(selector)}`,
      ''
    );
  }

  combine(compoundSelector, combinator) {
    const combinedStr = `${this.stringify()} ${combinator} ${compoundSelector.stringify()}`;
    const combinedSelector = new CompoundSelector(
      this.SelectorType.COMPOUND,
      combinedStr
    );
    return combinedSelector;
  }

  stringifySelector(selector) {
    const { selectorType, selectorValue } = selector;
    return this.SELECTOR_FORMAT[selectorType](selectorValue);
  }

  addSelector(selectorType, selectorValue) {
    this.checkValidOrder(selectorType);
    this.selectors.push({ selectorType, selectorValue });
    this.includedTypes.add(selectorType);
  }

  addSelectorSingleType(selectorType, selectorValue) {
    this.checkSingleType(selectorType);
    this.addSelector(selectorType, selectorValue);
  }

  checkSingleType(selectorType) {
    if (this.hasType(selectorType)) {
      this.throwError(this.ErrorType.SINGLE_TYPE);
    }
  }

  checkValidOrder(nextSelectorType) {
    if (!this.isValidOrder(nextSelectorType)) {
      this.throwError(this.ErrorType.INVALID_ORDER);
    }
  }

  hasType(selectorType) {
    return this.includedTypes.has(selectorType);
  }

  isValidOrder(nextSelectorType) {
    if (this.selectors.length === 0) {
      return true;
    }
    const lastSelectorIdx = this.selectors.length - 1;
    const lastSelectorType = this.selectors[lastSelectorIdx].selectorType;
    const lastTypeOrderIdx = this.VALID_ORDER.indexOf(lastSelectorType);
    const nextTypeOrderIdx = this.VALID_ORDER.indexOf(nextSelectorType);
    return nextTypeOrderIdx >= lastTypeOrderIdx;
  }

  throwError(errorType) {
    switch (errorType) {
      case this.ErrorType.SINGLE_TYPE:
        throw new Error(
          'Element, id and pseudo-element should not occur more then one time inside the selector'
        );
      case this.ErrorType.INVALID_ORDER:
        throw new Error(
          'Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element'
        );
      default:
        throw new Error('Unknown error');
    }
  }
}

const cssSelectorBuilder = {
  element(value) {
    return new CompoundSelector('element', value);
  },

  id(value) {
    return new CompoundSelector('id', value);
  },

  class(value) {
    return new CompoundSelector('class', value);
  },

  attr(value) {
    return new CompoundSelector('attribute', value);
  },

  pseudoClass(value) {
    return new CompoundSelector('pseudoClass', value);
  },

  pseudoElement(value) {
    return new CompoundSelector('pseudoElement', value);
  },

  combine(selector1, combinator, selector2) {
    return selector1.combine(selector2, combinator);
  },
};

module.exports = {
  shallowCopy,
  mergeObjects,
  removeProperties,
  compareObjects,
  isEmptyObject,
  makeImmutable,
  makeWord,
  sellTickets,
  Rectangle,
  getJSON,
  fromJSON,
  group,
  sortCitiesArray,
  cssSelectorBuilder,
};
