---
title: 'Author'
description: ''
permalink: /{{locale}}{{ paged.url }}{% if paged.index > 0 %}{{ paged.index + 1 }}/{% endif %}index.html
layout: 'layouts/author-individual.njk'
eleventyComputed:
  title: "{{ paged.title | i18n(locale) or title }}"
  description: "{{ paged.description | i18n(locale) or description }}"
  hero: "{{ paged.image }}"
pagination:
  data: postsData.authors
  size: 1
  alias: paged
  resolve: values
  addAllPagesToCollections: true
---
