<h1>How i improved my React app faster just using CSS.</h1>

When we think about improving the performance of our app, there are two major kind on which we should invest our time to give better experience to user.
1. Fast load time
2. Fast runtime

## Fast load time
The speed in which user able to see our content when user type our url in browser address bar. There already blendy of talks around this area about what are all the best practices we should follow to deliver content faster.
![The Cost Of JavaScript In 2018](https://medium.com/@addyosmani/the-cost-of-javascript-in-2018-7d8950fbb5d4)
![The Cost Of JavaScript In 2019](https://v8.dev/blog/cost-of-javascript-2019)

## Fast runtime
The speed in which user able to interact with our page. Example when the user click on checkout button (if your app is ecommerce) it should not take more than 3s to take you to the payment page (Yes I agree that, this involves server response time also).

But there some user action that require extensive client side computation (eg: canvas / svg painting). In my case it is drag and drop of item in large list.

Before going further, I would like to give you the glimpse of how browser renders our page so that we will know where should we invest our time to improve performance.

When browser (chrome) starts render our html page, it follows below path to display the content to user from html.

![Web Rendering](https://miro.medium.com/max/700/0*hesXIReJc68LAcof.jpg)
<sup>for more info: https://developers.google.com/web/fundamentals/performance/rendering/</sup>

We need to invest our time in each stage to give better runtime experience. Every action user performs in our app follows same path mentioned above. Example when user clicks on track my order button, we will show the pipe line which indicates where the order status currently is. This action requires the browser to do following operation :-
* Execute the javascript that toggles the flag to shows order status pipe-line [Script]
* Because of step 1, a new dom element has to be added into existing dom with it’s style(with:300px, height:200px) [Style]
* Step 2 causes the other element in the page to check their position in screen whether to adjust since new element (status pipe-line) has to shown in screen [Layout]
* Browser then paint the newly created elements on layer (partial virtual screen) [Paint].
* Browser then merge the multiple layer into one final layer and displays to the user [Composite]

With basic understanding of how browser renders our html, lets see how to identify in which area we need invest our time to improve the performance for each user action.
To identify which area we need to optimize, open your chrome dev tool → go to performance tab → hit record button and perform the action that you feel slow (in my case typing on dynamically growing textarea) → stop the recording and chrome will show you report of how much time it has spend on each stage javascript, layout, paint. In my case typing on auto growing textarea, browser had spend most of its time in layout(purple in color) when typing each letter.

![Page Painting](https://miro.medium.com/max/700/1*yzMKS-HIZtvA_19XYEYP3g.png)

Layout operation will happen when we change few of specific css property eg:- height/width / top / left. Since my textarea has to grow in height upon user typing, i was resetting it’s height on each letter typing. It caused other elements in the page re-compute their position which is costlier when our page has more number of elements.

![Layout Thrashing](https://miro.medium.com/max/600/1*uhCUOZBnSRonn-xzOhgyeQ.gif)
As you can see in above gif, for each letter typing, changing the height of text area cause the all other element to re-compute it’s position. which caused the slowness. This is called <strong>layout thrashing.</strong>
But how to avoid this problem since i want my text area still to be dynamic in height as user type on it. One thing i did was, I just removed this element from its regular document layout flow by setting textarea css <strong>position to absolute</strong>. Now when ever i change the height of the textarea, it will not cause the other element to re-calculate their position.

![No Layout Thrashing](https://miro.medium.com/max/700/1*7AZBy0AkbANffrIBJv4fMQ.gif)
Now as you can see only textarea element got rendered up on typing and leaving other element unchanged. It is the huge gain. Now my performance graph looks so smooth.

![No unnecessary layout work](https://miro.medium.com/max/700/1*yNsakIoF52YTifMyl66N5w.png)

If you see the graph, browser did only what is needed to render the textarea, no unnecessary work has done by browser. I used this trick in many places to keep the browser away from doing unwanted work.
The scenario we have seen here is the one aspect of improving runtime performance. Likewise there various ways we can do optimization for each stage of browser rendering pipeline.
I will list down choices i have taken to improve the performance for my app.

* Do animation only using transform properties (scale, translate etc) not using positioning properties (top/left/height/width) which will cause the continuous layout computation.
* If you still want to do animation using positioning properties, promote that element to it’s new layer using a css property <strong>will-change: transform</strong> which will not cause the layout operation for other elements.
* Always have less number of DOM by [removing DOM which are not in view](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API). <strong>Intersection observer</strong> api helped me alot in this area.
* If you want to change the css properties of element using javascript do it in <strong>requestAnimationFrame</strong> api which will help in not blocking the user’s other operation but executing it in end of frame.
* Split your long running javascript task into smaller one and execute it inside <strong>requestIdleCallback</strong>. I mostly followed [this pattern](https://philipwalton.com/articles/idle-until-urgent/).