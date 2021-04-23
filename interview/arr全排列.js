/**
 * @param {number[]} nums
 * @return {number[]}
 */
 const permute = function (nums) {
    const len = nums.length;
    // 记录当前的排列内容
    const cur = [];
    // 记录所有的排列顺序
    const res = [];
    // 用来避免重复使用同一个数字
    const visited = {};
    // 定义dfs的函数，入参是坑位的索引，从0开始
    function dfs(nth) {
      // 如果遍历到不存在的坑位(第len+1个)，则说明到了递归的边界
      if (nth === len) {
        // 此时前len个坑位已经填满，将对应的排序记录下来
        res.push(cur.slice());
        // 结束当前递归分支
        return;
      }
      // 检查手里剩下的数字有哪些
      for (let i = 0; i < len; i++) {
        // 如果nums[i] 之前没有被其它坑位记录过，说明这个数字是剩下的数字
        if (!visited[nums[i]]) {
          // 给nums[i] 打个已经用过的标记
          visited[nums[i]] = 1;
          // 将nums[i] 推入当前排列
          cur.push(nums[i]);
          // 基于这一个排序继续往下一个坑
          dfs(nth + 1);
          // nums[i] 让出当前坑位
          cur.pop();
          // 下掉已经用过的标识
          visited[nums[i]] = 0;
        }
      }
    }
    // 从索引为0开始,即第一个坑位开始dfs
    dfs(0);
    return res;
  };

const nums = permute([1,2,3])
