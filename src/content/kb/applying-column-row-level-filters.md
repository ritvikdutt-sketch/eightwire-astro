---
title: "Applying Column & Row level filters"
description: "In Eightwire there are several options to restrict the data that is available in a shared datastore without changing the source data structure."
category: "Architecture"
order: 69
sourceUrl: "https://www.eightwire.io/knowledge-base/applying-column-row-level-filters"
---

## Datastore options: Row level filters

**Browse a Datastore** to view an object to apply row level filters.

![Screenshot](./images/applying-column-row-level-filters-1.webp)

![Screenshot](./images/applying-column-row-level-filters-2.webp)

## Datastore options: Column level filters

To restrict a **column** from being used in a process, simply untick the 'Use' checkbox and **Save**.

![Screenshot](./images/applying-column-row-level-filters-3.webp)

The restricted column appears unavailable (marked **Do Not Use**) and cannot be mapped to a destination column.

![Screenshot](./images/applying-column-row-level-filters-4.webp)

Unmapped columns will not be written to the destination.

A process can be executed successfully - even when source columns are not mapped to a destination.

![Screenshot](./images/applying-column-row-level-filters-5.webp)

## Datastore Queries

Source Datastores connecting to relational databases have a Query tab available which allow you to create custom views of the data to share.

This is a way to apply column level filtering to the data presented in a Datastore.

![Screenshot](./images/applying-column-row-level-filters-6.webp)

## Process filters

Apply a **filter** within a process to control the rows written to a destination.

![Screenshot](./images/applying-column-row-level-filters-7.webp)

> *A column does not have to be mapped for a filter to be applied to a dataset*
