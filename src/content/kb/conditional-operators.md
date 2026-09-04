---
title: "Conditional Operators"
description: ""
category: "Process Expressions Syntax"
order: 46
sourceUrl: "https://www.eightwire.io/knowledge-base/conditional-operators"
---

The conditional operator allows an ‘if then else’ type construct and follows the C# and Java convention.

The first part of the expression is the value being checked.

The second part is the value which will be returned if the first value evaluates to true.

The third value is returned if the first value evaluates to false.

| Syntax | Description |
|---|---|
| `... ? ... : ...` | If – then – else |
| Example | For example, the following would return "Yes" because the first part, `1=1`, evaluated to true:<br>`1 == 1 ? "Yes" : "No"` |
| Example | Alternatively, this example would evaluate to "Nope":<br>`"Dog" == "Cat" ? "Yup" : "Nope"` |
