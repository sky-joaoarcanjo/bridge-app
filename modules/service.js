const _alertSourceName = 'alertsource'
const _alertSourceValue = 'ELASTIC_TREND_ANALYSIS'

const _partition = ','
const _valuesPartition = '='

/*
 * The left value is the field name from elastic and the right value is the field name to sent to alertmanager
*/
const labelsNames = {
    'kubernetes.namespace_name': 'namespace',
    'service.name': 'application',
    'event.endpoint': 'endpoint',
    'anomalyScore': 'alertanomalyscore',
    'alertName': 'alertname',
}

module.exports = {
    messageBuilder
}

function messageBuilder(body) {

    const mapLabels = new Map();
    mapLabels.setValue = mapSetValue
    const mapAnnotations = new Map();

    //Label to indicate the origin of the alert
    mapLabels.setValue(_alertSourceName, _alertSourceValue)

    Object.keys(body).forEach((key) => {
        switch (key) {
            case 'influencers': 
                //Labels
                fillMap(mapLabels, body[key].value, influencersMapFunction)
                break;
            case 'topRecords': 
                //Annotations
                fillMap(mapAnnotations, body[key].value, annotationsMapFunction)
                break;
            default: 
                //Labels
                //if you want to add some other field to the labels, you must add it name at 
                const keyAL = labelsNames[key]
                if (keyAL) mapLabels.setValue(keyAL, body[key])  
                else mapLabels.setValue(key, body[key])
                break;
        }
    })

    //Build the message to send to alert manager
    const message = JSON.stringify([{
        labels: Object.fromEntries(mapLabels),
        annotations: Object.fromEntries(mapAnnotations)
    }])
    
    console.log(message)
    return message
}

function mapSetValue(key, value) { this.set(key, key + '=\'' + value + '\'')}

function fillMap(map, values, functionMap) {
    values
        .split(_partition)
        .filter(value => value !== "")
        .map((value) => functionMap(map, value))
}

function influencersMapFunction(map, value) {
    const values = value.split(_valuesPartition)
    const valueLabel = labelsNames[String(values[0])]

    if (valueLabel !== undefined) {
        values[0] = valueLabel
    } else {
        //A label value can't include '.' characters, that are present in the fields names
        values[0] = values[0].replace('.', '_')
    }
    map.setValue(values[0], values[1])
}

function annotationsMapFunction(map, value) {
    const values = value.split(_valuesPartition)
    if(values[1] === "") return
    map.set(values[0], values[1])
}