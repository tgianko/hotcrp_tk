/*
 * Remap preferences:
 * - (-inf, _CONFLICT_] -> _CONFLICT_
 * - [-99,  _MIN_PREF_] -> _MIN_PREF_
 * - [0]                -> 0
 * - [_MIN_PREF_, inf) -> ceiling((_MAX_PREF_ * score) / max_score)
 */

const _MIN_PREF_ = -1;
const _MAX_PREF_ = 3;
const _CONFLICT_ = -100;
const _SELECTOR_ = "input.revpref";
const _MAX_WAIT_TIME_ = 5000;

function fire(n){
    setTimeout(() => {
        n.dispatchEvent(new Event('change', { 'bubbles': true }));
    }, Math.random() * _MAX_WAIT_TIME_)
}

function remap(){
    var inputPrefs = document.querySelectorAll(_SELECTOR_);
    console.log("[INFO] Found " + inputPrefs.length + " papers");
    
    // Get all preferences
    var prefs = Array.from(inputPrefs).map(input => parseInt(input.value) || 0); // default value is 0.
    var maxPref = Math.max(... prefs);
    console.log("[IMPORTANT] Please wait " + _MAX_WAIT_TIME_ + "s before refreshing/chaning page");
    inputPrefs.forEach((n)=>{
        var v = parseInt(n.value) || 0;
        if (v < _CONFLICT_) { //(-inf, -100) -> -100
            n.value = _CONFLICT_;
            console.log("[WARNING] Changing " + v + " -> " + n.value);
            fire(n);
        } else 
        if (v > _CONFLICT_ && v < _MIN_PREF_) { //[-99, -1) -> -1
            n.value = -1;
            console.log("[WARNING] Changed " + v + " -> " + n.value);
            fire(n);
        } else
        if (v > 0) { //[1, inf) -> ceiling((3 x score) / max_score)
            n.value = Math.ceil(_MAX_PREF_ * v / maxPref);
            if (n.value != v) {
                console.log("[WARNING] Changed " + v + " -> " + n.value);
                fire(n);
            }
        }
    });
}

remap();