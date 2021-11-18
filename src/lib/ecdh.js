import { ECPointFp } from './ec.js'
import sec from './sec.js'
import { SecureRandom } from './rng.js'
import { BigInteger } from './jsbn'


/**
 * 
 * @param {*} c 
 * @returns 
 */
function pick_rand(c) {
    var rng = new SecureRandom();
    var n0 = c.getN();
    var n1 = n0.subtract(BigInteger.ONE);
    var r = new BigInteger(n0.bitLength(), rng);
    return r.mod(n1).add(BigInteger.ONE);
}

export default {
    genKeyPair(curveName, privateKey) {
        var ecCurve = sec.getSECCurveByName(curveName);
        if (!curveName || !ecCurve) {
            throw new Error("curveName not supported.")
        }
        var priKey = privateKey || pick_rand(ecCurve);
        var G = ecCurve.getG();
        var P = G.multiply(priKey);

        //pub in hex
        var x_hex = P.getX().toBigInteger().toString(16);
        var y_hex = P.getY().toBigInteger().toString(16);
        if (x_hex.length > y_hex.length) {
            for (var i = y_hex.length; i < x_hex.length; i++) {
                y_hex = '0' + y_hex;
            }
        }
        else if (y_hex.length > x_hex.length) {
            for (i = x_hex.length; i < y_hex.length; i++) {
                x_hex = '0' + x_hex;
            }
        }
        if (y_hex.length % 2 !== 0 && x_hex.length % 2 !== 0) {
            x_hex = '0' + x_hex;
            y_hex = '0' + y_hex;
        }

        var pubKeyHex = "04" + x_hex + y_hex

        var kp = { priKey, pubKeyHex, curveName }

        return kp;

    },
    doEcdh(curveName, priKey, pubKeyHex) {
        var ecCurve = sec.getSECCurveByName(curveName);
        pubKeyHex = pubKeyHex.substring(2)
        var pkx = pubKeyHex.substring(0, 64)
        var pky = pubKeyHex.substring(64)

        var curve = ecCurve.getCurve();
        var P = new ECPointFp(curve,
            curve.fromBigInteger(new BigInteger(pkx, 16)),
            curve.fromBigInteger(new BigInteger(pky, 16)));

        var S = P.multiply(priKey);

        var ssk = S.getX().toBigInteger().toString(16)
        if (ssk.length % 2 === 1) {
            return "0" + ssk;
        }
        return ssk;
    }

}
