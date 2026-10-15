# Single Responsibility Principle (SRP)

## Introduction

- A design that doesn't adhere to the SRP is fragile and results in effects that are hard to predict.
- The Single Responsibility Principle (SRP) is the first SOLID principle.
- The class should be small enough that you can describe its behavior by one sentence.
- When you analyze your classes, use the criteria below to make sure you follow best practices.
  - Can the class be described in one sentence?
  - Is it fewer than 25 words?
  - Does it have zero instances of "if," "or," and "but"?
  - Does it have one responsibility?
- If you answer "yes" to each of the questions and your code still explains itself, the class is the correct size.

> The Single Responsibility Principle states that each class should have only one reason to change.

- Everything within a class should do one thing, so there is only one reason for the class to change.
- If you are thinking about the responsibilities of a class and adding "and" to describe them, it means that the class may have several reasons to change in the future when you need to scale or update your application.

## Adhering to SRP

- The solution to the SRP violation is to split the class into two classes so that potential changes in the calculation appear in one class and potential changes of UI presentations appear in another class.
- Responsibilities are tied to roles, not to individuals. According to the SRP, you should not mix these responsibilities in one class.
- Responsibility is a family of functions that serves one particular actor.

> "An actor for a responsibility is the single source of change for that responsibility." (Robert C. Martin)

## Identifying SRP Violations with High and Low Cohesion

- You can check to see if a design violates the SRP by reviewing the cohesion between methods and fields within a class.
- Classes that adhere to the SRP tend to have high cohesion.
- When you see a low cohesive class, that means the class may be violating SRP. In such a case, extract new smaller high cohesive classes from that low cohesive class to adhere to SRP.

## Avoid Mixing Responsibilities

- There is another way to adhere to the SRP: reduce the responsibilities in a class to avoid mixing responsibilities.
- When you avoid mixing responsibilities, you ensure that any changes you make to part of your code won't lead to unexpected changes.
- Mixing functionality between responsibilities within a class makes a system fragile. As a result, you won't be able to predict where a system will break once you implement changes. The solution is to minimize the responsibilities of one class.

## Summary

To prevent your code from getting messy, remember the following guidelines:

- A class should be small, and it should have only one reason to change.
- The source of any axis of change is a user or an actor.
- High cohesion is a helpful additional method to identify violations of the SRP.
- Mixing responsibilities leads to a fragile and highly coupled system.
