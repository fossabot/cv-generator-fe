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
import { Indexable } from '../../interfaces/indexable';

import { ModelModel } from '../../model/model/model.model';

/**
 * A map service.
 */
@Injectable({
  providedIn: 'root'
})
export class MapService {
  /** The layout */
  private get layout() {
    return {
      title: 'Markets',
      geo: {
        scope: 'world',
        resolution: 50,
        projection: { type: 'robinson', scale: 4.5 },
        center: { lon: 35, lat: 52 },
        bgcolor: 'rgba(0,0,0,0)',
        showocean: true, oceancolor: 'rgba(0,255,255,0.2)',
        showland: false, landcolor: 'rgba(0,0,0,0.2)',
        showlakes: true, lakecolor: 'rgba(0,128,255,0.2)',
        showrivers: true, rivercolor: 'rgba(0,0,255,0.2)',
        showcountries: true, countrycolor: 'rgba(128,128,128,0.2)',
        showcoastlines: true, coastlinecolor: 'rgba(0,0,0,0.2)',
        showframe: true, framecolor: 'rgba(0,0,0,0.2)',
      },
      // eslint-disable-next-line camelcase
      paper_bgcolor: 'rgba(0,0,0,0)',
      // eslint-disable-next-line camelcase
      plot_bgcolor: 'rgba(0,0,0,0)',
      margin: { t: 0, l: 0, r: 0, b: 0 }
    };
  }

  /** Get countries visited. */
  public get countriesVisited(): string[] {
    const countries = 'Countries visited';
    return this.model.portfolioModel.cv[countries];
  }

  /** Get countries visited. */
  public get entity() {
    const constCountry = 'Country';
    return this.model.portfolioModel.entities[constCountry];
  }

  /**
   * Constructs a map.
   * ~constructor
   *
   * @param model The model injected dependency.
   */
  constructor(
    public readonly model: ModelModel,
  ) {
  }

  /**
   * The data.
   *
   * @param locations The locations.
   * @param z The counts.
   * @param colorScaleMinValue The color scale min value.
   */
  private getData(locations: any[], z: number[], colorScaleMinValue: number) {
    return [{
      type: 'choropleth',
      locationmode: 'country names',
      locations, z,
      // text: locations,
      autocolorscale: false,
      colorscale: [
        [0, '#00000020'],  // countries visited background color
        [colorScaleMinValue, 'rgb(65,105,225)'],
        [1, 'rgb(220,166,224)']
        // [0, 'rgba(0, 0, 255, 1)'],
        // [1, 'rgba(255, 0, 0, 1)']
      ],
      colorbar: {
        // title: 'Markets count',
        thickness: 20,
        tick0: 0,
        dtick: 1,
        autotick: false
      },
      marker: { line: { color: 'rgba(0,0,0,0.5)', width: 1 }, opacity: 1 }
    }];
  }

  /**
   * Prepares a map.
   *
   * @param frequencies The frequencies.
   * @param countriesVisited The countries visited.
   */
  public prepareMap(frequencies: Indexable[], countriesVisited: string[]) {
    // prepend other visited countries as map background
    [...countriesVisited].reverse().forEach((country) => {
      // tslint:disable-next-line: variable-name
      if (!frequencies.map((value: Indexable, _index: number, _array: Indexable[]) => value[0]).includes(country)) {
        frequencies.unshift([country, { Count: 0 }]);
      }
    });

    // prepare data settings
    // tslint:disable-next-line: variable-name
    const locations = frequencies.map((value: Indexable, _index: number, _array: Indexable[]) => value[0]);
    // tslint:disable-next-line: variable-name
    const z = frequencies.map((value: Indexable, _index: number, _array: Indexable[]) => Number(value[1].Count));

    // calc color scale min value
    let maxCount = Math.max(...z);
    if (maxCount === 0) { maxCount = 1; }
    const colorScaleMinValue = 1 / maxCount;

    const data = this.getData(locations, z, colorScaleMinValue);
    const layout = this.layout;
    return { data, layout };
  }
}
