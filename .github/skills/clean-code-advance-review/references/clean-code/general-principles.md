# General Principles

## Comments

- There is a difference between good and bad commenting.
- You'll also identify when and where to use comments.

### Good Comments

1. **Legal Comments:** Our corporate coding standards force us to write certain comments for legal reasons. For example, copyright and authorship statements are necessary and acceptable to put in a comment.
2. **Informative Comments:** It's useful to provide basic info with a comment. For instance, a comment that explains the return value of an abstract method.
3. **Explanation of Intent:** A comment is helpful when explaining the implementation and intent behind a decision.
4. **To-do Comments:** It's apt to leave "To Do" notes in the form of comments.
5. **Improving the Code:** Comments can help in improving the block of code. Instead of writing two separate comments in the first block, simply combine them into a single line. However, try to avoid these comments by extracting blocks into well-named methods.

> Remember: comments should only be used when it's impossible to express ourselves without them. The only good comment is the comment you found a way not to write.

### Bad Comments

1. **Bad Code:** One of the more common motivations for writing comments is bad code. Instead of spending time writing comments that explain bad code, spend time cleaning the code instead.
2. **Redundant Comments:** A comment is redundant if it describes something that clearly describes itself, such as a simple function with a header comment that explains a method. The comment probably takes longer to read than the code itself.
3. **Closing Brace Comments:** Putting special comments (closing braces, in the loop, try, while, etc.) might make sense for long methods with deeply nested statements or logic. But to avoid confusion, shorten the method by splitting long methods into several smaller methods.
4. **Commented Out Code:** Code does not need to be commented out. In cases where the code is no longer in use, it should be deleted.
5. **Noise Comments:** Sometimes there are comments that are nothing but noise. They are obvious and provide no new information so there is no need to include them.
6. **Incorrect Comments:** An incorrect comment is worse than no comment. Any time code is changed, check whether the comment is relevant and if it needs to be updated.
7. **Journaling Comments:** Source control is used to describe what is done, when, and how changes were made. There is no need to journal this with comments.

---

## Do Not Repeat Yourself (DRY)

In order to make development easier to maintain and understand, software developers use a strategy called the DRY principle.

- **DRY** (Don't Repeat Yourself) is a software coding principle focused on reducing the duplication of information. Using DRY supports maintenance efforts, readability of code, and saves time and money.
- **WET** (Write Every Time) is a term used to describe when the DRY principle is not applied to code. Essentially, WET code causes the need to write code repeatedly due to maintenance and reusability challenges caused by code that doesn't follow the DRY principle.

| | DRY | WET |
|---|---|---|
| 1 | Every piece of knowledge must have a single, unambiguous, authoritative representation within a system. | Knowledge is expressed in two or more places. |
| 2 | When it is applied successfully, a modification of any single element of a system does not require a change in other logically unrelated elements. | You need to find all occurrences and fix everywhere. |
| 3 | Elements that are logically related all change predictably and uniformly and are thus kept in sync. | It isn't a question of whether you'll remember, it's a question of when you will forget. |

### Common Duplications

The DRY principle suggests reducing duplications and focusing on single representation in a system. Here are common forms of duplication.

#### 1. Imposed Duplications

- Project standards may require documents that contain duplicated information or code.
- Even programming platforms themselves require certain structures that duplicate information.
- To avoid:
  - Use code generators. Code generators can generate appropriate duplicated structures based on metadata. But be aware, code generators can violate the Inversion of Control Principle (high-level code depends on low-level metadata).
  - High-level comments. Keep low-level knowledge in the code and reserve comments for high-level explanations. Code should be self-explanatory.

#### 2. Inadvertent Duplications

- Happens when developers don't realize they are duplicating information, like:

```csharp
class Line
{
    Point start;
    Point end;
    Double length;
}
```

- To avoid:
  - Regular code reviews will help to deal with inadvertent duplication.

#### 3. Impatient Duplications

- Happens when the developers realize they are introducing duplications but leave it because of lack of time or just laziness.
- To avoid:
  - Impatient duplication is all about team culture and education. Tech leads and senior developers should educate other team members and conduct regular code reviews to eliminate that problem.

#### 4. Inter-developer Duplications

- Occurs when multiple people in a team (or in different teams) duplicate a piece of information.
- To avoid:
  - With the help of code analysis tools, it is much easier to find duplicated pieces of code in the project. Proper project structure, good documentation on APIs, good collaboration, and regular knowledge sharing sessions help eliminate root causes of duplication.

### Exceptions

Sometimes it doesn't make sense to keep our code DRY. It might be more efficient and/or more effective (both in time and money) to duplicate our work.

1. **Performance:** By introducing duplication, we can improve performance. The key here is to control the scope of duplication, like introducing it only to one place where a performance boost is needed.
2. **Reduce Coupling:** For example, we can have a dedicated data access layer for every microservice instead of creating one shared data access layer which makes all microservices couple to it.
3. **Tests:** The readability of a test case is more important than possible duplication. Keeping in mind that in most cases duplication is a bad thing, we still can find tests where duplication is warranted in order to express the "test case."
4. **Automatically generated code:** Even though this is true, it's important not to manually change the code. Over time, manually changing generated code will make it difficult, if not impossible, to replace the code automatically.

### Enforcing DRY

1. **Reviews:** Regular code reviews are one of the most effective ways to detect already introduced DRY violations.
2. **Code Structure:** Creating and maintaining a clear, well-defined project structure supports consistency and communicates guidelines and expectations.
3. **Documentation:** Maintain quality, easily accessible documentation for internal APIs by creating and updating it in an automated fashion.
4. **Collaboration:** Support high-level collaboration by preventing "knowledge silos" and conducting regular knowledge sharing sessions.
5. **Tools:** Modern static code analysis tools support the detection of duplicated pieces of code.
6. **Team Culture:** Set up a proper team culture by educating team members on the importance of avoiding duplications.

---

## Error Handling

### General Principles

Clean code also has errors, but it can handle them in a way that doesn't obstruct the logic of the code and reduce its readability.

There are 4 general guidelines for clean error handling that should always be implemented:

1. **Find the Root of the Error:** One error in a method can be fixed on a per-client basis, but this leads to repeat handling of the same error and can be extremely hard to debug. Locate the source of the error and fix it once.
2. **Include Relevant Error Details:** Collect all necessary information such as where the error occurred, the class, method and line number, the type of error, a descriptive error message, and a dump of the runtime stack if there is too much information.
3. **Handle Errors Properly:** If it's a false alarm, ignore it. If not, report it by writing a message to the screen or in a log file. You can also choose to terminate the program execution or repair it and try to recover from the error.
4. **Use Exceptions instead of Codes:** You will have maintainable code if you use exceptions rather than returning codes.

### Returning Error Codes vs Throwing Exceptions

Exceptions are preferred over error codes because they keep your code clean and maintainable.

### Try-Catch-Finally Statements

### Don't Return Nulls

- You need to ensure there's enough context to determine the source and location of the error.
- This is accomplished by creating informative error messages to pass along with exceptions. Avoid generic exceptions, such as `IllegalArgumentException`. Instead, include specific exceptions for each case and remember to always wrap exceptions in custom exceptions so the stack trace is not lost.
- Returning null is something to avoid whenever possible, but it can happen using a "try-catch-finally statement" if you're not careful.

### Don't Pass Nulls

- Just like receiving null, you should also avoid passing null. In the end, you will write less code and avoid decisions about how to handle nulls.
- Special case: external APIs expect nulls to be passed.

---

## Code Quality Metrics

- Code Quality Metrics use functional verification to identify and gauge the quality of the product, as well as assess defects early in the process, when they are easier and more cost-effective to fix.
- Code Quality Metrics also track technical and architectural quality of the software product, because that will have a significant impact on its maintainability.

### The Metrics

#### 1. Cyclomatic Complexity

- Simply put, cyclomatic complexity measures how complex your code is. Based on the numbers given per method in your source code, you can easily tell if the code is complex or not. The goal is to keep complexity under 10.
- How do you deal with high complexity?
  - Simplify it by refactoring, or reducing complex methods into two highly cohesive, well-named methods.

#### 2. Lack of Cohesion in Methods

- Measuring the consistency of a class, Lack of Cohesion in Methods, or LOCM, is an object-oriented metric.
- It measures the connection between methods and local instance variables of a class. High cohesion indicates good class subdivision.
- How do you deal with low cohesion?
  - Subdivide the classes into two or more subclasses that have increased cohesion.

#### 3. Coupling Between Objects

- Coupling Between Objects, or CBO, represents the number of classes coupled to a given class.
- High coupling equates to low cohesion, and vice versa. Low coupling supports the general goals of high readability and maintainability.
- How do you deal with high coupling?
  - Create a well-structured computer system with good design, and high cohesion.

#### 4. Code Coverage

- Code coverage is a metric for finding untested parts of a codebase.
- Low coverage numbers, typically below half, are a sign there is not enough testing.
- Coverage should be used more as a metric to identify the areas of code which are not being covered by tests.
- How do you deal with coverage?
  - Write enough tests. Along with having high code coverage, make sure to implement effective assertions and multiple test cases with varied input data.

#### 5. Unit Test Percentage

- Unit test success percentage is the number of unit tests that ran successfully during a given unit test execution.
- Get as close to 100% as you can. If one or more tests fail, the build is considered unstable.
- How do you deal with a failed unit test?
  - Fixing the code to pass the unit tests, fixing the unit test if the failed unit test is related to a change in the requirements, and muting or removing the unit test if it's no longer relevant, and adding new tests are all viable options depending on the need.

#### 6. Duplicate Code Percentage

- When you change the same code in several places for a system, the chance of missing changes is high.
- Duplicate code percentage is the percentage of identical code structures identified in more than one instance.
- How do you deal with duplicate code?
  - Use the DRY principle to make every piece of code have a single, unambiguous, authoritative representation within a system.

#### 7. Technical Debt

- Technical debt is the cost associated with maintaining and enhancing a platform where shortcuts were taken in the design and/or implementation phases.
- Nonstrategic debt is when there are gaps created without stakeholder approval and strategic objectives aren't properly considered.
- How do you deal with nonstrategic debt?
  - Enforcing standards and conventions in code writing, avoiding shortcuts taken to meet time constraints, and identifying and defining debt in order to manage it are all ways to combat nonstrategic debt.

#### 8. Code Comments

- Percentage of comments, or comment density, calculates the number of comment lines in code.
- Density is calculated against the total lines of code in the codebase.
- How do you deal with code comments?
  - Following effective clean code practices, the code will be readable without needing any unnecessary comments.

#### 9. Static Code Rules

- The static code rule is a single number that indicates how well good practices and standards are being implemented.
- These individual rules are based on the specific language used in the code as well as how the code is configured in static code analysis tools such as PMD, CheckStyle, FxCop and JSLint.
- How do you deal with static code rules compliance?
  - It depends on the specific language and configuration, but values must be as close to 100% as possible.

### Code Quality Metrics in Practice

#### Cyclomatic Complexity

- You can calculate the complexity of code by starting with a count of one for the method and adding one for each flow-related element that is found in the method.
- Alternatively, if you have a graph of your code, you can calculate Complexity(M) for the method by subtracting the number of nodes (N) from the number of edges (E) and adding the number of connected components (P). This gives you the equation `E - N + P = M`.
- Example: there are ten edges and eight nodes in the graph representation of the code, so the complexity is 3. `10 - 8 + 1 = 3`.

#### Lack of Cohesion in Methods

- LOCM is calculated as the proportion of methods that don't access a specific data field averaged over all data fields in the class.
- For each field in the class, count the methods that reference it (x), and then add them across all fields (y). You then divide by the count of methods (a) times the count of fields (b) and subtract the result from one.

```text
1 - (x + y) / (a * b) = LOCM
```

- LOCM for a class will range between 0 and 1, with 0 being totally cohesive and 1 being totally non-cohesive. This makes sense since a low "lack of cohesion" score would mean high cohesion.
- Example: this class has a field, a property, and two methods. Notice that both methods and the property all reference the field. This is a cohesive class and its functionality is entirely wrapped up in manipulating the number field. `1 - (3/4) = 0.25`.

### Determining Which Metrics to Utilize

- It's important to combine and evaluate a set of them together to identify how to plan the corrections in your code and design.
- The best approach is to work with your team and business partners to identify metrics that will be the most helpful in achieving project goals and tracking trends.
