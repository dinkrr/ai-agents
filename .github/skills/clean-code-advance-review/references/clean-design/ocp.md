# Open-Closed Principle (OCP)

## What is the Open-Closed Principle?

- The Open-Closed Principle (OCP) is the second SOLID principle.

> "Software entities should be open for extension and closed for modification."

| Open for extension | Closed for modification |
|---|---|
| The behavior of the module can be extended. | Extending the behavior of a module does not result in changes to the source or binary code of the module. |
| As the requirements of the application change, we are able to extend the module with new behaviors that satisfy those changes. | The binary executable version of the module, whether in a linkable library, a DLL, or a Java .jar, remains untouched. |
| In other words, we are able to change what the module does. | |

## Shotgun Surgery Anti-Pattern

A single change to functionality that requires widespread changes in an application signifies this anti-pattern.

- The structure on the left is well-defined. The structure on the right, however, illustrates the complications that result from the anti-pattern.
- A single change impacts the rest of the application. The blue fields on the right represent replaced component parts.
- Existing components have changed together with new functionality requests, and new relationships have appeared.

## Applying the Open-Closed Principle

> "What [the OCP] means is that you should strive to get your code into a position such that, when behavior changes in expected ways, you don't have to make sweeping changes to all the modules of the system. Ideally, you will be able to add the new behavior by adding new code and changing little or no old code." (Robert C. Martin, The Clean Code Blog, 2013)

- Use an abstraction to compose functionality out of existing objects and avoid reworking existing code.
- The following list presents different examples of solutions that adhere to the OCP:
  - A well-designed API of the module or component
  - A well-defined function, class, or interface
  - An implemented design pattern
  - A domain-specific language (DSL) or architectural decision

## Extension Points

- Classes that adhere to the OCP can be open to extension if they contain defined extension points where future functionality can hook into the existing code and provide new behaviors.
- The following are different types of extension points:
  - Virtual (not final) methods
  - Abstract methods
  - Interface inheritance
  - Parameter to function
  - Setter of another class
  - Higher-order function

## Design Patterns

All design patterns apply some kind of abstraction, which means that these patterns can help you adhere to the OCP.

### Plugin Architecture Pattern

- Plugin architecture defines plugins and extension points.
- An extension point exposes the business logic and defines how you can communicate with the existing system.
- Plugins communicate with the system in a well-defined way. You can easily replace plugins, and you can use them in parallel when the architecture allows it. In addition, a plug-in can also have plug-ins of its own.
- With the plugin architecture pattern, only plugins might change. You can replace and combine plugins without necessitating new relations.
- The system uses plugins through the abstraction layer of extension points. When you implement plugin architecture, you need to make room for new features. It should be easy to add new functionality as a plugin.

### Strategy Pattern

- With this approach to design, a strategy interface encapsulates possible changes in a strategy pattern.
- This pattern makes a solution open for extension. New functionality should be externalized to a new strategy implementation.
- In the example, the `Sorter` client chooses a specific Sorting Algorithm strategy. It is easy to implement a new sorting algorithm strategy without impacting the Context Client.

### Template Method Pattern

- The template method design pattern is similar to the strategy design pattern. The main difference between the two patterns is that strategy uses delegation, while template method uses inheritance.
- An abstract class might have abstract and non-abstract methods defined together. You can use the template method pattern when you want a common behavior, and only details of this behavior might change.
- Non-abstract methods implement the common behavior, while abstract methods encapsulate the flexible parts.
- In a template method pattern, non-abstract methods execute abstract ones, which creates a skeleton of your business logic.
- In the example diagram, `Game` encapsulates four operations: `initialize`, `startPlay`, `endPlay`, and `play`. The operations are combined in a fixed order, which you cannot modify.

## The OCP is Strategic

Your software might be "closed" for modification, but that doesn't mean it's immune to all future changes. There will always be the potential for a change against which the software is not closed.

While applying the OCP has excellent benefits, there are also some drawbacks to this principle:

- It's costly to follow the OCP because it requires considerable time and effort to develop abstractions.
- Abstractions make software design more complex.

## Addressing Challenges in OCP Application

### 1. Difficult Decisions

- It is difficult to make decisions that facilitate the right design: where to apply an abstraction, what part of the code to change, and when you should leave space for flexibility.
- To overcome this challenge, you need as much knowledge as possible before deciding where to apply an abstraction layer.
  - The product backlog enables you to review future features and look for similarities and relations, which helps you prepare your current features properly.
  - Previous features reveal common abstraction layers and relations of features that have already been implemented. As you explore previous features, ask, "Is there a place for refactoring?" If so, you can try to close the software as you refactor it.

### 2. Continuous Refactoring

- If a change occurs, you can create an abstraction to predict future changes of that kind.
- The abstraction prevents a new change in the same direction from forcing you to change existing classes' code.
- Compliant code allows you to implement a change in the same direction by adding new classes and not changing any of the existing ones.
- Every time a change presents a problem that you did not protect against upfront, you must refactor the code. This process is called continuous refactoring.

### 3. Preparation for Changes

- Several practices help you prepare for changes early in development:
  - Release early and often: get the code in front of customers and users as quickly and as often as possible
  - Start with developing the most important features
  - Develop features before infrastructure
  - Show features to stakeholders
  - Adhere to a short development cycle: instead of weeks, aim for days
  - Write tests first

## Avoiding Over-Design

- Too much abstraction has negative impacts. First, abstraction is expensive. Also, too much abstraction can make application code difficult to understand and maintain. Rather than transparency, you might get the opposite effect.
- To address the issue of over design, you can use test-driven development (TDD).

TDD helps you achieve a balance between the OCP and principles of simple enough design, like "Keep It Simple, Stupid" (KISS) and "You aren't gonna need it" (YAGNI). Simple enough design principles generally emphasize simplicity and avoidance of unnecessary complexity in code.

- Using TDD leads to two distinct benefits in your development work:
  - The methodology makes it easy to refactor code to make it open-closed.
  - It helps you implement requirements step-by-step (iteratively) without over-development or over-design.

## Conclusion

- Keep the idea behind car repairs in mind: if you need to replace the windshield, the repair does not require you to modify the engine.
- The same idea applies to your development work. You want your code to be open for extension and closed for modification.
- To apply OCP, keep the following things in mind:
  - Create an abstraction or use a design pattern to achieve the OCP.
  - Apply TDD to maintain a balance between overdesign and the required abstraction for the OCP.
  - Remember that you will never achieve the OCP completely; you must apply it strategically.
