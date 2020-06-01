---
date: "2013-12-12"
title: The Week of Code is Here!
fact: Guglielmo Marconi receives the first transatlantic radio signal (the letter "S" [***] in Morse Code), at Signal Hill in St John's, Newfoundland
fact_year: 1901
tags: [tutorial, python, programming]
---

As you may or may not be aware, [Code.org](https://code.org/learn) is a non-profit that aims to bring computer science education to people of all ages. They put out some great videos like [this](https://www.youtube.com/watch?v=FC5FbmsH4fw) one illustrating how cool computer science is. Their message is one about the future and I think it's something really worth pursuing because at its core, it's a message about how you can change the world.

READMORE

Despite what a lot of people think, Computer Science isn't actually about code. That's like saying painting is all about paint; knowing where to put what color is important, but not nearly as important as knowing which brush to use and the fact that your paint needs to dry first. Code is much the same thing- you need to know your tools, but the real art comes from using those tools in a patterned way. The best thing about it is that anyone can learn to program because it's just setting up some steps in a text editor that the computer follows exactly. In fact, everyone does it in their regular lives on a daily basis.

At its core, CS is all about a systematic approach to solving problems. So, let's do a little exercise. Say you're designing code to run the line at a Starbucks. You make orders while there's a line and you fill them when the line is empty (another big part of CS is simplifying problems). Code for that might look something like this:

```python
# lines that start with a # are comments and aren't read
# by the computer

# starbucks.py

while !the_line.empty(): # 1
   all_orders.append(order) # 2
for order in all_orders: # 3
   make_drink(order) # 4
   print "Drink for " + order.name # 5
   if collected: # 6
       order.delete() # 7
  else: # 8
     continue # 9
     # this continues on to making other drinks
     # as not to hold up the line
```

At first that might look wordy or scary (what's with all that extra punctuation?!), but it's surprisingly straightforward. Let's decode it.

In programming, `!` means not, so the first line says "while the line is not empty, do the following code". There's a list called `all_orders` that you add order objects (an object is just a chunk that stores data. In this case, probably customer name, drink ordered, and a timestamp for when they ordered it) to. When there are no more orders, you go through the whole list and make the drink (`make_drink` is a separate mini-program defined elsewhere. Just assume it makes the drink). Line 6 calls out that the drink is ready. If they collect it, you can safely delete their order. If they don't, you leave it on the counter and continue making other drinks.

This code doesn't account for every single thing that happens in line, but still gives a basic representation of how you could automate the process. Thinking cap time! Do you see a problem with this implementation of the line? We can assume that all of the code runs and returns what we expect, but there's still a design issue that will keep our store from running as expected.

Have you guessed? It's the first line! Because we don't start making drinks until there are no people waiting to order, if people keep coming in the door, no one's drinks ever get made! A better choice would be something like `while !the_line.empty() or len(all_orders) < 5:`, which would stop taking orders after the 5th. In this case we'd need some way to jump back and take more orders later, but that's a problem for another day.

If you found this little puzzle interesting (or even if you didn't), I encourage you to take at least an into programming course either online or at your local college. If nothing else, a very basic understanding of how computers work and how to approach problems is a great life skill to acquire. It'll also look great for future employers because it shows you're willing to take the initiative and learn a super helpful new skill. To that end, I've started writing a guide to Python (a very friendly programming language) aimed at non-technical people. People like my mom, my music-major friend, and friends who are English majors. If that's something that you may be interested in, head over [here](/blog/2013/10/16/what-is-a-python) to look at part one (part two is written, just needs to be edited and possibly split into separate parts).

Additionally, [Code.org](https://code.org/learn) has some resources and exercises on their site that you can sit down for half an hour and work through. If you're looking for something more involved, [Code Acadamy](https://www.codeacademy.com) is an amazing resource for beginners, as are some of the CS classes on [Udacity](https://www.udacity.com/course/cs101) and [Khan Academy](http://www.khanacademy.org/hour-of-code/hour-of-code-tutorial/v/welcome-hour-of-code).

I hope you've learned a little something here today. Feel free to get in touch in the comments or on twitter ([@xavdid](http://www.twitter.com/xavdid)) if you've got questions or feedback!
