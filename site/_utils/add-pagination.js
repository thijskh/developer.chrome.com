/*
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @file Generates an array of elements to be paginated by 11ty's pagination.
 * This is primarily used for data sets that need to be paginated sperateley.
 * Like how tags should be paginated separateley for each tag, even though all
 * the tags may be long to one data set.
 */

const {paginationCount} = require('../_data/site.json');

/**
 * Generates href for paginated page.
 * @param {string} baseUrl
 * @param {number} i
 * @return {string}
 */
const createHref = (baseUrl, i) => baseUrl + (i === 0 ? '/' : `/${i + 1}/`);

/**
 * Generates permalink for paginated page.
 * @param {string} baseUrl
 * @param {number} i
 * @return {string}
 */
const createPermalink = (baseUrl, i) => createHref(baseUrl, i) + 'index.html';

/**
 * Take array of elements and returns an array of paginated pages for the elements.
 * @param {TODO[]} items Collection item's for pagination.
 * @param {string} baseUrl Beginning of url.
 * @param {TODO} additional
 * @return {PaginatedPage<TODO>[]}
 */
module.exports = (items, baseUrl, additional = {}) => {
  if (items.length === 0) {
    return [];
  }

  baseUrl = baseUrl.startsWith('/') ? baseUrl : '/' + baseUrl;
  baseUrl = baseUrl.replace(/\/$/, '');

  /** @type PaginatedPage[] */
  const paginated = [];
  const total = Math.ceil(items.length / paginationCount);
  const date = items[0].date;
  const hrefs = Array.from({length: total}).map((_, i) =>
    createHref(baseUrl, i)
  );

  for (let i = 0; i < total; i++) {
    const start = i * paginationCount;
    paginated.push({
      ...additional,
      date,
      href: createHref(baseUrl, i),
      pagination: {
        items: items.slice(start, start + paginationCount),
        pageNumber: i,
        hrefs,
        href: {
          next: i < total - 1 ? createHref(baseUrl, i + 1) : null,
          previous: i > 0 ? createHref(baseUrl, i - 1) : null,
          first: createHref(baseUrl, 0),
          last: createHref(baseUrl, total - 1),
        },
        data: 'WARNING_SYNTHETIC_PAGINATION',
        size: total,
      },
      permalink: createPermalink(baseUrl, i),
    });
  }

  return paginated;
};
