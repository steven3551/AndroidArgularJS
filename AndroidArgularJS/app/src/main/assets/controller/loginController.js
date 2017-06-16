/**
 * 初始化angularjs
 */
var loginApp = angular.module("loginApp", []).run(function()
{
	FastClick.attach(document.body);
});


/**
 * 初始化controller
 */
loginApp.controller("loginController", function($scope)
{
	initMN(function()
	{
		mnWebMain.disableDrag();
		loginController.init($scope);
	})
});

/**
 * 登录
 */
var loginController = 
{
	//作用域
	scope : null,
	
	//静态基本数据模型
	staticBasicModel : 
	{
		"icon" : null,
		"downArrow" : null,
		"startPhoneNumArr" : [],
		"phoneTip" : null,
		"pwdStr" : null,
		"pwdTip" : null,
		"btnLoginStr" : null,
		"newUserRegister" : null,
		"useCodesLogin" : null,
	},
	
	//登录数据模型
	loginModel : 
	{
		"startPhoneNum" : null,
		"userName" : null,
		"password" : null,
		showStartPhoneNum : false,
		clickAble : false,
	},
	
	//初始化
	init : function ($scope)
	{
		this.scope = $scope;
		
		mnWebMain.showLoading();
		
		this.setStaticBasicData();
		
		this.resetData();
		
		this.ngClickFunction();
	},
	
	//所有angularjs点击事件
	ngClickFunction : function ()
	{
		var self = this;
		
		//显示电话号码弹框
		self.scope.showStartPhoneNum = function ()
		{
			self.loginModel.showStartPhoneNum = true;
			self.scope.loginModel = self.loginModel;
		}
		
		//隐藏电话号码弹框
		self.scope.hideStartPhoneNum = function ()
		{
			self.loginModel.showStartPhoneNum = false;
			self.scope.loginModel = self.loginModel;
		}
		
		//选中国际地区电话号码开头
		self.scope.selectedStartPhoneNum = function (index)
		{
			self.loginModel.startPhoneNum = loginBasicParams.START_PHONE_NUM[index];
			
			self.loginModel.showStartPhoneNum = false;
			
			self.scope.loginModel = self.loginModel;
		}
		
		//登录
		self.scope.onClickLogin = function ()
		{
			self.loginModel.clickAble = false;
			
			if (isEmpty(self.loginModel.userName))
			{
				mnWebMain.showProgressDialog("手机号不能为空！");
				return;
			}
			else if (isEmpty(self.loginModel.password))
			{
				mnWebMain.showProgressDialog("密码不能为空！");
				return;
			}
			else if (self.loginModel.userName.length != 11)
			{
				mnWebMain.showProgressDialog("请输入正确的手机号！");
				return;
			}
			else
			{
				if(validatePhoneNum(self.loginModel.userName))
				{
					self.loginModel.clickAble = true;
				}
				else
				{
					mnWebMain.showProgressDialog("请输入正确的手机号！");
					return;
				}
			}
			
			if (self.loginModel.clickAble)
			{
				
				mnWebMain.syncSetLocalStorage(userKeys.START_PHONE_NUM, self.loginModel.startPhoneNum);
				
				mnWebMain.syncSetLocalStorage(userKeys.PHONE_NUM, self.loginModel.userName);
				
				var phoneAreaCode = self.loginModel.startPhoneNum;
				var platformId = self.loginModel.userName;
				
				var params = 
				{
					phoneAreaCode : phoneAreaCode,
					userType : 1,
					platform : 1,
					platformId : platformId,
					password : self.loginModel.password,
				}
				
				jqHttpRequest.asyncHttpRequest(apiUrl.API_ACCOUNT_LOGIN, params, function (data)
				{
					var userInfo = data.userInfo;
					userInfo.name = data.userInfo.baseInfo.name;
					
					mnWebMain.syncSetLocalStorage(storageKey.SESSION_ID, data.sessionId);
					mnWebMain.syncSetLocalStorage(storageKey.LOGIN_TOKEN, data.token);
					mnWebMain.syncSetLocalStorage(storageKey.USER_DATA, JSON.stringify(userInfo));
					mnWebMain.syncSetLocalStorage(userKeys.START_PHONE_NUM, phoneAreaCode);
					mnWebMain.syncSetLocalStorage(userKeys.PHONE_NUM, platformId);
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
					
					mnWebMain.easeChatLogin(easeParams, function(dataObj)
					{
						mnWebMain.closeLoading();
						
						mnWebMain.openViewController(VCID_INDEX);
						
						mnWebMain.closeSelfViewController(1);
					});
					
					
					
//					var baseParam = {
//						"url" : pageUrl.APP_INDEX_PAGE_URL,
//						"isHideNavBar" : 1,
//						"titleType" : 0,
//					};
//					var centerParam = [];
//					var leftParam = [];
//					var rightParam = [];
//					
//					mnWebMain.openWebViewController(baseParam, leftParam, centerParam, rightParam);
					
					
					
//						if (isAndroid)
//						{
						
//						}
					
				},
				function (err)
				{
					if (err == errCode.PWD_ERROR)
					{
						$("#login-pwd").focus();
					}
				})
				
			}
			else
			{
				mnWebMain.showProgressDialog("请输入正确的手机号！");
			}
			
		}
		
		//新用户注册
		self.scope.onClickToRegister = function ()
		{
			
			mnWebMain.syncSetLocalStorage(storageKey.SKIP_TYPE, skipTypeKey.REGISTER_TYPE);
			
			var baseParam = {
				"url" : pageUrl.APP_REGISTER_PAGE_URL,
				"isHideNavBar" : 0,
				"titleType" : 0,
			};
			var centerParam = [{"type" : 0,"param" : "新用户注册"}];
			var leftParam = [{"leftType":0, "type" : 1 ,"param" : "btn_back_nor"}];
			var rightParam = [];
			
			mnWebMain.openWebViewController(baseParam, leftParam, centerParam, rightParam);
		}
		
		//验证码登录
		self.scope.onClickCodesLogin = function ()
		{
			
			mnWebMain.syncSetLocalStorage(storageKey.SKIP_TYPE, skipTypeKey.LOGIN_TYPE);
			
			var baseParam = {
				"url" : pageUrl.APP_INPUT_PHONE_PAGE_URL,
				"isHideNavBar" : 0,
				"titleType" : 0,
			};
			var centerParam = [{"type" : 0,"param" : "输入手机号"}];
			var leftParam = [{"leftType":0, "type" : 1 ,"param" : "btn_back_nor"}];
			var rightParam = [];
			
			mnWebMain.openWebViewController(baseParam, leftParam, centerParam, rightParam);
		}
		
		//用户输入用户名变化
		self.scope.checkUserNameChange = function (userName)
		{
			self.loginModel.userName = userName;
			self.scope.loginModel = self.loginModel;
			
			if (isEmpty(userName))
			{
				self.loginModel.clickAble = false;
			}
			
			if (!isEmpty(self.loginModel.userName) && !isEmpty(self.loginModel.password))
			{
				self.loginModel.clickAble = false;
				
				if (self.loginModel.userName.length == 11)
				{
					self.loginModel.clickAble = true;
				}
			}
			
			self.scope.clickAble = self.loginModel.clickAble;
		}
		
		//用户输入密码变化
		self.scope.checkPwdChange = function (pwd)
		{
			if (isEmpty(pwd))
			{
				self.loginModel.clickAble = false;
				self.loginModel.password = pwd;
				self.scope.loginModel = self.loginModel;
			}
			else
			{
				pwd = filterChinese(pwd);
				pwd = filterIllegalChar(pwd);
				self.loginModel.password = pwd;
				self.scope.loginModel = self.loginModel;
			}
			
			if (!isEmpty(self.loginModel.userName) && !isEmpty(self.loginModel.password))
			{
				self.loginModel.clickAble = false;
				
				if (self.loginModel.userName.length == 11)
				{
					self.loginModel.clickAble = true;
				}
			}
			
			self.scope.clickAble = self.loginModel.clickAble;
		}
	},
	
	//初始化基本静态数据
	setStaticBasicData : function ()
	{
		var self = this;
		
		self.staticBasicModel.downArrow = loginBasicParams.DOWN_ARROW;
		self.staticBasicModel.startPhoneNumArr = loginBasicParams.START_PHONE_NUM;
		self.staticBasicModel.pwdStr = loginBasicParams.PASSWORD;
		self.staticBasicModel.btnLoginStr = loginBasicParams.BTN_LOGIN;
		self.staticBasicModel.newUserRegister = loginBasicParams.NEW_USER_REGISTER;
		self.staticBasicModel.useCodesLogin = loginBasicParams.USE_CODES_LOGIN;
		self.staticBasicModel.phoneTip = loginBasicParams.PHONE_TIP;
		self.staticBasicModel.pwdTip = loginBasicParams.PWD_TIP;
		
		self.scope.staticBasicModel = self.staticBasicModel;
	},
	
	//重置非静态数据
	resetData : function ()
	{
		var self = this;
		
		var userInfo = mnWebMain.syncGetLocalStorage(storageKey.USER_DATA);
		
		if (isEmpty(userInfo))
		{
			self.loginModel.userName = null;
			self.staticBasicModel.icon = "img/ease_default_avatar.png";
		}
		else
		{
			userInfo = JSON.parse(userInfo);
			
			if (isEmpty(userInfo.icon))
			{
				self.staticBasicModel.icon = "img/ease_default_avatar.png";
			}
			else
			{
				self.staticBasicModel.icon = userInfo.icon;
			}
			
			self.loginModel.userName = userInfo.platformId;
		}
		
		var phoneAreaCode = mnWebMain.syncGetLocalStorage(userKeys.START_PHONE_NUM);
		
		if (isEmpty(phoneAreaCode))
		{
			self.loginModel.startPhoneNum = self.staticBasicModel.startPhoneNumArr[0];
		}
		else
		{
			self.loginModel.startPhoneNum = phoneAreaCode;
		}
		
		self.scope.staticBasicModel = self.staticBasicModel;
		
		
		self.loginModel.password = null;
		self.loginModel.showStartPhoneNum = false;
		
		self.loginModel.clickAble = false;
		
		self.scope.clickAble = self.loginModel.clickAble
		
		self.scope.loginModel = self.loginModel;
		self.scope.$apply();
		
		mnWebMain.closeLoading();
		$(".login-body").show();
	},
}
