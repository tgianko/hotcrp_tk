/*
 * Show preferences stats. No prefs change, only display.
 */

const _MIN_PREF_ = -1;
const _MAX_PREF_ = 3;
const _CONFLICT_ = -100;
const _SELECTOR_ = "input.revpref";
const _MIN_POS_PREFS_ = 30;

function stats(){
    var inputPrefs = document.querySelectorAll(_SELECTOR_);
    console.log("[INFO] Found " + inputPrefs.length + " papers");
    
    // Get all preferences
    var prefs = Array.from(inputPrefs).map(input => parseInt(input.value) || 0); // default value is 0.

    // Look for for conflicts
    var conflicts = Array.from(prefs).filter(v => v == _CONFLICT_);
    if (conflicts.length > 0) {
        console.log("[WARNING] Found " + conflicts.length + " conflicts in prefs");
        prefs = Array.from(prefs).filter(v => v != _CONFLICT_); // remove conflicts otherwise min = conflict
    } else {
        console.log("[INFO] No conflicts found");
    }

    // Get the range [min, max] and show warnings
    var minPref = Math.min(... prefs);
    var maxPref = Math.max(... prefs);
    //console.log("[INFO] Range=[" + minPref + ", " + maxPref + "]");

    if (minPref < _MIN_PREF_) {
        console.log("[WARNING] Out of range prefs. MIN pref: " + minPref + "]");
    }

    if (maxPref > _MAX_PREF_) {
        console.log("[WARNING] Out of range prefs. MAX pref: " + maxPref + "]");
    }

    if (minPref >= _MIN_PREF_ && maxPref <= _MAX_PREF_) {
        console.log("[INFO] Prefs in range=[" + minPref + ", " + maxPref + "]");
    }

    var positives = Array.from(prefs).filter(v => v > 0);
    console.log("[INFO] Preferences >  0 = " + positives.length);
    if (positives.length < _MIN_POS_PREFS_) {
        console.log("[WARNING] Insufficient positive preferences (<" + _MIN_POS_PREFS_+ "")
    }

    var negatives = Array.from(prefs).filter(v => v < 0);
    console.log("[INFO] Preferences <  0 = " + negatives.length);

    var zeros = Array.from(prefs).filter(v => v == 0);
    console.log("[INFO] Preferences == 0 = " + zeros.length);
}

stats();