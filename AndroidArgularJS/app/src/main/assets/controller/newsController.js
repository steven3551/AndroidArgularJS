/**
 * 初始化angularjs
 */
var newsApp = angular.module("newsApp", []).run(function()
{
	FastClick.attach(document.body);
});

/**
 * 初始化controller
 */
newsApp.controller("newsController", function($scope)
{
	initMN(function()
	{
		mnWebMain.disableDrag();
		headerController.init($scope, newsHeaderParams);
		newsController.init($scope);
	})
});

/**
 * 企业新闻
 */
var newsController = 
{
	//作用域
	scope : null,
	
	//静态基本数据模型
	staticBasicModel : 
	{
		"skipTitle" : null,
		"skipIcon" : null,
	},
	
	//登录数据模型
	newsModel : 
	{
		newsList : [],
	},
	
	//初始化
	init : function ($scope)
	{
		this.scope = $scope;
		
		mnWebMain.showLoading();
		
		this.setStaticBasicData();
		
		this.getNewsList();
		
		this.ngClickFunction();
	},
	
	//获取新闻列表
	getNewsList : function ()
	{
		var self = this;
		
		params = 
		{
			isSimple : "0",
			type : 1,
		}
		
		jqHttpRequest.asyncHttpRequest(apiUrl.API_GET_NOTICE_AND_NEWS, params, function (data)
		{
			self.newsModel.newsList = [];
			self.newsModel.newsList = data.newsAndNotify.news;
			
			for (var i = 0; i < self.newsModel.newsList.length; i ++)
			{
				self.newsModel.newsList[i].publicTime = getFormatedDate(self.newsModel.newsList[i].publicTime * 1000);
			}
			
			self.scope.newsList = self.newsModel.newsList;
			self.scope.$apply();
			
			mnWebMain.closeLoading();
			$(".news-body").show();
		})
	},
	
	//所有angularjs点击事件
	ngClickFunction : function ()
	{
		var self = this;
		
		//跳转到新闻详情页
		self.scope.onClickToNewsDetail = function (newsNotifyId)
		{
			var baseParam = {
				"url" : pageUrl.APP_NEWS_DETAIL_PAGE_URL + "?newsNotifyId=" + newsNotifyId,
				"isHideNavBar" : 0,
				"titleType" : 0,
			};
			var centerParam = [{"type" : 0,"param" : "新闻详情"}];
			var leftParam = [{"leftType":0, "type" : 1 ,"param" : "btn_back_nor"}];
			var rightParam = [];
			
			mnWebMain.openWebViewController(baseParam, leftParam, centerParam, rightParam);
		}
		
	},
	
	//初始化基本静态数据
	setStaticBasicData : function ()
	{
		var self = this;
		
		self.staticBasicModel.skipTitle = newsParams.SKIP_TITLE;
		self.staticBasicModel.skipIcon = newsParams.SKIP_ICON;
		
		self.scope.staticBasicModel = self.staticBasicModel;
		self.scope.$apply();
	},
	
}
