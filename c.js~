var multilabel = require('./lib/multilabelsvm' );
var actionClassifier = new multilabel.Classifier({kernel : 'rbf'});
var trainSet = [
{ input:'What is your name',output: "name" },
{ input:'how are you',output: "fine"},
{ input:'please tell your name please',output: "name" },
{ input:'your name please',output: "name" },
{ input:'what is your name',output: "name" },
{ input:'who am i',output: "listener" },
{ input:'do you know my name',output: "listener" },
{ input:'what is my name',output: "listener" },
{ input:'do you know about me',output: "listener" },
{ input:'do you know my name',output: "listener" },
{ input:'do you know me',output: "listener" },
{ input:'your age',output: "age" },
{ input:'who are you ',output: "name" },
{ input:'may i know your name',output: "name" },
{ input:'your name',output: "name" },
{ input:'where you your',output: "about" },
{ input:'how do you do',output: "fine" },
{ input:'how are you doing',output: "fine"},
{ input:'how are you',output: "fine"},
{ input:'how do you do',output: "fine"},
{ input:'how are you',output: "fine"},
{ input:'are you fine',output: "fine"},
{ input:'how do you feel',output: "fine"},
{ input:'what do you do',output: "fine"},
{ input:'can you edit this',output: "edit"},
{ input:'can you change my name',output:"change"},
{ input:'i dont know what to do',output: "help" },
{ input:'what should i do',output: "help" },
{ input:'could you repeat it',output: "repeat" },
{ input:'can you repeat',output: "repeat" },
{ input:'can you please repeat it',output: "repeat" },
{ input:'please repeat it',output: "repeat" },
{ input:'please repeat again',output: "repeat" },
{ input:'repeat',output: "repeat" },
{ input:'tell once again',output: "repeat" },
{ input:'i dont want to repeat it',output: "fine" },
{ input:'tell once more',output: "repeat" },
{ input:'can you please check it',output: "check" }
]

actionClassifier.trainBatch(trainSet);

//console.log(actionClassifier.bag.features);

console.log(actionClassifier.classify('do you repeat'))
console.log(actionClassifier.classify('who are you'))
console.log(actionClassifier.classify('how are you'))
console.log(actionClassifier.classify('what is my name'))
//backing up
var json = actionClassifier.toJSON()
var newActionClassifier = new multilabel.Classifier();
console.log('----------New Classifier----');
//importing
newActionClassifier.fromJSON(json);
console.log(newActionClassifier.classify('how are you'));
console.log(newActionClassifier.classify('who are you'));
console.log(newActionClassifier.classify('please repeat again'))
