---
title: How to Strongly Type a Set/Dictionary with an Index Signature.
description: "Learn how to strongly type a set/dictionary with an index signature in this article by Patrick Desjardins, a senior software developer for Netflix since 2017 and a senior software developer at Microsoft, working on MSDN, VSTS, and Teams"
date: 2019-01-02
author:
tags: [Front-end]
keys: [TypeScript]
cover: /images/posts/bg_master_head.jpeg
fullscreen: false
---

A set or a dictionary is a common structure to store unstructured data for quick access. In JavaScript, using the dynamic notion of being able to assign a member to an object creates a dictionary.

Learn how to strongly type a set/dictionary with an index signature in this article by Patrick Desjardins, a senior software developer for Netflix since 2017 and a senior software developer at Microsoft, working on MSDN, VSTS, and Teams.

A set or a dictionary is a common structure to store unstructured data for quick access. In JavaScript, using the dynamic notion of being able to assign a member to an object creates a dictionary. Each object's property becomes a key of the dictionary. TypeScript's types above this pattern with index signature. It allows you to specify the type of the key (between number and string) and any type of values:

```ts
interface Person {
 [id: string]: string;
}
```

Writing into the dictionary is as simple as using the square bracket and assigning the value that must respect the right side of the definition. In the following code example, the key and the value are strings:

```ts
const p: Person = {};

p["id-1"] = "Name1";
p["string-2"] = "Name12";

console.log(p["string-2"]); // Name12 
```

An index signature can be tricky because of historical reasons. For example, if the index is defined to accept a string as the key, you will be able to pass a string and a number as well. The other way around is not true: a key with a number type does not accept a string:

```ts
const c: Person = {
  "test": "compile", 
  123: "compile too" // Key is number even if Person requires string: it compiles
};

interface NotAPerson {
  [id: number]: string;
}

// DOES NOT COMPILE:
const c2: NotAPerson = {
  "test": "compile", // THIS LINE DOES NOT COMPILE
  123: "compile too"
};
```

The last example illustrates more than a single issue with the type of key. The code uses syntax to define a value for an index signature directly using an object literal, where all members are the keys and their value, the index signature's value. This is the syntax to use to initialize default value, while the other way, with square brackets, is the way to add dynamically and access value rapidly.

Additionally, TypeScript allows you to access a member of an object with a square bracket by providing the name of the member as a string. The distinction with index signature is that TypeScript won't let you read or add a member if the index signature is not provided in your definition:

```ts
interface NotIndexSignatureObject {
    name: string;
    count: number;
}

const obj: NotIndexSignatureObject = {
    name: "My Name",
    count: 123
};

console.log(obj["doesNotExist"]); // Does not compile
console.log(obj["name"]); // Compile
```

Another quirk with index signature is when it is combined with an object that has other members. The key of the index signature can be only of a string with members returning a string. It means that most of the time you will have to fall back with a key of a number. The following code does not compile:

```ts
interface ObjWithMembersAndIndexSignature {
    name: string;
    count: number;
    when: Date;
    [id: string]: string; // DOES NOT COMPILE
}
```

By contrast, the following code compiles but is fragile. The reason it compiles is that in some very rare cases, TypeScript automatically converts types back to a string, depending on its usage. In that case, the number and Date of the member count and when is accepted to be a string. However, a tiny change of adding a member that has an object will disrupt that rule. The two following blocks of code illustrate that change. This following block contains a primitive:

```ts
interface ObjWithMembersAndIndexSignature {
 name: string;
 count: number;
 when: Date;
 [id: number]: string; // COMPILE
}
This second block contains an additional object that is not allowed when an index signature is defined:
interface ObjWithMembersAndIndexSignature2 {
 name: string;
 count: number;
 when: Date;
 obj: { s: string }; // DOES NOT COMPILE
 [id: number]: string | number | Date;
}
```

Another compilation issue you might have is to add a string key to an object with an index signature that has a key to a number:

```ts
const obj2: ObjWithMembersAndIndexSignature = {
    name: "My Name",
    count: 123,
    when: new Date(),
    "more": "nooo" // DOES NOT COMPILE
};
```

You can transform the object definition by providing a member of a type number with a value of a string:

```ts
  const obj3: ObjWithMembersAndIndexSignature = {
    name: "My Name",
    count: 123,
    when: new Date(),
    12: "string only" // Good if number->string
};
```

However, if you want to have a string as a key, you will need to change the type allowed as a value in your index signature to have a union of every member:

```ts
  interface ObjWithMembersAndIndexSignature2 {
    name: string;
    count: number;
    when: Date;
    [id: string]: string | number | Date;
}
```

To conclude with index signature, it is wise to have your mapping object small and without too many members, to allow having an index signature that can be accessed without requiring narrowing the type. For example, the last code example was returning a string or a number or a date. This means that every access to the object is required to check the type before consuming its properties. 

However, having an interface that has only the index signature can be used as a property of an object and have all the quick access without needing to narrow down. Here is the code that illustrates the pattern:

```ts
interface MyMap<T> {
    [index: string]: T;
}

interface YourBusinessLogicObject {
    oneProps: string;
    secondProps: number;
    thirdProps: Date;
    yourDictionary: MyMap<string>;
}
```

If you found this article interesting, you can explore TypeScript 3.0 Quick Start Guide to work with everything you need to create TypeScript applications. TypeScript 3.0 Quick Start Guide is the ideal introduction to TypeScript, covering both the basics and the techniques you need to build your own applications.
