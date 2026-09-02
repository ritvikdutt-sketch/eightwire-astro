---
title: "Literals"
description: "Any expression may include literals. A literal, also known as a constant, is any non-calculated value."
category: "Process Expressions Syntax"
order: 48
sourceUrl: "https://www.eightwire.io/knowledge-base/literals"
---

## Number Literals

For example *43* is a number literal and can be used in any expression, such as *5 + 43*.

Numbers literals do not need to be enclosed in double-quotes. If you enclose a number in double-quotes, it will be treated as text, not as a number.

## Text Literals

In the same way *"fox"* is a text literal and can be used similarly; for example: *"the " + "fox"*.

Note that text or *string literals* do need to be enclosed in double quotes ("...").

When dealing with text, we sometimes refer to character position. To do this we take the left-most character in the text and call this position 0 (zero). We then number to the right – 1, 2, 3, etc.

## Null

*Null* is a built-in literal. Null is the complete absence of data – quite literally nothing. This literal cannot be appended or used in arithmetic. Null should not be confused with an empty string (also represented as two sets of double quotes with nothing in between – "") - an empty string is text with zero length, whereas null has no type and no length. An expression will either evaluate to null or to a non-null value (including empty string) – it cannot be both. Some Data Stores do not support the use of nulls (such as CSV) so nulls will usually be converted into empty strings.

## Cr, Lf, CrLf

*Cr*, *Lf* and *CrLf* are built-in string literals representing carriage return, linefeed and the combination. These are the characters normally used to delimit rows in CSV files or separate rows of text in free-text fields. Which one to use will depend on which operating system the file is intended for or came from – for example Microsoft Windows normally uses *CrLf*, Linux normally uses only *Lf* and older Mac operating systems only use *Cr*. These literals are provided to make text manipulation easier because neither *Cr* nor *Lf* are printable characters and cannot be easily used in an expression otherwise.

## Tab

*Tab* is a built-in literal representing the tab character, sometimes used as a column separator in CSV files.

## Boolean

*True* and *False* are built-in Boolean literals. These can be useful when checking the result of an equality expression, such as *Data("Subscribed") == True*.

In this example, we’re expecting the source column *"Subscribed"* to be present and contain a Boolean value. In most cases it is unnecessary to use *True* or *False* as this is implied – in that last example, the expression would evaluate to the same result if it was simply written as *Data("Subscribed")*.

## Escaping Characters in a Text Literal

Inside a quoted text literal, you may use the backslash character (\\) to escape certain characters. For example, if you want to use a double quote inside a literal, you need to tell Conductor that the double quote character in question should be taken literally and not as an indication to close the literal. You can do this using the \\*"* syntax.

If you immediately precede certain characters, such as a double quote, with the slash character, this tells Conductor to treat it as a part of the text only. For example:

*"She said \\"Hello\\", then smiled"*

This expression would result in *She said "Hello", then smiled.* The non-escaped double quotes at the start and finish are still treated as indicators of the start and finish of the text literal.
