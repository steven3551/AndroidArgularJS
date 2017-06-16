/**
 * 初始化angularjs
 */
var indexAndContactRightPopModalApp = angular.module("indexAndContactRightPopModalApp", []).run(function()
{
	FastClick.attach(document.body);
});


/**
 * 初始化controller
 */
indexAndContactRightPopModalApp.controller("indexAndContactRightPopModalController", function($scope)
{
	initMN(function()
	{
		mnWebMain.disableDrag();
		indexAndContactRightPopModalController.init($scope);
	})
});

/**
 * 登录
 */
var indexAndContactRightPopModalController = 
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
		self.scope.onClickIndexHideDialog = function ()
		{
			mnWebMain.closeModal(0);
		}
		
		//跳到群聊界面
		self.scope.onClickIndexToStartChatRoom = function ()
		{
			mnWebMain.closeModal(1);
		}
		
		//跳到添加朋友界面
		self.scope.onClickIndexToAddFriend = function ()
		{
			mnWebMain.closeModal(2);
		}
	},
	
}
