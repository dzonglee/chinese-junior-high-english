Component({
  properties: { page: String, params: Object },
  data: { screen: null },
  lifetimes: {
    async attached() {
      const globals = getApp().globalData;
      await globals.ready;
      this.application = globals.application;
      this.unsubscribe = this.application.subscribe(() => this.setData({ screen: this.application.render() }));
      this.application.open(this.data.page, this.data.params || {});
      this.timer = setInterval(() => this.application.tick(), 1000);
    },
    detached() { if (this.unsubscribe) this.unsubscribe(); clearInterval(this.timer); },
  },
  pageLifetimes: { show() { if (this.application) this.application.open(this.data.page, this.data.params || {}); }, hide() { if (this.application) { try { this.application.flush(); } catch (e) { wx.showToast({ title: e.message, icon: 'none' }); } } } },
  methods: {
    action(event) { const { action, value } = event.currentTarget.dataset; this.application.action(action, String(value || '')); },
    input(event) { this.application.setField(event.currentTarget.dataset.name, event.detail.value); try { this.application.flush(); } catch (e) { wx.showToast({ title: e.message, icon: 'none' }); } },
    select(event) { const name = event.currentTarget.dataset.name, field = this.application.render().fields.find(f => f.name === name); this.application.setField(name, field.options[Number(event.detail.value)].value); this.setData({ screen: this.application.render() }); },
    date(event) { this.application.setField(event.currentTarget.dataset.name, event.detail.value); this.setData({ screen: this.application.render() }); },
  },
});
