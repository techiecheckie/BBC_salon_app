 

// You'll usually only ever have to create one service instance.
var service = analytics.getService('BBC Salon');

// You can create as many trackers as you want. Each tracker has its own state
// independent of other tracker instances.
var tracker = service.getTracker('UA-44707060-6');

 