/**
 * 初始化angularjs
 */
var callServicePopModalApp = angular.module("callServicePopModalApp", []).run(function()
{
	FastClick.attach(document.body);
});


/**
 * 初始化controller
 */
callServicePopModalApp.controller("callServicePopModalController", function($scope)
{
	initMN(function()
	{
		mnWebMain.disableDrag();
		callServicePopModalController.init($scope);
	})
});

/**
 * 
 */
var callServicePopModalController = 
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
		self.scope.onClickCallService = function ()
		{
			mnWebMain.closeModal(1);
		}
		
	},
	
}
