/**
 * 初始化angularjs
 */
var gestureSettingApp = angular.module("gestureSettingApp", ["ngTouch"]).run(function()
{
	FastClick.attach(document.body);
});


/**
 * 初始化controller
 */
gestureSettingApp.controller("gestureSettingController", function($scope)
{
	initMN(function()
	{
		mnWebMain.disableDrag();
		gestureSettingController.init($scope);
	})
});

/**
 * 设置手势密码
 */
var gestureSettingController = 
{
	//作用域
	scope : null,
	
	//数据模型
	gestureSettingModel : 
	{
		gestureTitle : null,
		phoneNum : null,
		gesturePwd : null,
		gestureSecondPwd : null,
		gestureTip : null,
		gestureClass : null,
		gestureStep : null,
		gestureFooterName : null,
		myIcon : null,
		isInputOldPwd : false,
		h5Clock : null,	},
	
	//初始化
	init : function ($scope)
	{
		this.scope = $scope;
		
		mnWebMain.showLoading();
		
		this.initGesture();
		
		this.setDefault();
		
		this.ngClickFunction();
	},
	
	//初始化数据
	setDefault : function ()
	{
		var self = this;
		
		var skipType = mnWebMain.syncGetLocalStorage(storageKey.SKIP_TYPE);
		
		if (skipType == skipTypeKey.MOD_PWD_TYPE)
		{
			self.gestureSettingModel.isInputOldPwd = true;
		}
		
		var userInfo = mnWebMain.syncGetLocalStorage(storageKey.USER_DATA);
		
		if (isEmpty(userInfo))
		{
			self.gestureSettingModel.myIcon = "img/ease_default_avatar.png";
		}
		else
		{
			userInfo = JSON.parse(userInfo);
			if (isEmpty(userInfo.icon))
			{
				self.gestureSettingModel.myIcon = "img/ease_default_avatar.png";
			}
			else
			{
				self.gestureSettingModel.myIcon = userInfo.icon;
			}
			
		}
		
		self.scope.myIcon = self.gestureSettingModel.myIcon;
		
//		mnWebMain.syncSetLocalStorage(storageKey.IS_OPEN_GESTURE, 0);
		
		self.gestureSettingModel.gestureStep = 1;
		
		self.gestureSettingModel.phoneNum = mnWebMain.syncGetLocalStorage(userKeys.PHONE_NUM);
		
		self.gestureSettingModel.phoneNum = changePhoneNumFormat(self.gestureSettingModel.phoneNum);
		
		if (self.gestureSettingModel.isInputOldPwd)
		{
			self.gestureSettingModel.gestureTip = "请输入旧密码";
			self.gestureSettingModel.gestureClass = "active";
		}
		else
		{
			self.gestureSettingModel.gestureTip = "请输入手势密码";
			self.gestureSettingModel.gestureClass = "active";
		}
		
		
		self.gestureSettingModel.gestureTitle = "设置手势密码";
		self.gestureSettingModel.gestureFooterName = "暂不设置";
		
		self.scope.gestureFooterName = self.gestureSettingModel.gestureFooterName;
		self.scope.gestureTitle = self.gestureSettingModel.gestureTitle;
		self.scope.phoneNum = self.gestureSettingModel.phoneNum;
		self.scope.gestureTip = self.gestureSettingModel.gestureTip;
		self.scope.gestureClass = self.gestureSettingModel.gestureClass;
		self.scope.$apply();
		
		mnWebMain.closeLoading();
		$(".gesture-setting-body").show();
		
		self.gestureSettingModel.h5Clock.reset();
//		self.initGesture();
	},
	
	//初始化手势插件
	initGesture : function ()
	{
		var self = this;
		
		mnWebMain.syncSetLocalStorage(storageKey.GESTURE_TYPE, gestureTypeKey.SET_GESTURE);
		
		self.gestureSettingModel.h5Clock = new H5lock({
			    chooseType: 3
			});
			
		self.gestureSettingModel.h5Clock.init();
	},
	
	//手势登录处理
	gestureEndDeal : function (psw)
	{
		var self = gestureSettingController;
		
		if (self.gestureSettingModel.isInputOldPwd)
		{
			var userInfo = JSON.parse(mnWebMain.syncGetLocalStorage(storageKey.USER_DATA));
			
			self.gestureSettingModel.gesturePwd = "";
		
			for (var i = 0; i < psw.length; i ++)
			{
				self.gestureSettingModel.gesturePwd += psw[i].index; 
			}
			
			if (self.gestureSettingModel.gesturePwd == userInfo.gestureCode)
			{
				self.gestureSettingModel.isInputOldPwd = false;
				
				self.gestureSettingModel.gestureTip = "请输入新手势密码";
				self.gestureSettingModel.gestureClass = "active";
			}
			else
			{
				self.gestureSettingModel.gestureTip = "旧密码错误";
				self.gestureSettingModel.gestureClass = "no-active";
			}
			
			self.scope.gestureTip = self.gestureSettingModel.gestureTip;
			self.scope.gestureClass = self.gestureSettingModel.gestureClass;
			self.scope.$apply();
		}
		else
		{
			if (self.gestureSettingModel.gestureStep == 1)
			{
				self.gestureSettingModel.gesturePwd = "";
			
				for (var i = 0; i < psw.length; i ++)
				{
					self.gestureSettingModel.gesturePwd += psw[i].index; 
				}
				
				if (self.gestureSettingModel.gesturePwd.length >= 4)
				{
					self.gestureSettingModel.gestureStep = 2;
					
					self.gestureSettingModel.gestureTitle = "再次设置手势密码";
					self.gestureSettingModel.gestureFooterName = "重置密码";
					
					self.gestureSettingModel.gestureTip = "再次输入手势密码";
					self.gestureSettingModel.gestureClass = "active";
					
					self.scope.gestureTitle = self.gestureSettingModel.gestureTitle;
					self.scope.gestureFooterName = self.gestureSettingModel.gestureFooterName;
					self.scope.gestureTip = self.gestureSettingModel.gestureTip;
					self.scope.gestureClass = self.gestureSettingModel.gestureClass;
					self.scope.$apply();
					
					var baseParam = {
						"url" : pageUrl.APP_GESTURE_SETTING_PAGE_URL,
						"isHideNavBar" : 0,
						"titleType" : 0,
					};
					var centerParam = [{"type" : 0,"param" : "再次设置手势密码"}];
					var leftParam = [{"leftType":0, "type" : 1 ,"param" : "btn_back_nor"}];
					var rightParam = [];
					
					mnWebMain.updateDataModel(baseParam, leftParam, centerParam, rightParam);
					
				}
				else
				{
					self.gestureSettingModel.gestureTip = "手势密码长度最少为4位";
					self.gestureSettingModel.gestureClass = "no-active";
					
					self.scope.gestureTip = self.gestureSettingModel.gestureTip;
					self.scope.gestureClass = self.gestureSettingModel.gestureClass;
					self.scope.$apply();
				}
				
			}
			else if (self.gestureSettingModel.gestureStep == 2)
			{
				self.gestureSettingModel.gestureSecondPwd = "";
				self.gestureSettingModel.gestureSecondPwd = self.gestureSettingModel.gesturePwd;
				self.gestureSettingModel.gesturePwd = "";
				
				for (var i = 0; i < psw.length; i ++)
				{
					self.gestureSettingModel.gesturePwd += psw[i].index; 
				}
				
				if (self.gestureSettingModel.gesturePwd == self.gestureSettingModel.gestureSecondPwd)
				{
					self.gestureSettingModel.gestureTip = "设置密码成功！";
					self.gestureSettingModel.gestureClass = "active";
					self.scope.gestureTip = self.gestureSettingModel.gestureTip;
					self.scope.gestureClass = self.gestureSettingModel.gestureClass;
					self.scope.$apply();
					
					var skipType = mnWebMain.syncGetLocalStorage(storageKey.SKIP_TYPE);
					
					if (skipType == skipTypeKey.MOD_PWD_TYPE)
					{
						var modInfoObj = 
						{
							gestureCode : self.gestureSettingModel.gesturePwd,
						}
						var params = 
						{
							modInfo : JSON.stringify(modInfoObj),
						}
						
						jqHttpRequest.asyncHttpRequest(apiUrl.API_ACCOUNT_MOD_USERINFO, params, function (data)
						{
							var userInfo = JSON.parse(mnWebMain.syncGetLocalStorage(storageKey.USER_DATA));
							
							userInfo.gestureCode = self.gestureSettingModel.gesturePwd;
							
							mnWebMain.syncSetLocalStorage(storageKey.USER_DATA, JSON.stringify(userInfo));
							
							mnWebMain.showProgressDialog("修改手势密码成功!");
							mnWebMain.closeSelfViewController(1);
						})
					}
					else if (skipType == skipTypeKey.REGISTER_TYPE)
					{
						var phoneAreaCode = mnWebMain.syncGetLocalStorage(userKeys.START_PHONE_NUM);
						var platformId = mnWebMain.syncGetLocalStorage(userKeys.PHONE_NUM);
						var verifyCode = mnWebMain.syncGetLocalStorage(storageKey.INPUT_CODES);
						var password = mnWebMain.syncGetLocalStorage(userKeys.PASSWORD);
						
						var params = 
						{
							phoneAreaCode : phoneAreaCode,
							platformId : platformId,
							password : password,
							verifyCode : verifyCode,
							gestureCode : self.gestureSettingModel.gesturePwd,
						}
						
						jqHttpRequest.asyncHttpRequest(apiUrl.API_ACCOUNT_REGISTER, params, function (data)
						{
							mnWebMain.showProgressDialog("注册成功!");
							
							mnWebMain.syncSetLocalStorage(storageKey.IS_OPEN_GESTURE, 1);
							
							var userInfo = data.userInfo;
							userInfo.name = data.userInfo.baseInfo.name;
							
							mnWebMain.syncSetLocalStorage(storageKey.SESSION_ID, data.sessionId);
							mnWebMain.syncSetLocalStorage(storageKey.LOGIN_TOKEN, data.token);
							mnWebMain.syncSetLocalStorage(storageKey.USER_DATA, JSON.stringify(userInfo));
							mnWebMain.syncSetLocalStorage(userKeys.START_PHONE_NUM, data.phoneAreaCode);
							mnWebMain.syncSetLocalStorage(userKeys.PHONE_NUM, data.userInfo.platformId);
							mnWebMain.syncSetLocalStorage(storageKey.IS_OPEN_GESTURE, data.userInfo.isOpenGestureCode)
							mnWebMain.syncSetLocalStorage(storageKey.GESTURE_COUNT, data.configData["1"]);
							
							var easeParams = 
							{
								account : data.userInfo.userId,
								password : "111111",
								userName : data.userInfo.baseInfo.name,
								userIcon : data.userInfo.icon
							}
							
							mnWebMain.showLoading();
							
							mnWebMain.easeChatLogin(easeParams, function (data)
							{
								mnWebMain.closeLoading();
								
								mnWebMain.openViewController(VCID_INDEX);
								
								var pageIds = [pageUrl.APP_GESTURE_SETTING_PAGE_URL, 
										pageUrl.APP_SET_PASSWORD_PAGE_URL,
										pageUrl.APP_CODES_PAGE_URL,
										pageUrl.APP_REGISTER_PAGE_URL,
										pageUrl.APP_LOGIN_PAGE_URL
								];
								mnWebMain.closeMoreViewController(pageIds);
								
								mnWebMain.closeSelfViewController(1);
							});
						
							
							
	//						var baseParam = {
	//							"url" : pageUrl.APP_INDEX_PAGE_URL,
	//							"isHideNavBar" : 1,
	//							"titleType" : 0,
	//						};
	//						var centerParam = [];
	//						var leftParam = [];
	//						var rightParam = [];
	//						mnWebMain.openWebViewController(baseParam, leftParam, centerParam, rightParam);
					
							
					
	//						if (isAndroid)
	//						{
								
	//						}
							
						})
					}
					
				}
				else
				{
					self.gestureSettingModel.gestureTip = "手势密码不正确，请重新绘制";
					self.gestureSettingModel.gestureClass = "no-active";
					
					self.scope.gestureTip = self.gestureSettingModel.gestureTip;
					self.scope.gestureClass = self.gestureSettingModel.gestureClass;
					self.scope.$apply();
				}
				
			}
		}
		
		
		
	},
	
	//所有angularjs点击事件
	ngClickFunction : function ()
	{
		var self = this;
		
		//返回
		self.scope.back = function ()
		{
			mnWebMain.closeSelfViewController(1);
		}
		
		//其他方式登录
		self.scope.onClickToIndex = function ()
		{
			if (self.gestureSettingModel.gestureStep == 1)
			{
				var skipType = mnWebMain.syncGetLocalStorage(storageKey.SKIP_TYPE);
					
				if (skipType == skipTypeKey.REGISTER_TYPE)
				{
					var phoneAreaCode = mnWebMain.syncGetLocalStorage(userKeys.START_PHONE_NUM);
					var platformId = mnWebMain.syncGetLocalStorage(userKeys.PHONE_NUM);
					var verifyCode = mnWebMain.syncGetLocalStorage(storageKey.INPUT_CODES);
					var password = mnWebMain.syncGetLocalStorage(userKeys.PASSWORD);
					
					var params = 
					{
						phoneAreaCode : phoneAreaCode,
						platformId : platformId,
						password : password,
						verifyCode : verifyCode,
						gestureCode : self.gestureSettingModel.gesturePwd,
					}
					
					jqHttpRequest.asyncHttpRequest(apiUrl.API_ACCOUNT_REGISTER, params, function (data)
					{
						mnWebMain.showProgressDialog("注册成功!");
						
						var userInfo = data.userInfo;
						userInfo.name = data.userInfo.baseInfo.name;
						
						mnWebMain.syncSetLocalStorage(storageKey.SESSION_ID, data.sessionId);
						mnWebMain.syncSetLocalStorage(storageKey.LOGIN_TOKEN, data.token);
						mnWebMain.syncSetLocalStorage(storageKey.USER_DATA, JSON.stringify(userInfo));
						mnWebMain.syncSetLocalStorage(userKeys.START_PHONE_NUM, data.phoneAreaCode);
						mnWebMain.syncSetLocalStorage(userKeys.PHONE_NUM, data.userInfo.platformId);
						mnWebMain.syncSetLocalStorage(storageKey.IS_OPEN_GESTURE, data.userInfo.isOpenGestureCode);
						mnWebMain.syncSetLocalStorage(storageKey.GESTURE_COUNT, data.configData["1"]);
						
						var easeParams = 
						{
							account : data.userInfo.userId,
							password : "111111",
							userName : data.userInfo.baseInfo.name,
							userIcon : data.userInfo.icon
						}
						
						mnWebMain.showLoading();
						
						mnWebMain.easeChatLogin(easeParams, function (data)
						{
							mnWebMain.closeLoading();
							
							mnWebMain.openViewController(VCID_INDEX);
							
							var pageIds = [pageUrl.APP_GESTURE_SETTING_PAGE_URL, 
									pageUrl.APP_SET_PASSWORD_PAGE_URL,
									pageUrl.APP_CODES_PAGE_URL,
									pageUrl.APP_REGISTER_PAGE_URL,
									pageUrl.APP_LOGIN_PAGE_URL
							];
					
							mnWebMain.closeMoreViewController(pageIds);
							
							mnWebMain.closeSelfViewController(1);
						});
					
						
						
//						var baseParam = {
//							"url" : pageUrl.APP_INDEX_PAGE_URL,
//							"isHideNavBar" : 1,
//							"titleType" : 0,
//						};
//						var centerParam = [];
//						var leftParam = [];
//						var rightParam = [];
//						mnWebMain.openWebViewController(baseParam, leftParam, centerParam, rightParam);
						
						
						
//						if (isAndroid)
//						{
							
//						}
					})
					
				}
				else if (skipType == skipTypeKey.MOD_PWD_TYPE)
				{
					mnWebMain.closeSelfViewController(1);
				}
			}
			else if (self.gestureSettingModel.gestureStep == 2)
			{
				self.gestureSettingModel.gestureStep = 1;
				
				self.gestureSettingModel.gesturePwd = "";
				self.gestureSettingModel.gestureSecondPwd = "";
				
				self.gestureSettingModel.gestureTitle = "设置手势密码";
				self.gestureSettingModel.gestureFooterName = "暂不设置";
				
				self.gestureSettingModel.gestureTip = "请输入手势密码";
				self.gestureSettingModel.gestureClass = "active";
				
				self.scope.gestureTitle = self.gestureSettingModel.gestureTitle;
				self.scope.gestureFooterName = self.gestureSettingModel.gestureFooterName;
				self.scope.gestureTip = self.gestureSettingModel.gestureTip;
				self.scope.gestureClass = self.gestureSettingModel.gestureClass;
				
				var baseParam = {
					"url" : pageUrl.APP_GESTURE_SETTING_PAGE_URL,
					"isHideNavBar" : 0,
					"titleType" : 0,
				};
				var centerParam = [{"type" : 0,"param" : "设置手势密码"}];
				var leftParam = [{"leftType":0, "type" : 1 ,"param" : "btn_back_nor"}];
				var rightParam = [];
				
				mnWebMain.updateDataModel(baseParam, leftParam, centerParam, rightParam);
			}
			
		}
		
		
		
		
	},
	
}
