/**
 * Author: TBY on 2021-08-12
 * note 笔记
 * tips 特别注意
 * example 例子
 */

exports.deleteVal = (arr, val) => {
  const index = arr.indexOf(val)
  if (index > -1) {
    arr.splice(index, 1)
  }
  return arr
}
