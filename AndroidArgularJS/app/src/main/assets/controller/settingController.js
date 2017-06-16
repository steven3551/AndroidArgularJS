/**
 * 初始化angularjs
 */
var settingApp = angular.module("settingApp", []).run(function()
{
	FastClick.attach(document.body);
});

/**
 * 初始化controller
 */
settingApp.controller("settingController", function($scope)
{
	initMN(function()
	{
		mnWebMain.disableDrag();
		headerController.init($scope, settingHeaderParams);
		settingController.init($scope);
	})
});

/**
 * 设置
 */
var settingController = 
{
	//作用域
	scope : null,
	
	//静态基本数据模型
	staticBasicModel : 
	{
		"resetPwdIcon" : null,
		"resetPwdName" : null,
		"nextIcon" : null,
		"logoutName" : null,
		openGestureName : null,
		closeGestureName : null,
		openGestureIcon : null,
		closeGestureIcon : null,
		modGestureName : null,
	},
	
	settingModel : 
	{
		isOpenGesture : null,
		openSound : null,
	},
	
	//初始化
	init : function ($scope)
	{
		this.scope = $scope;
		
		this.setDefault();
		
		this.setStaticBasicData();
		
		this.ngClickFunction();
	},
	
	//设置默认
	setDefault : function ()
	{
		var self = this;
		
		var userInfo = JSON.parse(mnWebMain.syncGetLocalStorage(storageKey.USER_DATA));
		
		if (userInfo.isOpenGestureCode == 0)
		{
			mnWebMain.syncSetLocalStorage(storageKey.IS_OPEN_GESTURE, 0);
			
			self.settingModel.isOpenGesture = false;
			self.scope.isOpenGesture = self.settingModel.isOpenGesture;
		}
		else 
		{
			mnWebMain.syncSetLocalStorage(storageKey.IS_OPEN_GESTURE, 1);
			self.settingModel.isOpenGesture = true;
			self.scope.isOpenGesture = self.settingModel.isOpenGesture;
		}
		
		mnWebMain.getSettingMsgSound(function (data)
		{
			var soundIsOpen = JSON.parse(data).data.soundIsOpen;
			
			if (soundIsOpen)
			{
				self.settingModel.openSound = true;
			}
			else
			{
				self.settingModel.openSound = false;
			}
			
			self.scope.openSound = self.settingModel.openSound;
			self.scope.$apply();
		});
		
	},
	
	//所有angularjs点击事件
	ngClickFunction : function ()
	{
		var self = this;
		
		//跳转到重置密码页面
		self.scope.onClickResetPwd = function ()
		{
			
			mnWebMain.syncSetLocalStorage(storageKey.SKIP_TYPE, skipTypeKey.MOD_PWD_TYPE);
			
			var baseParam = {
				"url" : pageUrl.APP_RESET_PWD1_PAGE_URL,
				"isHideNavBar" : 0,
				"titleType" : 0,
			};
			var centerParam = [{"type" : 0,"param" : "设置密码"}];
			var leftParam = [{"leftType":0, "type" : 1 ,"param" : "btn_back_nor"}];
			var rightParam = [];
			
			mnWebMain.openWebViewController(baseParam, leftParam, centerParam, rightParam);
		}
		
		//修改是否开启手势密码
		self.scope.onClickIsOpenGesturePwd = function ()
		{
			self.settingModel.isOpenGesture = !self.settingModel.isOpenGesture;
			
			var isOpenGestureCode = 0;
			
			if (self.settingModel.isOpenGesture)
			{
				var userInfo = JSON.parse(mnWebMain.syncGetLocalStorage(storageKey.USER_DATA));
				
				if (isEmpty(userInfo.gestureCode))
				{
					mnWebMain.showProgressDialog("请先设置手势密码");
					return;
				}
				else
				{
					isOpenGestureCode = 1;
				}
			}
			else
			{
				isOpenGestureCode = 0;
			}
			
			var modInfoObj = 
			{
				isOpenGestureCode : isOpenGestureCode,
			}
			var params = 
			{
				modInfo : JSON.stringify(modInfoObj),
			}
			
			jqHttpRequest.asyncHttpRequest(apiUrl.API_ACCOUNT_MOD_USERINFO, params, function (data)
			{
				mnWebMain.syncSetLocalStorage(storageKey.IS_OPEN_GESTURE, isOpenGestureCode);
				self.scope.isOpenGesture = self.settingModel.isOpenGesture;
				self.scope.$apply();
			})
		}
		
		//打开声音
		self.scope.onClickOpenSound = function ()
		{
			mnWebMain.setSettingMsgSound(true, function ()
			{
				self.settingModel.openSound = true;
				self.scope.openSound = self.settingModel.openSound;
				self.scope.$apply();
			});
		}
		
		//关闭声音
		self.scope.onClickcloseSound = function ()
		{
			mnWebMain.setSettingMsgSound(false, function ()
			{
				self.settingModel.openSound = false;
				self.scope.openSound = self.settingModel.openSound;
				self.scope.$apply();
			});
		}
		
		//跳转到修改手势密码
		self.scope.onClickToModeGesturePwd = function ()
		{
			mnWebMain.syncSetLocalStorage(storageKey.SKIP_TYPE, skipTypeKey.MOD_PWD_TYPE);
			
			var baseParam = {
				"url" : pageUrl.APP_GESTURE_SETTING_PAGE_URL,
				"isHideNavBar" : 0,
				"titleType" : 0,
			};
			var centerParam = [{"type" : 0,"param" : "设置手势密码"}];
			var leftParam = [{"leftType":0, "type" : 1 ,"param" : "btn_back_nor"}];
			var rightParam = [];
			
			mnWebMain.openWebViewController(baseParam, leftParam, centerParam, rightParam);
		}
		
		//退出
		self.scope.onClickLogout = function ()
		{
			mnWebMain.popupModal(pageUrl.APP_EXIT_LOGOUT_POP_MODAL, function (data) 
			{
				var type = JSON.parse(data).data.params;
				
				if (type == 1)
				{
					mnWebMain.syncSetLocalStorage(storageKey.SESSION_ID, null);
					mnWebMain.syncSetLocalStorage(storageKey.LOGIN_TOKEN, null);
					
					mnWebMain.showLoading();
					
					mnWebMain.easeChatLogout(function()
					{
						mnWebMain.closeLoading();
						
						var baseParam = {
							"url" : pageUrl.APP_LOGIN_PAGE_URL,
							"isHideNavBar" : 1,
							"titleType" : 0,
						};
						
						var centerParam = [];
						var leftParam = [];
						var rightParam = [];
						mnWebMain.openWebViewController(baseParam, leftParam, centerParam, rightParam);
						
						mnWebMain.closeSelfViewController(1);
					});
					
					
				}
			});
//			$confirmDialog.show("确认退出？", function(){
//				
//				
//			})
		}
		
	},
	
	//初始化基本静态数据
	setStaticBasicData : function ()
	{
		var self = this;
		
		self.staticBasicModel.resetPwdIcon = settingParams.RESET_PWD_ICON;
		self.staticBasicModel.resetPwdName = settingParams.RESET_PWD_NAME;
		self.staticBasicModel.nextIcon = settingParams.NEXT_ICON;
		self.staticBasicModel.logoutName = settingParams.LOGOUT_NAME;
		self.staticBasicModel.openGestureName = settingParams.OPEN_GESTURE_PWD;
		self.staticBasicModel.openGestureIcon = settingParams.OPEN_GESTURE_ICON;
		self.staticBasicModel.closeGestureName = settingParams.CLOSE_GESTURE_PWD;
		self.staticBasicModel.closeGestureIcon = settingParams.CLOSE_GESTURE_ICON;
		self.staticBasicModel.modGestureName = settingParams.MOD_GESTURE_PWD;
		
		self.scope.staticBasicModel = self.staticBasicModel;
		
//		self.resetPageHeight();
		
//		self.scope.$apply();
	},
	
	//重新设置界面高度
	resetPageHeight : function ()
	{
		var self = this;
		
		setTimeout(function()
		{
			var screenHeight =  window.screen.availHeight;
			var containerHeight = $(".setting-container").height();
			
			if (containerHeight < screenHeight - 101)
			{
//				$(".setting-container").height(screenHeight - 132);
				$(".setting-container").height(screenHeight - 101);
			}
			else
			{
				$(".setting-container").height("auto");
			}
			
			containerHeight = $(".setting-container").height();
			
			if (containerHeight < screenHeight - 101)
			{
//				$(".setting-container").height(screenHeight - 132);
				$(".setting-container").height(screenHeight - 101);
			}
			
			self.scope.$apply();
			setTimeout(function(){
//				self.scope.$apply();
//				allController.allModel.mySwiper.container[0].style.height=allController.allModel.mySwiper.slides[allController.allModel.mySwiper.activeIndex].offsetHeight+'px';
			}, 0);
		}, 10);
	},
}
