/**
 * 初始化angularjs
 */
var chatRoomListApp = angular.module("chatRoomListApp", []).run(function()
{
	FastClick.attach(document.body);
});

/**
 * 初始化controller
 */
chatRoomListApp.controller("chatRoomListController", function($scope)
{
	initMN(function()
	{
		mnWebMain.disableDrag();
		headerController.init($scope, chatRoomListHeaderParams);
		chatRoomListController.init($scope);
	})
});

/**
 * 群聊列表
 */
var chatRoomListController = 
{
	//作用域
	scope : null,
	
	//静态基本数据模型
	staticBasicModel : 
	{
		"searchIcon" : null,
		"searchTip" : null,
	},
	
	//登录数据模型
	chatRoomListModel : 
	{
		chatRoomList : [],
		showModel : {},
		searchName : null,
		emptySearch : false,
	},
	
	//初始化
	init : function ($scope)
	{
		this.scope = $scope;
		
		mnWebMain.showLoading();
		
		this.setStaticBasicData();
		
		this.willAppearPage();
//		this.getChatRoomList();
		
		this.ngClickFunction();
	},
	
	willAppearPage : function ()
	{
		var self = this;
		
		mnWebMain.cbViewWillAppear = function ()
		{
//			self.getChatRoomList();
			self.searchFriends(self.chatRoomListModel.searchName);
		}
		
		//搜索的回调
		mnWebMain.cbSearchToUpdateH5Ui = function (data)
		{
			var searchContent = data.searchContent;
			
			self.chatRoomListModel.searchName = searchContent;
			
			self.searchFriends(searchContent);
		}
		
		//清空搜索内容
		mnWebMain.cbSearchClearToUpdateH5Ui = function ()
		{
			self.chatRoomListModel.searchName = null;
			
			self.emptySearchContent();
		}
	},
	
	//获取群聊列表
	getChatRoomList : function ()
	{
		var self = this;
		
		jqHttpRequest.asyncHttpRequest(apiUrl.API_GET_GROUPS_LIST, {}, function (data)
		{
			self.chatRoomListModel.emptySearch = false;
			self.scope.emptySearch = self.chatRoomListModel.emptySearch;
			
			self.chatRoomListModel.chatRoomList = [];
			self.chatRoomListModel.chatRoomList = data.groups;
			
			for (var i = 0; i < self.chatRoomListModel.chatRoomList.length; i ++)
			{
				self.chatRoomListModel.chatRoomList[i].icon = "img/ease_chat_room.png";
			}
			
			self.scope.chatRoomList = self.chatRoomListModel.chatRoomList;
			self.scope.$apply();
			
			mnWebMain.closeLoading();
			$(".chat-room-body").show();
			
//			self.resetPageHeight();
		})
	},
	
	//重新设置界面高度
	resetPageHeight : function ()
	{
		setTimeout(function()
		{
			var screenHeight = window.screen.availHeight;
			var containerHeight = $(".index-container").height();
			
			if (containerHeight < screenHeight - 40)
			{
//				$(".index-container").height(screenHeight - 66);
				$(".index-container").height(screenHeight - 40);
			}
		}, 10);
	},
	
	//所有angularjs点击事件
	ngClickFunction : function ()
	{
		var self = this;
		
		//进入群聊
		self.scope.chatRoomDetail = function(gropuId)
		{
			var chatType = 2;
			var userId = gropuId;
			mnWebMain.openViewController(VCID_SINGLE_CHAT, chatType, userId);//原生群聊
		}
		
		//搜索
		self.scope.onClickSearch = function()
		{
//			var baseParam = {
//				"url" : pageUrl.APP_SEARCH_FRIEND_PAGE_URL,
//				"isHideNavBar" : 1,
//				"titleType" : 0,
//			};
//			var centerParam = [];
//			var leftParam = [];
//			var rightParam = [];
//			
//			mnWebMain.openWebViewController(baseParam, leftParam, centerParam, rightParam);
			
			self.chatRoomListModel.showModel.showSearchInput = true;
			self.scope.showModel = self.chatRoomListModel.showModel;
			
			self.chatRoomListModel.searchName = null;
			self.scope.searchName = self.chatRoomListModel.searchName;
			
			setTimeout(function()
			{
				$("#chat-room-list").focus();
			}, 5);
		}
		
		//删除搜索内容
		self.scope.onClickDelete = function ()
		{
			
		}
		
		//搜索群聊
		self.scope.searchFriend = function (searchName)
		{
			
		}
	},
	
	//
	searchFriends : function (searchName)
	{
		var self = this;
		
		if (isEmpty(searchName))
		{
			self.chatRoomListModel.emptySearch = false;
			self.scope.emptySearch = self.chatRoomListModel.emptySearch;
					
			self.chatRoomListModel.showModel.showDeleteIcon = false;
			self.scope.showModel = self.chatRoomListModel.showModel;
			
			self.getChatRoomList();
		}
		else
		{
			self.chatRoomListModel.showModel.showDeleteIcon = true;
			self.scope.showModel = self.chatRoomListModel.showModel;
			
			//TODO
			var params = 
			{
				keyword : searchName
			}
			
			jqHttpRequest.asyncHttpRequest(apiUrl.API_GET_SEARCH_GROUPS, params, function (data)
			{
				self.chatRoomListModel.chatRoomList = [];
				self.chatRoomListModel.chatRoomList = data.resultGroups;
				
				for (var i = 0; i < self.chatRoomListModel.chatRoomList.length; i ++)
				{
					self.chatRoomListModel.chatRoomList[i].icon = "img/ease_chat_room.png";
				}
				
				if (self.chatRoomListModel.chatRoomList.length == 0)
				{
					self.chatRoomListModel.emptySearch = true;
					self.scope.emptySearch = self.chatRoomListModel.emptySearch;
				}
				
				self.scope.chatRoomList = self.chatRoomListModel.chatRoomList;
				self.scope.$apply();
				
				self.resetPageHeight();
			})
			
		}
	},
	
	//
	emptySearchContent : function ()
	{
		var self = this;
		
		self.chatRoomListModel.emptySearch = false;
		self.scope.emptySearch = self.chatRoomListModel.emptySearch;
		
		self.chatRoomListModel.showModel.showSearchInput = false;
		self.scope.showModel = self.chatRoomListModel.showModel;
		
		self.chatRoomListModel.searchName = null;
		self.scope.searchName = self.chatRoomListModel.searchName;
		
		self.getChatRoomList();
	},
	
	//初始化基本静态数据
	setStaticBasicData : function ()
	{
		var self = this;
		
		self.staticBasicModel.searchIcon = contactParams.SEARCH_ICON;
		self.staticBasicModel.searchTip = contactParams.SEARCH_TIP;
		
		self.scope.staticBasicModel = self.staticBasicModel;
		
		self.chatRoomListModel.showModel.showSearchInput = false;
		self.chatRoomListModel.showModel.showDeleteIcon = false;
		self.scope.showModel = self.chatRoomListModel.showModel;
		
		self.chatRoomListModel.searchName = null;
		self.scope.searchName = self.chatRoomListModel.searchName;
		
		self.chatRoomListModel.emptySearch = false;
		self.scope.emptySearch = self.chatRoomListModel.emptySearch;
		
		self.scope.$apply();
	},
	
	
}
