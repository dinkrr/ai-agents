# Liskov Substitution Principle (LSP)

## What is the Liskov Substitution Principle?

> "Subtypes must be substitutable for their base types." (Robert C. Martin)

## Inheritance and the IS-A Relationship

Naive OOP teaches developers to use the IS-A relationship for describing inheritance between child classes and their base class, which is simple and useful.

**Right use of inheritance:** Even if a new object can fulfill the IS-A relationship with an old object, it does not always mean that the new object's class should be derived from the old object's class.

**Wrong use of inheritance:** Note that the "IS A" technique works when it is about behavior but fails when it is about data. So, rather than simply considering whether a subclass is a base class in terms of logic, the LSP suggests you should consider whether the base class is replaceable with the subclass in terms of behavior in all expected situations.

Basically: the LSP focuses on **"IS SUBSTITUTABLE FOR A"** rather than "IS A."

## Substitutability

- Make sure that the derived classes extend the old classes' functionality without replacing it.
- The specific functionality of the subclass may be different, but it must conform to the base class' expected behavior.
- Otherwise, the new classes can produce undesired effects when you use them in existing program modules.

Remember, child classes must not:

- remove behavior of the parent class.
- violate invariants of the parent class.
- require verification of them being different from their base type.

## Invariants

Invariants are conditions or properties assumed to hold true at all times for all base class states.

The LSP states that a proper subtype should not invalidate or change these statements of truth regardless of state.

### How to determine, apply, and test invariants

- Invariants are based on a client's reasonable assumptions about the behavior of a base class.
- Invariants are the base constraints that maintain the integrity of the whole model that your classes represent. Therefore, whenever a new subclass is created, it must not violate any base class data invariants.
- Invariants can be expressed implicitly as preconditions and postconditions for each method and, therefore, are not necessarily indicated within your code. So, to comply with the LSP, a precondition cannot be strengthened and a postcondition cannot be weakened in the subclass.
- With a technique called Design by Contract, invariants can be made explicit within the code itself. Contracts can be specified by writing unit tests, which make the base class's expected behavior clear. If a subtype violates the assumed behavior, the unit test fails. Design by Contract will help you make the client's assumptions explicit within your code and enforce the LSP.

The LSP is about child classes fulfilling the contract of their parent class. Breaking the defined contract violates the LSP.

## Violating the LSP

A simple statement which is a violation of LSP:

> "If it looks like a duck, swims like a duck, and quacks like a duck, then it probably is a duck."

This statement probably sounds reasonable. However, in computer science, this way of reasoning may be invalid. That's why it is opposed by a well-known counterexample:

> "If it looks like a duck and quacks like a duck, but it needs batteries, you probably have the wrong abstraction."

This second statement is a typical illustration of an LSP violation.

The LSP ensures that all derivatives conform to the behavior that clients expect of the base classes they use. Violating this principle and trying to fix substitutability can cause significant issues.

## Impacts of an LSP Violation

- Non-substitutable code breaks polymorphism. The code can no longer be used as if it were its base type.
- The client's code expects child classes to take the place of their base classes, but they can no longer do so.
- Adding "if-then" or "switch" statements quickly becomes a maintenance nightmare and violates the OCP.

## Indicators of LSP Violations

### 1. Type Verification

Type verification is one way to detect an LSP violation.

Imagine you are processing a withdraw transaction over the particular base type `Account`. You are going to test whether the `Account` is the `CreditAccount` and whether this case should be charged a fee.

Once you add additional classes of Accounts, which have their own withdrawal algorithm, you might have to break up this if-statement and add additional cases to it. This would make your code harder to maintain.

In this case, it is better to remove the if-logic. You can avoid the if-statement if the `CreditAccount` knows how to withdraw with a fee.

### 2. Incomplete Implementation

Imagine a common case when you have a child type that inherits from a base class or interface but does not fully implement that interface.

```java
public abstract class Base {
    public abstract void Method1();

    public abstract void Method2();
}

public class Child extends Base {
    public void Method1() {
        throw new NotImplementedException();
    }

    public void Method2() {
        // do stuff
    }
}
```

This design can cause issues if clients of your code expect a fully implemented interface, but in fact, you've only partially implemented it. If you control all the code yourself, this may not be an issue, but it is something to be aware of.

To fix:

- You can consider adding a unit test to prove that you do expect this non-implemented exception so that a user of your interface or your actual implementation will know that this is expected behavior.
- Another way to fix this kind of issue is to follow the ISP. It suggests using smaller, well-factored interfaces that suit the client's code instead of unnecessarily large interfaces.
- If all you need is `Method2` of the base class, refactor it to give you the methods you need. Then specify the interface, either the base class or the actual interface type, which would only include the methods and fields that you require.

## Fixing LSP Violations

To deal with LSP violations, follow these tips.

- Avoid objects interrogating their internals. Instead, move that behavior into the object, or possibly extract the object, that has the state and the behavior collected together.
- Tell the object what you want it to do.

When you have two classes that share a lot of behavior but are not substitutable:

- Create a third base class that both existing classes can derive from.
- Ensure substitutability between each of the existing classes and the new base class.

## Conclusion

As you apply the LSP to your code, ensure that:

- An IS-A relationship is about behavior.
- Child classes do not violate the invariants of their parent class.
- Child classes do not require verification of them being different from their base type.
- Inherited classes do not break reasonable assumptions of their base class's user.
