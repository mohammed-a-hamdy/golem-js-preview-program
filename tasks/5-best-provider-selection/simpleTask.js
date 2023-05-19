function generateRandomArray(size) {
    const arr = [];
    for (let i = 0; i < size; i++) {
      arr.push(Math.random());
    }
    return arr;
  }
  
  
  const largeArray = generateRandomArray(100000000);
  

  