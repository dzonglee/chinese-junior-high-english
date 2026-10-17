const runtime = require('./runtime.js');
App({
  globalData: { application: null, ready: null, start: null },
  onLaunch() {
    this.globalData.start = () => {
      const task = runtime.initializeApplication().then(() => { this.globalData.application = runtime.application; });
      this.globalData.ready = task;
      void task.catch(() => {});
      return task;
    };
    void runtime.ready.catch(() => {});
    void this.globalData.start();
  },
  onHide() { if (runtime.application) void runtime.application.suspend().catch(e => wx.showToast({ title: e.message, icon: 'none' })); },
});
