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

var getNumberOfBacklogOrders = function(orders) {
    var buy = new Heap([]),
        sell = new Heap([])

    buy.comprator = (a,b) => {
        return a[1] - b[1]
    }
    sell.comprator = (a,b) => {
        return b[1] - a[1]
    }

    let total = 0;
    let mod = 1000000007;

    for(let [price, amount, orderType] of orders) {
     
        if(orderType === 0) {
            while(amount > 0 && sell.size() && price >= sell.top()[0]) {
                let top = sell.pop()
               
                if(amount < top[1]) {
                    sell.push([top[0], top[1] - amount])
                    
                    total -= amount
                    amount = 0
                }else{
                    amount -= top[1]
                    total -= top[1]
                }
            }
            if(amount > 0)  {
                buy.push([price,amount]) 
                total += amount;
            }
        }else{
            while(amount > 0 && buy.size() && price <= buy.data[0][0]) {
                let top = buy.pop()
                
                if(amount < top[1]) {
                    buy.push([top[0], top[1]-amount])

                    total -= amount
                    amount = 0;
                }else{
                    amount -= top[1]
                    total -= top[1]
                }
            }  

            if(amount > 0)  {
                sell.push([price,amount]) 
                total += amount;
            }
        }
    }
    
    console.log(total)
    return total % mod;
};

let orders = [[23,17,1],[18,27,0],[21,26,1],[8,17,0],[13,22,1],[22,21,1],[2,24,1],[5,7,0]]
getNumberOfBacklogOrders(orders)

