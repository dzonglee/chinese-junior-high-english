Component({
  properties: { page: String, params: Object },
  data: { screen: null, privacyPrompt: false },
  lifetimes: {
    async attached() {
      const globals = getApp().globalData;
      await globals.ready;
      this.application = globals.application;
      this.unsubscribe = this.application.subscribe(() => this.setData({ screen: this.application.render() }));
      this.application.open(this.data.page, this.data.params || {});
      this.startTicker();
    },
    detached() { if (this.privacyResolvers) this.privacyResolvers.forEach(resolve => resolve({ event: 'disagree' })); if (this.unsubscribe) this.unsubscribe(); clearInterval(this.timer); },
  },
  pageLifetimes: { show() { if (this.application) { this.application.open(this.data.page, this.data.params || {}); this.startTicker(); void this.application.tick(); } }, hide() { clearInterval(this.timer); this.timer = null; if (this.application) { void this.application.suspend().catch(e => wx.showToast({ title: e.message, icon: 'none' })); } } },
  methods: {
    startTicker() { if (!this.timer) this.timer = setInterval(() => this.application.tick(), 1000); },
    requestPrivacy(resolve) { this.privacyResolvers = this.privacyResolvers || []; this.privacyResolvers.push(resolve); this.setData({ privacyPrompt: true }); },
    agreePrivacy() { (this.privacyResolvers || []).forEach(resolve => resolve({ event: 'agree', buttonId: 'privacy-agree' })); this.privacyResolvers = []; this.setData({ privacyPrompt: false }); },
    declinePrivacy() { (this.privacyResolvers || []).forEach(resolve => resolve({ event: 'disagree' })); this.privacyResolvers = []; this.setData({ privacyPrompt: false }); },
    openPrivacy() { wx.openPrivacyContract({ fail: () => wx.showToast({ title: '隐私保护指引暂未加载，请稍后重试。', icon: 'none' }) }); },
    action(event) { const { action, value } = event.currentTarget.dataset; this.application.action(action, String(value || '')); },
    input(event) { this.application.setField(event.currentTarget.dataset.name, event.detail.value); const question = this.application.render().question; if (event.currentTarget.dataset.name === 'answer' && question) this.setData({ 'screen.question.words': question.words }); try { this.application.flush(); } catch (e) { wx.showToast({ title: e.message, icon: 'none' }); } },
    select(event) { const name = event.currentTarget.dataset.name, field = this.application.render().fields.find(f => f.name === name); this.application.setField(name, field.options[Number(event.detail.value)].value); this.setData({ screen: this.application.render() }); },
    date(event) { this.application.setField(event.currentTarget.dataset.name, event.detail.value); this.setData({ screen: this.application.render() }); },
  },
});
