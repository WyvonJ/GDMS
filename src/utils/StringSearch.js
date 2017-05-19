function kmpGetStrPartMatchValue(str) {
  let prefix = []
  let suffix = []
  let partMatch = []
  for (let i = 0, j = str.length; i < j; i++) {
    let newStr = str.substring(0, i + 1)
    if (newStr.length == 1) {
      partMatch[i] = 0
    } else {
      for (let k = 0; k < i; k++) {
        prefix[k] = newStr.slice(0, k + 1)
        suffix[k] = newStr.slice(-k - 1)
        if (prefix[k] == suffix[k]) {
          partMatch[i] = prefix[k].length
        }
      }
      if (!partMatch[i]) {
        partMatch[i] = 0
      }
    }
  }
  prefix.length = 0
  suffix.length = 0
  return partMatch
}

function KMP(sourceStr, targetStr) {
  let partMatchValue = kmpGetStrPartMatchValue(targetStr);
  let result = false;
  for (let i = 0, j = sourceStr.length; i < j; i++) {
    for (let m = 0, n = targetStr.length; m < n; m++) {
      if (targetStr.charAt(m) == sourceStr.charAt(i)) {
        if (m == targetStr.length - 1) {
          result = true
          break
        } else {
          i++
        }
      } else {
        if (m > 0 && partMatchValue[m - 1] > 0) {
          m = partMatchValue[m - 1] - 1
        } else {
          break
        }
      }
    }
    if (result) {
      break
    }
  }
  return result
}

exports.KMP = KMP