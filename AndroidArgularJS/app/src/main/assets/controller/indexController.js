/**
 * 初始化angularjs
 */
var indexApp = angular.module("indexApp", []).run(function()
{
	FastClick.attach(document.body);
});

//自定义repeat完成事件
indexApp.directive('onFinishRenderFilters', function ($timeout) {
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
indexApp.controller("indexController", function($scope)
{
	initMN(function()
	{
		mnWebMain.disableDrag();
		headerController.init($scope, indexHeaderParams);
		indexController.init($scope);
	})
});

/**
 * 首页
 */
var indexController = 
{
	//作用域
	scope : null,
	
	//静态基本数据模型
	staticBasicModel : 
	{
		"searchIndexIcon" : null,
		"searchIndexTip" : null,
	},
	
	//登录数据模型
	indexModel : 
	{
		msgId : null,
		originalMessageList : [],
		messageList : [],
		showModel : {},
		searchIndexName : null,
		touchStartTime : 0,
		delMsgUserId : null,
		touchStartPosition : {},
		notices : {},
		news : {},
		indexInner : null,
		scrollHeight : 0,
		containerHeight : 0,
		screenHeight : 0,
		skipAble : true,
		showIndexSearchBtn : null,
		showIndexSearchInput : null,
		totalMsgCount : 0,
		scrolled : false,
		emptySearch : false,
	},
	
	//初始化
	init : function ($scope)
	{
		this.scope = $scope;
		
		mnWebMain.showLoading();
		
		
		this.setStaticBasicData();
		
		this.resetData();
		
//		this.listenerScroll();
		
//		this.getNoticeAndNews();

//		this.getMessageList();
		
		this.reloadWillAppear();
		
		this.ngClickFunction();
		
		this.ngRepeatFinish();
	},
	
	//重写，界面每次显示时和收到会话时的触发事件
	reloadWillAppear : function ()
	{
		var self = this;
		
		//收到消息时的回调
		mnWebMain.cbToRefreshConversationUi = function ()
		{
			self.getMessageList();
		}
		
		//界面显示时的回调
		mnWebMain.cbViewWillAppear = function ()
		{
			self.getNoticeAndNews();
				
			mnWebMain.setMessageListener(function (){
			
			});
		}
		
		mnWebMain.cbViewWillDisappear = function ()
		{
			mnWebMain.removeMessageListener(function (){
				
			});
		}
		
		mnWebMain.cbNavRightClicked = function ()
		{
			mnWebMain.popupModal(pageUrl.APP_INDEX_RIGHT_POPMODAL, function (data) 
			{
				var type = JSON.parse(data).data.params;
				
				if (type == 1)
				{
					mnWebMain.syncSetLocalStorage(startChatRoomSkipTypeKey.SKIP_TO_START_CHAT_ROOM_TYPE, 1);
			
					mnWebMain.syncSetLocalStorage(chatRoomBackSkipType.BACK_SKIP_TYPE, 1);
					
					var baseParam = {
						"url" : pageUrl.APP_START_CHAT_ROOM_PAGE_URL,
						"isHideNavBar" : 0,
						"titleType" : 0,
					};
					var centerParam = [{"type" : 0,"param" : "选择联系人"}];
					var leftParam = [{"leftType":0, "type" : 0 ,"param" : "取消"}];
					var rightParam = [{"type":0,"param":"确定"}];
					var searchBarParam = {"title" : "搜索"}
					
					mnWebMain.openWebViewController(baseParam, leftParam, centerParam, rightParam, searchBarParam);
					
				}
				else if (type == 2)
				{
					var baseParam = {
						"url" : pageUrl.APP_ADD_FRIENDS_PAGE_URL,
						"isHideNavBar" : 0,
						"titleType" : 0,
					};
					var centerParam = [{"type" : 0,"param" : "添加朋友"}];
					var leftParam = [{"leftType":0, "type" : 1 ,"param" : "btn_back_nor"}];
					var rightParam = [];
					var searchBarParam = {"title" : "搜索"}
					
					mnWebMain.openWebViewController(baseParam, leftParam, centerParam, rightParam, searchBarParam);
					
//					mnWebMain.closeSelfViewController(1);
				}
			});
		}
		
		//搜索的回调
		mnWebMain.cbSearchToUpdateH5Ui = function (data)
		{
			var searchContent = data.searchContent;
			self.searchFriends(searchContent);
		}
		
		//清空搜索内容
		mnWebMain.cbSearchClearToUpdateH5Ui = function ()
		{
			self.emptySearchContent();
		}
	},
	
	//监听屏幕滚动
	listenerScroll : function ()
	{
		var self = this;
		
		$(window).scroll(function (event)
		{
			var scrollTime = new Date().getTime();
			
			var time = scrollTime - self.indexModel.touchStartTime;
			
			if (time > 100)
			{
				self.indexModel.scrolled = true;
				self.indexModel.touchStartTime = 0;
			}
		});
		
	},
	
	//获取企业通知和新闻
	getNoticeAndNews : function ()
	{
		var self = this;
		
		var params = 
		{
			isSimple : "1"
		}
		
		jqHttpRequest.asyncHttpRequest(apiUrl.API_GET_NOTICE_AND_NEWS, params, function (data)
		{
			self.indexModel.notices = {};
			self.indexModel.news = {};
			self.indexModel.showModel.showNotices = false;
			self.indexModel.showModel.showNews = false;
			if (data.newsAndNotify.notify.length > 0)
			{
				self.indexModel.showModel.showNotices = true;
				self.indexModel.notices = data.newsAndNotify.notify[0];
				self.indexModel.notices.icon = "img/notice.png";
				self.indexModel.notices.content = self.indexModel.notices.title;
				self.indexModel.notices.title = "企业通知";
				self.indexModel.notices.publicTime = getMsgFormatedDate(self.indexModel.notices.publicTime * 1000);
				
				self.indexModel.notices.unreadMsgCount = data.newsAndNotify.noReadNotifyCount;
				
				if (self.indexModel.notices.unreadMsgCount > 0)
				{
					self.indexModel.notices.showMsgCount = true;
				}
				else
				{
					self.indexModel.notices.showMsgCount = false;
				}
			}
			else
			{
				self.indexModel.showModel.showNotices = false;
			}
			
			if (data.newsAndNotify.news.length > 0)
			{
				self.indexModel.showModel.showNews = true;
				self.indexModel.news = data.newsAndNotify.news[0];
				self.indexModel.news.icon = "img/news.png";
				self.indexModel.news.content = self.indexModel.news.title;
				self.indexModel.news.title = "企业新闻";
				self.indexModel.news.publicTime = getMsgFormatedDate(self.indexModel.news.publicTime * 1000);
				
				self.indexModel.news.unreadMsgCount = data.newsAndNotify.noReadNewsCount;
				
				if (self.indexModel.news.unreadMsgCount > 0)
				{
					self.indexModel.news.showMsgCount = true;
				}
				else
				{
					self.indexModel.news.showMsgCount = false;
				}
			}
			else
			{
				self.indexModel.showModel.showNews = false;
			}
			
			$(".all-container").show();
			
			self.scope.showModel = self.indexModel.showModel;
			
			self.scope.notices = self.indexModel.notices;
			self.scope.news = self.indexModel.news;
			self.scope.$apply();
//			$(".index-right-dialog-bg").show();
//			$(".index-right-dialog").show();
			
			if (!self.indexModel.showModel.showNotices && !self.indexModel.showModel.showNews)
			{
				$(".index-container").css("margin-top", "0px");
				$("#index-notices").css("display", "none");
				$("#index-news").css("display", "none");
			}
			else if (!self.indexModel.showModel.showNotices && self.indexModel.showModel.showNews)
			{
				$(".index-container").css("margin-top", "60px");
				$("#index-notices").css("display", "none");
			}
			else if (self.indexModel.showModel.showNotices && !self.indexModel.showModel.showNews)
			{
				$(".index-container").css("margin-top", "60px");
				$("#index-news").css("display", "none");
			}
			else
			{
				$(".index-container").css("margin-top", "120px");
				$("#index-notices").css("display", "block");
				$("#index-news").css("display", "block");
			}
			
			self.getMessageList();
		})
		
	},
	
	//获取会话列表
	getMessageList : function ()
	{
		var self = this;
		
		mnWebMain.getConversationList(function (data)
		{
//			self.staticBasicModel.searchIndexIcon = indexParams.SEARCH_ICON;
//			self.staticBasicModel.searchIndexTip = indexParams.SEARCH_TIP;
//			
//			self.scope.staticBasicModel = self.staticBasicModel;
//			
//			self.indexModel.skipAble = true;
//			
//			self.indexModel.showModel.showIndexRightDialog = false;
//			self.indexModel.showModel.showIndexRightDialogBg = false;
//			
//			self.indexModel.showModel.showIndexSearchBtn = true;
//			self.indexModel.showModel.showIndexSearchInput = false;
//			
//			self.indexModel.showIndexSearchBtn = "ng-show";
//			self.indexModel.showIndexSearchInput = "ng-hide";
//			self.scope.showIndexSearchBtn = self.indexModel.showIndexSearchBtn;
//			self.scope.showIndexSearchInput = self.indexModel.showIndexSearchInput;
//			
//			self.indexModel.showModel.showIndexDeleteIcon = false;
//			
//			self.indexModel.showModel.showDelMsgContainer = false;
//			
//			self.indexModel.showModel.showScroll = false;
//			
//			self.scope.showModel = self.indexModel.showModel;
//
//			self.indexModel.searchIndexName = null;
//			self.scope.searchIndexName = self.indexModel.searchIndexName;
			
			self.indexModel.emptySearch = false;
			self.scope.emptySearch = self.indexModel.emptySearch;
			
			self.indexModel.originalMessageList = [];
			self.indexModel.messageList = [];
			
			self.indexModel.messageList = JSON.parse(data).data.data;
			
			var totalMsgCount = 0;
			
			for (var i = 0; i < self.indexModel.messageList.length; i ++)
			{
				self.indexModel.messageList[i].msgFrom = self.indexModel.messageList[i].userName;
				
//				if (isEmpty(self.indexModel.messageList[i].msgFrom) || isEmpty(self.indexModel.messageList[i].lastMessage))
//				{
//					continue;
//				}
				
				self.indexModel.messageList[i].time = getMsgFormatedDate(self.indexModel.messageList[i].time);
				
				if (self.indexModel.messageList[i].chatType == 1)
				{
					self.indexModel.messageList[i].type = msgType.SINGLE_CHAT;
					
					if (isEmpty(self.indexModel.messageList[i].userIcon))
					{
						self.indexModel.messageList[i].userIcon = "img/ease_default_avatar.png";
					}
				}
				else
				{
					self.indexModel.messageList[i].type = msgType.CHAT_ROOM;
//					if (isEmpty(self.indexModel.messageList[i].userIcon))
//					{
						self.indexModel.messageList[i].userIcon = "img/ease_chat_room.png";
//					}
				}
				
				if (self.indexModel.messageList[i].unreadMsgCount > 0)
				{
					self.indexModel.messageList[i].showMsgCount = true;
				}
				else
				{
					self.indexModel.messageList[i].showMsgCount = false;
				}
				
				totalMsgCount += self.indexModel.messageList[i].unreadMsgCount;
			}
			
			totalMsgCount += self.indexModel.news.unreadMsgCount;
			totalMsgCount += self.indexModel.notices.unreadMsgCount;
			self.indexModel.totalMsgCount = totalMsgCount;
			
			mnWebMain.refreshTabbarUnreadCount(self.indexModel.totalMsgCount, function ()
			{
				
			});
			
//			footerController.footerModel.footerMenuList[0].totalMsgCount = totalMsgCount;
			
//			if (footerController.footerModel.footerMenuList[0].totalMsgCount > 99)
//			{
//				footerController.footerModel.footerMenuList[0].totalMsgCount = "99+";
//				self.scope.msgCountStyle = "index-msg-count-99";
//			}
//			
//			if (totalMsgCount > 0)
//			{
//				footerController.footerModel.footerMenuList[0].msgCountShow = true;
//			}
//			else
//			{
//				footerController.footerModel.footerMenuList[0].msgCountShow = false;
//			}
			
			self.indexModel.originalMessageList = deepCopy(self.indexModel.messageList);
			self.scope.messageList = self.indexModel.messageList;
			self.scope.$apply();
			
//			$(".index-right-dialog-bg").show();
//			$(".index-right-dialog").show();
			mnWebMain.closeLoading();
			$(".all-container").show();
			
//			self.resetIndexHeight();
		});
	},
	
	//重新设置界面高度
	resetIndexHeight : function ()
	{
		var self = this;
		
		setTimeout(function()
		{
			var screenHeight = window.screen.availHeight;
			self.indexModel.screenHeight = screenHeight;
			var containerHeight = $(".index-container").height();
			if (containerHeight < screenHeight - 101)
			{
				$(".index-container").height(screenHeight - 101);
			}
			else
			{
				$(".index-container").css("height", "auto");
			}
			
			containerHeight = $(".index-container").height();
			
			if (containerHeight < screenHeight - 101)
			{
				$(".index-container").height(screenHeight - 101);
			}
			self.scope.$apply();
			setTimeout(function(){
//				self.scope.$apply();
//				allController.allModel.mySwiper.container[0].style.height=allController.allModel.mySwiper.slides[allController.allModel.mySwiper.activeIndex].offsetHeight+'px';
			}, 0);
		}, 10);
	},
	
	//所有angularjs点击事件
	ngClickFunction : function ()
	{
		var self = this;
		
		//
//		self.scope.back = function ()
//		{
//			mnWebMain.closeSelfViewController(1);
//		}
		
		//搜索朋友
		self.scope.onClickSearchFriend = function ()
		{
			self.indexModel.showModel.showIndexSearchBtn = false;
			self.indexModel.showModel.showIndexSearchInput = true;
			
			self.indexModel.showIndexSearchBtn = "ng-hide";
			self.indexModel.showIndexSearchInput = "ng-show";
			self.scope.showIndexSearchBtn = self.indexModel.showIndexSearchBtn;
			self.scope.showIndexSearchInput = self.indexModel.showIndexSearchInput;
			
			self.scope.showModel = self.indexModel.showModel;
			
			
			setTimeout(function()
			{
				$("#index-search-input").focus();
			}, 5);
		}
		
		//删除搜索文本
		self.scope.onClickIndexDelete = function ()
		{
			
		}
		
		//搜索
		self.scope.searchFriend = function (searchIndexName)
		{
			
			
		}
		
		//查看消息详情
		self.scope.onClickSeeMsgDetail = function (type, userId, userName, userIcon,$event)
		{
			$event.stopPropagation();
			
			for (var i = 0; i < self.indexModel.messageList.length; i ++)
			{
				if (self.indexModel.messageList[i].userId == userId)
				{
					self.indexModel.totalMsgCount -= self.indexModel.messageList[i].unreadMsgCount;
					self.indexModel.messageList[i].unreadMsgCount = 0;
					self.indexModel.messageList[i].showMsgCount = false;
					break;
				}
			}
			
			self.scope.messageList = self.indexModel.messageList;
			
			mnWebMain.refreshTabbarUnreadCount(self.indexModel.totalMsgCount, function ()
			{
				self.scope.$apply();
			});
			
			var params = 
			{
				type : "1"
			}
			
			jqHttpRequest.asyncHttpRequest(apiUrl.API_ADD_STATISTICS, params, function (data)
			{
				
			})
			
			var baseParam;
			var centerParam = [];
			var leftParam = [];
			var rightParam = [];
			
			switch (parseInt(type)){
				case msgType.NOTICE:
					baseParam = {
						"url" : pageUrl.APP_NOTICE_PAGE_URL,
						"isHideNavBar" : 1,
						"titleType" : 0,
					};
					mnWebMain.openWebViewController(baseParam, leftParam, centerParam, rightParam);
					break;
				case msgType.NEWS:
					baseParam = {
						"url" : pageUrl.APP_NEWS_PAGE_URL,
						"isHideNavBar" : 1,
						"titleType" : 0,
					};
					mnWebMain.openWebViewController(baseParam, leftParam, centerParam, rightParam);
					break;
				case msgType.CHAT_ROOM:

					var chatType = 2;
					var userId = userId;
					var userName = userName;
					var userIcon = userIcon;
					mnWebMain.openViewController(VCID_SINGLE_CHAT, chatType, userId, userName, userIcon);//原生群聊
					break;
				case msgType.SINGLE_CHAT:
					var chatType = 1;
					var userId = userId;
					var userName = userName;
					var userIcon = userIcon;
					mnWebMain.openViewController(VCID_SINGLE_CHAT, chatType, userId, userName, userIcon);//原生单聊
					break;
				default:
					break;
			}
		}
		
		//左滑删除
		self.scope.onClickDel = function(msgId, $event)
		{
			$event.stopPropagation();
			self.indexModel.msgId = msgId;
			$confirmDialog.show("确定要删除？",function(){
				
			});
		}
		
		//顶部右侧点击
		self.scope.rightPartClick = function ()
		{
			if (self.indexModel.showIndexRightDialog)
			{
				self.indexModel.showModel.showIndexRightDialog = false;
				self.indexModel.showModel.showIndexRightDialogBg = false;
			}
			else 
			{
				self.indexModel.showModel.showIndexRightDialog = true;
				self.indexModel.showModel.showIndexRightDialogBg = true;
			}
		
			self.scope.showModel = self.indexModel.showModel;
		}
		
		//长按开始 删除会话记录
		self.scope.onTouchStartToDelMsg = function (userId, e)
		{
			e.stopPropagation();
//			e.preventDefault();
			self.indexModel.touchStartPosition.x = event.changedTouches[0].clientX;
			self.indexModel.touchStartPosition.y = event.changedTouches[0].clientY;
			
			self.indexModel.delMsgUserId = userId;
			
			self.indexModel.touchStartTime = new Date().getTime();
			
			self.indexModel.scrolled = false;
//			setTimeout(function (){
//				
//				if (self.indexModel.touchStartTime > 0)
//				{
//					mnWebMain.popupModal(pageUrl.APP_LONG_TOUCH_DEL_MSG, function(dataObj)
//					{
//						var type = JSON.parse(dataObj).data.params;
//						
//						if (type == 1)
//						{
//							mnWebMain.delConversation(self.indexModel.delMsgUserId, function (data)
//							{
//								var isDel = JSON.parse(data).data.isDel;
//								
//								if (isDel)
//								{
//									self.getMessageList();
//								}
//								
//								self.indexModel.showModel.showDelMsgContainer = false;
//								self.scope.showModel = self.indexModel.showModel;
//								self.scope.$apply();
//							});
//						}
//					});
//				}
//				
//			}, 800);
		}
		
		//滑动取消长按删除
		self.scope.onTouchMoveToCancelDelMsg = function (e)
		{
			e.stopPropagation();
//			e.preventDefault();
			var x = event.changedTouches[0].clientX;
			var y = event.changedTouches[0].clientY;
			
			if (Math.abs(y - self.indexModel.touchStartPosition.y) > 10)
			{
				self.indexModel.showModel.showScroll = true;
				self.scope.showModel = self.indexModel.showModel;
			}
			
			//滑动的距离
			var distance = Math.sqrt(
				Math.pow((x - self.indexModel.touchStartPosition.x), 2) + 
				Math.pow((y - self.indexModel.touchStartPosition.y), 2)
				);
			
			if (distance > 10)
			{
				self.indexModel.touchStartTime = 0;
			}
		}
		
		//长按结束 删除会话记录
		self.scope.onTouchEndToDelMsg = function (type, userId, userName, userIcon, e)
		{
			e.stopPropagation();
//			e.preventDefault();
			self.indexModel.showModel.showScroll = false;
			self.scope.showModel = self.indexModel.showModel;
			var touchEndTime = new Date().getTime();
			
			var time = touchEndTime - self.indexModel.touchStartTime;
			
			if (time < 100)
			{
//				if (self.indexModel.skipAble)
//				{
//					self.indexModel.skipAble = false;
					for (var i = 0; i < self.indexModel.messageList.length; i ++)
					{
						if (self.indexModel.messageList[i].userId == userId)
						{
							self.indexModel.totalMsgCount -= self.indexModel.messageList[i].unreadMsgCount;
							self.indexModel.messageList[i].unreadMsgCount = 0;
							self.indexModel.messageList[i].showMsgCount = false;
							break;
						}
					}
					
					self.scope.messageList = self.indexModel.messageList;
					
					mnWebMain.refreshTabbarUnreadCount(self.indexModel.totalMsgCount, function ()
					{
						
					});
					
					var baseParam;
					var centerParam = [];
					var leftParam = [];
					var rightParam = [];
					
					switch (parseInt(type))
					{
						case msgType.NOTICE:
							baseParam = {
								"url" : pageUrl.APP_NOTICE_PAGE_URL,
								"isHideNavBar" : 1,
								"titleType" : 0,
							};
							mnWebMain.openWebViewController(baseParam, leftParam, centerParam, rightParam);
							break;
						case msgType.NEWS:
							baseParam = {
								"url" : pageUrl.APP_NEWS_PAGE_URL,
								"isHideNavBar" : 1,
								"titleType" : 0,
							};
							mnWebMain.openWebViewController(baseParam, leftParam, centerParam, rightParam);
							break;
						case msgType.CHAT_ROOM:
							//TODO
							var chatType = 2;
							var userId = userId;
							var userName = userName;
							var userIcon = userIcon;
							mnWebMain.openViewController(VCID_SINGLE_CHAT, chatType, userId, userName, userIcon);//原生群聊
							break;
						case msgType.SINGLE_CHAT:
							
							var chatType = 1;
							var userId = userId;
							var userName = userName;
							var userIcon = userIcon;
							mnWebMain.openViewController(VCID_SINGLE_CHAT, chatType, userId, userName, userIcon);//原生单聊
							break;
						default:
							break;
					}
//				}
			}
			
			if (self.indexModel.delMsgUserId != userId)
			{
				self.indexModel.touchStartTime = 0;
			}
			
			if (self.indexModel.scrolled)
			{
				self.indexModel.touchStartTime = 0;
			}
			
			var x = event.changedTouches[0].clientX;
			var y = event.changedTouches[0].clientY;
			
			if (Math.abs(y - self.indexModel.touchStartPosition.y) > 10)
			{
				self.indexModel.showModel.showScroll = true;
				self.scope.showModel = self.indexModel.showModel;
			}
			
			//滑动的距离
			var distance = Math.sqrt(
				Math.pow((x - self.indexModel.touchStartPosition.x), 2) + 
				Math.pow((y - self.indexModel.touchStartPosition.y), 2)
				);
			
			if (distance > 10)
			{
				self.indexModel.touchStartTime = 0;
			}
			
			if (time >= 800)
			{
				self.indexModel.touchStartTime = 0;
				mnWebMain.popupModal(pageUrl.APP_LONG_TOUCH_DEL_MSG, function(dataObj)
				{
					var type = JSON.parse(dataObj).data.params;
					
					if (type == 1)
					{
						mnWebMain.delConversation(self.indexModel.delMsgUserId, function (data)
						{
							var isDel = JSON.parse(data).data.isDel;
							
							if (isDel)
							{
								self.getMessageList();
							}
							
							self.indexModel.showModel.showDelMsgContainer = false;
							self.scope.showModel = self.indexModel.showModel;
							self.scope.$apply();
						});
					}
				});
			}
			
			
		}
		
		//隐藏删除会话聊天记录弹框
		self.scope.onClickHideDelMsg = function ()
		{
			self.indexModel.showModel.showDelMsgContainer = false;
			self.scope.showModel = self.indexModel.showModel;
		}
		
		//删除会话聊天记录
		self.scope.onClickDelMsg = function ()
		{
			
		}
		
		//跳转到通知列表页
		self.scope.onClickToNoticeList = function ()
		{
			var baseParam = {
				"url" : pageUrl.APP_NOTICE_PAGE_URL,
				"isHideNavBar" : 0,
				"titleType" : 0,
			};
			var centerParam = [{"type" : 0,"param" : "企业通知"}];
			var leftParam = [{"leftType":0, "type" : 1 ,"param" : "btn_back_nor"}];
			var rightParam = [];
			
			mnWebMain.openWebViewController(baseParam, leftParam, centerParam, rightParam);
		}
		
		//跳转到新闻列表页
		self.scope.onClickToNewsList = function ()
		{
			var baseParam = {
				"url" : pageUrl.APP_NEWS_PAGE_URL,
				"isHideNavBar" : 0,
				"titleType" : 0,
			};
			var centerParam = [{"type" : 0,"param" : "企业新闻"}];
			var leftParam = [{"leftType":0, "type" : 1 ,"param" : "btn_back_nor"}];
			var rightParam = [];
			
			mnWebMain.openWebViewController(baseParam, leftParam, centerParam, rightParam);
		}
	},
	
	//
	searchFriends : function (searchIndexName)
	{
		var self = this;
		
		self.indexModel.searchIndexName = searchIndexName;
		self.scope.searchIndexName = self.indexModel.searchIndexName;
		
		if (isEmpty(searchIndexName)) 
		{
//			self.indexModel.showModel.showIndexDeleteIcon = false;
//			self.scope.showModel = self.indexModel.showModel;
			
			self.indexModel.emptySearch = false;
			self.scope.emptySearch = self.indexModel.emptySearch;
			
			self.indexModel.messageList = [];
			self.indexModel.messageList = deepCopy(self.indexModel.originalMessageList);
			self.scope.messageList = self.indexModel.messageList;
			self.scope.$apply();
		}
		else
		{
//			self.indexModel.showModel.showIndexDeleteIcon = true;
//			self.scope.showModel = self.indexModel.showModel;
			var msgLists = deepCopy(self.indexModel.originalMessageList);
			
			self.indexModel.messageList = [];
			
			for (var i = 0; i < msgLists.length; i ++)
			{
				if (msgLists[i].msgFrom.indexOf(searchIndexName) > -1 || msgLists[i].lastMessage.indexOf(searchIndexName) > -1)
				{
					self.indexModel.messageList.push(msgLists[i]);
				}
			}
			
			if (self.indexModel.messageList.length == 0)
			{
				self.indexModel.emptySearch = true;
				self.scope.emptySearch = self.indexModel.emptySearch;
			}
			
			self.scope.messageList = self.indexModel.messageList;
			self.scope.$apply();
		}
	},
	
	//
	emptySearchContent : function ()
	{
		var self = this;
		
//		self.indexModel.showModel.showIndexDeleteIcon = false;
//		self.indexModel.showModel.showIndexSearchBtn = true;
//		self.indexModel.showModel.showIndexSearchInput = false;
//		
//		self.indexModel.showIndexSearchBtn = "ng-show";
//		self.indexModel.showIndexSearchInput = "ng-hide";
//		self.scope.showIndexSearchBtn = self.indexModel.showIndexSearchBtn;
//		self.scope.showIndexSearchInput = self.indexModel.showIndexSearchInput;
//		
//		self.scope.showModel = self.indexModel.showModel;
//		
//		self.indexModel.searchIndexName = null;
//		self.scope.searchIndexName = self.indexModel.searchIndexName;
		
		self.indexModel.emptySearch = false;
		self.scope.emptySearch = self.indexModel.emptySearch;
				
		self.indexModel.messageList = [];
		self.indexModel.messageList = deepCopy(self.indexModel.originalMessageList);
		self.scope.messageList = self.indexModel.messageList;
		self.scope.$apply();
	},
	
	//初始化基本静态数据
	setStaticBasicData : function ()
	{
		var self = this;
		
		self.staticBasicModel.searchIndexIcon = indexParams.SEARCH_ICON;
		self.staticBasicModel.searchIndexTip = indexParams.SEARCH_TIP;
		
		self.scope.staticBasicModel = self.staticBasicModel;
		
		self.indexModel.indexInner = document.getElementById("indexInner")
		self.indexModel.indexInner.style.top = "0px";
//		self.scope.$apply();
	},
	
	//重置非静态数据
	resetData : function ()
	{
		var self = this;

		self.indexModel.showModel.showIndexRightDialog = false;
		self.indexModel.showModel.showIndexRightDialogBg = false;
		
		self.indexModel.showModel.showIndexSearchBtn = true;
		self.indexModel.showModel.showIndexSearchInput = false;
		
		self.indexModel.showIndexSearchBtn = "ng-show";
		self.indexModel.showIndexSearchInput = "ng-hide";
		self.scope.showIndexSearchBtn = self.indexModel.showIndexSearchBtn;
		self.scope.showIndexSearchInput = self.indexModel.showIndexSearchInput;
		
		self.indexModel.showModel.showIndexDeleteIcon = false;
		
		self.indexModel.showModel.showDelMsgContainer = false;
		
		self.indexModel.showModel.showScroll = false;
		
		self.scope.showModel = self.indexModel.showModel;
		
		self.indexModel.searchIndexName = null;
		self.scope.searchIndexName = self.indexModel.searchIndexName;
		
		self.indexModel.emptySearch = false;
		self.scope.emptySearch = self.indexModel.emptySearch;
		
		self.indexModel.news.unreadMsgCount = 0;
		self.indexModel.notices.unreadMsgCount = 0;
		
		
//		self.scope.$apply();
		
//		$(".msg-list ul li").swipeLeft(function(e){
//			e.stopPropagation();
//			$(this).css("-webkit-transform","translateX(-70px)");
//		});
//		$(".msg-list ul li").swipeRight(function(e){
//			e.stopPropagation();
//			$(this).css("-webkit-transform","translateX(0)");
//		});
		
		
	},
	
	ngRepeatFinish : function(){
    	
    	var self = this;
    	
    	//ng-repeat完成后执行的操作
		this.scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent)
		{
			$(".index-msg-long-click").longTap(function()
			{
				var userId = $(this).attr("data-id");
				
				self.indexModel.delMsgUserId = userId;
				
				mnWebMain.popupModal(pageUrl.APP_LONG_TOUCH_DEL_MSG, function(dataObj)
				{
					var type = JSON.parse(dataObj).data.params;
					
					if (type == 1)
					{
						mnWebMain.delConversation(self.indexModel.delMsgUserId, function (data)
						{
							var isDel = JSON.parse(data).data.isDel;
							
							if (isDel)
							{
								self.getMessageList();
							}
							
							self.indexModel.showModel.showDelMsgContainer = false;
							self.scope.showModel = self.indexModel.showModel;
							self.scope.$apply();
						});
					}
				});
				
			});
		});
    	
    },
	
	
}
