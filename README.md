Simple chronometer 
==========

# Chronode

chronode is a very simple chronometer to evaluate your algorithms perfs.

# How to use

First install it as a dependency
``` sh
$ npm install -S chronode
```

Now you can start to use it :


``` js
const chronode = require('chronode');

chronode.start('My measurement');

setTimeout(() => {
    chronode.step('My measurement', 'First timeout');
    
    setTimeout(() => {
        chronode.step('My measurement', 'Second timeout');
        
        setTimeout(() => {
            chronode.step('My measurement', 'Third timeout');
            
            setTimeout(() => {
                chronode.stop('My measurement', 'Last timeout');
                chronode.print('My measurement');
            }, 10);
        }, 40);
    }, 50);
}, 200);
```

It should give you something like this : 

```
 **************************************
 *         Measurement result         *
 **************************************

 # My measurement
   + Started at : 15:47:58.848
   + Stopped at : 15:47:59.152
     > First timeout :  203ms (66.8%)
     > Second timeout :  50ms (16.4%)
     > Third timeout :  40ms (13.2%)
     > Last timeout :  11ms (3.6%)
   + Total time :  304ms
```

Here are the functions you can use :

- **getMeasurement(measurementName)** : return an measurement object.
- **start(measurementName)** : start a new measurement.
- **step(measurementName, stepName)** : add a new step to the given measurement.
- **stop(measurementName, stepName)** : stop the given measurement and add the final step.
- **print(measurementName)** : pretty print the measurement.

measurement object looks like this : 
``` json
    {  
       "name":"My measurement",
       "startedAt":1510676136373,
       "steps":[  
          {  
             "name":"First timeout",
             "time":1510676136576
          },
          {  
             "name":"Second timeout",
             "time":1510676136627
          },
          {  
             "name":"Third timeout",
             "time":1510676136667
          },
          {  
             "name":"Last timeout",
             "time":1510676136678
          }
       ],
       "running":false,
       "stoppedAt":1510676136678
    }
```