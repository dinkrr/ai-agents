# Law of Demeter (LoD)

## What is the Law of Demeter?

The Law of Demeter (LoD), also known as the Principle of Least Knowledge, is a set of object-oriented programming rules that puts restrictions on interactions between program modules.

The LoD helps you avoid a major problem that can arise when you try to create a chaining method: a knot of dependencies. When you have a knot of dependencies, it means that a change in one object in the code will force you to verify/recompile/redeploy the module with the object and all other modules that depend on it.

You can avoid creating a knot of dependencies by:

- **Hiding information:** You don't want the client of your code to know everything about all other types that you aggregate.
- **Controlling access:** You don't want to grant the right to change the state of aggregated objects.
- **Minimizing coupling:** You want to achieve low coupling between your units and modules.

To implement the law, follow these rules for objects and functions.

| Level of objects | Level of functions |
|---|---|
| Each unit has limited knowledge about other units. The unit should be aware only of other units that are directly relevant. | Function F of an object O may only call functions of the following objects: |
| Each unit interacts only with "friends" (units known to the object) and does not interact with "strangers" (units unknown to the object). | O itself; F's parameters; any object instantiated within F; O's direct component objects; global variables accessible by O in the scope of F. |

## Adhering to the Law of Demeter

You can't call a function on an object if you get a reference to the object after another function invocation.

### Example 1

In this example, you have the `Car` object in your program. You retrieve an engine from the car to start it.

This example violates the LoD. Instead of retrieving data from the object to make some actions, tell the object what to do, and let the object handle the behavior. To adhere to the LoD, refactor your code to call the `startEngine()` method on the `Car` object.

As a result, you will get this solution. The solution also adheres to the Tell, Don't Ask Principle.

### Example 2

The issue is not in the chaining method itself. You can extract local variables, and you will have separate variables for each object, as demonstrated in the example code. In this case, tools for static code analysis might not trigger an alarm. But the issue still exists. This code violates the LoD because you call a function on an object that was received by calling another function.

A violation of the Law of Demeter is a sign that code must be decomposed and that an object-oriented approach is not followed. In the example, using the car object to pay the fine is not object-oriented because a knot of dependencies still exists.

## The LoD and Creational Design Patterns

- Creational design patterns, such as factory method, abstract factory, etc., are responsible for creating objects. Review two examples to see the difference between violations and LoD adherence with creational patterns.

### The LoD Is Not Violated

- This example might seem like it violates the Law of Demeter because the way the object is created looks like a chaining methods invocation with the involvement of different types, such as product factory and product.
- However, the code does not violate the law for several reasons:
  - According to the LoD, you have the right to call any object instantiated within F, which means you can instantiate objects. Creational patterns do the same.
  - Although adhering to the LoD means that you are restricted in calling a function on objects you get because of another function call, you should not take creational patterns into account. Because the goal of creational patterns is to create objects, you can consider that the `getProduct()` method invocation in this example is equivalent to the creation of an object with the `new` keyword.
- The same situations in your code can happen when you implement other creational design patterns. You need to keep in mind the essence of the law.

## The Essence of the Law of Demeter

- The Law of Demeter is not about eliminating chaining methods; it is about restricting the number of interactions between non-related units to implement low coupling.

### The LoD Is Violated

If you make a call on the `Promotion` object, you violate the LoD. The reason is that the `apply()` method call breaks the law of least knowledge. In this case, a better solution would be to call `applyPromotion()` directly on the product object.

In this case, you restrict the number of interactions between non-related units.

## Advantages

### 1. Low coupling

- Units interact only with a limited number of other units, the closest ones.

### 2. Encapsulation

- The Law of Demeter allows you to use exactly what you need instead of getting one object out of another and receiving more information about code structure than you need. As a result, you have more opportunities to modify the state of other objects that you want.

### 3. Data localization

- By limiting possible options of interaction, code becomes easy to understand and to navigate.

### 4. Clearer class responsibility

- The class which takes multiple responsibilities has either long method calls or a huge dependency list. In real life, applying the Law of Demeter enables you to refactor existing units and create other smaller units with clear responsibility.

### 5. Better testable units

- Low coupling allows you to write unit tests without being concerned about eliminating all necessary dependencies to test the unit's functionality.

## Disadvantages

### 1. Many new wrapper methods

- You need to have more methods to pass information between different objects. While this point might sound like a valid concern, by the point in development when the creation of many wrapper methods seems to be a disadvantage, your object likely has many duties related to different pieces of an application. So, as long as you follow all other object-oriented principles, you shouldn't consider this a significant disadvantage.

## Conclusion

Remember the following:

1. Function F of an object O may only call functions of the following objects:
   - O itself
   - F's parameters
   - Any object instantiated within F
   - O's direct component objects
   - Global variables accessible by O in the scope of F
2. Dividing a chain into variables is not always an option. The LoD is not about eliminating chaining methods; it is about restricting the number of interactions between non-related units to implement low coupling.
3. Using creational patterns is equivalent to the creation of an object with the `new` keyword.
