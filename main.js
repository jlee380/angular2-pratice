(function() {
  var NgModule = ng.core.NgModule;
  var Component = ng.core.Component;
  var BrowserModule = ng.platformBrowser.BrowserModule;
  var platformBrowserDynamic = ng.platformBrowserDynamic.platformBrowserDynamic();
  var Class = ng.core.Class;


  var UpdateTimeService = Class({
    constructor: function UpdateTimeService() {

    },
    getOnlyTime: function() {
      this.time = new Date();
      var time = this.time.toTimeString().split(" ")[0];
      console.log(time);
      return time;
    },
    generateCurrentTime: function(delay, callback) {
      var self = this;
      callback(this.getOnlyTime());
      setInterval(function() {
        callback(self.getOnlyTime());
      }, delay);
    }
  });

  var CurrentTimeComponent = Component({
    selector: 'current-time',
    template: '<p>{{ time }}</p>'
  })
  .Class({
    constructor: [UpdateTimeService, function CurrentTimeComponent(updateTimeService) {
      var self = this;
      updateTimeService.generateCurrentTime(1000, function(time) {
        self.time = time;
      });
    }]
  });


  var AppComponent = Component({
    selector: 'my-app',
    template:
      '<p>The current time</p>' +
      '<current-time></current-time>'

  })
  .Class({
    constructor: function AppComponent() {}
  });


  var AppModule = NgModule({
    imports: [BrowserModule],
    declarations: [AppComponent, CurrentTimeComponent],
    providers: [UpdateTimeService],
    bootstrap: [AppComponent]

  })
  .Class({
    constructor: function() {}
  });

  platformBrowserDynamic.bootstrapModule(AppModule);

})();
