/**
 * 初始化angularjs
 */
var registerApp = angular.module("registerApp", []).run(function()
{
	FastClick.attach(document.body);
});

/**
 * 初始化controller
 */
registerApp.controller("registerController", function($scope)
{
	initMN(function()
	{
		mnWebMain.disableDrag();
		headerController.init($scope, registerHeaderParams);
		registerController.init($scope);
	})
});

/**
 * 新用户注册
 */
var registerController = 
{
	//作用域
	scope : null,
	
	//静态基本数据模型
	staticBasicModel : 
	{
		"countryArea" : null,
		"startPhoneNumCountryArr" : [],
		"rightArrow" : null,
		"phoneNum" : null,
		"phoneTip" : null,
		"nextStep" : null,
		"serviceProtocol" : null,
		"privacyPolicy" : null,
	},
	
	//登录数据模型
	registerModel : 
	{
		"startPhoneNum" : null,
		"country" : null,
		"phoneNum" : null,
		showStartPhoneNumCountry : false,
		clickAble : false,
		showTip : null,
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
		self.scope.showStartPhoneNumCountry = function ()
		{
			self.registerModel.showStartPhoneNumCountry = true;
			self.scope.registerModel = self.registerModel;
		}
		
		//隐藏电话号码弹框
		self.scope.hideStartPhoneNum = function ()
		{
			self.registerModel.showStartPhoneNumCountry = false;
			self.scope.registerModel = self.registerModel;
		}
		
		//选中国际地区电话号码开头
		self.scope.selectedStartPhoneNum = function (index)
		{
			self.registerModel.startPhoneNum = registerParams.START_PHONE_NUM_COUNTRY[index].startPhoneNum;
			self.registerModel.country = registerParams.START_PHONE_NUM_COUNTRY[index].country;
			
			self.registerModel.showStartPhoneNumCountry = false;
			
			self.scope.registerModel = self.registerModel;
		}
		
		//下一步
		self.scope.onClickNextStep = function ()
		{
			if (self.registerModel.clickAble)
			{
				var phoneAreaCode = self.registerModel.startPhoneNum;
				var platformId = self.registerModel.phoneNum;
				
				var toNext = false;
				
				var params = 
				{
					phoneAreaCode : phoneAreaCode,
					platformId : platformId,
				}
				
				jqHttpRequest.syncHttpRequest(apiUrl.API_ACCOUNT_INSIDE_MEMBER, params, function (data)
				{
					mnWebMain.syncSetLocalStorage(userKeys.START_PHONE_NUM, self.registerModel.startPhoneNum);
					mnWebMain.syncSetLocalStorage(userKeys.PHONE_NUM, self.registerModel.phoneNum);
					
					toNext = true;
					
				}, 
				function ()
				{
					toNext = false;
					$(".register-tip-cover").show();
					$(".register-tip").show();
					self.registerModel.showTip = true;
					self.scope.showTip = self.registerModel.showTip;
					self.scope.$apply();
				})
				
				if (toNext)
				{
					jqHttpRequest.syncHttpRequest(apiUrl.API_ACCOUNT_CAN_REGISTER, params, function (data)
					{
						mnWebMain.syncSetLocalStorage(userKeys.START_PHONE_NUM, self.registerModel.startPhoneNum);
						mnWebMain.syncSetLocalStorage(userKeys.PHONE_NUM, self.registerModel.phoneNum);
						
						toNext = true;
					}, 
					function ()
					{
						toNext = false;
					})
					
					if (toNext)
					{
						var baseParam = {
							"url" : pageUrl.APP_CODES_PAGE_URL,
							"isHideNavBar" : 1,
							"titleType" : 0,
						};
						var centerParam = [];
						var leftParam = [];
						var rightParam = [];
						
						mnWebMain.openWebViewController(baseParam, leftParam, centerParam, rightParam);
					}
					else
					{
						mnWebMain.showProgressDialog("手机号已注册，请直接登录！");
					}
				}
			}
			else
			{
				mnWebMain.showProgressDialog("请输入正确的手机号！");
			}
		}
		
		//隐藏弹框
		self.scope.onClickHide = function ()
		{
			self.registerModel.showTip = false;
			self.scope.showTip = self.registerModel.showTip;
		}
		
		//返回
		self.scope.onClickBack = function ()
		{
			self.registerModel.showTip = false;
			self.scope.showTip = self.registerModel.showTip;
		}
		
		//
		self.scope.checkPhoneNum = function (phoneNum)
		{
			self.registerModel.phoneNum = phoneNum;
			self.scope.registerModel = self.registerModel;
			
			if (isEmpty(phoneNum))
			{
				self.registerModel.clickAble = false;
			}
			else
			{
				self.registerModel.clickAble = false;
				
				if (self.registerModel.phoneNum.length == 11)
				{
					if(validatePhoneNum(self.registerModel.phoneNum))
					{
						self.registerModel.clickAble = true;
					}
					else
					{
						mnWebMain.showProgressDialog("请输入正确的手机号！");
					}
				}
			}
			
			self.scope.clickAble = self.registerModel.clickAble;
		}
		
		//查看服务协议
		self.scope.onClickServiceProtocol = function ()
		{
			var baseParam = {
				"url" : pageUrl.APP_SHOW_SERVICEPRO_PAGE_URL,
				"isHideNavBar" : 0,
				"titleType" : 0,
			};
			var centerParam = [{"type" : 0,"param" : "服务协议"}];
			var leftParam = [{"leftType":0, "type" : 1 ,"param" : "btn_back_nor"}];
			var rightParam = [];
			
			mnWebMain.openWebViewController(baseParam, leftParam, centerParam, rightParam);
		}
		
		//查看隐私政策
		self.scope.onClickPrivacyPolicy = function ()
		{
			var baseParam = {
				"url" : pageUrl.APP_SHOW_PRIVACYPOL_PAGE_URL,
				"isHideNavBar" : 0,
				"titleType" : 0,
			};
			var centerParam = [{"type" : 0,"param" : "隐私政策"}];
			var leftParam = [{"leftType":0, "type" : 1 ,"param" : "btn_back_nor"}];
			var rightParam = [];
			
			mnWebMain.openWebViewController(baseParam, leftParam, centerParam, rightParam);
		}
	},
	
	//初始化基本静态数据
	setStaticBasicData : function ()
	{
		var self = this;
		
		self.staticBasicModel.countryArea = registerParams.COUNTRY_AREA;
		self.staticBasicModel.startPhoneNumCountryArr = registerParams.START_PHONE_NUM_COUNTRY;
		self.staticBasicModel.rightArrow = registerParams.RIGHT_ARROW;
		self.staticBasicModel.phoneNum = registerParams.PHONE_NUM;
		self.staticBasicModel.phoneTip = registerParams.PHONE_TIP;
		self.staticBasicModel.nextStep = registerParams.NEXT_STEP;
		self.staticBasicModel.serviceProtocol = registerParams.SERVICE_PROTOCOL;
		self.staticBasicModel.privacyPolicy = registerParams.PRIVACY_POLICY;
		
		self.registerModel.clickAble = false;
		self.scope.clickAble = self.registerModel.clickAble;
		
		self.scope.staticBasicModel = self.staticBasicModel;
		self.scope.$apply();
	},
	
	//重置数据
	resetData : function ()
	{
		var self = this;
		
		self.registerModel.startPhoneNum = self.staticBasicModel.startPhoneNumCountryArr[0].startPhoneNum;
		self.registerModel.country = self.staticBasicModel.startPhoneNumCountryArr[0].country;
		self.registerModel.phoneNum = null;
		self.registerModel.showStartPhoneNumCountry = false;
		
		self.scope.registerModel = self.registerModel;
		
		self.registerModel.showTip = false;
		self.scope.showTip = self.registerModel.showTip;
		self.scope.$apply();
		
		mnWebMain.closeLoading();
		$(".register-body").show();
	},
}
