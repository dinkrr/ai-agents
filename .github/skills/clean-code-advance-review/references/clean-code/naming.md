# Naming

## Rules for Naming

### 1. Reveal Intention

- The name of a variable, function, or class should tell you three things: why it exists, what it does, and how it is used. If a name requires a comment, then the name does not reveal its intent.

### 2. Don't be Cute

- Choose clarity over humour. Say what you mean. Mean what you say.

### 3. Searchable Names

- Names should be easy to locate across a body of text. If a name occurs in multiple places, it is imperative to give it a search-friendly name. Single-letter names should ONLY be used as local variables inside short methods.

### 4. Avoid Encoding

- Avoid Hungarian notation, member prefixes, etc.

### 5. One Word, One Meaning

- Be consistent throughout your code by using one word per abstract concept. To eliminate confusion, use words that only have one meaning.

### 6. Meaningful Distinctions

- When attempting to differentiate code, make distinctions that are meaningful without changing the searchability or intention of the code. For example, don't change the spelling because the name is already taken.

### 7. Use Pronounceable Names

- It is easier to remember and discuss names that you can pronounce. For example: `genymdhms` versus `generationTimeStamp`.

## Length Rules

1. The longer the scope of a function, the shorter its name should be. The longest function names should be given to those functions that are called from just one place. Public API functions or classes usually have long scopes so we should have short and well-defined names assigned to them.
2. When functions have a shorter scope or if it is only used once, using long descriptive names will help readability. Functions that are called locally from a few nearby places should have long descriptive names, and the longest function names should be given to those functions that are called from just one place. Private functions and private classes have shorter scopes, so we want to have long and descriptive names used for them.
3. When it comes to naming variables and parameters, it's the inverse of the scope law of methods and classes. The length of a name should correspond to the size of its scope. For example, global variables should have long and self-descriptive names.
4. Local variables of a short method or small block should have short names. Names can be as short as single letters; however, these should only be used in certain circumstances:
   - Counter variables for simple for loops
   - Exception instances in catch blocks
   - Arguments of very short functions

## Grammar Rules

### 1. Class and Object Names

- Use noun phrase names
- Don't use verbs

### 2. Method Names

- Use verb phrase names

### 3. Solution Domains

- Use programming terms such as:
  - Computer Science terms
  - Algorithm names
  - Design Pattern names

### 4. Problem Domains

- Use simple terms that clearly identify the problem
- Avoid programmer language

## Practice

Story Reader (codingstories.io)
