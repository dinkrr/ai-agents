# Dependency Inversion Principle (DIP)

## What is the Dependency Inversion Principle?

> "High-level modules should not depend on low-level modules. Both should depend on abstractions. Abstractions should not depend upon details. Details should depend upon abstractions." (Robert C. Martin)

- Low-level modules, those containing more specific details, generally change more often than high-level modules, those containing high-level policies.
- Applying the DIP prevents changes to low-level modules from impacting and forcing changes to high-level modules. It also guarantees that abstractions do not depend on details, since these dependencies can also force unnecessary code changes.

The key advantage of applying the DIP in your code design is that it results in a significant increase in your code's testability.

This principle also enables you to reduce code rigidity, decrease coupling between parts of code, and separate components cleanly, which improves your code's maintainability and readability.

## Applying the Dependency Inversion Principle

- Inverting dependencies ensures that high-level modules don't depend on low-level modules.
- It's also vital to keep the second part of the DIP in mind: abstractions should not depend on details. Details should depend on abstractions.

### Example

- The main program of the application calls high-level modules. Those high-level modules call mid-level modules, which in turn call low-level modules in the code.
- According to the DIP, this design is flawed. If you make any changes to the low-level modules, you will need to compile and change the high-level modules.
- It would also be challenging to test this code in isolation because of the hard-wired dependencies that need to be available for testing.
- Instead, design the low-level modules, which might be the database layer, the external services that your application interacts with, the UI layer of the application, etc., in a way that ensures changes do not affect the rest of the application logic.

## Avoiding a Database Dependency

Anti-patterns are programming practices that initially seem to solve a problem but are counterproductive and create additional issues. One anti-pattern that violates the DIP is a database dependency.

Although the original design illustrates a widely used approach to development, it violates the DIP because the database is the storage mechanism of the system, and it is a detail. High-level business logic should not depend on this detail. The violation results in the following concerns:

- A hard dependency on the database.
- Decentralized business logic between the Business layer and Database, which can be hard to debug and maintain over time.
- Stored procedures, which make proper source control difficult.
- The challenge of scalability.
- An impossibility of unit testing all the business logic, which cannot be integrated with a CI build.

### Solution

To avoid this anti-pattern, you can treat the database as a detail.

- The Business logic should not be dependent on the database or dependent on the schema or tables in the database.
- It also should not be concerned with whether the systems are backed with Oracle, MySQL, or a file system.
- These are all elements you can abstract away to keep the architecture as clean as possible.
- In the example diagram, the Business logic only depends on the Business Objects and a set of interfaces to communicate with other layers.
- Even the Object Relationship Mapping (ORM) frameworks should be external to the Business logic. The ORM frameworks should be part of the Data Access layer, which depends on the Business logic layer, not the other way around.

## Extension to DIP: Plugin Models

- With plugin models, also referred to as plugin architecture, you avoid a dependency from the application and database by inverting the dependency.
- When you work with Business Logic applications, always treat the application you implement as a set of use-cases and business logic that describe the application's intent.
- Then you can implement a group of plugins that give the use-cases access to the outside world.
- The "Main" module (a plugin) contains a dependency injection specification and injects strategies and factories, which can then be passed as a plugin connection to the application as abstract entities.

## Conclusion

Keep these points in mind as you apply this principle in your work:

- High-level modules should not depend on low-level modules. Both should depend on abstractions.
- Abstractions should not depend on details. Details should depend on abstractions.
- Avoid a source code dependency from the business logic to the database using the dependency inversion technique.
