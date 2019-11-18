var s = '<h1>what</h1><p>what</p>';
console.log(s.match(/\<h1\>.*\<\/h1\>/)[0])
var s = '# what is wrong with you \nsomething else';
console.log(s.match(/#\s.*\n/g));