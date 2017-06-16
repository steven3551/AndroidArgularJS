/**
 * 初始化angularjs
 */
var photoPickPopModalApp = angular.module("photoPickPopModalApp", []).run(function()
{
	FastClick.attach(document.body);
});


/**
 * 初始化controller
 */
photoPickPopModalApp.controller("photoPickPopModalController", function($scope)
{
	initMN(function()
	{
		mnWebMain.disableDrag();
		photoPickPopModalController.init($scope);
	})
});

/**
 * 长按删除
 */
var photoPickPopModalController = 
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
		
		//
		self.scope.onClickPhotoPick = function ()
		{
			mnWebMain.closeModal(1);
		}
		
		self.scope.onClickLocalAlbum = function ()
		{
			mnWebMain.closeModal(2);
		}
	},
	
}
