/*
 * Show preferences stats. No prefs change, only display.
 */
const _MIN_PREF_ = -1;
const _MAX_PREF_ = 3;
const _CONFLICT_ = -100;
const _MIN_POS_PREFS_ = 30;

const _INPUT_SELECTOR_ = "input.revpref";
const _ROW_SELECTOR_   = "tr.pl";

function stats(){
    var data = Array.from(document.querySelectorAll(_ROW_SELECTOR_)).map(row =>[row.dataset['pid'], row.querySelector(_INPUT_SELECTOR_)]);
    
    var inputPrefs = Array.from(data).map(row => row[1]);

    console.log("[INFO] Found " + inputPrefs.length + " papers");
    
    // Get all preferences
    var prefs = Array.from(inputPrefs).map(input => parseInt(input.value) || 0); // default value is 0.

    // Check for chair/VC conflicts
    var vc_conflicts = Array.from(inputPrefs).filter(input => !$(input).is(":visible"));
    if (vc_conflicts.length > 0) {
        console.log("[WARNING] YOU (chair/VC) have " + vc_conflicts.length + " conflicts. Remapping values may not be possible for all bids.");
    }

    // Look for for reviewer conflicts
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

    // Group by
    if (minPref < _MIN_PREF_ || maxPref > _MAX_PREF_) {
        var gr = Array.from(data).reduce((acc, row) => {
            v = parseInt(row[1].value) || 0
            if (!acc[v]) {
                acc[v] = [];
            }
            acc[v].push(row[0]);
        
            return acc;
        }, {});

        console.log("[INFO] Current bids")
        Object.entries(gr).forEach(e => {
            console.log("   Key: ", e[0], " : ", e[1].join(", "))}
        );
    }

}

stats();