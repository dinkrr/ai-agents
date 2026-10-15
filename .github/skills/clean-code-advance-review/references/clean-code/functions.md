# Functions

Robert C. Martin, renowned software engineer and author of several books on software development, suggests functions should be fewer than 20 lines.

## Impact on Blocks and Indenting

- If you're going to be successful in writing small functions, you need to understand how blocks and indents are going to be impacted.
- Blocks within "if" statements, "else" statements, and "while" statements, for example, should only be one line. That line could also be a function call.
- Additionally, a five-line function is incapable of holding a nested structure, so the indent level shouldn't exceed one or two. That means your function can only do one thing, and that is the next guideline.

## Functions Should Only Do One Thing

- Don't make your functions multi-task; they only need to do one thing.
- One way to double-check that your function is only doing one thing is to start extracting. If you can extract another function, your function is doing more than one thing.

## Functions Should Have One Level of Abstraction

- Code that does one thing does not have mixed levels of abstraction. This means essential concepts will not be mixed with lower-level details.
- If you're writing detailed code right beside high-level code, you're not following this rule and it's going to be confusing for other readers of your code.
- It should read as a top-down narrative where every function is followed by those at the next level of abstraction. Robert C. Martin calls this "The Stepdown Rule."

## Functions Should Be a Command or a Query, Not Both

- Command-Query Separation is a principle that states functions should either "do" something, a command, or "answer" something, a query.
- If your function is changing the state of an object and returning information about that object, that can be confusing.
- The solution is to separate the command from the query, by creating two functions from the original function.

## Functions Should Have Descriptive Names

- Don't forget that your code should tell a good story, and good stories use descriptive words, or names in this case. The function name should clearly describe exactly what the function does.
- You're not stuck with the first name you choose. Feel free to experiment with different names and read through your code before you make a final decision.
- Choosing descriptive names will help clarify the design of the module in your own mind and will enhance the storytelling. Remember, though, consistency is key!

## Functions Should Not Have Side Effects

- A function should perform the action indicated by its name and that's it. A side effect is when a function goes beyond the named action and makes other, hidden changes as well. These could be changes to the variables of their own class, system globals, or the arguments being passed into the function.
- In the case of a function that checks a password and also initializes a session, the function should be renamed to something like `checkPasswordAndInitializeSession`. This does violate the "do one thing" rule because the temporal coupling requires the function to do two things in a specific order; however, the key is that the side effect is no longer hidden.

## Functions Should Use Exceptions, Not Error Codes

- Returning error codes promotes functions being used in expressions in the predicates of "if" statements, which leads to deeply nested structures. Error codes also require that the error be dealt with immediately.

## Extract Try/Catch Blocks into Functions of Their Own

- Avoiding error codes will also help you with the next guideline, which is to extract the bodies of try and catch blocks into their own functions.
- Error handling counts as "one thing," so a function that handles errors shouldn't be responsible for anything else. If the keyword "try" exists in a function, it should be the very first word and there should be nothing after the catch or finally blocks.

---

# Small Functions

Small functions are achieved by extracting, extracting some more, and continuing to extract each function until it serves a single purpose.

## Extracting Blocks and Sections

- If you're going to extract until you can't extract anymore, that means each block and section of code needs to be broken into small, expressively named functions.
- If you need to add vertical space to separate two logical pieces of code, it's a good indication that your function is doing more than one thing and should be extracted.

### Examples

#### 1. Splitting a function that does too much

This function succeeds in being fewer than five lines but it's doing too much: "the string is invalid" is one thing and "creating an entity" is another thing.

Old:

```java
private Entity parseEntity(String str) {
    if (isInvalidEntityString(str))
        throw new WrongEntityFormationException();
    return createEntityFromFields(str.split(SEPARATOR));
}
```

New:

```java
private Entity parseEntity(String str) {
    validateFormat(str);
    return createEntityFromFields(getFields(str));
}
```

#### 2. Improving readability by fixing the negation condition

Old:

```java
if (!list.isEmpty()) {
    processItems(list);
}
```

New:

```java
if (isNotEmpty(list)) {
    processItems(list);
}

private boolean isNotEmpty(List list) {
    return !list.isEmpty();
}
```

#### 3. Extracting grouped conditions

Once again extracting has made the code easier to read. Additionally, several conditions grouped together usually have some logical meaning, so by extracting each condition into a separate function, you ensure your code is expressive and self-documenting.

Old:

```java
if (cart.size() > cart.hasPayment()) {
    processPayment(cart);
}
```

New:

```java
if (isValidForPayment(cart)) {
    processPayment(cart);
}

private boolean isValidForPayment(Cart cart) {
    return cart.size() > 0 && cart.hasPayment();
}
```

#### 4. Extracting a URL-building step

Old:

```java
private String redirectProductDetail(final String productCode, final HttpServletRequest request, final HttpServletResponse response) {
    String url = productModelUrlResolver.resolve(productCode);
    return makeRedirectResponse(request, response, url);
}
```

New:

```java
private String redirectProductDetail(final String productCode, final HttpServletRequest request, final HttpServletResponse response) {
    return makeRedirectResponse(request, response, buildUrlFromProduct(productCode));
}
```

## Conclusion

You need to be comfortable with extracting and only stopping when there's nothing left to extract. There are two ways to verify that you've extracted as much as possible:

- Your function does only one thing; and
- Your function is on one level of abstraction.

---

# Parameters

## Introduction

- Parameters are a necessary part of coding but oftentimes decrease the readability of your code.
- The more parameters there are on a single function, the more difficult it is to read.
- For this reason, it is important to reduce the number of parameters on functions and even eliminate them altogether when possible.

## The "Golden Number"

- The "golden number" is between zero and two parameters.
- There are rare cases when you may need three, but that should not be the norm.

## Do Not Use Boolean Flags as a Parameter

Our first example shows a Boolean parameter. The issue is that Boolean parameters are not expressive. If a parameter is not expressive, it can't be read.

```java
saveValue("Bob", false)
getAccount(true);
```

The reader may be able to look at the signature and understand what these parameters mean, but that extra step wastes time. The code should be readable without having to look at the signature.

```java
saveValue(Object value, boolean isMultiValue)
getAccount(boolean isSession)
```

## Do Not Pass Nulls as Parameters

Another common misstep is passing nulls as parameters. The code below is unreadable without reviewing the signature, and that's an extra step that needs to be avoided. The reader is left wondering what the function `getOrder` means and why there's a second parameter.

```java
getOrder(orderId, null)
```

The real problem is that the parameter can be null, and if the parameter can be null, you must check each function and each parameter every time. This is messy coding and it should be avoided whenever possible.

```java
Order getOrder(String id, String site) {
    if (id != null) {
        if (site != null) {
            ...
        }
    }
}
```

**Important:** If you are dealing with data that comes from a database, external service, or framework that is out of your control, you can check that data once, but do not pass nullable through other functions of your code.

## Do Not Return Nulls

Instead of returning null, it is a best practice to create an exception. This will help to keep your code clean and readable.

Consider the function below where null may be returned if there are no valid cards in the collection.

```java
Card findValidCard(List<Card> cards)
    ...
{
```

In this case, it's important that the function name indicate that it can return null. If it's not clearly indicated, it can confuse the reader.

## Avoid Output Parameters

- Parameters are most commonly used as input for functions, so when an output parameter is used it can cause confusion for the reader.
- You should be able to write most code without output parameters, but if it can't be avoided, be sure to use expressive names.

---

# Side Effects

- A function has a side effect when calling that function results in an external state change. A single, pesky side effect can make your function return a different result each time it's called. It can also cause another, separate function to return a different result, even if that function doesn't have a side effect.
- Side effects aren't all bad, though. They can serve an important purpose in your code. Without side effects, your code wouldn't be able to make changes to databases or write to external files. The key is to use side effects only when they are necessary and eliminate them elsewhere.

## The Issue of Temporal Coupling

- The root of the problem is that side effects usually occur in paired functions. Here are some simple, common examples:
  - Begin and commit
  - Open and close
  - Start process and Join/Finish
  - New and Delete
- The relationship between these pairs is called "temporal coupling." Temporal coupling is problematic because it forces one function to be called before another.
  - Example: "begin" must be called before "commit," "open" must be called before "close," etc.
  - If the functions aren't called in the correct order, your code won't work.
- These types of functions obscure the logic, decrease the readability, and increase the probability of errors in our code.

## Be Strict with Side Effects

| Pros of side effects | Cons of side effects |
|---|---|
| Side effects allow code to make changes to databases or write to external files. | Side effects can make a function return a different result each time it's called. |
| To work around the paired coupling of side effects, use the "passing the block" technique; this eliminates the issues caused by temporal coupling. | Side effects can cause separate functions to return different results, regardless of whether that function has a side effect. |
| | Side effects typically occur in pairs, referred to as temporal coupling. This can obscure the logic, decrease the readability, and increase the probability of errors in code. |

## Conclusion

In conclusion, side effects are a necessary, slightly confusing, part of programming. They can make things complicated, but they are the only way to make changes to objects outside of our code, which is critical.

It is a best practice to minimize the use of side effects as much as possible. When you have no choice but to use a side effect, you can utilize the block passing technique to minimize the disruption and maintain the readability of your code.

---

# Structure

## Introduction

- Switch statements can often be replaced with polymorphism or with a simple map data structure.
- You can determine which one to use based on the complexity of the switch statement.
- A complex switch statement will be replaced by a polymorphic interface and each case will be in a separate interface implementation.
- A simple switch statement, where each case returns some value, can be replaced with a map data structure.
- While switch statements can be useful in certain situations, their use should be limited.
- They are problematic because they often violate both the "Open/Closed" and "Dependency Inversion" clean code principles.

## Structured Programming

- Structured programming is a programming paradigm composed of structured blocks or functions with a single entrance and exit.
- Structured programming is a programming style that restricts the use of the "GoTo" statement.
- Code created with this restriction is easier to follow, maintain, and understand.
- The structured programming paradigm is so important that modern programming languages, like Java and Python, don't include "GoTo" statements at all.

Here is an example of code that violates the rule. Notice the breaks in the middle of the loops.

Returns in the middle of the loop don't always violate the single entrance/exit rule. A code sample with a middle loop return can still be easy to read because the function is very short. If we follow the rule of small functions, 4-5 lines in length, and the "extract till you drop" principle, then we can simply ignore the structured programming paradigm and the single entrance and exit rule.

## Formatting Rules

1. Keep the number of lines in your file small. Even if your functions are small, it will be hard to find them in a file 1,000 lines long. If the number of lines in a file is large, it is likely in violation of the Single Responsibility Principle.
2. The horizontal length should not exceed your screen width. It affects the readability of your code when scrolling horizontally. Nowadays, there should be no more than 120-140 characters on a line.

Here are three examples of rules teams should address:

- Indentation size
- Using either spaces or tabs for indentation
- End-of-line formatting

**Quick Tip:** Do not try to refactor the entire file. Only reformat functions or relatively small parts of the file.
