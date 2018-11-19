jOmnis.callbackObject = {
    omnisOnLoad: function () {
        console.log('8bim: Omnis interface loaded. Waiting for the communication link...');
    },
    omnisOnWebSocketOpened: function () {
        console.log('8bim: web socket opened.');
    },
    updateGraphViz: function(data) {
        updateGraphVizFromOmins(data);
    },
    getGraphSvg: function(data) {
        var callback = data.omnisCallback;
        getGraphSvg(data).then(function(result) {
            console.log(JSON.stringify(result));
            jOmnis.sendEvent("evGraphSvg",{result: result}, callback);
        });

    }
}


/**
 * Wrappa jOmnis.sendControlEvent.
 * @param {String} evName Nome dell'evento, tipicamente ha un prefisso "ev"
 * @param {Object | String} [evData] Dati dell'evento come oggetto o come JSON.stringify
 * @param {String} [omnisCallbackName] Nome del metodo di callback di Omnis
 */
jOmnis.sendEvent = function sendEvent(evName, evData, omnisCallback) {
    console.log("sendEvent - sending ", evName, evData, omnisCallback);
    var message = {
        evType: evName
    };
    if (evData) {
        message.data = (typeof(data) === "string") ? evData : JSON.stringify(evData);
    }
    if (omnisCallback) {
        message.omnisCallback = omnisCallback;
    }
    jOmnis.sendControlEvent(message);
};
