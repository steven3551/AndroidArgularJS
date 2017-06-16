/**
 * 初始化angularjs
 */
var chatMsgApp = angular.module("chatMsgApp", ["ngTouch"]).run(function()
{
	FastClick.attach(document.body);
});

//自定义repeat完成事件
chatMsgApp.directive('onFinishRenderFilters', function ($timeout) {
    return {
        restrict: 'A',
        link: function(scope, element, attr) {
            if (scope.$last === true) {
                $timeout(function() {
                    scope.$emit('ngRepeatFinished');
                });
            }
        }
    };
});

/**
 * 初始化controller
 */
chatMsgApp.controller("chatMsgController", function($scope)
{
	initMN(function()
	{
		mnWebMain.disableDrag();
		headerController.init($scope, chatMsgHeaderParams);
		chatBottomInputController.init($scope);
		chatMsgController.init($scope);
	})
});

/**
 * 首页
 */
var chatMsgController = 
{
	//作用域
	scope : null,
	
	//静态基本数据模型
	staticBasicModel : 
	{
		
	},
	
	//登录数据模型
	chatMsgModel : 
	{
		chatMsgList : [],
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
		
		//跳转到个人详情
		self.scope.toPersonalDetail = function ()
		{
			var baseParam = {
				"url" : pageUrl.APP_PERSONAL_DETAIL_PAGE_URL,
				"isHideNavBar" : 1,
				"titleType" : 0,
			};
			var centerParam = [];
			var leftParam = [];
			var rightParam = [];
			
			mnWebMain.openWebViewController(baseParam, leftParam, centerParam, rightParam);
		}
		
	},
	
	//初始化基本静态数据
	setStaticBasicData : function ()
	{
		var self = this;
		
		
//		self.scope.staticBasicModel = self.staticBasicModel;
//		self.scope.$apply();
	},
	
	//重置非静态数据
	resetData : function ()
	{
		var self = this;
		
		self.chatMsgModel.chatMsgList = chatMsgParams.CHAT_MSG_LIST;
		
		for (var i = 0; i < self.chatMsgModel.chatMsgList.length; i ++)
		{
			if (self.chatMsgModel.chatMsgList[i].type == chatMsgType.OTHER_MSG)
			{
				self.chatMsgModel.chatMsgList[i].showMyMsg = false;
			}
			else if (self.chatMsgModel.chatMsgList[i].type == chatMsgType.MY_MSG)
			{
				self.chatMsgModel.chatMsgList[i].showMyMsg = true;
			}
		}
		
		self.scope.chatMsgList = self.chatMsgModel.chatMsgList
		self.scope.$apply();
		
		mnWebMain.closeLoading();
		$(".chat-msg-body").show();
	},
}
