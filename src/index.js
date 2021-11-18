import ecdh from './lib/ecdh.js'
import {BigInteger} from './lib/jsbn.js'

// var kp1 = ecdh.genKeyPair("secp256r1")
// var kp2 = ecdh.genKeyPair("secp256r1")

// console.log(ecdh.doEcdh("secp256r1", kp1.priKey, kp2.pubKeyHex,))
// console.log(ecdh.doEcdh("secp256r1", kp2.priKey, kp1.pubKeyHex))

global.ecdh=ecdh
global.BigInteger=BigInteger