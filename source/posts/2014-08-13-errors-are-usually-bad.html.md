---
title: Errors Are Usually Bad! A Cautionary Tale
fact: The first episode of the American animated series South Park premiered on Comedy Central.
fact_year: 1997
---

The worst part about programming is that the computer does exactly what you tell it to. _Exactly_. 

Here at [RelateIQ](https://www.relateiq.com/) I work in __Internal Tools__, or building products for other employees. My most recent project has involved a pythong script moving data out of a database and into the product itself so a bunch of users could be slung through our new Marketo integration and contacted. 

READMORE

These jobs usually take a couple of hours to run, so we stick them in [Docker](https://www.docker.com/) containers and let [Cronos](https://github.com/airbnb/chronos) take care of the rest. Because I wanted to make sure that the initial population run actually finished, I put an unusually aggressive `try-except` block in the code in the hope that it would gloss over any weird corner cases and legacy data. It looked something like this: 


    for user in users: 
        try:
            uid = str(user['_id'])
            if uid in user_hash:
                # process and save the user object
                
            print "finished %s" % uid
                
        except:
            print "error %s" % uid
            
And this looked great. It was nigh unstoppable! 

Before I put it in the container and pushed, I wanted to run it just to make sure everything was smooth. I fired it up and after some promising logging messages, I saw lots of successes. 
    
    =================
    Begin IUL.py
    =================
    finished 0
    finished 1
    finished 2
    finished 3
    finished 4
    finished 5
    finished 5
    ...
    
And so forth. Great! Now I just need to kill the execution and run my build script and I'll be on my way. I hit Control+C and watched the interrupt get registered and ignored. 

    ^C error 8
    ^C error 9
    ^C error 10
    ^C error 11    
    ^C error 12
    finished 13
    finished 14
    ...

"That's interesting!", I thought with increasing trepidation. Ctrl+C was supposed to be my magic bullet, my ace in the hole for rescuing me from any terminal process that I had tricked myself into. Speaking to the [rubber duck](https://en.wikipedia.org/wiki/Rubber_duck_debugging) on my desk I explained how "It's weird, because python is clearly _seeing_ the error happen because the message is changing accordingly, so the erro... oh."

Python was seeing the error, and it was doing exactly what I told it to. When a python script is ordered to stop, it registers a [KeyboardInterrupt](https://docs.python.org/2/library/exceptions.html#exceptions.KeyboardInterrupt) and acts accordingly. Unfortunately, that KeyboardInterrupt was being eaten up with anything else that could go wrong and was being ignored. 

A process kill and a quick addendum fixed my dumb problem and the script ran as normal after that. It just goes to show-

_Be careful what you wish for, because you just might get it!_
