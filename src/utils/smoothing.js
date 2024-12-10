/**
 * Calculates the exponential moving average for a dataset.
 * @param {number[]} data - The array of numbers.
 * @param {number} smoothing - The smoothing factor (e.g., 2 for common usage).
 * @param {number} windowSize - The size of the moving average window.
 * @returns {number[]} - An array of exponential moving averages.
 */
export function exponentialMovingAverage(data, smoothing, windowSize) {
  if (windowSize <= 0) throw new Error("Window size must be greater than 0");
  if (data.length < windowSize) return []; // Not enough data for even one average.

  const ema = [];
  const multiplier = smoothing / (windowSize + 1);

  // Start with the simple moving average for the first EMA value.
  let initialSMA = 0;
  for (let i = 0; i < windowSize; i++) {
    initialSMA += data[i];
  }
  initialSMA /= windowSize;
  ema.push(initialSMA);

  // Calculate EMA for subsequent data points.
  for (let i = windowSize; i < data.length; i++) {
    const currentEMA = (data[i] - ema[ema.length - 1]) * multiplier + ema[ema.length - 1];
    ema.push(currentEMA);
  }

  return ema;
}

/**
 * Calculates the moving average for a dataset.
 * @param {number[]} data - The array of numbers.
 * @param {number} windowSize - The size of the moving average window.
 * @returns {number[]} - An array of moving averages.
 */
export function movingAverage(data, windowSize) {
  if (windowSize <= 0) throw new Error("Window size must be greater than 0");
  if (data.length < windowSize) return []; // Not enough data for even one average.

  const averages = [];
  let windowSum = 0;

  for (let i = 0; i < data.length; i++) {
    windowSum += data[i]; // Add the current element to the window sum.

    // Check if we've reached the window size.
    if (i >= windowSize - 1) {
      averages.push(windowSum / windowSize); // Calculate average.
      windowSum -= data[i - (windowSize - 1)]; // Remove the oldest element in the window.
    }
    else {
      averages.push(data[i]);
    }
  }

  return averages;
}
