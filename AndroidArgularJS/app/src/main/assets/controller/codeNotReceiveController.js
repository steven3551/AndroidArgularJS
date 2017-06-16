/**
 * 初始化angularjs
 */
var codeNotReceiveApp = angular.module("codeNotReceiveApp", []).run(function()
{
	FastClick.attach(document.body);
});

/**
 * 初始化controller
 */
codeNotReceiveApp.controller("codeNotReceiveController", function($scope)
{
	initMN(function()
	{
		mnWebMain.disableDrag();
		headerController.init($scope, codesNotReceiveHeaderParams);
		codeNotReceiveController.init($scope);
	})
});

/**
 * 收不到验证码
 */
var codeNotReceiveController = 
{
	//作用域
	scope : null,
	
	//静态基本数据模型
	staticBasicModel : 
	{
		
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
		
		
		//联系客服
		self.scope.onClickCallService = function ()
		{
			mnWebMain.popupModal(pageUrl.APP_CALL_SERVICE_POP_MODAL, function (data) 
			{
				var type = JSON.parse(data).data.params;
				
				if (type == 1)
				{
					mnWebMain.callPhone("13918879481");
				}
			});
//			$callServiceDialog.show(function(){
//				mnWebMain.callPhone("027-3594111");
//			})
		}
		
	},
	
	//初始化基本静态数据
	setStaticBasicData : function ()
	{
		var self = this;
		
		self.scope.staticBasicModel = self.staticBasicModel;
		self.scope.$apply();
	},
	
	//重置数据
	resetData : function ()
	{
		var self = this;
		
		
		self.scope.$apply();
		
		mnWebMain.closeLoading();
		$(".code-not-receive-body").show();
	},
}
