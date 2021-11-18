# jsecdh
forked from username1565/ECDH and remanaged with webpack


```js
var kp1=ecdh.genKeyPair("secp256r1")
>{priKey: BigInteger, pubKeyHex: '04baeed07207914cb79be3629a38c659e41a4491db12a56fb2…0cd23de2c68b8dae829ecced479ebfa0d6a2364f8025fbb67', curveName: 'secp256r1'}

var kp2=ecdh.genKeyPair("secp256r1")
>{priKey: BigInteger, pubKeyHex: '04ead96c724a0aa5c85014d2f8e367936cf7a6bbf50622905d…0780cb60c69b404e23a08ba1939880d1d5c6e7a9fdf69fe8a', curveName: 'secp256r1'}

ecdh.doEcdh(kp1.curveName, kp1.priKey,kp2.pubKeyHex)
>'63eb614f775ed5f0287d63b533a0ad9b9e365dd004ecfa7fe50821303b4cf32c'

ecdh.doEcdh(kp2.curveName, kp2.priKey,kp1.pubKeyHex)
>'63eb614f775ed5f0287d63b533a0ad9b9e365dd004ecfa7fe50821303b4cf32c'

```
