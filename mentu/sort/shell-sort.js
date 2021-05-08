// 3 插入排序：找出每一个元素的前一个index，插入，类似于扑克牌整理
function insertSort(nums) {
    var preIndex = 0, current

    for(let i = 1; i < nums.length; i++) {
        preIndex = i - 1
        current = nums[i]

        while(preIndex >= 0 && nums[preIndex] > current) {
            nums[preIndex+1] = nums[preIndex]
            preIndex--
        }   

        nums[preIndex+1] = current
    }
    return nums
}

// 4希尔排序：插入排序的一种更高效率的实现，选择距离更远的插入
function shellSort(nums) {
    var len = nums.length,
        current,
        gap = 1

    while(gap < len/3) {
        gap = gap*3 + 1
    }
    
    for (gap; gap > 0; gap = Math.floor(gap/3)) {
        for (var i = gap; i < len; i++) {
            current = nums[i];
            for (var j = i-gap; j >= 0 && nums[j] > current; j-=gap) {
                nums[j+gap] = nums[j];
            }
            nums[j+gap] = current;
        }
    }
    return nums;
}

shellSort([5,3,4,1,2 ])


