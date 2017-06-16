/**
 * 初始化angularjs
 */
var setPasswordApp = angular.module("setPasswordApp", []).run(function()
{
	FastClick.attach(document.body);
});

/**
 * 初始化controller
 */
setPasswordApp.controller("setPasswordController", function($scope)
{
	initMN(function()
	{
		mnWebMain.disableDrag();
		headerController.init($scope, setPasswordHeaderParams);
		setPasswordController.init($scope);
	})
});

/**
 * 填写验证码
 */
var setPasswordController = 
{
	//作用域
	scope : null,
	
	//静态基本数据模型
	staticBasicModel : 
	{
		"phoneTip" : null,
		"nextStep" : null,
		"titleTip" : null,
		"pwdTip" : null,
		"confirmPwdTip" : null,
		"pwdPlaceholderTip" : null,
		"confirmPwdPlaceholderTip" : null,
		"showPwdTip" : null,
		"hidePwdTip" : null,
		"showPwdIcon" : null,
		"hidePwdIcon" : null,
	},
	
	//登录数据模型
	setPasswordModel : 
	{
		"startPhoneNum" : null,
		"phoneNum" : null,
		"pwd" : null,
		"confirmPwd" : null,
		"showModel" : {},
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
		
		//转换显示与隐藏密码
		self.scope.switchShowPwd = function ()
		{
			self.setPasswordModel.showModel.showPwd = ! self.setPasswordModel.showModel.showPwd;
			self.scope.setPasswordModel = self.setPasswordModel;
		}

		//下一步
		self.scope.onClickNextStep = function ()
		{
			self.checkPwds();
			
			if (self.setPasswordModel.clickAble) 
			{
				if (self.setPasswordModel.pwd.length >= 6 && self.setPasswordModel.pwd.length <= 20)
				{
					if (self.setPasswordModel.pwd == self.setPasswordModel.confirmPwd) 
					{
						mnWebMain.syncSetLocalStorage(userKeys.PASSWORD, self.setPasswordModel.pwd);
						
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
					else
					{
						mnWebMain.showProgressDialog("两次密码不一致！");
					}
				}
				else
				{
					mnWebMain.showProgressDialog("密码长度为6-20位！");
				}
				
				
			}
			
		}
		
		//
		self.scope.checkPwd = function (pwd)
		{
			if (!isEmpty(pwd))
			{
				pwd = filterChinese(pwd);
				pwd = filterIllegalChar(pwd);
				self.setPasswordModel.pwd = pwd;
			}
			else
			{
				self.setPasswordModel.pwd = pwd;
			}
			
			self.checkPwds();
		}
		
		self.scope.checkConfirmPwd = function (confirmPwd)
		{
			if (!isEmpty(confirmPwd))
			{
				confirmPwd = filterChinese(confirmPwd);
				confirmPwd = filterIllegalChar(confirmPwd);
				self.setPasswordModel.confirmPwd = confirmPwd;
			}
			else
			{
				self.setPasswordModel.confirmPwd = confirmPwd;
			}
			
			self.checkPwds();
		}
		
	},
	
	//
	checkPwds : function ()
	{
		var self = this;
		
		if (!isEmpty(self.setPasswordModel.pwd) && !isEmpty(self.setPasswordModel.confirmPwd))
		{
			self.setPasswordModel.clickAble = true;
		}
		else
		{
			self.setPasswordModel.clickAble = false;
		}
		
		self.scope.clickAble = self.setPasswordModel.clickAble;
	},
	
	//初始化基本静态数据
	setStaticBasicData : function ()
	{
		var self = this;
		
		self.staticBasicModel.phoneTip = setPasswordParams.PHONE_TIP;
		
//		var skipType = mnWebMain.syncGetLocalStorage(storageKey.SKIP_TYPE);
		
//		if (skipType == skipTypeKey.REGISTER_TYPE)
//		{
			self.staticBasicModel.nextStep = setPasswordParams.NEXT_STEP;
//		}
//		else if (skipType == skipTypeKey.LOGIN_TYPE)
//		{
//			self.staticBasicModel.nextStep = "马上进入";
//		}
		
		self.staticBasicModel.pwdTip = setPasswordParams.PWD_TIP;
		self.staticBasicModel.confirmPwdTip = setPasswordParams.CONFIRM_PWD_TIP;
		self.staticBasicModel.pwdPlaceholderTip= setPasswordParams.PWD_PLACEHOLDER_TIP;
		self.staticBasicModel.confirmPwdPlaceholderTip = setPasswordParams.CONFIRM_PWD_PLACEHOLDER_TIP;
		self.staticBasicModel.titleTip = setPasswordParams.TITLE_TIP;
		self.staticBasicModel.showPwdTip = setPasswordParams.SHOW_PWD_TIP;
		self.staticBasicModel.hidePwdTip = setPasswordParams.HIDE_PWD_TIP;
		self.staticBasicModel.showPwdIcon = setPasswordParams.SHOW_PWD_ICON;
		self.staticBasicModel.hidePwdIcon = setPasswordParams.HIDE_PWD_ICON;
		
		self.scope.staticBasicModel = self.staticBasicModel;
		self.scope.$apply();
	},
	
	//重置数据
	resetData : function ()
	{
		var self = this;
		
		var startPhoneNum = mnWebMain.syncGetLocalStorage(userKeys.START_PHONE_NUM);
		
		if (!isEmpty(startPhoneNum)) 
		{
			self.setPasswordModel.startPhoneNum = startPhoneNum;
		}
		else
		{
			self.setPasswordModel.startPhoneNum = userParams.START_PHONE_NUM;
		}
		
		var phoneNum = mnWebMain.syncGetLocalStorage(userKeys.PHONE_NUM);
		
		if (!isEmpty(phoneNum)) 
		{
			self.setPasswordModel.phoneNum = phoneNum;
		}
		else
		{
			self.setPasswordModel.phoneNum = userParams.PHONE_NUM;
		}
		
		self.setPasswordModel.pwd = null;
		self.setPasswordModel.confirmPwd = null;
		self.setPasswordModel.showModel.showPwd = true;
		
		self.setPasswordModel.clickAble = false;
		self.scope.clickAble = self.setPasswordModel.clickAble;
		
		self.scope.setPasswordModel = self.setPasswordModel;
		self.scope.$apply();
		
		mnWebMain.closeLoading();
		$(".set-pwd-body").show();
	},
}
