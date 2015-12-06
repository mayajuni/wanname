/**
 * Created by 동준 on 2015-01-07.
 */
function Random(){
    this.str = '';
    this.pattern = /^[a-zA-Z0-9]+$/;

    this.setStr = function(n) {
        if(!/^[0-9]+$/.test(n)) n = 0x10;
        this.str = '';
        for(var i=0; i<n-1; i++) {
            this.rndchar();
        }
    }

    this.setType = function(s) {
        switch(s) {
            case '1' : this.pattern = /^[0-9]+$/; break;
            case 'A' : this.pattern = /^[A-Z]+$/; break;
            case 'a' : this.pattern = /^[a-z]+$/; break;
            case 'A1' : this.pattern = /^[A-Z0-9]+$/; break;
            case 'a1' : this.pattern = /^[a-z0-9]+$/; break;
            default : this.pattern = /^[a-zA-Z0-9]+$/;
        }
    };

    this.getStr = function() {
        return this.str;
    };

    this.rndchar = function() {
        var rnd = Math.round(Math.random() * 1000);

        if(!this.pattern.test(String.fromCharCode(rnd))) {
            this.rndchar();
        } else {
            this.str += String.fromCharCode(rnd);
        }
    }
}

/**
 * �닽�옄 �옖�뜡�븿�닔
 *
 * @param n
 */
exports.numberRandom = function(n){
    var random = new Random();
    random.setType('1');
    random.setStr(n+1);
    return random.getStr()
};

/**
 * �냼臾몄옄,�닽�옄 �옖�뜡�븿�닔
 *
 * @param n
 */
exports.numLowRandom = function(n){
    var random = new Random();
    random.setType('a1');
    random.setStr(n+1);
    return random.getStr()
};

/**
 * ��臾몄옄,�닽�옄 �옖�뜡�븿�닔
 *
 * @param n
 */
exports.numUpRandom = function(n){
    var random = new Random();
    random.setType('A1');
    random.setStr(n+1);
    return random.getStr()
};

/**
 * ��臾몄옄,�냼臾몄옄,�닽�옄 �옖�뜡�븿�닔
 *
 * @param n
 */
exports.numUpLowRandom = function(n){
    var random = new Random();
    random.setType(0);
    random.setStr(n+1);
    return random.getStr()
};