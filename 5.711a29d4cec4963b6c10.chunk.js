webpackJsonp([5,12],{"01xD":function(e,t,i){"use strict";var n=i("Fzro"),r=i("tlRo"),o=i("kZql"),s=i("1APj"),a=(i.n(s),i("+pb+"));i.n(a);i.d(t,"a",function(){return u});var u=function(){function e(e){this.http=e}return e.prototype.getAll=function(e){var t=e&&e.timesheetId;if(!t)throw new Error("TaskTimerService.getAll() must be called with a parameter object specifying the timesheetId");return this.timesheetId!==t&&(this.timesheetId=t,this.taskTimers=this.http.get(o.a.dataService+"/timesheets/"+t+"/taskTimers").map(function(e){var t=[];return e.json().forEach(function(e){return t.push(new r.a(e))}),t})),this.taskTimers},e.prototype.delete=function(e){var t=o.a.dataService+"/timesheets/"+e.timesheetRid+"/taskTimers/"+e._id;return this.http.delete(t,e).map(function(e){})},e.prototype.save=function(e){var t=o.a.dataService+"/timesheets/"+e.timesheetRid+"/taskTimers"+(e._id?"/"+e._id:"");return this.http.post(t,e).map(function(e){return new r.a(e.json())})},e.prototype.start=function(e){return this.http.post(o.a.dataService+"/timesheets/"+e.timesheetRid+"/taskTimers/"+e._id+"/start",e).map(function(e){return new r.a(e.json())})},e.prototype.stop=function(e){return this.http.post(o.a.dataService+"/timesheets/"+e.timesheetRid+"/taskTimers/"+e._id+"/stop",e).map(function(e){return new r.a(e.json())})},e.ctorParameters=function(){return[{type:n.j}]},e}()},"0bqE":function(e,t,i){"use strict";i.d(t,"a",function(){return n});var n=function(){function e(){}return e}()},"14Ez":function(e,t,i){"use strict";function n(e){return a["ɵvid"](0,[(e()(),a["ɵeld"](0,null,null,24,"md-list-item",[["role","listitem"]],[[2,"mat-list-item",null]],[[null,"focus"],[null,"blur"]],function(e,t,i){var n=!0;if("focus"===t){n=!1!==a["ɵnov"](e,2)._handleFocus()&&n}if("blur"===t){n=!1!==a["ɵnov"](e,2)._handleBlur()&&n}return n},u.r,u.s)),a["ɵdid"](8192,null,0,_._13,[[2,_.Q]],null,null),a["ɵdid"](548864,null,2,_._33,[a.Renderer,a.ElementRef,[2,_._32]],null,null),a["ɵqud"](301989888,1,{_lines:1}),a["ɵqud"](167772160,2,{_hasAvatar:0}),(e()(),a["ɵted"](2,["\n      "])),(e()(),a["ɵeld"](0,null,2,17,"div",[["class","timesheet"],["fxFill",""],["fxLayout","row"]],null,null,null,null,null)),a["ɵdid"](368640,null,0,l.a,[c.a,a.ElementRef,a.Renderer],{layout:[0,"layout"]},null),a["ɵdid"](73728,null,0,h.a,[c.a,a.ElementRef,a.Renderer],null,null),(e()(),a["ɵted"](null,["\n        "])),(e()(),a["ɵeld"](0,null,null,3,"div",[["class","clickable"],["fxFlex","90"]],null,[[null,"click"]],function(e,t,i){var n=!0,r=e.component;if("click"===t){n=!1!==r.view(e.context.$implicit)&&n}return n},null,null)),a["ɵdid"](368640,null,0,p.a,[c.a,a.ElementRef,a.Renderer,[3,l.a],[3,d.a]],{flex:[0,"flex"]},null),(e()(),a["ɵted"](null,["\n          Week Ending: ","\n        "])),a["ɵppd"](2),(e()(),a["ɵted"](null,["\n        "])),(e()(),a["ɵeld"](0,null,null,7,"div",[["class","actions"],["fxFlex","10"]],null,null,null,null,null)),a["ɵdid"](368640,null,0,p.a,[c.a,a.ElementRef,a.Renderer,[3,l.a],[3,d.a]],{flex:[0,"flex"]},null),(e()(),a["ɵted"](null,["\n          "])),(e()(),a["ɵeld"](0,null,null,3,"md-icon",[["class","clickable"],["role","img"]],[[2,"mat-icon",null]],[[null,"click"]],function(e,t,i){var n=!0,r=e.component;if("click"===t){n=!1!==r.edit(e.context.$implicit)&&n}return n},u.h,u.i)),a["ɵdid"](8192,null,0,_._13,[[2,_.Q]],null,null),a["ɵdid"](4513792,null,0,_._58,[a.ElementRef,a.Renderer,_.b],null,null),(e()(),a["ɵted"](0,["mode_edit"])),(e()(),a["ɵted"](null,["\n        "])),(e()(),a["ɵted"](null,["\n      "])),(e()(),a["ɵted"](2,["\n    "]))],function(e,t){e(t,7,0,"row"),e(t,11,0,"90"),e(t,16,0,"10"),e(t,20,0)},function(e,t){e(t,0,0,!0),e(t,12,0,a["ɵunv"](t,12,0,e(t,13,0,a["ɵnov"](t.parent,0),t.context.$implicit.endDate,"mediumDate"))),e(t,18,0,!0)})}function r(e){return a["ɵvid"](0,[a["ɵpid"](0,f.p,[a.LOCALE_ID]),(e()(),a["ɵeld"](0,null,null,11,"div",[["class","page-root timesheet-history"]],null,null,null,null,null)),(e()(),a["ɵted"](null,["\n  "])),(e()(),a["ɵeld"](0,null,null,8,"md-list",[["role","list"]],[[2,"mat-list",null]],null,null,u.t,u.u)),a["ɵdid"](8192,null,0,_._13,[[2,_.Q]],null,null),a["ɵdid"](24576,null,0,_._31,[],null,null),a["ɵdid"](8192,null,0,_._77,[],null,null),a["ɵprd"](128,null,_._32,"normal_list_type",[]),(e()(),a["ɵted"](0,["\n    "])),(e()(),a["ɵand"](8388608,null,0,1,null,n)),a["ɵdid"](401408,null,0,f.o,[a.ViewContainerRef,a.TemplateRef,a.IterableDiffers],{ngForOf:[0,"ngForOf"]},null),(e()(),a["ɵted"](0,["\n  "])),(e()(),a["ɵted"](null,["\n"])),(e()(),a["ɵted"](null,["\n"]))],function(e,t){e(t,10,0,t.component.timesheets)},function(e,t){e(t,3,0,!0)})}function o(e){return a["ɵvid"](0,[(e()(),a["ɵeld"](0,null,null,1,"trx-timesheet-history",[],null,null,null,r,b)),a["ɵdid"](57344,null,0,g.a,[m.j,v.a],null,null)],function(e,t){e(t,1,0)},null)}var s=i("xks6"),a=i("3j3K"),u=i("ZWsw"),_=i("fYnu"),l=i("Sxsi"),c=i("bWt6"),h=i("Z5yY"),p=i("XVVf"),d=i("jazq"),f=i("2Je8"),g=i("hoHG"),m=i("5oXY"),v=i("XOzA");i.d(t,"a",function(){return M});var y=[s.a],b=a["ɵcrt"]({encapsulation:0,styles:y,data:{}}),M=a["ɵccf"]("trx-timesheet-history",g.a,o,{},{},[])},"8kN2":function(e,t,i){"use strict";var n=i("Fzro"),r=i("PJh5"),o=(i.n(r),i("kZql")),s=i("+pb+"),a=(i.n(s),i("HcJ8"));i.n(a);i.d(t,"a",function(){return u});var u=function(){function e(e){this.http=e,this.versionName="oldest crater",this.versionTag="1.1.0"}return e.prototype.get=function(){var e=this;return this.http.get(o.a.dataService+"/versions").mergeMap(function(t){return e.http.get("assets/version.json")},function(e,t){var i=e.json(),n=t.json();return{server:i[0].name,client:n.id+" ("+n.name+")",releaseDate:r(n.date)}})},e.ctorParameters=function(){return[{type:n.j}]},e}()},DXs0:function(e,t,i){"use strict";var n=i("Fzro"),r=i("jt7V"),o=i("kZql"),s=i("+pb+");i.n(s);i.d(t,"a",function(){return a});var a=function(){function e(e){this.http=e,this.url=o.a.dataService+"/projects"}return e.prototype.getAll=function(){return this.http.get(this.url).map(function(e){var t=e.json(),i=[];return t.forEach(function(e){return i.push(new r.a(e))}),i})},e.prototype.get=function(e){if(!e)throw new Error("ProjectService.get() called without id");return this.http.get(this.url+"/"+e).map(function(e){return new r.a(e.json())})},e.prototype.save=function(e){return this.http.post(this.url+(e._id?"/"+e._id:""),e).map(function(e){return e.json()})},e.ctorParameters=function(){return[{type:n.j}]},e}()},Et0S:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=i("3j3K"),r=i("XqeV"),o=i("2Je8"),s=i("OBRl"),a=i("rl5v"),u=i("fYnu"),_=i("Fzro"),l=i("gnbz"),c=i("/BFM"),h=i("BtgZ"),p=i("m65n"),d=i("gShl"),f=i("25yz"),g=i("fAE3"),m=i("He/f"),v=i("0bqE"),y=i("5oXY"),b=i("Ut8t"),M=i("LuwH"),w=i("eZjk"),S=i("bWt6"),O=i("23lo"),j=i("Tjjd"),P=i("Wo1E"),R=i("vmWh"),k=i("kA2w"),T=i("h0bj"),D=i("nVAp"),x=i("+mFF"),F=i("FYOZ"),A=i("DXs0"),E=i("kuXm"),H=i("01xD"),X=i("XOzA"),I=i("z6nQ"),B=i("8kN2"),L=i("ZWsw"),z=i("Rr77"),C=i("asv4"),q=i("14Ez"),N=i("iDK7"),Q=i("Qbdm"),V=i("WoL6"),Z=i("hoHG"),G=i("T22J");i.d(t,"TimesheetHistoryModuleNgFactory",function(){return W});var U=this&&this.__extends||function(){var e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var i in t)t.hasOwnProperty(i)&&(e[i]=t[i])};return function(t,i){function n(){this.constructor=t}e(t,i),t.prototype=null===i?Object.create(i):(n.prototype=i.prototype,new n)}}(),Y=function(e){function t(t){return e.call(this,t,[L.a,z.a,C.a,q.a],[])||this}return U(t,e),Object.defineProperty(t.prototype,"_NgLocalization_28",{get:function(){return null==this.__NgLocalization_28&&(this.__NgLocalization_28=new o.a(this.parent.get(n.LOCALE_ID))),this.__NgLocalization_28},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"_MatchMedia_29",{get:function(){return null==this.__MatchMedia_29&&(this.__MatchMedia_29=new M.a(this.parent.get(n.NgZone))),this.__MatchMedia_29},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"_BreakPointRegistry_31",{get:function(){return null==this.__BreakPointRegistry_31&&(this.__BreakPointRegistry_31=new w.a(this._BREAKPOINTS_30)),this.__BreakPointRegistry_31},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"_MediaMonitor_32",{get:function(){return null==this.__MediaMonitor_32&&(this.__MediaMonitor_32=new S.a(this._BreakPointRegistry_31,this._MatchMedia_29)),this.__MediaMonitor_32},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"_ObservableMedia_33",{get:function(){return null==this.__ObservableMedia_33&&(this.__ObservableMedia_33=new O.a(this._MatchMedia_29,this._BreakPointRegistry_31)),this.__ObservableMedia_33},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"_ScrollDispatcher_34",{get:function(){return null==this.__ScrollDispatcher_34&&(this.__ScrollDispatcher_34=u.c(this.parent.get(u.d,null),this.parent.get(n.NgZone))),this.__ScrollDispatcher_34},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"_ɵh_35",{get:function(){return null==this.__ɵh_35&&(this.__ɵh_35=u.e(this.parent.get(u.f,null),this._ScrollDispatcher_34)),this.__ɵh_35},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"_FocusOriginMonitor_36",{get:function(){return null==this.__FocusOriginMonitor_36&&(this.__FocusOriginMonitor_36=u.q(this.parent.get(u.r,null),this.parent.get(n.NgZone))),this.__FocusOriginMonitor_36},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"_OverlayContainer_37",{get:function(){return null==this.__OverlayContainer_37&&(this.__OverlayContainer_37=u.m(this.parent.get(u.n,null))),this.__OverlayContainer_37},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"_ɵk_38",{get:function(){return null==this.__ɵk_38&&(this.__ɵk_38=new u.o(this._ɵh_35)),this.__ɵk_38},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"_Overlay_39",{get:function(){return null==this.__Overlay_39&&(this.__Overlay_39=new u.p(this._OverlayContainer_37,this.componentFactoryResolver,this._ɵk_38,this.parent.get(n.ApplicationRef),this,this.parent.get(n.NgZone))),this.__Overlay_39},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"_Platform_40",{get:function(){return null==this.__Platform_40&&(this.__Platform_40=new u.g),this.__Platform_40},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"_InteractivityChecker_41",{get:function(){return null==this.__InteractivityChecker_41&&(this.__InteractivityChecker_41=new u.h(this._Platform_40)),this.__InteractivityChecker_41},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"_FocusTrapFactory_42",{get:function(){return null==this.__FocusTrapFactory_42&&(this.__FocusTrapFactory_42=new u.i(this._InteractivityChecker_41,this.parent.get(n.NgZone))),this.__FocusTrapFactory_42},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"_LiveAnnouncer_43",{get:function(){return null==this.__LiveAnnouncer_43&&(this.__LiveAnnouncer_43=u.j(this.parent.get(u.k,null),this.parent.get(u.l,null))),this.__LiveAnnouncer_43},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"_MdDialog_44",{get:function(){return null==this.__MdDialog_44&&(this.__MdDialog_44=new u.s(this._Overlay_39,this,this.parent.get(u.s,null))),this.__MdDialog_44},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"_BrowserXhr_45",{get:function(){return null==this.__BrowserXhr_45&&(this.__BrowserXhr_45=new _.a),this.__BrowserXhr_45},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"_ResponseOptions_46",{get:function(){return null==this.__ResponseOptions_46&&(this.__ResponseOptions_46=new _.b),this.__ResponseOptions_46},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"_XSRFStrategy_47",{get:function(){return null==this.__XSRFStrategy_47&&(this.__XSRFStrategy_47=_.c()),this.__XSRFStrategy_47},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"_XHRBackend_48",{get:function(){return null==this.__XHRBackend_48&&(this.__XHRBackend_48=new _.d(this._BrowserXhr_45,this._ResponseOptions_46,this._XSRFStrategy_47)),this.__XHRBackend_48},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"_RequestOptions_49",{get:function(){return null==this.__RequestOptions_49&&(this.__RequestOptions_49=new _.e),this.__RequestOptions_49},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"_Http_50",{get:function(){return null==this.__Http_50&&(this.__Http_50=f.a(this._XHRBackend_48,this._RequestOptions_49,this.parent.get(N.a),this.parent.get(y.j))),this.__Http_50},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"_MdIconRegistry_51",{get:function(){return null==this.__MdIconRegistry_51&&(this.__MdIconRegistry_51=u.a(this.parent.get(u.b,null),this._Http_50,this.parent.get(Q.q))),this.__MdIconRegistry_51},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"_AskDialogService_52",{get:function(){return null==this.__AskDialogService_52&&(this.__AskDialogService_52=new j.a(this._MdDialog_44)),this.__AskDialogService_52},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"_AuthenticationService_53",{get:function(){return null==this.__AuthenticationService_53&&(this.__AuthenticationService_53=new P.a(this._Http_50,this.parent.get(N.a))),this.__AuthenticationService_53},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"_DateService_54",{get:function(){return null==this.__DateService_54&&(this.__DateService_54=new R.a),this.__DateService_54},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"_ErrorDialogService_55",{get:function(){return null==this.__ErrorDialogService_55&&(this.__ErrorDialogService_55=new k.a(this._MdDialog_44)),this.__ErrorDialogService_55},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"_ErrorMessageService_56",{get:function(){return null==this.__ErrorMessageService_56&&(this.__ErrorMessageService_56=new T.a(this._ErrorDialogService_55)),this.__ErrorMessageService_56},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"_TimesheetReportService_57",{get:function(){return null==this.__TimesheetReportService_57&&(this.__TimesheetReportService_57=new D.a),this.__TimesheetReportService_57},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"_HoursMinutesPipe_58",{get:function(){return null==this.__HoursMinutesPipe_58&&(this.__HoursMinutesPipe_58=new x.a),this.__HoursMinutesPipe_58},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"_MillisecondsPipe_59",{get:function(){return null==this.__MillisecondsPipe_59&&(this.__MillisecondsPipe_59=new F.a),this.__MillisecondsPipe_59},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"_ProjectService_60",{get:function(){return null==this.__ProjectService_60&&(this.__ProjectService_60=new A.a(this._Http_50)),this.__ProjectService_60},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"_StageService_61",{get:function(){return null==this.__StageService_61&&(this.__StageService_61=new E.a(this._Http_50)),this.__StageService_61},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"_TaskTimerService_62",{get:function(){return null==this.__TaskTimerService_62&&(this.__TaskTimerService_62=new H.a(this._Http_50)),this.__TaskTimerService_62},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"_TimesheetService_63",{get:function(){return null==this.__TimesheetService_63&&(this.__TimesheetService_63=new X.a(this._Http_50,this._DateService_54)),this.__TimesheetService_63},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"_UserService_64",{get:function(){return null==this.__UserService_64&&(this.__UserService_64=new I.a(this._Http_50,this.parent.get(V.a))),this.__UserService_64},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"_VersionService_65",{get:function(){return null==this.__VersionService_65&&(this.__VersionService_65=new B.a(this._Http_50)),this.__VersionService_65},enumerable:!0,configurable:!0}),t.prototype.createInternal=function(){return this._CommonModule_0=new o.b,this._MediaQueriesModule_1=new s.a,this._FlexLayoutModule_2=new a.a,this._CompatibilityModule_3=new u.t(this.parent.get(Q.c,null)),this._MdRippleModule_4=new u.w,this._StyleModule_5=new u.E,this._MdButtonModule_6=new u.F,this._PortalModule_7=new u.A,this._OverlayModule_8=new u.B,this._PlatformModule_9=new u.y,this._A11yModule_10=new u.z,this._MdDialogModule_11=new u.G,this._HttpModule_12=new _.f,this._MdIconModule_13=new u.u,this._AskDialogModule_14=new l.a,this._AuthenticationModule_15=new c.a,this._DateModule_16=new h.a,this._ErrorDialogModule_17=new p.a,this._ErrorMessageModule_18=new d.a,this._TimeTraxHttpModule_19=new f.b,this._SharedModule_20=new g.a,this._DataServiceModule_21=new m.a,this._DataModule_22=new v.a,this._MdLineModule_23=new u.v,this._MdListModule_24=new u.x,this._RouterModule_25=new y.q(this.parent.get(y.r,null),this.parent.get(y.j,null)),this._TimesheetHistoryRoutingModule_26=new b.a,this._TimesheetHistoryModule_27=new r.a,this._BREAKPOINTS_30=[{alias:"xs",suffix:"Xs",overlapping:!1,mediaQuery:"screen and (max-width: 599px)"},{alias:"gt-xs",suffix:"GtXs",overlapping:!0,mediaQuery:"screen and (min-width: 600px)"},{alias:"sm",suffix:"Sm",overlapping:!1,mediaQuery:"screen and (min-width: 600px) and (max-width: 959px)"},{alias:"gt-sm",suffix:"GtSm",overlapping:!0,mediaQuery:"screen and (min-width: 960px)"},{alias:"md",suffix:"Md",overlapping:!1,mediaQuery:"screen and (min-width: 960px) and (max-width: 1279px)"},{alias:"gt-md",suffix:"GtMd",overlapping:!0,mediaQuery:"screen and (min-width: 1280px)"},{alias:"lg",suffix:"Lg",overlapping:!1,mediaQuery:"screen and (min-width: 1280px) and (max-width: 1919px)"},{alias:"gt-lg",suffix:"GtLg",overlapping:!0,mediaQuery:"screen and (min-width: 1920px)"},{alias:"xl",suffix:"Xl",overlapping:!1,mediaQuery:"screen and (min-width: 1920px) and (max-width: 5000px)"}],this._ROUTES_66=[[{path:"",component:Z.a}]],this._TimesheetHistoryModule_27},t.prototype.getInternal=function(e,t){return e===o.b?this._CommonModule_0:e===s.a?this._MediaQueriesModule_1:e===a.a?this._FlexLayoutModule_2:e===u.t?this._CompatibilityModule_3:e===u.w?this._MdRippleModule_4:e===u.E?this._StyleModule_5:e===u.F?this._MdButtonModule_6:e===u.A?this._PortalModule_7:e===u.B?this._OverlayModule_8:e===u.y?this._PlatformModule_9:e===u.z?this._A11yModule_10:e===u.G?this._MdDialogModule_11:e===_.f?this._HttpModule_12:e===u.u?this._MdIconModule_13:e===l.a?this._AskDialogModule_14:e===c.a?this._AuthenticationModule_15:e===h.a?this._DateModule_16:e===p.a?this._ErrorDialogModule_17:e===d.a?this._ErrorMessageModule_18:e===f.b?this._TimeTraxHttpModule_19:e===g.a?this._SharedModule_20:e===m.a?this._DataServiceModule_21:e===v.a?this._DataModule_22:e===u.v?this._MdLineModule_23:e===u.x?this._MdListModule_24:e===y.q?this._RouterModule_25:e===b.a?this._TimesheetHistoryRoutingModule_26:e===r.a?this._TimesheetHistoryModule_27:e===o.g?this._NgLocalization_28:e===M.a?this._MatchMedia_29:e===G.a?this._BREAKPOINTS_30:e===w.a?this._BreakPointRegistry_31:e===S.a?this._MediaMonitor_32:e===O.b?this._ObservableMedia_33:e===u.d?this._ScrollDispatcher_34:e===u.f?this._ɵh_35:e===u.r?this._FocusOriginMonitor_36:e===u.n?this._OverlayContainer_37:e===u.o?this._ɵk_38:e===u.p?this._Overlay_39:e===u.g?this._Platform_40:e===u.h?this._InteractivityChecker_41:e===u.i?this._FocusTrapFactory_42:e===u.k?this._LiveAnnouncer_43:e===u.s?this._MdDialog_44:e===_.a?this._BrowserXhr_45:e===_.g?this._ResponseOptions_46:e===_.h?this._XSRFStrategy_47:e===_.d?this._XHRBackend_48:e===_.i?this._RequestOptions_49:e===_.j?this._Http_50:e===u.b?this._MdIconRegistry_51:e===j.a?this._AskDialogService_52:e===P.a?this._AuthenticationService_53:e===R.a?this._DateService_54:e===k.a?this._ErrorDialogService_55:e===T.a?this._ErrorMessageService_56:e===D.a?this._TimesheetReportService_57:e===x.a?this._HoursMinutesPipe_58:e===F.a?this._MillisecondsPipe_59:e===A.a?this._ProjectService_60:e===E.a?this._StageService_61:e===H.a?this._TaskTimerService_62:e===X.a?this._TimesheetService_63:e===I.a?this._UserService_64:e===B.a?this._VersionService_65:e===y.u?this._ROUTES_66:t},t.prototype.destroyInternal=function(){},t}(n["ɵNgModuleInjector"]),W=new n.NgModuleFactory(Y,r.a)},HcJ8:function(e,t,i){"use strict";var n=i("rCTf"),r=i("XO5T");n.Observable.prototype.mergeMap=r.mergeMap,n.Observable.prototype.flatMap=r.mergeMap},"He/f":function(e,t,i){"use strict";i.d(t,"a",function(){return n});var n=function(){function e(){}return e}()},UVGF:function(e,t,i){"use strict";i.d(t,"a",function(){return n});var n=function(){function e(e){e&&(this._id=e._id,this.stageNumber=e.stageNumber,this.name=e.name)}return e}()},Ut8t:function(e,t,i){"use strict";var n=i("hoHG");i.d(t,"a",function(){return r});var r=(n.a,function(){function e(){}return e}())},XOzA:function(e,t,i){"use strict";var n=i("Fzro"),r=i("rCTf"),o=(i.n(r),i("vmWh")),s=i("bX6n"),a=i("kZql"),u=i("+pb+"),_=(i.n(u),i("HcJ8")),l=(i.n(_),i("1APj")),c=(i.n(l),i("h0qH"));i.n(c);i.d(t,"a",function(){return h});var h=function(){function e(e,t){this.http=e,this.dates=t,this.url=a.a.dataService+"/timesheets"}return e.prototype.getAll=function(){return this.http.get(this.url).map(function(e){var t=[];return e.json().forEach(function(e){return t.push(new s.a(e))}),t})},e.prototype.get=function(e){return this.http.get(this.url+"/"+e).map(function(e){return new s.a(e.json())})},e.prototype.getCurrent=function(){var e=this,t=this.dates.weekEndDate(new Date);return this.http.get(this.url+"?endDate="+t).mergeMap(function(i){var n=i.json()[0];return n?r.Observable.of(new s.a(n)):e.save({_id:void 0,endDate:t,userRid:void 0})})},e.prototype.save=function(e){var t=this.url+(e._id?"/"+e._id:"");return this.http.post(t,e).map(function(e){return new s.a(e.json())})},e.ctorParameters=function(){return[{type:n.j},{type:o.a}]},e}()},XqeV:function(e,t,i){"use strict";i.d(t,"a",function(){return n});var n=function(){function e(){}return e}()},bX6n:function(e,t,i){"use strict";i.d(t,"a",function(){return n});var n=function(){function e(e){e&&(this._id=e._id,this.endDate=e.endDate,this.userRid=e.userRid)}return e}()},hoHG:function(e,t,i){"use strict";var n=i("5oXY"),r=i("M4fF"),o=(i.n(r),i("XOzA"));i.d(t,"a",function(){return s});var s=function(){function e(e,t){this.router=e,this.timesheetData=t}return e.prototype.ngOnInit=function(){var e=this;this.timesheetData.getAll().subscribe(function(t){e.timesheets=r.orderBy(t,"endDate","desc")})},e.prototype.edit=function(e){this.router.navigate(["timesheet",e._id])},e.prototype.view=function(e){this.router.navigate(["time-report",e._id])},e.ctorParameters=function(){return[{type:n.j},{type:o.a}]},e}()},jt7V:function(e,t,i){"use strict";i.d(t,"a",function(){return n});var n=function(){function e(e){e?(this._id=e._id,this.name=e.name,this.jiraTaskId=e.jiraTaskId,this.sbvbTaskId=e.sbvbTaskId,this.status=e.status):this.status="active"}return e.prototype.contains=function(e){var t=this.prepareForSearch(this.name)+" "+this.prepareForSearch(this.jiraTaskId)+" "+this.prepareForSearch(this.sbvbTaskId);return!(!e||!t.includes(this.prepareForSearch(e)))},e.prototype.prepareForSearch=function(e){return e?e.toLocaleLowerCase():""},e}()},kuXm:function(e,t,i){"use strict";var n=i("Fzro"),r=i("UVGF"),o=i("kZql"),s=i("+pb+");i.n(s);i.d(t,"a",function(){return a});var a=function(){function e(e){this.http=e}return e.prototype.getAll=function(){return this.stages||(this.stages=this.http.get(o.a.dataService+"/stages").map(function(e){var t=[];return e.json().forEach(function(e){return t.push(new r.a(e))}),t})),this.stages},e.ctorParameters=function(){return[{type:n.j}]},e}()},tlRo:function(e,t,i){"use strict";var n=i("PJh5"),r=(i.n(n),i("jt7V")),o=i("UVGF");i.d(t,"a",function(){return s});var s=function(){function e(e){e&&(this._id=e._id,this.timesheetRid=e.timesheetRid,this.milliseconds=e.milliseconds,this.isActive=e.isActive,this.startTime=e.startTime,this._currentTime=e._currentTime,e.workDate&&(this.workDate=n(e.workDate).format("YYYY-MM-DD")),e.stage&&(this.stage=new o.a(e.stage)),e.project&&(this.project=new r.a(e.project)))}return Object.defineProperty(e.prototype,"elapsedTime",{get:function(){return(this.milliseconds||0)+(this.isActive?(this._currentTime||this.startTime)-this.startTime:0)},enumerable:!0,configurable:!0}),e}()},xks6:function(e,t,i){"use strict";i.d(t,"a",function(){return n});var n=[".timesheet[_ngcontent-%COMP%]{font-size:larger;color:gray;border-bottom:1px solid #d3d3d3;padding-top:15px}"]},z6nQ:function(e,t,i){"use strict";var n=i("Fzro"),r=i("uCY4"),o=(i.n(r),i("kZql")),s=i("WoL6");i.d(t,"a",function(){return a});var a=function(){function e(e,t){this.http=e,this.identity=t}return e.prototype.changePassword=function(e,t){var i=this;return this.identity.get().switchMap(function(n){return i.http.post(o.a.dataService+"/users/"+n._id+"/password",{password:e,newPassword:t})})},e.ctorParameters=function(){return[{type:n.j},{type:s.a}]},e}()}});