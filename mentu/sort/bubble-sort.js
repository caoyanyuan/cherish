/**
 *  1.冒泡排序： 每轮依次比较相邻两个数的大小，后面比前面小则交换
 */


function bubbleSort(nums) {
    for(let i=0; i<nums.length; i++) {

        for(let j=0; j<nums.length-i-1; j++) {
            if(nums[j] > nums[j+1]) {
                let temp = nums[j]
                nums[j] = nums[j+1]
                nums[j+1] = temp
            }
        }
    }
    return nums
}

/**
 * 2. 选择排序： 寻找最小的数，保存索引交换，不占用额外的空间
 */

function selectionSort(nums) {
    let minIndex = -1, temp;
    for(let i = 0; i < nums.length; i++) {
        minIndex = i

        for(let j = i; j < nums.length; j++) {
            if(nums[j] < nums[minIndex]) {
                minIndex = j
            }
        }
        temp = nums[i]
        nums[i] = nums[minIndex]
        nums[minIndex] = temp
    }
    return nums
}


