/**
随机产生数字并传递给一个方法。你能否完成这个方法，在每次产生新值时，寻找当前所有值的中间值（中位数）并保存。
中位数是有序列表中间的数。如果列表长度是偶数，中位数则是中间两个数的平均值。

*/

function Heap(arr=[], isLess) {
    this.data = []
    
    this.comprator = (a, b) => {
        if(isLess) {
            return a - b 
        }else{
            return b - a 
        }
    }
    arr.map(item => this.push(item))
}

Heap.prototype.top = function() {
    return this.data[0]
}
Heap.prototype.size = function() {
    return this.data.length
}
Heap.prototype.push = function(val) {
    this.data[this.size()] = val

    let data = this.data, 
        cIndex = this.size() - 1

    while(cIndex > 0 ) {
        let pIndex = parseInt((cIndex - 1)/2)
        if(this.comprator(data[ pIndex ], val) > 0) {
            
            this.swap( cIndex, pIndex )
            cIndex = pIndex
        }else{
            break;
        }
       
    }
}

Heap.prototype.pop = function() {
    let ret = this.data[0]
   
    if(ret === undefined) return null

    this.data[0] = this.data[ this.size()-1 ]
    this.data.splice(this.size()-1, 1)

    let cIndex = 0, 
        data = this.data

    while(cIndex * 2 + 1 <= this.size()) {
        let findIndex = cIndex,
            lIndex = cIndex * 2 + 1,
            rIndex = cIndex * 2 + 2

        if( lIndex < this.size() && this.comprator(data[findIndex], data[lIndex]) > 0 ) findIndex = lIndex
        if( rIndex < this.size() && this.comprator(data[findIndex], data[rIndex]) > 0 ) findIndex = rIndex

        if(findIndex === cIndex) break
        
        this.swap(findIndex, cIndex)
        cIndex = findIndex
    }

    return ret
}

Heap.prototype.swap = function(index1, index2) {
    let temp = this.data[index1]
    this.data[index1] = this.data[index2]
    this.data[index2] = temp
}



var MedianFinder = function() {
    this.left = new Heap([])
    this.right = new Heap([], true)
};

/** 
 * @param {number} num
 * @return {void}
 */
MedianFinder.prototype.addNum = function(num) {
    
    if(this.left.size() === 0 || num < this.left.top()) {
        this.left.push(num)
    }else{
        this.right.push(num)
    }
    if(this.left.size() === this.right.size()+2) {
        this.right.push(this.left.pop())
    }

    if(this.right.size() > this.left.size()) {
        this.left.push(this.right.pop())
    }
    
};

/**
 * @return {number}
 */
MedianFinder.prototype.findMedian = function() {
    if(this.left.size() > this.right.size()) {
        
        
        return this.left.top()
    }else{
        return (this.left.top() + this.right.top()) / 2
    }
};





let m = new MedianFinder()

m.addNum(1)

m.addNum(2)
m.addNum(3)
m.addNum(1)
m.addNum(2)
m.addNum(1)



console.log(m)
console.log(m.findMedian())

