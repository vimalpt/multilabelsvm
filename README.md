# multilabelsvm
This library allows svm(support vector mechine) to support multiclasses in nodejs and browser.


## installation 

### node
```
npm install multilabelsvm
```
for svm kernel option refer svmjs 
initialize the classifier as the following 

```
	var multilabel = require('multilabelsvm' );
	var actionClassifier = new multilabel.Classifier({kernel : 'linear'});
```

### browser

You need to include svmjs for this.

```javascript
// include the library
<script src="./svmjs/lib/svm.js"></script>
<script src="./lib/svm.js"></script>
<script>

var actionClassifier = new Classifier({
										kernel : 'rbf',
										C : 1.0,
										feature:{
											ngrams:2,
											casesensitive:true}
										});


</script>
```

## Usage

Example usages are given below.
svm configuration you can use all the parameter specified by the svmjs

in features option it suports ngrams,casesensitive
 

```javascript

var trainSet = [
{ input:'What is your name',output: "name" },
{ input:'how are you',output: "fine"},
{ input:'please tell your name please',output: "name" },
{ input:'your name please',output: "name" },
{ input:'what is your name',output: "name" },
{ input:'who am i',output: "listener" },
{ input:'who are you ',output: "name" },
{ input:'may i know your name',output: "name" },
{ input:'your name',output: "name" },
{ input:'where you coming from',output: "about" },
{ input:'how do you do',output: "fine" },
{ input:'how are you doing',output: "fine"},
{ input:'how are you',output: "fine"},
{ input:'how do you do',output: "fine"},
{ input:'how are you',output: "fine"},
{ input:'what do you do',output: "fine"},
{ input:'can you edit this',output: "edit"},


]

actionClassifier.trainBatch(trainSet);



console.log(actionClassifier.classify('who are you'))
console.log(actionClassifier.classify('how are you'))

//backing up
var json = actionClassifier.toJSON()
var newActionClassifier = new multilabel.Classifier();
console.log('----------New Classifier----');
//importing
newActionClassifier.fromJSON(json);
console.log(newActionClassifier.classify('how are you'));
console.log(newActionClassifier.classify('who are you'));

```


