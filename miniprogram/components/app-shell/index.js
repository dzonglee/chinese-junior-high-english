Component({
  properties: { page: String, params: Object },
  data: { screen: null, privacyPrompt: false },
  lifetimes: {
    async attached() {
      await this.connectApplication();
    },
    ready() { if (this.application) this.showScreen(); },
    detached() { this.disposed = true; if (this.privacyResolvers) this.privacyResolvers.forEach(resolve => resolve({ event: 'disagree' })); if (this.unsubscribe) this.unsubscribe(); clearInterval(this.timer); },
  },
  pageLifetimes: { show() { if (this.application) { this.showScreen(); this.startTicker(); void this.application.tick(); } }, hide() { clearInterval(this.timer); this.timer = null; if (this.application) { void this.application.suspend().catch(e => wx.showToast({ title: e.message, icon: 'none' })); } } },
  methods: {
    async connectApplication() {
      try {
        const globals = getApp().globalData;
        await globals.ready;
        if (this.disposed) return;
        this.application = globals.application;
        this.unsubscribe = this.application.subscribe(() => this.setData({ screen: this.application.render() }));
        this.setData({ startupError: false });
        this.showScreen(true);
        this.startTicker();
      } catch (error) { if (!this.disposed) this.setData({ startupError: true }); }
    },
    async retryStartup() { this.setData({ startupError: false }); getApp().globalData.start(); await this.connectApplication(); },
    showScreen(reset = false) { const pages = getCurrentPages(), current = pages[pages.length - 1]; if (!current || current.route !== 'pages/' + this.data.page + '/index') return; const params = this.data.params || {}, active = this.application.params, target = !this.application.state.profile && !['onboarding','privacy','settings'].includes(this.data.page) ? 'onboarding' : this.data.page; if (reset || this.application.page !== target || Object.keys(params).length !== Object.keys(active).length || Object.keys(params).some(key => params[key] !== active[key])) this.application.open(this.data.page, params); else this.setData({ screen: this.application.render() }); },
    startTicker() { if (!this.timer) this.timer = setInterval(() => { if (!this.data.screen) this.showScreen(); void this.application.tick(); }, 1000); },
    requestPrivacy(resolve) { this.privacyResolvers = this.privacyResolvers || []; this.privacyResolvers.push(resolve); this.setData({ privacyPrompt: true }); },
    agreePrivacy() { (this.privacyResolvers || []).forEach(resolve => resolve({ event: 'agree', buttonId: 'privacy-agree' })); this.privacyResolvers = []; this.setData({ privacyPrompt: false }); },
    declinePrivacy() { (this.privacyResolvers || []).forEach(resolve => resolve({ event: 'disagree' })); this.privacyResolvers = []; this.setData({ privacyPrompt: false }); },
    openPrivacy() { wx.openPrivacyContract({ fail: () => wx.showToast({ title: '隐私保护指引暂未加载，请稍后重试。', icon: 'none' }) }); },
    studioAction(event) { this.application.action(event.detail.action, event.detail.value || ''); },
    studioInput(event) { this.application.setField(event.detail.name,event.detail.value); const v = this.application.render().teaching; if (v && event.detail.name === 'studioMissionRecall') this.setData({'screen.teaching.mission.recallValue':v.mission.recallValue}); if(v && event.detail.name === 'studioMissionOwn') this.setData({'screen.teaching.mission.ownLine':v.mission.ownLine}); if (v) this.setData({ 'screen.teaching.workbench':v.workbench||null, 'screen.teaching.proposedContext':v.proposedContext, 'screen.teaching.answer':v.answer, 'screen.teaching.progress.before':v.progress.before, 'screen.teaching.progress.after':v.progress.after, 'screen.teaching.canAdvance':v.canAdvance, 'screen.actions':this.application.render().actions }); },
    action(event) { const { action, value } = event.currentTarget.dataset; this.application.action(action, String(value || '')); },
    input(event) { this.application.setField(event.currentTarget.dataset.name, event.detail.value); const question = this.application.render().question; if (event.currentTarget.dataset.name === 'answer' && question) this.setData({ 'screen.question.words': question.words }); try { this.application.flush(); } catch (e) { wx.showToast({ title: e.message, icon: 'none' }); } },
    select(event) { const name = event.currentTarget.dataset.name, field = this.application.render().fields.find(f => f.name === name); this.application.setField(name, field.options[Number(event.detail.value)].value); this.setData({ screen: this.application.render() }); },
    date(event) { this.application.setField(event.currentTarget.dataset.name, event.detail.value); this.setData({ screen: this.application.render() }); },
  },
});
