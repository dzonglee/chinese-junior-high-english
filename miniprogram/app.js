const { application, ready } = require('./runtime.js');
App({ globalData: { application, ready }, onHide() { try { void application.suspend().catch(e => wx.showToast({ title: e.message, icon: 'none' })); } catch (e) { wx.showToast({ title: e.message, icon: 'none' }); } } });
