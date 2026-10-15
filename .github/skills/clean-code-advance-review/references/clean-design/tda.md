# Tell, Don't Ask (TDA)

- The Tell, Don't Ask Principle relies on a basic object-oriented foundation: to delegate an action to an object instead of asking an object for data.
- Data encapsulated by a class should be the responsibility of its class instead of being passed to another class to process it.
- This achieves better modularity and a clear separation of concerns.

Adhering to the Tell, Don't Ask Principle helps the program to achieve object-oriented modularity and a clear separation of concerns. The Tell, Don't Ask Principle doesn't recommend separating data from the behavior that processes it.

## Procedural Code vs Object-Oriented Code

> "Procedural code gets information, then makes decisions. Object-oriented code tells objects to do things."

- Object orientation is about message transfer between objects to say what operations should be performed.
- A design that adheres to the Tell, Don't Ask Principle will never request information from an object to execute a task.

## Violation of Tell, Don't Ask Principle

### 1. Data Exposure

- Exposing data (violating encapsulation) from objects to other classes for alteration is a risky practice. It causes a specific class to become tightly coupled to another class that may not be directly related to the first.
- Data exposure leads to maintenance complexity, forcing the refactoring of different classes. If you make a change to one class, you need to change other coupled classes, too.
- Data exposure violates another clean design principle, the Single Responsibility Principle, because data exposure decreases cohesion of the class.

### 2. Anemic Domain Model

- An Anemic Domain Model is an entity that is open to provide its state to callers instead of performing the operation on itself.
- Classes that do not contain behaviors are little more than bags of getters and setters.
- This anti-pattern, of a class not having any behaviors, goes against the basic idea of object-oriented design, which is to combine data and process.
- Clients of the UserAccount class should say what operations it should perform and not ask for its internal state. In this example, several calls to the UserAccount were replaced with one. This approach ensures that the internal state of UserAccount is managed by itself and that the design is object-oriented.

## Conclusion

- The Tell, Don't Ask Principle is about object-oriented design.
- It recommends combining data and behavior to achieve better code quality.
- To avoid unnecessary requests, do not ask objects questions about their state; instead, make a decision, and then tell objects what to do.

Remember the following:

- Delegate an action to an object instead of requesting data from an object.
- Keep in mind that data exposure and the anemic domain model often violate the Tell, Don't Ask Principle.
- Replace two calls on the same object with one.
