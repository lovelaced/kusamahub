// .papi/descriptors/src/descriptors.ts
var [minified, commonTrees, tokens] = JSON.parse(`[{"wnd":{"4":{"1":0,"2":1,"3":1},"6":{"1":1,"2":1,"3":4},"7":{"1":1,"2":1,"3":1},"9":{"1":1,"2":5,"3":1},"10":{"1":1,"2":1,"3":1},"11":{}},"wndAssethub":{"4":{"1":0,"2":1,"12":1,"13":2},"6":{"1":1,"2":1,"12":4,"13":1},"7":{"1":1,"2":1,"12":1,"13":1},"9":{"1":1,"2":5,"12":1,"13":1},"10":{"1":1,"2":1,"12":1,"13":1},"11":{}},"dot":{"4":{"1":0,"2":1,"3":1},"6":{"1":1,"2":1,"3":4},"7":{"1":1,"2":1,"3":1},"9":{"1":1,"2":5,"3":1},"10":{"1":1,"2":1,"3":1},"11":{}},"ksm":{"4":{"1":0,"2":1,"3":1},"6":{"1":1,"2":1,"3":4},"7":{"1":1,"2":1,"3":1},"9":{"1":1,"2":5,"3":1},"10":{"1":1,"2":1,"3":1},"11":{}},"dotAh":{"4":{"1":0,"2":1,"12":1,"13":3},"6":{"1":1,"2":1,"12":4,"13":1},"7":{"1":1,"2":1,"12":1,"13":1},"9":{"1":1,"2":5,"12":1,"13":1},"10":{"1":1,"2":1,"12":1,"13":1},"11":{}},"ksmAh":{"4":{"1":0,"2":1,"12":1,"13":3},"6":{"1":1,"2":1,"12":4,"13":1},"7":{"1":1,"2":1,"12":1,"13":1},"9":{"1":1,"2":5,"12":1,"13":1},"10":{"1":1,"2":1,"12":1,"13":1},"11":{}},"pas":{"4":{"1":0,"2":1,"3":1},"6":{"1":1,"2":1,"3":4},"7":{"1":1,"2":1,"3":1},"9":{"1":1,"2":5,"3":1},"10":{"1":1,"2":1,"3":1},"11":{}},"pasAh":{"4":{"1":0,"2":1,"12":1,"13":3},"6":{"1":1,"2":1,"12":4,"13":1},"7":{"1":1,"2":1,"12":1,"13":1},"9":{"1":1,"2":5,"12":1,"13":1},"10":{"1":1,"2":1,"12":1,"13":1},"11":{}},"passet":{"4":{"1":0,"2":1,"12":1,"13":2},"6":{"1":1,"2":1,"12":4,"13":1},"7":{"1":1,"2":1,"12":1,"13":1},"9":{"1":1,"2":5,"12":1,"13":1},"10":{"1":1,"2":1,"12":1,"13":1},"11":{}}},[{"0":0},{},{"0":3},{"0":4},{"5":2},{"8":1}],["Account","System","Balances","XcmPallet","storage","transfer_assets","tx","events","ExistentialDeposit","constants","viewFns","apis","PolkadotXcm","ForeignAssets"]]`);
var replaceTokens = (obj) => Object.fromEntries(
  Object.entries(obj).map(([key, value]) => {
    const unwrappedValue = typeof value === "object" ? replaceTokens(value) : value;
    const numericKey = Number(key);
    if (Number.isNaN(numericKey)) {
      return [key, unwrappedValue];
    }
    return [tokens[numericKey], unwrappedValue];
  })
);
var tokenizedCommonTrees = commonTrees.map(replaceTokens);
var unwrap = (obj, depth) => depth === 0 ? obj : Object.fromEntries(
  Object.entries(obj).map(([key, value]) => [
    key,
    unwrap(
      typeof value === "object" ? value : tokenizedCommonTrees[value],
      depth - 1
    )
  ])
);
var getChainDescriptors = (key) => unwrap(replaceTokens(minified[key]), 2);
var Wnd = getChainDescriptors("wnd");
var WndAssethub = getChainDescriptors("wndAssethub");
var Dot = getChainDescriptors("dot");
var Ksm = getChainDescriptors("ksm");
var DotAh = getChainDescriptors("dotAh");
var KsmAh = getChainDescriptors("ksmAh");
var Pas = getChainDescriptors("pas");
var PasAh = getChainDescriptors("pasAh");
var Passet = getChainDescriptors("passet");
export {
  Dot,
  DotAh,
  Ksm,
  KsmAh,
  Pas,
  PasAh,
  Passet,
  Wnd,
  WndAssethub
};
