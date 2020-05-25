---
published: "2013-10-16"
title: What the Hell is a Python?
fact: The Walt Disney Company is founded by Walt Disney and his brother, Roy Disney.
fact_year: 1923
tags: python, tutorial, programming
---

It's a large genus of snake found mostly in Africa and the sub-continent of Asia. Wait, that's not important right now.

Really though, Python a programming language. It's good for lots of simple tasks and I think everyone should know a bit about it. It also has the added bonus of being popular for data manipulation. It doesn't matter what field you're in, there's going to be some task that can be improved or eased by a computer doing more of the lifting for you. This guide is aimed at people with no technological experience and should be easy to pick up and help you be computer-awesome in no time.

__Remember:__ _Learning to code is a lot like riding a bike: you're still a fine person if you can't, but learning to do so will save you a lot of time._

READMORE

## What exactly is programming?
It's simple! Programs are sets of instructions that manipulate _variables_ that are followed explicitly (in order!) by a computer (and without ambiguity). There's a fun exercise you can do with kids where you have someone try to verbally explain how to make a PB&J to someone who purposefully misunderstands instructions. You end up with an exchange something like this:

"Put the peanut butter on the bread." _He sets the jar on a loaf of bread_
"I meant open the jar first" _opens jar, sets it on loaf of bread_
"Wait, get two pieces of bread out and put the knife in the peanut butter" _stacks bread, PB, and knife jammed in jar_

As you can see, English is ambiguous, which is why computers are so nitpicky about syntax. They're going to execute the program and they want to make sure they do exactly what you say.

## Let's get our hands dirty

All you need to follow along is access to a Python interpreter. One can be found pre-installed on Mac computers (by typing `python` into the `Terminal` application) or online [here](https://repl.it/languages/python). This guide is written for Python 2, which will eventually phase out of usage. You can check your computer's version by typing `python --version` (mine currently says 2.7.10).

In Python, there are a few different __data types__: integer and string are the most common ones. _Integers_ are any whole number, and _strings_ are words. Now let's apply it.

Hit Command+Space to bring up the spotlight search bar. Search for "Terminal" (the icon is a black box). Click that, and when it pops up, type the word 'python' (without the quotes). You should now see a couple of lines about text followed by `>>>`. That's the computer telling you that it expects some input, so let's give it something. Hit enter to submit a line.

```
>>> 1
1
>>> 'name'
'name'
>>> '1'
'1'
```

Numbers that aren't in quotes are integers. Anything in quotes is a string (like the last 1, which isn't considered a number because it's in quotes). Make sense?

You can perform basic math on numbers just like you'd expect.

```
>>> 1+1
2
>>> 2+2
4
>>> 3*3
9
```

So that's neat. You can add strings, too! This is called _concatenation_ and literally means tacking one thing onto the next.

```
>>> 'hello'
'hello'
>>> 'hello'+'david'
'hellodavid'
>>> 'hello '+'david'
'hello david'
>>> '1'+'1'
'11'
```

Did you catch that at the end? Python added the two strings together, just like we told it to. The fact that they're numbers and we might have been expecting 2 as output doesn't matter to it- we gave it instructions and it followed.

##Boxes on boxes on boxes
Programming would be a boring field if all we could do was stick strings of letters together. Luckily, we can store values in _things_. These can be __variables__, lists, or other things.

```
>>> x
Traceback (most recent call last):
File "<string>", line 1, in <module>
NameError: name 'x' is not defined
>>> x = 3
>>> x
3
>>> x+1
4
>>> x+x
6
```

Before you set `x` to something, it's nothing (and using it gives an error, like so). Now, any time we use `x`, it's going to evaluate to 3. That is, the computer doesn't even see the fact that it's `x`, it just mentally replaces it with 3 every time. You can scroll up and do any of the previous examples with variables replacing the strings or `int`s we use.

We can also use lists, which are just what you'd think they'd be. Collections of items in a certain order that happens to be very useful. You can access certain _elements_ in a list as shown below. Note that everything in computer science is "0-indexed", which means lists start at 0, not at 1.

```
>>> list = [1,2,3,4,5]
>>> list
[1,2,3,4,5]
>>> list[0]
1
>>> list[2]
3
>>> list[3]+list[1]
6
```

Now, storing variables is cool, but if we're not making the computer do most of the work, we're doing it wrong. We want to get all of the elements from the list, but we don't want to type `list[0], list[1], list[2]`, especially for long lists. That's where `for` loops come in!

`For` loops perform a specific set of instructions a set amount of times. They're convenient for doing something with every item in a list or an operation exactly 8 times. `For` loops have an internal _iterator_, a variable that is set to every element in the list before the instructions are run. This iterator can be named just like any other variable and usually has something to do with the contents of the list. [^1]

```
>>> list = ['David','Karen','Chuck','Shawn','Jenny']
>>> for name in list:
...   print name
...
'David'
'Karen'
'Chuck'
'Shawn'
'Jenny'
>>> list = [1,2,3,4,5]
>>> for number in list:
...   print number+1
...
2
3
4
5
6
```

Above,  the variables `number` and `name` are set to each list item, then the code inside the block is run. Note that the _iterator_ takes the type of whatever the list item was. Our strings set `name` to a string while `number` knows that it's an integer and reacts accordingly.

The `...` that follows lines ending in a `:` is there because indentation matters in Python. You're making a loop, so Python needs to know exactly which instructions to run in that loop. The `...` lets you know that Python is still taking loop instructions. Additionally, you need to add a space (or two, as long as you're consistent) before each loop instruction to create the indentation. The command line doesn't do this for you. To end the loop, just input an empty line. Loops are super helpful, so make sure you understand them!

## Let's put it all together!
Big, complicated programs are actually just collections of little programs. So, let's put some simple things that you know how to do together and make something neat!

Let's start with two lists, `names = ['David', 'Karen', 'Chuck', 'Shawn', 'Jenny']` and `favorites = [1, 3, 4]`. Write a short program that greets each of the favorites. The output should look like this:

```
Hi, Karen!
Hi, Shawn!
Hi, Jenny!
```

Remember, you'll need to declare the lists yourself. You'll also need to use `for` loops of some sort.

Once you've written a solution, click [here](https://gist.github.com/xavdid/c606cca34aa996b4f20f3ad097ace8f1) to see if you're right [^2].

That's all for this installment. There will probably be more to come! If you've got any feedback or questions, let me know on Twitter [@xavdid](https://twitter.com/xavdid). If you're hungry for more, you can check out LearnXinYMinutes' [python article](https://learnxinyminutes.com/docs/python/). Thanks for reading!

[^1]: Naming variables in a certain way is a _naming convention_. There's no rule that says all of your variables can't be named after food always, but it's bad form and makes your code confusing. In the interest of readability, give variables descriptive names!

[^2]: My solution may look different from yours, which is good! As long as our output is the same, you're good to go.
