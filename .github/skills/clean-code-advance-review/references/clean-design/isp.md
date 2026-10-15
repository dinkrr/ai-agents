# Interface Segregation Principle (ISP)

> "Clients should not be forced to depend on methods that they do not use." (Robert C. Martin)

- It means that interfaces should be designed with a client's needs in mind.
- When you follow the ISP, interfaces belong to clients rather than libraries or hierarchies, enabling you to avoid situations where clients are "forced to depend on methods that they do not use."

The goal of the ISP is to reduce the effects and regularity of changes, which you accomplish by developing thin interfaces and splitting software into independent parts.

## Benefits of the ISP

### Reduces Coupling

- The primary benefit of the ISP is that it decouples an application. In general, coupling negatively impacts reusability. When an interface is long and detailed, it is difficult for you to use it elsewhere.

### Simplifies the Application

- Along with the other SOLID principles, the ISP makes an application easier to maintain, update, and deploy. Fat interfaces involve unnecessary complexity, which is not ideal for maintainability or ease of comprehension.

### Increases Testability

- The ISP and the other SOLID principles make it easier to mock and test small and cohesive interfaces.

While you can add a new method to an existing interface, if the new method implements a different responsibility, it's best to separate it into a new interface. Implementing new methods without considering potential effects can lead to unintended and undesirable results, so it's best to adhere to this principle from the start.

## Applying the Interface Segregation Principle

A simple way to evaluate your class design for ISP compliance is to ask the question: "Do I need all of the methods on this interface I'm using?" If the answer is "No," you likely need to trim it. There are also several tips you can follow to apply the ISP.

### 1. Ensure a class implements all methods of an interface

- Any classes that implement the interface should implement all properties or methods without any `NotImplementedException`s or other workarounds.
- Applying this tip also helps you align your code with the Liskov Substitution Principle.

### 2. Make interfaces cohesive

Thin interfaces should be cohesive, which means they contain groups of operations that logically belong together. Ensuring cohesion prevents a sub-optimal, one-method-per-interface design in a solution.

### 3. Divide and combine fat interfaces

If you have a fat interface, try to separate it by logical groups to form thin interfaces. Your classes can implement one or several of these interfaces later, which makes it easier for you to maintain and reuse your code.

## Example Violation of ISP

The design of the ATM interface does not adhere to the ISP because it contains several issues.

- The design declares methods that do not logically belong together. The interface is large, so over time, it can get confusing.
- The original design forces classes to depend on unused methods and therefore depend on changes that should not affect them. Even a small modification would require the whole library to be recompiled and redeployed.
- The design is not modular. If you wanted to make a modification to the ATM, for example, to create a simpler ATM that would not be able to deposit cash, that change would be complicated because it would still have to implement existing methods.
- Changes to the original design create a ripple effect that necessitates additional changes.

### How to Improve

Instead of developing a massive interface, you can apply the ISP and develop three logical, cohesive interfaces for each type of interaction:

- Interface: Deposit UI
- Interface: Withdrawal UI
- Interface: Transfer UI

## Applying the ISP Beyond Interfaces

At its core ISP means: "Don't depend on more than you need." Some languages do not have interfaces, for example, Ruby, Python, or out-of-the-box JavaScript. However, the rationale behind the ISP applies to those languages, too.

The following dependencies are relevant to both dynamically and statically typed languages.

### Unused parameters in object construction

- When you create an object, you might have required parameters for a constructor that are not used.

### Initializing a complex data structure to launch simple tests

- Lack of adherence to the ISP can have significant implications for unit testing. If you need to create a complex structure just to launch a simple test, the design is not ideal.

### Calling unrequired methods to launch a required method

- Users should not have to call methods they do not need to launch a method that they do need. This is a dependency that you need to eliminate.

## Conclusion

Keep these points in mind as you apply this principle to your work:

- No client should be provided an interface with functionality it does not use.
- For languages that do not have interfaces: subtypes should not be forced to inherit or implement methods that have specific semantics or signature.
- Interfaces should describe groups of operations that logically belong together.
- The ISP makes it easier to mock interfaces in unit tests, reuse them throughout your code, and understand the logic behind the design.
