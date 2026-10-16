const loaders = {
  "g-be": () => require.async("./content/g-be/pack.js"),
  "g-present": () => require.async("./content/g-present/pack.js"),
  "g-continuous": () => require.async("./content/g-continuous/pack.js"),
  "g-past": () => require.async("./content/g-past/pack.js"),
  "g-future": () => require.async("./content/g-future/pack.js"),
  "g-perfect": () => require.async("./content/g-perfect/pack.js"),
  "g-articles": () => require.async("./content/g-articles/pack.js"),
  "g-comparison": () => require.async("./content/g-comparison/pack.js"),
};
module.exports = { loadPack: (topicId) => { if (!loaders[topicId]) return Promise.reject(new Error('Unknown topic')); return loaders[topicId](); } };
