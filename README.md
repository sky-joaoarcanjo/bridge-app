# bridge-app

### Input message example:

```
{
    "jobIds": "pg-int-bc-authorisecapture",
    "time": "2022-09-08T09:42:20.000Z",
    "anomalyScore": "80",
    "alertName": "pg-int-bc-authorisecapture-influencer",
    "influencers": {
        "value": "event.endpoint=/authorisecapture,service.environment=int,service.name=payments-gateway-service,"
    },
    "topRecords": { 
        "value": "function=count(),partition_field=event.endpoint,by_field=,over_field=" 
    }
}
```

### Output message example:

```
[
    {
        "labels":{
            "alertsource":"alertsource='ELASTIC_TREND_ANALYSIS'",
            "jobIds":"jobIds='pg-int-bc-authorisecapture'",
            "time":"time='2022-09-08T09:42:20.000Z'",
            "alertanomalyscore":"alertanomalyscore='80'",
            "alertname":"alertname='pg-int-bc-authorisecapture-influencer'",
            "endpoint":"endpoint='/authorisecapture'",
            "environment":"environment='int'",
            "application":"application='payments-gateway-service'"
        },
        "annotations":{
            "function":"count()",
            "partition_field":"event.endpoint"
        }
    }
]
```

## Future importante labels to add and send to alert manager:
 - sparkGroup
 - severity
