function maxArea(height) {
  let left = 0,
    right = height.length - 1,
    res = 0;
  while (left < right) {
    const minHeight =
      height[left] < height[right] ? height[left++] : height[right--];
    res = Math.max(minHeight * (right - left + 1));
    console.log('🚀 ~ maxArea ~ res:', res);
  }
  return res;
}
maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7]);
