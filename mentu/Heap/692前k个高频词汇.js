
var topKFrequent = function(words, k) {
	let map = new Map();
	let heap = [];
	words.forEach(item =>{
		map.has(item) ? map.set(item, map.get(item) + 1) : map.set(item, 1);
	}) 
    let i = 0;
	map.forEach((value, key) =>{
		if (i < k) {
			heap.push([key, value]);
			i === k - 1 && buildHeap(map, heap, k);
		} else if (value > map.get(heap[0][0]) || (value === map.get(heap[0][0]) && key < heap[0][0])) {
			heap[0] = [key, value];
			heapify(map, heap, k, 0);
		}
		i++;
	});
	let temp = heap.sort((a, b) =>{
		if (a[1] > b[1]) {
			return - 1;
		} else if (a[1] < b[1]) {
			return 1;
		} else {
			if (a[0] > b[0]) {
				return 1;
			} else if (a[0] < b[0]) {
				return - 1;
			}
		}
	});
	let res = [];
	temp.forEach(item =>{
		res.push(item[0]);
	}) 
    return res;
};
var buildHeap = function(map, arr, len) {
	for (let i = Math.floor(len / 2); i >= 0; i--) {
		heapify(map, arr, len, i);
	}
}
var heapify = function(map, arr, len, i) {
	let l = 2 * i + 1,
	r = 2 * i + 2,
	minIndex = i; // 次数⼩或者相等情况排序靠前的置于⼩堆顶 
    if (l < len && (map.get(arr[l][0]) < map.get(arr[minIndex][0]) || (map.get(arr[l][0]) === map.get(arr[minIndex][0]) && arr[l][0] > arr[minIndex][0]))) {
	minIndex = l;
}
if (r < len && (map.get(arr[r][0]) < map.get(arr[minIndex][0]) || (map.get(arr[r][0]) === map.get(arr[minIndex][0]) && arr[r][0] > arr[minIndex][0]))) {
	minIndex = r
}
if (minIndex !== i) {
	swap(arr, minIndex, i);
	heapify(map, arr, len, minIndex);
}
}
var swap = function(arr, i, j) {
	const temp = arr[i] 
    arr[i] = arr[j] 
    arr[j] = temp
}
	