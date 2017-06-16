/**
 * 初始化angularjs
 */
var myFamilyInfoApp = angular.module("myFamilyInfoApp", []).run(function()
{
	FastClick.attach(document.body);
});

/**
 * 初始化controller
 */
myFamilyInfoApp.controller("myFamilyInfoController", function($scope)
{
	initMN(function()
	{
		mnWebMain.disableDrag();
		headerController.init($scope, myFamilyInfoHeaderParams);
		myFamilyInfoController.init($scope);
	})
});

/**
 * 我的家庭信息
 */
var myFamilyInfoController = 
{
	//作用域
	scope : null,
	
	//静态基本数据模型
	staticBasicModel : 
	{
		
	},
	
	//我的家庭数据模型
	myFamilyInfoModel : 
	{
		familyInfos : [],
		emptySearch : false,
	},
	
	//初始化
	init : function ($scope)
	{
		this.scope = $scope;
		
		mnWebMain.showLoading();
		
		this.getFamilyInfo();
		
		this.ngClickFunction();
	},
	
	//获取所有的家庭信息
	getFamilyInfo : function ()
	{
		var self = this;
		
		jqHttpRequest.asyncHttpRequest(apiUrl.API_GET_USER_FAMILY_INFO, {}, function (data)
		{
			self.myFamilyInfoModel.emptySearch = false;
			self.myFamilyInfoModel.familyInfos = [];
			
			if (data.list.length == 0 || isEmpty(data.list[0].men_relation))
			{
				self.myFamilyInfoModel.emptySearch = true;
			}
			else
			{
				self.myFamilyInfoModel.familyInfos = data.list;
				self.scope.familyInfos = self.myFamilyInfoModel.familyInfos;
			}
			
			self.scope.emptySearch = self.myFamilyInfoModel.emptySearch;
			self.scope.$apply();
			
			mnWebMain.closeLoading();
			$(".family-info-body").show();
		})
	},
	
	//所有angularjs点击事件
	ngClickFunction : function ()
	{
		var self = this;
		
		self.scope.back = function ()
		{
			mnWebMain.closeSelfViewController(1);
		}
		
		//打电话
		self.scope.onClickCallMobilePhone = function (phoneNum)
		{
			if (!isEmpty(phoneNum))
			{
				mnWebMain.popupModal(pageUrl.APP_CALL_PHONE_POP_MODAL, function (data) 
				{
					var type = JSON.parse(data).data.params;
					
					if (type == 1)
					{
						mnWebMain.callPhone(phoneNum);
					}
				});
			}
		}
		
	},
	
}
