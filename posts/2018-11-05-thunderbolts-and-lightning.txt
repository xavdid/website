---
title: Thunderbolts and Lightning
fact: George B. Selden is granted the first U.S. patent for an automobile.
fact_year: 1895
tags: hardware
og_img: https://i.imgur.com/nfx8NXh.png
og_desc: In which a surge protector does not protect as much as is expected
---

When moving into my new apartment, the outlets and the cable were arranged in such a way that it wasn’t convenient to plug the modem into a power strip. "So what," I thought. "If lightning does strike, worst case I lose my modem and I’ve got an excuse for an upgrade! Plus, how often are there thunderstorms anyway?" I mused, foolishly forgetting that I had lived in weather-less California for years. I didn’t have a great handle on the dangers of lightning, but I was about to.

READMORE

I had a fair amount of hardware wired together. There was the modem and router, plus Ethernet cables going to my gaming PC and an old laptop I used for streaming media.[^1] Here's how everything was connected:

<!--
remove the \ in the comment enders below
graph TB
wall[Wall Outlet]
modem(Modem)
surge[Surge Protector]
router(Router)
laptop(Media Laptop)
gaming(Gaming Computer)
wall --\> modem
surge --\> router
wall --\> surge
gaming -- Ethernet --- router
laptop -- Ethernet --- router
router  -- Ethernet --- modem
-->

<img class="svg" src="https://gist.githubusercontent.com/xavdid/9691c907a61ee538f39d3a33c1f4bd3c/raw/c726af6a29f60e647bee16e33ec49ec5ea695440/start.svg?sanitize=true" />

Everything was peachy until our first big lightning storm. At first we were excited about the novelty, but as strikes started landing closer and closer to our apartment, the charm quickly wore off. I was on the PS4 at the time and got nervous about losing power while playing. I took the precautionary step of shutting it down. Before long, the lights flickered and I was glad I was prepared. Little did I know.

Before heading to bed, I noticed I a couple of oddities. Firstly, the power was out in half of the apartment. Given that it was only half, I (correctly) assumed it was a thrown breaker. I hadn't yet found the breaker box in our new apartment, so that was a problem best left for the next day. Secondly, the little lights on the front of router were off. Given that the power was partially out, this didn’t jump out to me a the time and I (incorrectly) assumed it would resolve itself in the morning.

Morning arrived, and I found the breaker box. Power was restored, but the internet was still down. I did some manual testing- some other items in that power strip still worked, others were totally unresponsive. I wasn’t sure quite how, but something was busted.

I set out to the electronics store for a universal AC adapter and a backup router. A quick test confirmed that the router itself was dead and the problem wasn't isolated in the power adapter. Frustrating and mysterious, but not the end of the world. It wasn’t until I started unplugging Ethernet cables that the root cause became clear:

![Scorched Ethernet](https://i.imgur.com/NbdRbtg.png)

It turns out Ethernet cables, when properly motivated, can carry a fair amount of charge. The lightning not only fries whatever box it's in, but it can travel the path of least resistance to everything else. In my case, that path was a series of Ethernet cables and the entrance point was the unprotected modem:

<!--
graph TB
wall[Wall Outlet]
modem(Modem)
surge[Surge Protector]
router(Router)
laptop(Media Laptop)
gaming(Gaming Computer)
lightning(Lightning)
wall -.- modem
surge --\> router
wall --\> surge
gaming -. Ethernet .- router
laptop -. Ethernet .- router
router  -. Ethernet .- modem
lightning -.- wall

classDef lightning fill:#ffae42,stroke:red,stroke-width:3px;
classDef fried stroke:red,stroke-width:3px;
class lightning lightning
class wall,modem,router,laptop,gaming fried
-->

<img class="svg" src="https://gist.githubusercontent.com/xavdid/9691c907a61ee538f39d3a33c1f4bd3c/raw/e212c6403cdc577fcc380ad7062f5b524f266e62/end.svg?sanitize=true" />

Despite the surge protector doing its job, a single unprotected entry point left the whole system vulnerable.[^2] Off the bat, I could confirm that the modem and router were hosed. My media laptop wasn’t charging, but I was hoping that was an issue with anything besides the laptop itself (there was a lot of wishful thinking that day). Most troubling of all, my gaming desktop wasn’t turning on.

When there’s something low-level wrong with a Mac laptop (such as not charging at all), the easiest resolution is an [SMC reset](https://support.apple.com/en-us/HT201295). This resets the thing that controls low-level hardware function (such as charging and USB ports). Given that my laptop was still non-responsive, I needed to isolate whether the problem was the battery not taking a charge or the SMC no longer able to route power to the battery. The folks at the Apple store made it clear that the laptop was older than what they would work on, so I was on my own. I used my iFixit tool set (and their handy [guide](https://www.ifixit.com/Guide/MacBook+Pro+15-Inch+Unibody+Mid+2010+Battery+Replacement/3024)) to [open the case up](https://i.imgur.com/KnJgIA0.png). Once I did, it was obvious what the issue was.

![Scorched Case](https://i.imgur.com/MbZmEZ6.png)

See that big black mark in the center? That's a scorch mark on the interior of the case, right under where the Ethernet port is. There’s also some slight discoloration on that corner of the logic board, but it’s hard to tell if it’s always been like that. Either way, the laptop was the third victim. Luckily, I was able to salvage the RAM and (one SATA adapter later) the SSD as well.

On a happier note note, my gaming rig somehow escaped without serious damage. The onboard Ethernet port no longer seems to be recognized, but I'll count that as a win. Plus, my question about how to protect home electronics from lightning was answered on _ATP_, one of my favorite podcasts! You can [listen to the clip here](https://overcast.fm/+CdTbsx2Q/1:15:20).

The big takeaway from all this is that lightning damage isn't limited to what's plugged directly in the wall. Plug _everything_ into a surge protector if it's at all sensitive to electricity. Furthermore, as noted in the _Accidental Tech Podcast_ clip above, surge protectors don't last forever. The [Wirecutter recommendation](https://thewirecutter.com/reviews/best-surge-protector/) stops providing power once it's no longer protected, making it very clear that it's time for a replacement.

Lightning. Who knew?

[^1]: Netflix, Amazon Prime Video, etc
[^2]:

  Remeber, the TV and everything else on the surge protector were totally fine
