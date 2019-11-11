# A TO-DO list

## Points to work further on

* learn how to use function `componentDidUpdate()`:

Its basic template:

```js
componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.userID !== prevProps.userID) {
        //this.fetchData(this.props.userID);
    }
}
```

* learn `React-Markdown`

## Lessons learned

* `bind` assigns a function to an object of same name or, in simpler words, it makes the function an object itself. Let's say you define a function `f` in which some properties of an object `O` are modified. So you may want to write:

```js
f.bind(this)
```

That way, you may later write `f` without parentheses `()` and still the function runs, otherwise an error will display as `f is undefined`

* each time `setState()` is called, the `render()` function will then be called automatically to re-render changes.