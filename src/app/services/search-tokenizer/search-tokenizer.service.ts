// SPDX-License-Identifier: Apache-2.0
// Copyright (c) 2018 Georgi Marinov
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
import { Injectable } from '@angular/core';

/**
 * A search tokenizer service
 */
@Injectable({
  providedIn: 'root'
})
export class SearchTokenizerService {
  /** The OR logical disjunction operator */
  private readonly orOperator = ' or ';

  /** Double quote presence detection regular expression */
  private readonly reQuote = new RegExp('(?:[^\s"]+|"[^"]*")+', 'gi');
  /** Single quote (apostrophe) presence detection regular expression */
  private readonly reApostrophe = new RegExp('(?:[^\\s\']+|\'[^\']*\')+', 'gi');
  /** The acceptable quote characters */
  private readonly quoteSymbols = '"\'';

  /**
   * Tokenizes a string query expression into a structure of tokens, also watching for possible quoted tokens.
   *
   * @param str String query expression to tokenize.
   *
   * @returns The tokenized search expression in disjunctive normal form, as a sum of products.
   */
  public tokenize(str: string): string[][] {
    return str.split(this.orOperator)
      .filter((_) => _.trim().length > 0)
      .map((_) => (_.trim().match(_.includes('\'') ? this.reApostrophe : this.reQuote) || [])
        .filter((__) => __.trim().length > 0)
        .map((___) => this.stripQuote(___)));
  }

  /**
   * Trims leading and trailing character pairs from a string.
   *
   * @param str The string to process.
   * @param char The character to trim.
   *
   * @returns The string with its leading and trailing character pairs deleted.
   */
  private trim(str: string, char: string): string {
    if (char === ']') { char = '\\]'; }
    if (char === '\\') { char = '\\\\'; }
    return str.replace(new RegExp(
      '^[' + char + ']+|[' + char + ']+$', 'g'
    ), '');
  }

  /**
   * Strips (trims) leading and trailing quote character pairs from a string.
   *
   * @param str String to process.
   *
   * @returns The string with its leading and trailing quote character pairs deleted.
   */
  private stripQuote(str: string): string {
    if (str.length <= 0) {
      return '';
    }

    const quote = str[0];
    return this.quoteSymbols.includes(quote) ? this.trim(str, quote) : str;
  }
}
