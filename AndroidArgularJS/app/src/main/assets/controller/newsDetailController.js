/**
 * 初始化angularjs
 */
var newsDetailApp = angular.module("newsDetailApp", []).run(function()
{
	FastClick.attach(document.body);
});

/**
 * 初始化controller
 */
newsDetailApp.controller("newsDetailController", function($scope)
{
	initMN(function()
	{
		mnWebMain.disableDrag();
		headerController.init($scope, newsDetailHeaderParams);
		newsDetailController.init($scope);
	})
});

/**
 * 企业新闻详情
 */
var newsDetailController = 
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
	newsDetailModel : 
	{
		newsDetail : {},
	},
	
	//初始化
	init : function ($scope)
	{
		this.scope = $scope;
		
		mnWebMain.showLoading();
		
		this.setStaticBasicData();
		
		this.getNewsDetail();
		
		this.ngClickFunction();
	},
	
	//获取新闻详情
	getNewsDetail : function ()
	{
		var self = this;
		
		var newsNotifysId = getQueryString("newsNotifyId");
		
		var params = 
		{
			isSimple : "0",
			newsNotifysId : newsNotifysId
		}
		
		jqHttpRequest.asyncHttpRequest(apiUrl.API_GET_NOTICE_AND_NEWS, params, function (data)
		{
			
			self.newsDetailModel.newsDetail = {};
			self.newsDetailModel.newsDetail = data.newsAndNotify.news[0];
			$(".news-detail-container").append(self.newsDetailModel.newsDetail.content)
//			self.scope.newsDetail = self.newsDetailModel.newsDetail;
//			self.scope.$apply();
			
			mnWebMain.closeLoading();
			$(".news-detail-body").show();
			
			setTimeout(function()
			{
				var screenHeight = window.screen.availHeight;
				var containerHeight = $(".news-detail-container").height();
				
				if (containerHeight < screenHeight - 40)
				{
//					$(".news-detail-container").height(screenHeight - 66);
					$(".news-detail-container").height(screenHeight - 40);
				}
			}, 10);
		})
	},
	
	//所有angularjs点击事件
	ngClickFunction : function ()
	{
		var self = this;
		
		
	},
	
	//初始化基本静态数据
	setStaticBasicData : function ()
	{
		var self = this;
		
//		self.staticBasicModel.skipTitle = newsDetailParams.SKIP_TITLE;
//		self.staticBasicModel.skipIcon = newsDetailParams.SKIP_ICON;
		
		self.scope.staticBasicModel = self.staticBasicModel;
		self.scope.$apply();
	},
	
}
