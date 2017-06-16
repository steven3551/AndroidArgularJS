/**
 * 初始化angularjs
 */
var searchFriendApp = angular.module("searchFriendApp", []).run(function()
{
	FastClick.attach(document.body);
});

/**
 * 初始化controller
 */
searchFriendApp.controller("searchFriendController", function($scope)
{
	initMN(function()
	{
		mnWebMain.disableDrag();
		headerController.init($scope, searchFriendHeaderParams);
		searchFriendController.init($scope);
	})
});

/**
 * 搜索联系人
 */
var searchFriendController = 
{
	//作用域
	scope : null,
	
	//静态基本数据模型
	staticBasicModel : 
	{
		"deleteIcon" : null,
	},
	
	//搜素数据模型
	searchFriendModel : 
	{
		searchName : null,
		searchFriendList : [],
		showDeleteIcon : false,
		emptySearch : true,
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
		
		//是否关注
		self.scope.onClickFollow = function (headerLetter, index)
		{
			for (var i = 0; i < self.searchFriendModel.searchFriendList.length; i ++) 
			{
				if (self.searchFriendModel.searchFriendList[i].headLetter == headerLetter)
				{
					if (self.searchFriendModel.searchFriendList[i].friendList2[index].isFollowed) 
					{
//						$confirmTip.show("已经取消关注，在通讯录中查看");
						mnWebMain.showProgressDialog("已经取消关注，在通讯录中查看");
					}
					else 
					{
//						$confirmTip.show("关注成功，在通讯录中查看");
						mnWebMain.showProgressDialog("关注成功，在通讯录中查看");
					}
					
					self.searchFriendModel.searchFriendList[i].friendList2[index].isFollowed = !self.searchFriendModel.searchFriendList[i].friendList2[index].isFollowed;
					break;
				}
			}
			
			self.scope.searchFriendList = self.searchFriendModel.searchFriendList;
		}
		
		//跳转到人物详情
		self.scope.onClickPeopleDetail = function ()
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
		
		//搜索
		self.scope.searchFriend = function (searchName)
		{
			self.getFriendList(searchName);
		}
		
		//清空
		self.scope.onClickDelete = function ()
		{
			self.scope.searchName = null;
			self.searchFriendModel.searchFriendList = [];
			self.scope.searchFriendList = self.searchFriendModel.searchFriendList;
			
			self.searchFriendModel.showDeleteIcon = false;
			self.scope.showDeleteIcon = self.searchFriendModel.showDeleteIcon;
			
			self.searchFriendModel.emptySearch = true;
			self.scope.emptySearch = self.searchFriendModel.emptySearch;
		}
	},
	
	getFriendList : function (searchName)
	{
		var self = this;
		
		if (isEmpty(searchName))
		{
			self.searchFriendModel.searchName = null;
			self.scope.searchName = self.searchFriendModel.searchName;
			
			self.searchFriendModel.showDeleteIcon = false;
			self.scope.showDeleteIcon = self.searchFriendModel.showDeleteIcon;
			
			self.searchFriendModel.emptySearch = true;
			self.scope.emptySearch = self.searchFriendModel.emptySearch
		}
		else
		{
			self.searchFriendModel.searchName = searchName;
			self.scope.searchName = self.searchFriendModel.searchName;
			
			self.searchFriendModel.showDeleteIcon = true;
			self.scope.showDeleteIcon = self.searchFriendModel.showDeleteIcon;
			
			self.searchFriendModel.emptySearch = true;
			self.scope.emptySearch = self.searchFriendModel.emptySearch
		}
		
		if (isEmpty(self.searchFriendModel.searchName))
		{
			return ;
		}
		
		self.searchFriendModel.searchFriendList = [];
		
		var searchFriendLists = [];
		
		searchFriendLists = searchFriendParams.SEARCH_FRIEND_LIST;
		
		var searchResult = false;
		
		for (var i = 0; i < searchFriendLists.length; i ++) 
		{
			
			
			var friends = searchFriendLists[i];
			friends.friendList2 = [];
//			var headLetter = self.searchFriendModel.searchName.substr(0, 1);
			
//			if (headLetter.toUpperCase() == friends.headLetter || pinyin.getCamelChars(headLetter) == friends.headLetter)
//			{
				for (var j = 0; j < friends.friendList.length; j ++)
				{
					if (friends.friendList[j].name.indexOf(self.searchFriendModel.searchName) > -1)
					{
						for (var k = 0; k < followType.length; k ++)
						{
							if(followType[k].isFollowed)
							{
								friends.friendList[j].text = followType[k].text;
								friends.friendList[j].active = followType[k].active;
							}
							else 
							{
								friends.friendList[j].notext = followType[k].text;
								friends.friendList[j].noactive = followType[k].active;
							}
						}
						friends.friendList2.push(friends.friendList[j]);
						searchResult = true;
					}
				}
				
//				friends.friendList = friends.friendList2;
				
				self.searchFriendModel.searchFriendList.push(friends);
				
//			}
			
		}
		
		if (searchResult)
		{
			self.searchFriendModel.emptySearch = false;
			self.scope.emptySearch = self.searchFriendModel.emptySearch
			
			self.scope.searchFriendList = self.searchFriendModel.searchFriendList;
		}
		else
		{
			self.searchFriendModel.emptySearch = true;
			self.scope.emptySearch = self.searchFriendModel.emptySearch
		}
		
//		self.scope.showDeleteIcon = self.searchFriendModel.showDeleteIcon;
		
		
//		self.scope.searchName = self.searchFriendModel.searchName;
	},
	
	//初始化基本静态数据
	setStaticBasicData : function ()
	{
		var self = this;
		
		self.staticBasicModel.deleteIcon = searchFriendParams.DELETE_ICON;
		
		
		self.scope.staticBasicModel = self.staticBasicModel;
		self.scope.$apply();
	},
	
	//重置非静态数据
	resetData : function ()
	{
		var self = this;
		
		self.searchFriendModel.searchName = searchFriendParams.SEARCH_NAME;
		
		self.searchFriendModel.searchFriendList = [];
		
		self.searchFriendModel.emptySearch = true;
		self.scope.emptySearch = self.searchFriendModel.emptySearch
		
		self.scope.searchName = self.searchFriendModel.searchName;
		self.scope.searchFriendList = self.searchFriendModel.searchFriendList;
		self.scope.$apply();
		
		mnWebMain.closeLoading();
		$(".search-friend-body").show();
		
//		if (isEmpty(self.searchFriendModel.searchName))
//		{
//			self.searchFriendModel.emptySearch = true;
//			self.scope.emptySearch = self.searchFriendModel.emptySearch
//			
//			self.searchFriendModel.showDeleteIcon = false;
//			self.scope.showDeleteIcon = self.searchFriendModel.showDeleteIcon;
//		}
//		else
//		{
//			self.searchFriendModel.emptySearch = false;
//			self.scope.emptySearch = self.searchFriendModel.emptySearch
//			
//			self.searchFriendModel.showDeleteIcon = true;
//			self.scope.showDeleteIcon = self.searchFriendModel.showDeleteIcon;
//		}
//		
//		var searchFriendLists = [];
//		
//		searchFriendLists = searchFriendParams.SEARCH_FRIEND_LIST;
//		
//		for (var i = 0; i < searchFriendLists.length; i ++) 
//		{
//			if (isEmpty(self.searchFriendModel.searchName))
//			{
//				break;
//			}
//			
//			var friends = searchFriendLists[i];
//			
//			var headLetter = self.searchFriendModel.searchName.substr(0, 1);
//			
//			if (headLetter.toUpperCase() == friends.headLetter || pinyin.getCamelChars(headLetter) == friends.headLetter)
//			{
//				for (var j = 0; j < friends.friendList.length; j ++)
//				{
//					for (var k = 0; k < followType.length; k ++)
//					{
//						if(followType[k].isFollowed)
//						{
//							friends.friendList[j].text = followType[k].text;
//							friends.friendList[j].active = followType[k].active;
//						}
//						else 
//						{
//							friends.friendList[j].notext = followType[k].text;
//							friends.friendList[j].noactive = followType[k].active;
//						}
//					}
//				}
//				
//				self.searchFriendModel.searchFriendList.push(friends);
//				
//			}
//			
//		}
//		
//		self.scope.searchFriendList = self.searchFriendModel.searchFriendList;
//		self.scope.searchName = self.searchFriendModel.searchName;
//		self.scope.$apply();
	},
}
