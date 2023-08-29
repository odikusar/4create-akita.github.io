// Вывести все пакеты (сделать console.log)
// Нельзя вывести лог ид пакета, пока не выведены его депсы (value)
// 2
// 4
// 3
// 1
// 5
const packages = {
  1: [2, 3],
  2: [],
  3: [4],
  4: [],
  5: [3],
};

const cache = {};

// Solution 1
// Решение с циклом о котором ты говорил

function logging(key) {
  if (cache[key]) return;

  let deps = packages[key];
  cache[key] = true;
  deps.forEach((depsKey) => logging(depsKey));
  console.log(key);
}

for (let key in packages) {
  logging(key);
}

// Solution 2
// Это решение я сразу и начал реализовывать, потому что оно
// в стиле  leetcode: ответ одна самодостаточная функция.
// Хотя из-за того что цикл заменен дополнительной рекурсией решение сложней
console.log('---- Solution 2 -----');

function logTransition(packages, cache, isRoot, key = null) {
  if (!key) key = Object.keys(packages)[0];
  if (!cache[key]) {
    cache[key] = true;

    packages[key].forEach((depsKey) =>
      logTransition(packages, cache, false, depsKey)
    );
    console.log(key);
  }

  if (isRoot) {
    const keys = Object.keys(packages);
    let nextIndex = keys.indexOf(key) + 1;

    if (nextIndex !== keys.length)
      logTransition(packages, cache, true, keys[nextIndex]);
  }
}

logTransition(
  {
    1: [2, 3],
    2: [],
    3: [4],
    4: [],
    5: [3],
  },
  {},
  true
);
