/**
 * 初始化angularjs
 */
var noticeApp = angular.module("noticeApp", []).run(function()
{
	FastClick.attach(document.body);
});

/**
 * 初始化controller
 */
noticeApp.controller("noticeController", function($scope)
{
	initMN(function()
	{
		mnWebMain.disableDrag();
		headerController.init($scope, noticeHeaderParams);
		noticeController.init($scope);
	})
});

/**
 * 企业新闻
 */
var noticeController = 
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
	noticeModel : 
	{
		noticesList : [],
	},
	
	//初始化
	init : function ($scope)
	{
		this.scope = $scope;
		
		mnWebMain.showLoading();
		
		this.setStaticBasicData();
		
		this.getNoticeList();
		
		this.ngClickFunction();
	},
	
	//获取通知列表
	getNoticeList : function ()
	{
		var self = this;
		
		var params = 
		{
			isSimple : "0",
			type : 2,
		}
		
		jqHttpRequest.asyncHttpRequest(apiUrl.API_GET_NOTICE_AND_NEWS, params, function (data)
		{
			self.noticeModel.noticesList = [];
			self.noticeModel.noticesList = data.newsAndNotify.notify;
			
			for (var i = 0; i < self.noticeModel.noticesList.length; i ++)
			{
				self.noticeModel.noticesList[i].publicTime = getFormatedDate(self.noticeModel.noticesList[i].publicTime * 1000);
			}
			
			self.scope.noticesList = self.noticeModel.noticesList;
			self.scope.$apply();
			
			mnWebMain.closeLoading();
			$(".notice-body").show();
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
				"url" : pageUrl.APP_NOTICE_DETAIL_PAGE_URL + "?newsNotifyId=" + newsNotifyId,
				"isHideNavBar" : 0,
				"titleType" : 0,
			};
			var centerParam = [{"type" : 0,"param" : "通知详情"}];
			var leftParam = [{"leftType":0, "type" : 1 ,"param" : "btn_back_nor"}];
			var rightParam = [];
			
			mnWebMain.openWebViewController(baseParam, leftParam, centerParam, rightParam);
		}
		
	},
	
	//初始化基本静态数据
	setStaticBasicData : function ()
	{
		var self = this;
		
		self.staticBasicModel.skipTitle = noticeParams.SKIP_TITLE;
		self.staticBasicModel.skipIcon = noticeParams.SKIP_ICON;
		
		self.scope.staticBasicModel = self.staticBasicModel;
		self.scope.$apply();
	},
	
	//重置非静态数据
	resetData : function ()
	{
		var self = this;
		
//		self.noticeModel.noticesList = noticeParams.NEWS_LIST;
//		
//		self.scope.noticesList = self.noticeModel.noticesList;
//		self.scope.$apply();
		
		
	},
}
