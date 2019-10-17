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