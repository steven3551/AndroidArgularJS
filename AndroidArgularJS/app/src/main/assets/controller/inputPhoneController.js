/**
 * 初始化angularjs
 */
var inputPhoneApp = angular.module("inputPhoneApp", []).run(function()
{
	FastClick.attach(document.body);
});

/**
 * 初始化controller
 */
inputPhoneApp.controller("inputPhoneController", function($scope)
{
	initMN(function()
	{
		mnWebMain.disableDrag();
		headerController.init($scope, inputPhoneHeaderParams);
		inputPhoneController.init($scope);
	})
});

/**
 * 输入手机号
 */
var inputPhoneController = 
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
	},
	
	//登录数据模型
	inputPhoneModel : 
	{
		"startPhoneNum" : null,
		"country" : null,
		"phoneNum" : null,
		showStartPhoneNumCountry : false,
		clickAble : false,
		showTip : false,
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
			self.inputPhoneModel.showStartPhoneNumCountry = true;
			self.scope.inputPhoneModel = self.inputPhoneModel;
		}
		
		//隐藏电话号码弹框
		self.scope.hideStartPhoneNum = function ()
		{
			self.inputPhoneModel.showStartPhoneNumCountry = false;
			self.scope.inputPhoneModel = self.inputPhoneModel;
		}
		
		//选中国际地区电话号码开头
		self.scope.selectedStartPhoneNum = function (index)
		{
			self.inputPhoneModel.startPhoneNum = inputPhoneParams.START_PHONE_NUM_COUNTRY[index].startPhoneNum;
			self.inputPhoneModel.country = inputPhoneParams.START_PHONE_NUM_COUNTRY[index].country;
			
			self.inputPhoneModel.showStartPhoneNumCountry = false;
			
			self.scope.inputPhoneModel = self.inputPhoneModel;
		}
		
		//下一步
		self.scope.onClickNextStep = function ()
		{
			self.checkPhoneNums();
			
			if (self.inputPhoneModel.clickAble)
			{
				var phoneAreaCode = self.inputPhoneModel.startPhoneNum;
				var platformId = self.inputPhoneModel.phoneNum;
				
				var toNext = false;
				
				var params = 
				{
					phoneAreaCode : phoneAreaCode,
					platformId : platformId,
				}
				
				jqHttpRequest.syncHttpRequest(apiUrl.API_ACCOUNT_INSIDE_MEMBER, params, function (data)
				{
					mnWebMain.syncSetLocalStorage(userKeys.START_PHONE_NUM, self.inputPhoneModel.startPhoneNum);
			
					self.inputPhoneModel.phoneNum = self.scope.inputPhoneModel.phoneNum;
					
					mnWebMain.syncSetLocalStorage(userKeys.PHONE_NUM, self.inputPhoneModel.phoneNum);
					
					toNext = true;
					
				}, 
				function ()
				{
					toNext = false;
					$(".register-tip-cover").show();
					$(".register-tip").show();
					self.inputPhoneModel.showTip = true;
					self.scope.showTip = self.inputPhoneModel.showTip;
					self.scope.$apply();
				})
				
				if (toNext)
				{
					jqHttpRequest.syncHttpRequest(apiUrl.API_ACCOUNT_CAN_REGISTER, params, function (data)
					{
						mnWebMain.showProgressDialog("请先注册！");
					}, 
					function ()
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
					})
				}
				
			}
			else
			{
				mnWebMain.showProgressDialog("请输入正确的手机号！");
			}
			
		}
		
		//
		self.scope.checkPhoneNum = function (phoneNum)
		{
			if (!isEmpty(phoneNum))
			{
				self.inputPhoneModel.phoneNum = phoneNum;
			}
			
			self.checkPhoneNums();
			
		}
		
		//隐藏弹框
		self.scope.onClickHide = function ()
		{
			self.inputPhoneModel.showTip = false;
			self.scope.showTip = self.inputPhoneModel.showTip;
		}
		
		//返回
		self.scope.onClickBack = function ()
		{
			self.inputPhoneModel.showTip = false;
			self.scope.showTip = self.inputPhoneModel.showTip;
		}
		
	},
	
	//
	checkPhoneNums : function ()
	{
		var self = this;
		
		if (!isEmpty(self.inputPhoneModel.phoneNum))
		{
			self.inputPhoneModel.clickAble = false;
			
			if (self.inputPhoneModel.phoneNum.length == 11)
			{
				if (validatePhoneNum(self.inputPhoneModel.phoneNum))
				{
					self.inputPhoneModel.clickAble = true;
				}
				else
				{
					mnWebMain.showProgressDialog("请输入正确的手机号！");
				}
			}
		}
		else
		{
			self.inputPhoneModel.clickAble = false;
		}
		
		self.scope.clickAble = self.inputPhoneModel.clickAble;
	},
	
	
	//初始化基本静态数据
	setStaticBasicData : function ()
	{
		var self = this;
		
		self.staticBasicModel.countryArea = inputPhoneParams.COUNTRY_AREA;
		self.staticBasicModel.startPhoneNumCountryArr = inputPhoneParams.START_PHONE_NUM_COUNTRY;
		self.staticBasicModel.rightArrow = inputPhoneParams.RIGHT_ARROW;
		self.staticBasicModel.phoneNum = inputPhoneParams.PHONE_NUM;
		self.staticBasicModel.phoneTip = inputPhoneParams.PHONE_TIP;
		self.staticBasicModel.nextStep = inputPhoneParams.NEXT_STEP;
		
		self.scope.staticBasicModel = self.staticBasicModel;
		self.scope.$apply();
	},
	
	//重置数据
	resetData : function ()
	{
		var self = this;
		
		self.inputPhoneModel.clickAble = false;
		
		var userInfo = mnWebMain.syncGetLocalStorage(storageKey.USER_DATA);
		
		if (!isEmpty(userInfo))
		{
			userInfo = JSON.parse(userInfo);
			
			self.inputPhoneModel.phoneNum = userInfo.platformId;
			self.inputPhoneModel.clickAble = true;
		}
		
		self.scope.clickAble = self.inputPhoneModel.clickAble;
		
		var phoneAreaCode = mnWebMain.syncGetLocalStorage(userKeys.START_PHONE_NUM);
		
		if (isEmpty(phoneAreaCode))
		{
			self.inputPhoneModel.startPhoneNum = self.staticBasicModel.startPhoneNumCountryArr[0].startPhoneNum;
			self.inputPhoneModel.country = self.staticBasicModel.startPhoneNumCountryArr[0].country;
		}
		else
		{
			for (var i = 0; i < self.staticBasicModel.startPhoneNumCountryArr.length; i ++)
			{
				if (self.staticBasicModel.startPhoneNumCountryArr[i].startPhoneNum == phoneAreaCode)
				{
					self.inputPhoneModel.country = self.staticBasicModel.startPhoneNumCountryArr[i].country;
					break;
				}
			}
			
			self.inputPhoneModel.startPhoneNum = phoneAreaCode;
		}
		
		self.scope.staticBasicModel = self.staticBasicModel;
		
		self.inputPhoneModel.showStartPhoneNumCountry = false;
		
		self.inputPhoneModel.showTip = false;
		self.scope.showTip = self.inputPhoneModel.showTip;
		
		self.scope.inputPhoneModel = self.inputPhoneModel;
		self.scope.$apply();
		
		mnWebMain.closeLoading();
		$(".input-phone-body").show();
	},
}
