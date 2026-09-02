---
title: "Overview"
description: "When mapping Columns in a Process, instead of source data, you may choose to use a derived column. One type of derived column is an expression."
category: "Process Expressions Syntax"
order: 43
sourceUrl: "https://www.eightwire.io/knowledge-base/overview"
---

An expression is any mathematical expression, that when evaluated will produce a single *value*. Expressions may work on numbers, text, dates or any other Eightwire data type.

For example, a simple expression to perform basic arithmetic could be:

(3 \* 2) + 7

This would result in the destination column containing the numeric value *13* for each row.

Similarly, functions may be used to manipulate data, such as this one, to give just the first part of a multi-part term:

FirstToken("the quick brown fox")

This would result in the destination column containing the text value *‘the’*.

Lastly, system metadata and data from the source table may also be included. This example combines the System *Batch ID* with the value in the source *Key* column:

System("Batch.ID") + Data("Key")

This would result in the destination column containing a different value for each row, something like *"1055737Jane", "1055737Bob", "1055737Mel"*, etc.

*The following pages show the operators and functions available when using Process Expressions;*
