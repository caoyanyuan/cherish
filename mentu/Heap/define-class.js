class Heap {
    constructor(data) {
        this.data = data;
        this.compartor = (a, b) => b - a;
        this.heapify();
    }
    size() {
        return this.data.length;
    }
    heapify() {
        if (this.size() < 2) {
            return;
        }
        for (let i = 1; i < this.size(); i++) {
            this.bubbleUp(i);
        }
    }
    peek() {
        if (!this.size()) return null;
        return this.data[0];
    }
    offer(val) {
        this.data.push(val);
        this.bubbleUp(this.size() - 1);
    }
    poll() {
        if (!this.size()) return null;
        if (this.size() === 1) return this.data.pop();
        let res = this.data[0];
            this.data[0] = this.data.pop();
        if (this.size()) {
            this.bubbleDown(0);
        }
        return res;
    }
    swap(i, j) {
    if (i === j) {
    return;
    }
    [this.data[i], this.data[j]] = [this.data[j], this.data[i]];
    }
    bubbleUp(index) {
    // 向上调整，我们最⾼就要调整到0号位置
    while (index) {
    //获取到当前节点的⽗节点，
    const parenIndex = (index - 1) >> 1;
    // const parenIndex = Math.floor((index - 1) / 2);
    // const parenIndex = (index - 1) / 2 | 0;
    //⽐较⽗节点的值和我们当前的值哪个⼩。
    if (this.compartor(this.data[index], this.data[parenIndex]) < 0) {
    //if 交换⽗节点和⼦节点
    this.swap(index, parenIndex);
    // index 向上⾛⼀步，进⾏下⼀次交换
    index = parenIndex; } else { 
        //防⽌死循环。 
        break; } } }
        bubbleDown(index) {
            //我们要获取到最⼤的下标，保证不会交换出界。 
            let lastIndex = this.size() - 1;
            while (index < lastIndex) { 
                //获取左右⼉⼦的下标 
                let leftIndex = index * 2 + 1; 
                let rightIndex = index * 2 + 2; 
                // 待交换节点 
                let findIndex = index; 
                if (leftIndex <= lastIndex && this.compartor(this.data[leftIndex], this.data[findIndex]) < 0) { 
                    findIndex = leftIndex; 
                }if (rightIndex <= lastIndex && this.compartor(this.data[rightIndex], this.data[findIndex]) < 0) { 
                    findIndex = rightIndex; 
                }if (index !== findIndex) { 
                    this.swap(index, findIndex); index = findIndex; 
                } else { 
                    break; } 
                } 
            } 
}