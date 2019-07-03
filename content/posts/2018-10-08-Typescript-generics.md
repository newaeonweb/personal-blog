---
title: TypeScript Generics
description: "Generics is available in almost all typed languages. It allows transforming your code in a reusable fashion without having to rely on unsafe casting to retrieve the value stored in an object."
tags: [Front-end]
keys: [TypeScript]
date: 2018-10-08
author:
cover: /images/posts/bg_master_head.jpeg
fullscreen: true
---

Generics is available in almost all typed languages. It allows transforming your code in a reusable fashion without having to rely on unsafe casting to retrieve the value stored in an object. Without generics, there are different ways to achieve reusability. For example, you can have an interface with an any type.

> _Learn how to use generics in TypeScript in this tutorial by Patrick Desjardins, a senior software developer and the author of_ [_TypeScript 3.0 Quick Start Guide_](https://www.packtpub.com/application-development/typescript-30-quick-start-guide)_._

This would make the field open to receive any kind of object, hence being reusable for many scenarios:
```ts
    interface ReusableInterface1 {  
	    entity: any;  
    }
```
A slightly better way would be to specify whether you want to accept primitives or only objects:
```ts
    interface ReusableInterface2 {
	    entity: object;
    }
    const ri2a: ReusableInterface2 = { entity: 1 }; // Does not compile
    const ri2b: ReusableInterface2 = { entity: { test: "" } };
```

In both the cases, the problem comes when you want to use the reusable field. With any and object, youdon’t have access to the original variable's member as you have no way of knowing what the original type was:
```ts
    const value = ri2b.entity; // value -> "object"
```

In this code, it is impossible to use .test of the entity without casting back to the entity. In that particular type, it is an anonymous type but still possible:
```ts
    constvalueCasted = value as { test: string };  
    console.log(valueCasted.test);
```

However, generics can remove this hindrance of accessing the original type by bringing the type of the object into the type’s definition without tampering the type to be isolated with a single type. To create a generic function, interface, or class, you need to use the <or  > sign:
```ts
    interfaceMyCustomTypeA {
	    test: string;
    }

    interfaceMyCustomTypeB {
	    anything: boolean;
    }

    interface ReusableInterface3<T> {
	    entity: T;
    }
```
The name between the brackets does not matter. In the following code, you have the entity with two custom interfaces as type T. In fact, you can use all the possible types since there is no generic constraint in place, so far:
```ts
    const ri3a: ReusableInterface3<MyCustomTypeA> = { entity: { test: "yes" } };
    const ri3b: ReusableInterface3<MyCustomTypeB> = { entity: { anything: true } };
    const ri3c: ReusableInterface3<number> = { entity: 1 };
```
The biggest advantage is that if you access the object, the field entity is of a T type, which changes depending on how the object was created:
```ts
    console.log(ri3a.entity.test); // "yes" -> string
    console.log(ri3b.entity.anything); // true ->boolean
    console.log(ri3c.entity); // 1 -> number
```

## Accepted kinds of data structure for generic type

The concept of generics spreads beyond just interfaces. Generic is available for types, classes, and functions as well. The disposition of the brackets that define the generic type goes right after the interface name, type, or the class name. Generic can be used to have a generic field, generic parameter, generic return type, and generic variable:
```ts
    typeMyTypeA<T> = T | string; // Type

    interfaceMyInterface<TField, YField> { // Interface wiht two types   
	   entity1: TField;
	   myFunction(): YField;
    }

    classMyClass<T>{ // Class
    list: T[] = [];
    publicdisplayFirst(): void {
	    const first: T = this.list[0]; // Variable
	    console.log(first);
    }  
    }
```
A generic type can have many generics at the same time, allowing multiple fields or function parameters to have a different kind of type:
```ts
    functionextractFirstElement<T, R>(list: T[], param2: R): T {
	    console.log(param2);
	    return list[0];
    }
```
## Constraining a generic type

The problem with using an object to make sure no primitives are passed in an interfaceis that you don’t get back the initial type when you get back the entity. The following code illustrates the problem:
```ts
    interface ReusableInterface2 {
    	entity: object;
    }
    const a = {
    	what: "ever"
    };
    const c: ReusableInterface2 = { entity: a };
    console.log(c.entity.what); // Does not compile because "what" is not of object
```

It is possible to keep the original type and have a constraint to not allow a primitive with the extends keyword:
```ts
    interfaceAnyKindOfObject {
    	what: string;
    }
    interface ReusableInterface3<T extendsobject> {
    	entity: T;
    }
    const d: ReusableInterface3<AnyKindOfObject> = { entity: a };
    console.log(d.entity.what); // Compile
```

The extends keyword allows specifying the minimum structure that must be present in the object passed to the generic type. You could extend any minimum structure, interface, or type:
```ts
    interfaceObjectWithId {
    	id: number;
    	what: string;
    }

    interface ReusableInterface4<T extends{id:number}> {
    	entity: T;
    }
    const e: ReusableInterface4<AnyKindOfObject> = { entity: a }; // Doesn't compile
    const f: ReusableInterface4<ObjectWithId> = { entity: { id: 1, what: "1" } }; // Compiles
    const g: ReusableInterface4<string> = { entity: "test" }; // Doesn't compile
```
The above example has two variables that do not compile. The first variable is set to a wrong object. The third variable is set to a string, but the generic constraint cannot be fulfilled by the string because it doesn't have the `id:number` field.

Take a look at an example of a generic with a constraint:
```ts
    interface ReusableInterface5<T extendsObjectWithId> {
	    entity: T;
    }
```
Other than having access back to the full original type, generic with constraint allows accessing the constraint field from the class or function that implements the generic. The first code example, with function, has the constraint directly at the function signature. It allows accessing only the field from the constraint:
```ts
    function funct1<T extendsObjectWithId>(p: T): void {
    	console.log(`Access to ${p.what} and ${p.id}`);
    }
```

Similarly, a class lets you use inside any of its functions from the generic constraint. In the following code, the function loops the generic list of T. Since T is extending ObjectWithId that has the what property and id; both are accessible:
```ts
    classReusableClass<T extendsObjectWithId>{
	    public list: T[] = [];
	    public funct1(): void {
		    this.list.forEach((p) => {
		    console.log(`Access to ${p.what} and ${p.id}`);
	    });
	    }
    }
```
_You’ve now learned the basics of Generics. If you found this article helpful and want to learn more about TypeScript, you can explore_ [_TypeScript 3.0 Quick Start Guide_](https://www.amazon.com/TypeScript-3-0-Quick-Start-Guide/dp/178934557X)_. The book is ideal for JavaScript developers who want to get started with TypeScript._
