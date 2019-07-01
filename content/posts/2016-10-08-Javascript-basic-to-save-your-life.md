---
layout: post
title: JavaScript basic to save your life(time)
description: "It is very common when we learn something and do not exercise, over time we forget, this is quite normal in everything we have learned and it is not different in web programming."
tags: [Front-end]
keys: [JavaScript]
date: 2016-10-08
author:
cover: /images/posts/bg_master_head.jpeg
fullscreen: true
---

It is very common when we learn something and do not exercise, over time we forget, this is quite normal in everything we have learned and it is not different in web programming.

The basic principles JavaScript for example, despite not being complex, the use of libraries such as jQuery or even KendoUI, ReactJS or AngularJS abstract a lot of things that, and with time you fail to remember them constantly.
Throughout this text I will present some very useful things you should not forget.

## keep it always on head
Variables are declared using the key-world `var`:

    var a = "some string"

Variables declared without the key-world `var` are considered globals, so try to avoid it.

Also Variables names are case sensitive, so:

    var a = "some string"
    // is not the same than
    var A = "another string"

# Primitive types
Not confuse the primitive types with internal objects with the same name for example:

* `string` - is not = `String()`
* `numeric` - is not = `Numeric()`
* `boolean` - is not = `Boolean()`

> Each has different internal properties and methods

### string, numeric, boolean

    // Primitive string type
    var band = "motorhead"; 
    // using a method of String object to format the bands name
    var bandUpperCase = band.toUpperCase();

> In fact the primitive types and objects are connected and go from primitive to object and object to primitive type when used

So here is the primitive examples:

    var text = "this is a simple primitive string";
    var number = 1;
    var condition = true;

##### string
In JavaScript nothing differentiates a variable string of a numeric or boolean variable, because the language is not strongly typed.
A string is a sequence of characters enclosed in double or single quotes.

    var a = "this is a string";
    var b = 'this is a string';
    var c = "747"; // this is a string

##### string convertion
In JavaScript it's possible to convert data types as numeric and boolean in string, the engine makes the conversiton automatically.

    var n = 77;
    var s = "The number is" + n;
    // output: The number is 77

The conversion to string depends on where the plus sign is found. For example:

    var a = "7" + 4 + 7 // return 747
    var b = 7 + 4 + "7" ; // retun 117

But if you use another operator instead the plus sign (+), the opposite occurred, take a look:

    var a = "77" - 2 // return 75
    var b = 30/ "3" // return 10
    var c = "5" * 5 // return 25

> These examples illustrate how the weak typing can interfere with your code.

However as we commented in the first example, it is possible to convert a string using the global function String()
and we can have the following results:

    undefined.toString();
    // return undefined
    null.toString();
    // return null
    true.toString();
    // return "true""
    77.toString();
    // return "77""

##### boolean
In boolean case, as we previous mentioned: true or false is different than "true" or "false".
For boolean types the most important factor to keep in mind is when we use a condition. Different data types are interpreted differently. For example if we try to evaluate
a variable assigned to 0 (Number), the result will be false.

    var zero = 0;
    var isZero = Boolean(zero);
    // return false

And here's what happen with the following types:

    if(undefined) {} // return false
    if(null) {} // return false
    if(true) {} // return true
    if(false) {} // return false
    if(1) {} // return true
    // if the number is zero or NaN, return false
    if(string) {} // return true, but if the sring is empty return false
    if(onject) {} // return true

##### numeric
Numbers in JavaScript can be integer or floating.

    var a = -1000
    var b = 747
    var c = 14.800
    var d = -1.5

Moreover, as we do with the string using the toString() method of the String() object, we can use the methods parseInt() and parseFloat() from Numeric() object;

    parseFloat("2.5 inch"); // return 2.5
    parseInt("-747"); // return -747

The parseFloat and parseInt from Number() object convert different types as:

    undefined = NaN
    null = 0
    boolean = if true return 1, if false return 0
    number = number integer
    string = integer or floating depends on representation
    object = NaN

Also we can use the typeof operator to find the type of variable:

    typeof "Motorhead" // Returns "string" 
    typeof 747 // Returns "number"
    typeof false // Returns "boolean"
    typeof [1,2,3,4] // Returns "object" (not "array")
    typeof {name:'Lemmy', age:76} // Returns "object"

### null and undefined
Another very important point is `null` and `undefined`, many people confuse them constantly in JavaScript.

A null variable can be declared as:

    var a = null;

If you declare a variable and don't initialize, your variable will be: undefined

    var b;

When a javascript application grows and becomes very large, it is common to try to use any variable that has not been set and it will have a error.

    if(somevar) {} // return false if was not defined and initialized, 

In javascript a variable is undefined even if it is declared until it is initialized.
We also have the NaN type (Not a number). This occurs when a variable string or boolean type can not be converted into a number.

    var a = 1.0
    if(a == "um"){} // Will return false, because is evaluated as NaN.

Furthermore we can test a variable if nan using the function isNaN()

    if( isNaN(a) ){} //

# Operators
The JavaScript has some types of operators, see:

    + Addition
    - Subtraction
    * Multiplication
    / Division
    % Returns the remainder of the division
    ++ Increment
    -- Decrement

> These operators are considered as binary because of a need to operate on each side of the operator

These operators are considered as binary because of a need to operands on each side of the operator.
It is possible to use any of these operators in a statement, and assign the result to a variable or pass it as a parameter to a function.

### Assignment Operators

    =
    += example: a += b the same as a = a + b
    -= example: a -= b the same as a = a - b
    *= example: a *= b the same as a = a * b
    /= example: a /= b the same as a = a / b
    %= example: a %= b the same as a = a % b

### Comparison and Logical Operators

    == equal to
    === equal value and equal type
    != not equal
    !== not equal value and not equal type
    > greater than
    < less than
    >= greater than or equal to
    <= less than or equal to
    ? ternary operator

### Operator Precedence
Operator precedence describes the order in which operations are performed in an arithmetic expression.
Multiplication (*) and division (/) have higher precedence than addition (+) and subtraction (-).

    var a = 100 + 50 * 3;

if you want to perfom the addition first you need to use parentheses:

    var a = (100 + 50) * 3;

### Ternary Operator
Is also quite common you need to use a ternary operator, it can be written this way:

    `condition` ? `value` if true : `valeu` if false

For example:

    var a = 10;
    var b = (a > 5) ? "Yes it is" : "No it is not";

### Logical Operator
All the previous example we used two operands and one Operator, now let's see a example with only one operator and how to use with Logical Operators (`&&`, `||`, `!`).

    var a = "Motorhead";
    if( a == "Motorhead") {} 

Now using Logical Operators

    var a = 10;
    if( a > 10 ) && ( a <= 20 ) // return false, a is not greater that 10

    if( a > 10 ) || ( a <= 20 ) // return true, a is less than 20

The first example using the operator `&&` (AND), require both expressions are `true`, so the entire expression will be considered `true`. As first one was false, we have `false` in return.
The second example using the operator `||` (OR), require only one expression are `true`, so the entire expression will be considered `true`. As second one was true, we have `true` in return.

> When using the `&&` operator, if the first expression is `false`, the JavaScript engine stop and not evalute the second expression, because the intruction will fail anyway.
The `||` operator needs at least one expression as `true`, to be considered `true`.

The `NOT` (!) operator, return `true` if the expression is `false` and return `false` if the expression is `true`.

    var a = 10;
    if(!(a > 10)){} // return true

The previous section/exemples i used parentheses, it is not necessary due the precedence from the operators i just used to make the reading easy and to ensure the expression will be evaluated
in the order i want.

# Loops
The javascript as any other language has loop statements, we can use the following:

* for - loops through a block of code a number of times
* for/in - loops through the properties of an object
* while - loops through a block of code while a specified condition is true
* do/while - also loops through a block of code while a specified condition is true

### For
Is the most used loop, and is pretty simple to understand:

    for (step 1; condition; step 2) {
    ...
    }

In practice:

    for ( var i = 0; i < 5; i++ ) {
        console.log(i); // return 0 1 2 3 4
    }

* Step 1 - ( var i = 0 ) - Attribution
* Contition - ( i < 5 ) - Condition
* Step 2 - ( i++ ) - Increment

> There are other ways to use the for loop, including passing more than one variable in step 1 or omitting the step 1, however if you remember this way, will help you a lot.

### For in
This is probably the most used loop when you deal constantly with AngularJS for example, it is always seen when you use the directive `ng-repeat`.

    var band = { name:"Motorhead", album:"March or Die", year:"1992" }; 

        var text = "";
        var i;
        for (i in band) {
            text += band[i];
        }
        // return Motorhead March or Die 1992

> Remember: Loops can execute a block of code as long as a specified condition is true.

### While
The while loop loops through a block of code as long as a specified condition is true.

    while (condition) {
        ...
    }

    var i = 1;
    while ( i < 10 ) {
        console.log(i);
        i++;
    }
    // return 0 1 2 3 4 5 6 7 8 9

### Do While 
The do/while loop is a variant of the while loop. This loop will execute the code block once, before checking if the condition is true, then it will repeat the loop as long as the condition is true.

    do {
    ...
    }
    while (condition);

    do {
        console.log(i);
        i++;
    }
    while (i < 10);
    // return 0 1 2 3 4 5 6 7 8 9


### To be Continue...
This is a continuous post weekly is added content here, check back regularly
