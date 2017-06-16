/**
 * 初始化angularjs
 */
var callPhonePopModalApp = angular.module("callPhonePopModalApp", []).run(function()
{
	FastClick.attach(document.body);
});


/**
 * 初始化controller
 */
callPhonePopModalApp.controller("callPhonePopModalController", function($scope)
{
	initMN(function()
	{
		mnWebMain.disableDrag();
		callPhonePopModalController.init($scope);
	})
});

/**
 * 打电话
 */
var callPhonePopModalController = 
{
	//作用域
	scope : null,
	
	//初始化
	init : function ($scope)
	{
		this.scope = $scope;
		
		this.ngClickFunction();
	},
	
	//所有angularjs点击事件
	ngClickFunction : function ()
	{
		var self = this;
		
		//隐藏弹框
		self.scope.onClickHideDialog = function ()
		{
			mnWebMain.closeModal(0);
		}
		
		//打电话
		self.scope.onClickCallPhone = function ()
		{
			mnWebMain.closeModal(1);
		}
		
	},
	
}
