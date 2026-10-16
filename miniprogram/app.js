const { application, ready } = require('./runtime.js');
App({ globalData: { application, ready }, onHide() { try { application.flush(); } catch (e) { wx.showToast({ title: e.message, icon: 'none' }); } } });
