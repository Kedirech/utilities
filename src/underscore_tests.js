/*jshint eqnull:true, expr:true*/

var _ = { };

(function() {

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
    if (n){
      return array.slice(0,n);
    }
    return array[0];
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {
    if (n){
      if (n===0){
        return [];
      }
      if (n>array.length){
        return array;
      }
      return array.slice(array.length-n);
    }
    return array[array.length-1];
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  _.each = function(collection, iterator) {
      for(var key in collection){
        iterator(collection[key],key, collection);
      } 
  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target){
    for (var i=0;i<array.length;i++){
      if (array[i] === target){
        return i;
      }
    }
    return -1;
  };

  // Return all elements of an array that pass a truth test.
  _.filter = function(collection, iterator) {
    var result =[];
    for (var i=0;i<collection.length;i++){
      if(iterator(collection[i])){
        result.push(collection[i]);
      }
    }
    return result;
  };

  // Return all elements of an array that don't pass a truth test.
  _.reject = function(collection, iterator) {
    var result =[];
    for (var i=0;i<collection.length;i++){
      if(!iterator(collection[i])){
        result.push(collection[i]);
      }
    }
    return result;
  };

  // Produce a duplicate-free version of the array.
  _.uniq = function(array) {
    var result = [];
    var testObj = {};
    for (var i=0;i<array.length;i++){
      if(!testObj[array[i]]){
        result.push(array[i]);
        testObj[array[i]]=true;
      }
    }
    return result;
  };


  // Return the results of applying an iterator to each element.
  _.map = function(array, iterator) {
    var result =[];
    for (var i=0;i<array.length;i++){
      result.push(iterator(array[i]));
    }
    return result;
  };

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(array, propertyName) {
    var result = [];
    for (var i=0;i<array.length;i++){
      result.push(array[i][propertyName]);
    }
    return result;
  };

  // Calls the method named by methodName on each value in the list.
  _.invoke = function(list, methodName, args) {
      
      if (typeof methodName ==="string" ){
      for (var i=0;i<list.length;i++){
        list[i][methodName](args);
      }
    }else{
      for (var i=0;i<list.length;i++){
        methodName.apply(list[i],args);
      }
    }
    return list;
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(previousValue, item) for each item. previousValue should be
  // the return value of the previous iterator call.
  _.reduce = function(collection, iterator, initialValue) {
    
    var prevVal= initialValue || undefined;

    for (var key in collection){
      if (prevVal === undefined){
        prevVal = collection[key];
      }else{
        prevVal = iterator(prevVal, collection[key]);
      }
    }
    return prevVal;
  };

  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    for (var key in collection){
      if (collection[key]===target){
        return true;
      }
    }
    return false;
  };


  // Determine whether all of the elements match a truth test.
  _.every = function(collection, iterator) {
    
    iterator = iterator || function(val){
        return !!val;
      };

    for (var key in collection){
      if (!iterator(collection[key])){
        return false;
      }
    }
    return true;
  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = function(collection, iterator) {
    
     iterator = iterator || function(val){
        return !!val;
      };

    for (var key in collection){
      if (iterator(collection[key])){
        return true;
      }
    }

    return false;
  };


  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  _.extend = function(obj) {
    for (var i =1; i<arguments.length;i++){
      for (var key in arguments[i]){
        arguments[0][key] = arguments[i][key];
      }
    }
    
    return arguments[0];
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) {
    for (var i =1; i<arguments.length;i++){
    for (var key in arguments[i]){
      if (arguments[0][key]===undefined){
      arguments[0][key] = arguments[i][key];
      }
    }
  }

  return arguments[0];
  };


  /**
   * FUNCTIONS
   * =========
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    var usable = true;
    var result=undefined;
    var functionToReturn = function(){
      if (usable){
        result = func();
        usable = false;
      }
    return result;
    };
    return functionToReturn;
  };

  // Memoize an expensive function by storing its results. You may assume
  // that the function takes only one argument and that it is a primitive.
  //
  // Memoize should return a function that when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  _.memoize = function(func) {
    var outPuts = {};
    return function(){
      
      if (outPuts[arguments[0]]=== undefined){
        outPuts[arguments[0]] = func (arguments[0]); 
      }
      return outPuts[arguments[0]];
    };
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {
    var args = Array.prototype.slice.call(arguments, 2);
    setTimeout(args.length>0?func.apply(this,args):func, wait);
  };



  // Shuffle an array.
  // Weee so many fun ways we could shuffle.  I may just do a simple single shuffle rift.
  _.shuffle = function(array) {
    var cut = Math.floor((0.25+Math.random()/2)*array.length);
   
    var left = array.slice(cut);
    var right = array.slice(0,cut);
   
    var result=[];
    while (left.length > 0 && right.length > 0){
      if (Math.random()<.5){
        result.push(left.pop());
      }else{
        result.push(right.pop());
      }
    }
    while (left.length>0){
      result.push(left.pop());
    }
    while (right.length>0){
      result.push(right.pop());
    }
    
    return result;

  };

  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.


  /*--------------------------------------------------------------\
  | Iterator is an evaluation of a particular propety that you want to 
  | sort by, it doesn't actually do the comaprison, you specify the comparison 
  | 
  |
  |
  \---------------------------------------------------------------*/
  _.sortBy = function(collection, iterator) {
    //console.log(typeof iterator)
    if (typeof iterator === "string"){
      var str = iterator
      iterator = function (obj1){
        return obj1[str]
      }
    }
    collection.sort(function(a,b){
      return iterator(a)-iterator(b);
    })
    console.log(collection);
    return collection;
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
    var result = [];
    var line = [];
    for (var i = 0; i < arguments[0].length;i++){
      line  = [];
      for( var j = 0;j<arguments.length;j++){
        line.push(arguments[j][i]);
      }
      result.push(line);
    }
    return result;
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  _.flatten = function(nestedArray, result) {
    
    result = result || [];
 
    for (var i = 0; i<nestedArray.length; i++)
    {
      if (typeof nestedArray[i] === 'object'){
        this.flatten(nestedArray[i], result);
      }else
      result.push(nestedArray[i]);
    }
    return result;//*/
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
    var result = arguments[0];
    for (var i =0;i<result.length;i++){
      for (var j = 1;j<arguments.length;j++){
        if (arguments[j].indexOf(result[i])=== -1){ //Not found in one of the sets, remove and move to next element
          result.splice(i,1);
          i--;
          break;
          continue;
        }
      }
    }
    return result;
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    var result = arguments[0];
    for (var i =0;i<result.length;i++){
      for (var j = 1;j<arguments.length;j++){
        if (arguments[j].indexOf(result[i])!== -1){ //Not found in one of the sets, remove and move to next element
          result.splice(i,1);
          i--;
          break;
          continue;
        }
      }
    }
    return result;
  };

}).call(this);
