/**
 * 初始化angularjs
 */
var exitLogoutPopModalApp = angular.module("exitLogoutPopModalApp", []).run(function()
{
	FastClick.attach(document.body);
});


/**
 * 初始化controller
 */
exitLogoutPopModalApp.controller("exitLogoutPopModalController", function($scope)
{
	initMN(function()
	{
		mnWebMain.disableDrag();
		exitLogoutPopModalController.init($scope);
	})
});

/**
 * 退出
 */
var exitLogoutPopModalController = 
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
		self.scope.onClickCancel = function ()
		{
			mnWebMain.closeModal(0);
		}
		
		//
		self.scope.onClickConfirm = function ()
		{
			mnWebMain.closeModal(1);
		}
		
	},
	
}
