if(typeof process === 'object' && process + '' === '[object process]')//checking if its nodejs/browser
var svmjs = require("svm");
//bag of words
var Classifier = (function(exports,svm){
var bag = function(options){

	this.features = [];//features detects from training set.
	options =  options||{}
	this.ngrams = options.ngrams|| 1 ;//it group words together as ngrams value specified.
	this.casesensitive = options.casesensitive || false; //case sensitivity of words
					 
}

//adding new feature to the features array.
//doc should be array.
bag.prototype.addFeatures = function( doc){

 this.features = doc.reduce(function(features , currentValue ) {

	if (features.indexOf(currentValue) < 0 ) features.push(currentValue);
	return features;
	
},this.features);

}

//this will add string features.first convert to array then adding to featues.
bag.prototype.addStringFeatures = function( doc){

	this.addFeatures(this.str2arr(doc));

}

//given document to array.
//it take care of the case sensitivity,ngrams options.
//code inspired by limdu. (npm limdu)
bag.prototype.str2arr = function( document){

	if(!this.casesensitive) 
		document=document.toLowerCase();

	grams = document.split(/[ \t,;:.!?]/).filter(function(a){return !!a});
	var doc=[];
	for (var i=0; i<=grams.length-this.ngrams; ++i) {
		sliceOfWords = grams.slice(i, i+this.ngrams);
		doc.push(sliceOfWords.join("_"));
			
	}
	return doc;
}

//this function converts given document array to feature vector
bag.prototype.createFeatureVector = function( doc ){
	
var features ={}
	for (var i in this.features)
		features[this.features[i]] = 0;

	for(var i in doc){
		if(features[doc[i]] > -1 )//eliminates unknown feature
		features[doc[i]] ++;
	}
//console.log(this.features);
	var featureVector = []	
	for(var i in features){
		featureVector.push(features[i]);
		}
//console.log(featureVector);
return	featureVector;
 	
}

//helper function to avoid repeaated values in an array
bag.prototype.unique = function(arr){

	return arr.reduce(function(a,b){
		if (a.indexOf(b) < 0 ) a.push(b);
		return a;
	  },[]);
  
}
//end of bag


function Classifier(options)
{ 

this.labels = [];
this.classfiers= {};
options = options || {}
options.feature = options.feature||{}
this.bag = new bag(options.feature);
this.options=options ||{
	C : 1.0,
	tol : 1e-4, 
	alphatol : 1e-7,
	maxiter : 10000,
	kernel : 'rbf', 
	rbfsigma :  0.5,
	numpasses : 100,
};		


	//creating each classifiers for each label
	this.createClassifiers = function(){
			for(var i in this.labels )
			this.classfiers[this.labels[i]] = new svm.SVM();
		
	
	}//end of createClassifiers  
	
	//initialize classifier by taking data from the training set.
	this.initializeClassifiers = function(data){
		for( var i in data){		
			this.bag.addStringFeatures(data[i].input);
			this.labels.push(data[i].output);
		}	
		
		
		this.labels = this.bag.unique(this.labels);
		this.createClassifiers(this.labels);
		
	}
	

	this.trainBatch = function(data){
	
		this.initializeClassifiers(data);
		for( var c in this.classfiers){
			var trainSet = [];
			var labels = [];
	
			for( var i in data){
				trainSet.push(this.bag.createFeatureVector(this.bag.str2arr(data[i].input)));//creating featurevector foreach document.			 
				if(c == data[i].output) //keeping binary 
					labels.push(1)
				else
					labels.push(-1);
		
			}
			//console.log(trainSet ,labels);
		this.classfiers[c].train(trainSet,labels,this.options);	
		}

	}
	//end of train batch.
	
	//classification classify each classifiers and combine their result into single class.
	this.classify=function(text){
	
	feature = this.bag.createFeatureVector(this.bag.str2arr(text))
	var	result ={}			
	var prediction=[];
	for( var c in this.classfiers){
		result[c] = this.classfiers[c].marginOne(feature);
								
	}
	return (this.getMaxFvalue(result));	
	
	}//end of classify

	//gets maximum value of prediction.
	this.getMaxFvalue = function(obj){
	max = -1;
	label='0' 
		for(var i in obj){
			if(obj[i] > max ){
				max = obj[i];
				label =i;
			}
		}
	return label;
	}
	
	this.fromJSON=function(json){
	
	
	for(var j in json.cfiers)
		this.labels.push(j);
		
	this.createClassifiers(this.labels);
	//importing classsifiers
	for( var c in this.classfiers)
		this.classfiers[c].fromJSON(json['cfiers'][c]);
	//importing bag model	
	for(var b in json.bag)
		this.bag[b] = json.bag[b];
		
	}
	this.toJSON=function(){
		var json = {'bag':{},'cfiers':{}};	
		//exporting classifiers keyed by label.
		for( var c in this.classfiers)
			json['cfiers'][c] =  this.classfiers[c].toJSON();	
		//exporting bag 	
		json['bag']['features'] = this.bag.features;
		json['bag']['ngrams'] = this.bag.ngrams;
		json['bag']['casesensitive'] = this.bag.casesensitive;		
		
		return json;		
	}

}

exports = exports || {};
exports.Classifier = Classifier;
return exports;
})(typeof module != 'undefined' && module.exports,svmjs)









