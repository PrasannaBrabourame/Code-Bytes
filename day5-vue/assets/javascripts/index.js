new Vue({
    el: "#app",
    data: {
        // Test condition is for v-if and v-show
        testCondition : 'A',
        newEntry: "",
        todos: []
    },
    computed: {
        unfinishedEntries : function(){
            return this.todos.filter(entry => !entry.isDone)
        }
    },
    // watch is watch and update in database after render
    watch: {
        todos: {
            handler: function (newTodos) {
                sessionStorage.setItem("my-todo-list", JSON.stringify(newTodos))
            },
            deep: true

        }
    },
    methods: {
        addEntry: function () {
            if (this.newEntry) {
                this.todos.push({ value: this.newEntry, isDone: false });
                this.newEntry = "";
            }
        },
        removeEntry: function (index) {
            this.todos.splice(index, 1);

        }
    },
    // Lifecycle Methods
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
        console.log('mounted')
        const ssTodos = sessionStorage.getItem('my-todo-list');
        this.todos = ssTodos ? JSON.parse(ssTodos) : []
    },
})