# vuejs-todo-template

This repository contains the code and setup instructions for the [VueJS]

# Setup instructions

Table of Contents
  - [Quick Start](#quick-start)
  - [Inspecting the HTML w/ VueJS Dev Tools](#inspecting-the-html-w-vuejs-dev-tools)
  - [Adding to-do items](#adding-to-do-items)
  - [Displaying the added to-do items](#displaying-the-added-to-do-items)
  - [Removing the to-do items](#removing-the-to-do-items)
  - [Marking items as done instead of just removing them](#marking-items-as-done-instead-of-just-removing-them)
    - [Conditional Styling](#conditional-styling)
  - [Session Storage: Tracking previous to-dos](#session-storage-tracking-previous-to-dos)
  - [Counting unfinished to-dos](#counting-unfinished-to-dos)

In this workshop, we will create a simple to-do app with VueJS. The vue.js library is already included in `index.html` under assets/javascripts/lib/vue.js.

We will be starting with `index.js` in the assets/javascripts folder.

## Quick Start
Initialize a `vm` with a header in the data payload. 
  - `el` refers to the element's id in the html later on, hence the `#`.

```js
var app = new Vue({
    el: "#app",
    data: {
        header: "Hello World",
    }
});

```


Add the header into the html body in `index.html`. Note the div's id.

```html
...
    <body>
        <div id="app">{{ header }}</div>
        <script
            type="text/javascript"
            src="assets/javascripts/lib/vue.js"
        ></script>
        <script
            type="text/javascript"
            src="assets/javascripts/index.js"
        ></script>
    </body>
```

## Inspecting the HTML w/ VueJS Dev Tools 

At any time, you can use the vue.js browser extension dev tool to inspect the element. 

![](screenshots/vuedevtool_panel.PNG)

> If you try clicking on the vue.js extension icon for the first time and it says that Vue.js is not detected on the website, go to extension settings in your chrome browser, then switch on this configuration. ![](screenshots/extension_config.PNG) Refresh the local webpage and you will see that it can detect Vuejs now.

## Adding to-do items

We want to add todo items now. We need to add variables and methods for adding these items.
   - In `index.js`, we will add new variables in data and new methods. We can remove the header since we don't really need it anymore.

```js 
var app = new Vue({
    el: "#app",
    data: {
        newEntry: "",
        todos: []
    },
    methods: {
        addEntry: () => {
            if (this.newEntry) {
                this.todos.push(this.newEntry);
                this.newEntry = "";
            }
        }
    }
});

```


Add an input into the html body with the `v-model` directive, so that upon hitting the enter key in the input, the user will add the item.

```js
<body>
  <div id="app"></div>
  <h1>My To Do list</h1>
  <input type="text" name="entry" v-model="newEntry">
  <!-- ... -->
</body>


```

## Displaying the added to-do items

Add a div containing the items.
```html
<body>
    <div id="app"></div>
    <h1>My To Do list</h1>
    <input
        type="text"
        name="entry"
        v-model="newEntry"
        v-on:keyup.enter="addEntry"
    />
    <div class="items">
        <div class="item" v-for="entry in todos">
            {{ entry }}
        </div>
    </div>
    <!-- ... -->
</body>
```

## Removing the to-do items

Add a X button for removing items and the method that will be triggered when it is clicked.

In the div containing the to-do items, add the X button element there.
```js
<div class="items">
    <div class="item" v-for="entry in todos">
        {{ entry }}
        <a class="close" v-on:click="removeEntry">X</a>
    </div>
</div>
```

The removeEntry method is added similarly in the methods of the `vm`.

```js
methods: {
    addEntry: function() {
        if (this.newEntry) {
            this.todos.push(this.newEntry);
            this.newEntry = "";
        }
    },
    removeEntry: function(index) {
        this.todos.splice(index, 1);
    }
```

## Marking items as done instead of just removing them

We will have to change the current data structure of each to-do item if we want to keep track of whether it is done or not. So we will modify the addEntry method and store the to-do item like this.

In `index.js`
```js
methods: {
    addEntry: function() {
        if (this.newEntry) {
            value = this.newEntry;
            this.todos.push({ value, isDone: false });
            this.newEntry = "";
        }
    },
    // ...
}
```

Then in `index.html`, we will render the todo item's text based on the value in the object, and add a checkbox for modifying the state of `isDone` of the todo item.
```html
<div class="items">
    <div class="item" v-for="entry in todos">
        <input
            type="checkbox"
            name="isDone"
            v-model="entry.isDone"
        />
        {{ entry.value }}
        <a class="close" v-on:click="removeEntry(index)">X</a>
    </div>
</div>
```

If you inspect the data, you can see the boolean value of isDone being changed when you check the checkbox.

### Conditional Styling

We want the item to be strikethrough when it is done, so to do this, VueJS has another directive for us to insert conditional styling, `v-bind:class`.

`index.html`
```html
<div class="items">
    <div
        class="item"
        v-for="entry in todos"
        v-bind:class="{done: entry.isDone}"  <!-- add this -->
    >
        <input
            type="checkbox"
            name="isDone"
            v-model="entry.isDone"
        />
        {{ entry.value }}
        <a class="close" v-on:click="removeEntry(index)">X</a>
    </div>
</div>
```

## Session Storage: Tracking previous to-dos 

We would like to store these items such that even when we refresh the page, the data that we key in previously stays there. However we won't go to the extent of setting up a database, so we will just set up a simple session storage.

Let's add a watcher into our `vm`, that watches the `todos` array with a handler function. 

```js
var app = new Vue({
    // ...
    watch: {
        todos: {
            handler: (newToDos) => {
                sessionStorage.setItem(
                    "my-todo-list",
                    JSON.stringify(newToDos)
                );
            },
            deep: true
        }
    },
    //...
})
```

Then we can inspect the session storage.
![](screenshots/session_storage.PNG)

You can try refreshing and see the data still inside session storage. But you won't see it rendering on the browser, because the `vm` instance is not retrieving data from the session storage yet.

So let's make it retrieve data from the session storage, by adding a lifecycle hook, particularly the `mounted` function.

```js
var vm = new Vue({
  // ...
  beforeCreate: function () {
      console.log("before create")
    },
    created: function () {
      console.log("created")
      
    },
    beforeMount: function () {
      console.log("before mount")
      
    },
    mounted: function () {
      console.log("mounted")
      const ssToDos = sessionStorage.getItem("my-todo-list");
      this.todos = ssToDos ? JSON.parse(ssToDos) : []; // check if ssToDos exists, then if it exists parse it into a Javascript Object. Otherwise assign this.todos as an empty array.
  }
  //...
})
```

Now when you refresh the page, you can see that your previous todo items are still there! :)

## Counting unfinished to-dos

```js
var app = new Vue({
    // ...
    computed: {
        unfinishedEntries: function() {
            return this.todos.filter(entry => !entry.isDone);
        }
    },
```

Show the unfinished entries on `index.html`

```html
<body>
  <div id="app">
      <h1>My To Do list</h1>
      <input
          type="text"
          name="entry"
          v-model="newEntry"
          v-on:keyup.enter="addEntry"
      />
      <p>
        Unfinished entries: {{unfinishedEntries.length}}
      </p>
      <!-- ... -->
  </div>
</body>
```

And you're done with the todo app! :)
