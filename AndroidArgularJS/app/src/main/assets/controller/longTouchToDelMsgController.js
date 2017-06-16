/**
 * 初始化angularjs
 */
var longTouchToDelMsgApp = angular.module("longTouchToDelMsgApp", []).run(function()
{
	FastClick.attach(document.body);
});


/**
 * 初始化controller
 */
longTouchToDelMsgApp.controller("longTouchToDelMsgController", function($scope)
{
	initMN(function()
	{
		mnWebMain.disableDrag();
		longTouchToDelMsgController.init($scope);
	})
});

/**
 * 长按删除
 */
var longTouchToDelMsgController = 
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
		self.scope.onClickHideDelMsg = function ()
		{
			mnWebMain.closeModal(0);
		}
		
		//
		self.scope.onClickDelMsg = function ()
		{
			mnWebMain.closeModal(1);
		}
		
	},
	
}
