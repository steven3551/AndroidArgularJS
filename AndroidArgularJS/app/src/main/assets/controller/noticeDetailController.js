/**
 * 初始化angularjs
 */
var noticeDetailApp = angular.module("noticeDetailApp", []).run(function()
{
	FastClick.attach(document.body);
});

/**
 * 初始化controller
 */
noticeDetailApp.controller("noticeDetailController", function($scope)
{
	initMN(function()
	{
		mnWebMain.disableDrag();
		headerController.init($scope, noticeDetailHeaderParams);
		noticeDetailController.init($scope);
	})
});

/**
 * 企业通知详情
 */
var noticeDetailController = 
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
	noticeDetailModel : 
	{
		noticeDetail : {},
	},
	
	//初始化
	init : function ($scope)
	{
		this.scope = $scope;
		
		mnWebMain.showLoading();
		
		this.setStaticBasicData();
		
		this.getNoticeDetail();
		
		this.ngClickFunction();
	},
	
	//获取通知详情
	getNoticeDetail : function ()
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
			self.noticeDetailModel.noticeDetail = {};
			self.noticeDetailModel.noticeDetail = data.newsAndNotify.notify[0];
			
			$(".news-detail-container").append(self.noticeDetailModel.noticeDetail.content);
//			self.scope.noticeDetail = self.noticeDetailModel.noticeDetail;
//			self.scope.$apply();
			
			mnWebMain.closeLoading();
			$(".notice-detail-body").show();
			
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
		
//		self.staticBasicModel.skipTitle = noticeDetailParams.SKIP_TITLE;
//		self.staticBasicModel.skipIcon = noticeDetailParams.SKIP_ICON;
		
		self.scope.staticBasicModel = self.staticBasicModel;
		self.scope.$apply();
	},
	
}
