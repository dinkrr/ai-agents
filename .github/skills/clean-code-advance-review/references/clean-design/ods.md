# Objects and Data Structures (ODS)

Objects and data structures are components of a program that are essentially opposite of each other.

## Basic Concepts

### Objects

All objects have two characteristics: state and behavior. They store their states in variables (fields), which are not observable from the outside, and interact with other objects via functions (methods). Objects pass, receive, and process information in the form of data. The common characteristics of similar objects define a class of objects. So, an object is an instance of a class.

### Data structures

They act as containers of structured data. They have no behavior because they are just data holders used for organizing, processing, retrieving, and storing data. But data structures have variables and can expose the variables through public fields or getters and setters. A getter is used to retrieve the value of a variable, and a setter is used to update the value of a variable.

> "Data structures expose their data and have no meaningful functions."
>
> "Objects hide their data behind abstractions and expose functions that operate on that data." (Robert C. Martin)

- When you add a new object or a class, you apply OOP.
- When you add new data structures, you use Procedural Programming.

## Data/Object Anti-Symmetry and Object-Oriented Programming

- There is an interface: `Shape`. All the classes that implement this interface are supposed to have the `area` function. Two of the existing classes are `Square` and `Rectangle`, which calculate the area in two different ways.
- If you add a new shape class, `Circle`, none of the existing classes will change.
- But if you add a new function, a new behavior must manifest itself, and all of the existing classes must be changed.

In this OOP solution, the `area()` method is polymorphic.

## Data/Object Anti-Symmetry and Procedural Programming

- Consider a situation with classes and data structures. In this case, the calculation of the area will not be a part of the structure that represents the shape itself. But it will be a separate `Area` procedure.
- If you start calculating both area and perimeter, all of the existing shapes will be unaffected.
- But if you add another shape, `Circle`, you have to modify all of the functions in `Area` and `Perimeter` to accommodate that change.
- This situation is the opposite of one in which objects must change. With procedural programming, it's easy to add new behaviors but difficult to add new data structures.

> Changes that are difficult for OOP are easy for Procedural Programming, and changes that are difficult for PP are easy for OOP.

As you work with objects and data structures, it's vital to keep them separate and avoid hybrid structures.

## Avoiding Hybrid Structures

- Hybrid structures are half objects and half data structures. Hybrids have functions that perform significant operations, which makes them resemble objects. However, hybrids also have either public variables or public accessors and mutators that, in practice, make the private variables public. This, in turn, tempts other external functions to use those variables as data structures. These concepts do not go well together, so hybrids show a poor design.

## Choosing Data Structures or Objects

Most often, you need to add new data types. In these situations, OOP is the right choice. Still, sometimes you need to add new behaviors. In these situations, a procedural approach is preferable.

## Getters and Setters in Objects

Using getters and setters for objects is usually a poor design choice.

### 1. Violation of the Tell, Don't Ask Principle

Using getters and setters for objects violates the Tell, Don't Ask Principle. You should tell an object what to do instead of asking it for data and acting on that data.

### 2. Violation of the Single Responsibility Principle

Using getters and setters for objects violates the SRP. A class should have only one reason to change and be highly cohesive. Getters and setters manipulate individual variables and hinder the SRP.

### To improve your OOP design

Keep it high-level and, where possible, refer to abstractions (a simplified model of a much more complicated physical entity or activity) or interfaces, but do not refer to specific implementation details.

## Limitations of Procedural Programming

- An issue with procedural design is when you modify one part of your application, and the modification leads to a whole cascade of adjustments throughout the entire application.
- Another problem may occur when you encounter an error. If that happens, get ready to go through each line of code until you identify the cause.

## Conclusion

- Expose data in the most abstract form possible. Be careful with getters and setters.
- Keep in mind that:
  - objects make it easy to add new classes without changing existing functions;
  - data structures make it easy to add new functions without changing existing data structures.
- Choose either OOP or PP design according to system needs and stick to your choice, but do not use hybrids.
