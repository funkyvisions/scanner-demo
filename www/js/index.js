function _startScanning() {
    mwbScanner.startScanning(function(result) {
        if (result.code) {
            alert(JSON.stringify(result));
            mwbScanner.resumeScanning();
        }
    }, 0, 20, 100, 20);
}

var app = {

    initialize: function() {

        document.addEventListener('deviceready', this.onDeviceReady, false);
    },

    onDeviceReady: function() {

        var cc = mwbScanner.getConstants();

        var settings = [
            {"method": "MWBcloseScannerOnDecode", value: [false]},
            {"method": "MWBsetActiveCodes", "value": [cc.MWB_CODE_MASK_128 | cc.MWB_CODE_MASK_EANUPC]},
            {"method": "MWBsetScanningRect", "value": [cc.MWB_CODE_MASK_128, 0, 20, 100, 20]},
            {"method": "MWBsetScanningRect", "value": [cc.MWB_CODE_MASK_EANUPC, 0, 20, 100, 20]}
        ];

        mwbScanner.loadSettings(settings).catch(function(reason) {
            alert(reason);
        });

        _startScanning();
    },

    share: function() {

        window.plugins.socialsharing.shareWithOptions({ subject: "sharing", message: "sharing" }, function () {
            console.log("Successfully shared");
        }, function () {});
    },

    reset: function() {

        _startScanning();
    }
};
