/**
 * 初始化angularjs
 */
var chatRoomMsgApp = angular.module("chatRoomMsgApp", ["ngTouch"]).run(function()
{
	FastClick.attach(document.body);
});

/**
 * 初始化controller
 */
chatRoomMsgApp.controller("chatRoomMsgController", function($scope)
{
	initMN(function()
	{
		mnWebMain.disableDrag();
		headerController.init($scope, chatRoomMsgHeaderParams);
		chatBottomInputController.init($scope);
		chatRoomMsgController.init($scope);
	})
});

/**
 * 群聊
 */
var chatRoomMsgController = 
{
	//作用域
	scope : null,
	
	//静态基本数据模型
	staticBasicModel : 
	{
		"audioIcon" : null,
		"emoIcon" : null,
		"moreIcon" : null,
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
		
		//返回
		self.scope.back = function ()
		{
//			mnWebMain.closeSelfViewController(1);
			
//			var skipType = localStorage.getItem(chatRoomBackSkipType.BACK_SKIP_TYPE);
			var skipType = mnWebMain.syncGetLocalStorage(chatRoomBackSkipType.BACK_SKIP_TYPE);
			
			if (isEmpty(skipType))
			{
				mnWebMain.closeSelfViewController(1);
			}
			else if (skipType == 1)
			{
				var pageIds = [pageUrl.APP_CHATROOM_MSG_URL, pageUrl.APP_START_CHAT_ROOM_PAGE_URL, pageUrl.APP_INDEX_PAGE_URL];
				mnWebMain.closeMoreViewController(pageIds);
			}
			else if (skipType == 2)
			{
				var pageIds = [pageUrl.APP_CHATROOM_MSG_URL, pageUrl.APP_START_CHAT_ROOM_PAGE_URL, pageUrl.APP_INDEX_PAGE_URL];
				mnWebMain.closeMoreViewController(pageIds);
			}
			
		}
		
		//查看群聊人数
		self.scope.rightPartClick = function()
		{
			var baseParam = {
				"url" : pageUrl.APP_CHATROOM_PEOPLE_URL,
				"isHideNavBar" : 1,
				"titleType" : 0,
			};
			var centerParam = [];
			var leftParam = [];
			var rightParam = [];
			
			mnWebMain.openWebViewController(baseParam, leftParam, centerParam, rightParam);
		}
		
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
		
		self.staticBasicModel.audioIcon = chatRoomMsgParams.AUDIO_ICON;
		self.staticBasicModel.emoIcon = chatRoomMsgParams.EMO_ICON;
		self.staticBasicModel.moreIcon = chatRoomMsgParams.MORE_ICON;
		
		self.scope.staticBasicModel = self.staticBasicModel;
		self.scope.$apply();
	},
	
	//重置非静态数据
	resetData : function ()
	{
		var self = this;
		
		self.chatMsgModel.chatMsgList = chatRoomMsgParams.CHAT_MSG_LIST;
		
		for (var i = 0; i < self.chatMsgModel.chatMsgList.length; i ++)
		{
			if (self.chatMsgModel.chatMsgList[i].type == chatRoomMsgType.OTHER_MSG)
			{
				self.chatMsgModel.chatMsgList[i].showMyMsg = false;
			}
			else if (self.chatMsgModel.chatMsgList[i].type == chatRoomMsgType.MY_MSG)
			{
				self.chatMsgModel.chatMsgList[i].showMyMsg = true;
			}
		}
		
		self.scope.chatMsgList = self.chatMsgModel.chatMsgList
		self.scope.$apply();
		
		mnWebMain.closeLoading();
		$(".chat-room-msg-body").show();
	},
}
