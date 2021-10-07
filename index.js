let myEach = function(collection, callback) {
    const newCollection = (collection instanceof Array) ? collection.slice() : Object.values(collection)

    for (let i = 0; i < newCollection.length; i++)
      callback(newCollection[i])

    return collection 
  }

  let myMap = function(collection, iteratee) {
    if (!(collection instanceof Array))
      collection = Object.values(collection)

    const newArr = [ ]

    for (let idx = 0; idx < collection.length; idx++)
      newArr.push(iteratee(collection[idx]))

    return newArr 

  }

  let myReduce = function(collection, callback, acc) {
    let memo = (acc === undefined) ? collection[Object.keys(collection)[0]] : acc;
    let i = (acc === undefined) ? 1 : 0;

    for (; i < Object.keys(collection).length; i++) {
      memo = callback(
        memo,
        collection[Object.keys(collection)[i]],
        collection
      );
    }

    return memo;
  }


  let myFind = function(collection, predicate){
    if (!(collection instanceof Array))
    collection = Object.values(collection)

    for (let idx = 0; idx < collection.length; idx++)
      if (predicate(collection[idx])) return collection[idx]

    return undefined
  }

  let myFilter = function(collection, predicate){
    if (!(collection instanceof Array))
      collection = Object.values(collection)

    const newArr = []

    for (let idx = 0; idx < collection.length; idx++)
      if (predicate(collection[idx])) newArr.push(collection[idx])

    return newArr 
  }

  let mySize = function(collection) {
    return (collection instanceof Array) ? collection.length : Object.keys(collection).length
  } 

  let myFirst = function(collection, stop = false){
    return (stop) ? collection.slice(0, stop) : collection[0]
  }


  let myLast = function(collection, start = false){
    return (start) ? collection.slice(collection.length-start, collection.length) : collection[collection.length-1]
  } 

  let myCompact = function(collection){
    const badBad = new Set([false, null, 0, "", undefined, NaN])
    return collection.filter(el => !badBad.has(el))
  }

  let mySortBy = function(collection, callback) {
    const newArr = [...collection]
    return newArr.sort(function(a, b){
      return callback(a) - callback(b)
    })
  }

  let myUnpack = function(receiver, arr){
    for (let val of arr)
      receiver.push(val)
  }

  let myFlatten = function(collection, shallow, newArr = []){
    if (!Array.isArray(collection)) return newArr.push(collection)
    if (shallow){
      for (let val of collection)
        Array.isArray(val) ? this.unpack(newArr, val) : newArr.push(val)
    } else {
      for (let val of collection) {
        this.flatten(val, false, newArr)
      }
    }
    return newArr 
  }

  let myUniqSorted = function(collection, iteratee){
    const sorted = [collection[0]]
    for (let idx = 1; idx < collection.length; idx++){
      if (sorted[idx-1] !== collection[idx])
        sorted.push(collection[idx])
    }
    return sorted
  }

  let myUniq = function(collection, sorted=false, iteratee=false){
    if (sorted){
      return fi.uniqSorted(collection, iteratee)
    } else if (!iteratee){
      return Array.from(new Set(collection))
    } else {
      const modifiedVals = new Set()
      const uniqVals = new Set()
      for (let val of collection){
        const moddedVal = iteratee(val)
        if (!modifiedVals.has(moddedVal)){
          modifiedVals.add(moddedVal)
          uniqVals.add(val)
        }
      }
      return Array.from(uniqVals)
    }
  }

  let myKeys = function(obj){
    const keys = []
    for (let key in obj){
      keys.push(key)
    }
    return keys
  }

  let myValues = function(obj){
    const values = []
    for (let key in obj){
      values.push(obj[key])
    }
    return values
  }

  let myFunctions = function(obj) {
    const functionNames = []

    for (let key in obj){
      if (typeof obj[key] === "function"){
        functionNames.push(key)
      }
    }
    return functionNames.sort()
  }