/**
 * 初始化angularjs
 */
var myBasicInfoApp = angular.module("myBasicInfoApp", []).run(function()
{
	FastClick.attach(document.body);
});

/**
 * 初始化controller
 */
myBasicInfoApp.controller("myBasicInfoController", function($scope)
{
	initMN(function()
	{
		mnWebMain.disableDrag();
		headerController.init($scope, myBasicInfoHeaderParams);
		myBasicInfoController.init($scope);
	})
});

/**
 * 我的基本信息
 */
var myBasicInfoController = 
{
	//作用域
	scope : null,
	
	//我的基本数据模型
	myBasicInfoModel : 
	{
		userInfo : {},
		emptySearch : false,
	},
	
	//初始化
	init : function ($scope)
	{
		this.scope = $scope;
		
		mnWebMain.showLoading();
		
		this.getUserBasicInfo();
		
		this.ngClickFunction();
	},
	
	//获取用户的基本信息
	getUserBasicInfo : function ()
	{
		var self = this;
		
		jqHttpRequest.asyncHttpRequest(apiUrl.API_GET_USER_BASIC_INFO, {}, function (data)
		{
			self.myBasicInfoModel.emptySearch = false;
			self.myBasicInfoModel.userInfo = {};
			
			if (isEmpty(data.staffCode))
			{
				self.myBasicInfoModel.emptySearch = true;
			}
			else
			{
				self.myBasicInfoModel.userInfo = data;
				self.scope.userInfo = self.myBasicInfoModel.userInfo;
			}
			
			self.scope.emptySearch = self.myBasicInfoModel.emptySearch;
			self.scope.$apply();
			
			mnWebMain.closeLoading();
			$(".common-info-body").show();
		})
	},
	
	//所有angularjs点击事件
	ngClickFunction : function ()
	{
		var self = this;
		
		//打手机号
		self.scope.onClickCallMobilePhone = function ()
		{
			if (!isEmpty(self.myBasicInfoModel.userInfo.mobilePhone))
			{
				mnWebMain.popupModal(pageUrl.APP_CALL_PHONE_POP_MODAL, function (data) 
				{
					var type = JSON.parse(data).data.params;
					
					if (type == 1)
					{
						mnWebMain.callPhone(self.myBasicInfoModel.userInfo.mobilePhone);
					}
				});
			}
		}
		
		//打电话
		self.scope.onClickCallPhone = function ()
		{
			if (!isEmpty(self.myBasicInfoModel.userInfo.phone))
			{
				mnWebMain.popupModal(pageUrl.APP_CALL_PHONE_POP_MODAL, function (data) 
				{
					var type = JSON.parse(data).data.params;
					
					if (type == 1)
					{
						mnWebMain.callPhone(self.myBasicInfoModel.userInfo.phone);
					}
				});
			}
		}
	},
	
}
