import { Injectable } from '@angular/core';
import { SearchTokenizerService } from '../search-tokenizer/search-tokenizer.service';
import { Indexable } from '../../interfaces/indexable';

/**
 * Search engine service.
 */
@Injectable({
  providedIn: 'root'
})
export class SearchEngineService {
  /** Length of the hash key in characters.
   *
   * Data-dependent. Should be large enough to guarantee uniqueness.
   */
  private readonly keyLength = 200;

  /** The negation prefixed operator */
  private readonly notOperator = '-';

  /**
   * The tokenized search expression in disjunctive normal form, as a sum of products.
   * @description
   * An array of OR'd AND'd tokens, some of then possibly negated.
   */
  private searchExpression: string[][] = [[]];

  /**
   * Constructs the search engine.
   * @param searchTokenizerService The search tokenizer service used for tokenizing the initial search token.
   */
  constructor(private searchTokenizerService: SearchTokenizerService) { }

  /**
   * Filter an array based on element compliance with a search query string (expression) abiding by the internal operators and order.
   * @param array The data array to search.
   * @param SearchToken The search query string (expression).
   *
   * @returns The filtered array.
   */
  public search<T>(array: T[], SearchToken: string): T[] {
    if (array === undefined) { return []; }
    if (SearchToken === undefined) { return array; }

    // console.log('Debug: search:', array, SearchToken);
    if (SearchToken.trim().length === 0) { return array; }

    // console.log('Debug: search: non-empty:', array, SearchToken);
    this.searchExpression = this.searchTokenizerService.tokenize(SearchToken);
    // console.log('Debug: search: search expression:', JSON.stringify(this.searchExpression));

    const rerVal = this.calcFiltered(array);
    // console.log('Debug: search: returning:', rerVal);

    return rerVal;
  }

  /**
   * Filter an array based on the calulated tokenized search expression.
   * @param array The data array to search.
   *
   * @returns The filtered array.
   */
  private calcFiltered<T>(array: T[]): T[] {
    // // if (array === undefined) { return []; }

    // console.log('Debug: calcFiltered: array:', array);
    // console.log('Debug: calcFiltered: search expression:', JSON.stringify(this.searchExpression));

    const o = this.arrayToObject(array);

    let orerO: Indexable = {};
    for (const orOperand of this.searchExpression) {
      // console.log('Debug: calcFiltered: OR:', JSON.stringify(orOperand));

      let anderO: Indexable = o;
      for (let andOperand of orOperand) {
        // console.log('Debug: calcFiltered: AND:', andOperand);

        let filteredO;
        let calcSetOperation;
        if (andOperand[0] === this.notOperator) {
          // console.log('Debug: calcFiltered: AND: NOT:', andOperand);
          andOperand = andOperand.substr(1);
          calcSetOperation = (o1: Indexable, o2: Indexable) => this.diffObject(o1, o2);
        } else {
          // console.log('Debug: calcFiltered: AND: normal:', andOperand);
          calcSetOperation = (o1: Indexable, o2: Indexable) => this.intersectObject(o1, o2);
        }

        filteredO = this.arrayToObject(this.calcFilteredToken(array, andOperand));
        anderO = calcSetOperation(anderO, filteredO);

        // console.log('Debug: calcFiltered: and:', JSON.stringify(Object.values(anderO).map(_ => Object.values(_)[0])));

        if (Object.keys(anderO).length === 0) { continue; }
      }
      orerO = this.unionObject(orerO, anderO);

      // console.log('Debug: calcFiltered: or:', JSON.stringify(Object.values(orerO).map(_ => Object.values(_)[0])));

      if (Object.keys(orerO).length === array.length) { continue; }
    }

    return Object.values(orerO);
  }

  /**
   * Filter an array based on element compliance with a search item.
   * @param array The data array to search.
   * @param SearchToken The search item.
   *
   * @returns The filtered array.
   */
  private calcFilteredToken(array: Indexable[], SearchToken: string): Indexable[] {
    // // if (array === undefined) { return []; }

    const searchTokenLower = SearchToken.trim().toLocaleLowerCase();

    // console.log('Debug: calcFilteredToken: Searching for', SearchToken,
    //   'in', JSON.stringify(array.map(_ => Object.values(_)[0])), '...');

    // // preprocess request exclusion example
    // const exclude = searchTokenLower[0] === this.notOperator;
    // if (exclude) {
    //   searchTokenLower = searchTokenLower.substr(1).trim();
    // }
    // const searcher = exclude ? _ => !_.includes(searchTokenLower) : _ => _.includes(searchTokenLower);
    // const reducer = exclude ? (l, r) => l && r : (l, r) => l || r;

    const searcher = (_: string | string[]) => _.includes(searchTokenLower);
    const reducer = (l: any, r: any) => l || r;

    return (array)
      .filter(_ => Object.keys(_)
        .map(k => searcher((_[k] || '')
          .toString()
          .toLocaleLowerCase()))
        .reduce(reducer));
  }

  /**
   * Calculates the union of two objects as a set union of the sets of their properties.
   * @param object1 The first object.
   * @param object2 The second object.
   *
   * @returns The union of the two objects.
   */
  private unionObject(object1: Indexable, object2: Indexable): Indexable {
    // console.log('Debug: unionObject:', object1, object2);
    for (const key in object2) {
      if (object2.hasOwnProperty(key)) {
        const element = object2[key];
        if (Object.keys(object1).indexOf(key) === -1) {
          object1[key] = element;
        }
      }
    }
    return object1;
  }

  /**
   * Calculates the intersection of two objects as a set intersection of the sets of their properties.
   * @param object1 The first object.
   * @param object2 The second object.
   *
   * @returns The intersection of the two objects.
   */
  private intersectObject(object1: Indexable, object2: Indexable): Indexable {
    // console.log('Debug: intersectObject:', object1, object2);
    return this.restrictObject(object1, this.intersect(Object.keys(object1), Object.keys(object2)));
  }

  /**
   * Calculates the difference of two objects as a set difference of the sets of their properties.
   * @param object1 The first object.
   * @param object2 The second object.
   *
   * @returns The difference of the two objects (the first minus the second).
   */
  private diffObject(object1: Indexable, object2: Indexable): Indexable {
    // console.log('Debug: diffObject:', object1, object2);
    return this.restrictObject(object1, this.diff(Object.keys(object1), Object.keys(object2)));
  }

  // /**
  //  * Calculates the union of two arrays as a set union of their elements.
  //  * @param array1 The first array.
  //  * @param array2 The second array.
  //  *
  //  * @returns The union of the two arrays.
  //  */
  // private union(array1: any[], array2: any[]): any[] {
  //   for (const iterator of array2) {
  //     if (array1.indexOf(iterator) === -1) {
  //       array1.push(iterator);
  //     }
  //   }
  //   return array1;
  // }

  /**
   * Calculates the intersection of two arrays as a set intersection of their elements.
   * @param array1 The first array.
   * @param array2 The second array.
   *
   * @returns The intersection of the two arrays.
   */
  private intersect(array1: any[], array2: any[]): any[] {
    // console.log('Debug: intersect:', array1, array2);
    return array1.filter(_ => array2.indexOf(_) !== -1);
  }

  /**
   * Calculates the difference of two arrays as a set difference of their elements.
   * @param array1 The first array.
   * @param array2 The second array.
   *
   * @returns The difference of the two arrays (the first minus the second).
   */
  private diff(array1: any[], array2: any[]): any[] {
    // console.log('Debug: diff:', array1, array2);
    return array1.filter(_ => array2.indexOf(_) === -1);
  }

  /**
   * Convert an array of objects into an object with a property for each element of the original array.
   * @param array  The data array to convert.
   *
   * @description
   * Each property is a key-value pair with a hash calculated from the element object for a key and the element object itself for a value.
   *
   * @returns The array converted into an object.
   */
  private arrayToObject(array: any[]): Indexable {
    // console.log('Debug: arrayToObject:', array);
    // // if (array === undefined) { return {}; }

    return array.reduce((previousValue: Indexable, currentValue: Indexable, currentIndex: number) => {
      previousValue[this.hash(currentValue)] = currentValue;
      return previousValue;
    }, {});
  }

  /**
   * Projects an object to an object containing only a selection of the original one's properties.
   * @param object The object whose properties to restrict.
   * @param keys The set of keys to include in the new object.
   *
   * @returns The restricted (projected) object.
   */
  private restrictObject(object: Indexable, keys: string[]) {
    // console.log('Debug: restrictObject:', object, keys);
    const result: Indexable = {};
    for (const key of keys) {
      result[key] = object[key];
    }
    // console.log('Debug: restrictObject: returning', result);
    return result;
  }

  /**
   * Calculates a unique hash form an object.
   * @param object The object to calculate a hash from.
   *
   * @returns The hash calculated.
   */
  private hash(object: Indexable): string {
    return JSON.stringify(object).substr(0, this.keyLength);
  }
}
