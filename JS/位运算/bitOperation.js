// 对数组arr 排列可能所有可能的组合 n个及n个以上
function permutationAndCombination(arr, n){

    let ret = [],
        _len = arr.length;

    for (let m=n || 0; m <= _len; m++) {

        for (let i=0;i< Math.pow(2, _len) ;i++){
            let a = 0,
                sum = 0,
                sumIndex = []
            
            for (let j=0;j<_len;j++){
                console.log(m, i, j, '----', i>>j)
                if(i>>j){
                    a++;
                    sumIndex.push(arr[j]);
                    sum += arr[j]
                }
            }
            
            if(a==m){
                ret.push({
                    sum,
                    sumIndex
                });
            }
        }
    }
    console.log(ret)
    return ret;
}


// 来源： 看不懂的位运算：https://segmentfault.com/q/1010000012532332


permutationAndCombination([1,2])