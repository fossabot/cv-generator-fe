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
import { Injectable, isDevMode } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { environment } from '../../../environments/environment';

/**
 * A TLS/SSL protocol route guard.
 * ~implements {@link CanActivate}
 *
 * @description
 * A guard deciding if a route can be activated.
 */
@Injectable({
  providedIn: 'root'
})
export class IsSecureGuardService implements CanActivate {
  /**
   * Implementation of the CanActivate interface.
   * ~override
   *
   * @param _route The activated route snapshot.
   *
   * @returns Whether the route can be activated.
   */
  // tslint:disable-next-line: variable-name
  public canActivate(_route: ActivatedRouteSnapshot): boolean {
    return isDevMode() ?? this.calcCanActivate(location);
  }

  /**
   * Calculate the CanActivate implementation.
   *
   * @param location The location object to work on.
   * @param https The https protocol prefix to check against.
   *
   * @returns Whether the route can be activated.
   */
  private calcCanActivate(location: Location, https = 'https:'): boolean {
    // console.log('Debug: IsSecureGuardService: environment.hosts: ', environment.hosts);
    // console.log('Debug: IsSecureGuardService: location.hostname: ', location.hostname);
    // console.log('Debug: IsSecureGuardService: environment.hosts.includes(location.hostname): ',
    //   environment.hosts.includes(location.hostname));
    if ((location.protocol !== https) && !environment.hosts.includes(location.hostname)) {
      // ~security: codacy: unsafe: ESLint_scanjs-rules_assign__to__href
      location.href = escape(https + location.href.substring(location.protocol.length));
      return false;
    }
    return true;
  }
}
