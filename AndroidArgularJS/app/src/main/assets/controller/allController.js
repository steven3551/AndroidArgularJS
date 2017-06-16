/**
 * 初始化angularjs
 */
var allApp = angular.module("allApp", ["ngTouch"]).run(function()
{
	FastClick.attach(document.body);
});

/**
 * 初始化controller
 */
allApp.controller("allController", function($scope)
{
	initMN(function()
	{
		mnWebMain.disableDrag();
		headerController.init($scope, indexHeaderParams);
		allController.init($scope);
//		indexController.init($scope)
		footerController.init($scope, indexParams.SELECTED_FOOTER_MENU_TYPE);
//		contactController.init($scope);
		myCommonController.init($scope);
		settingController.init($scope);
		
//		setTimeout(function(){
//			indexController.init($scope)
//			indexController.setStaticBasicData();
//			indexController.resetData();
//			setTimeout(function(){
//				contactController.init($scope);
//				contactController.setStaticBasicData();
//			},10)
//			
//		},10);
		
		
//		setTimeout(function ()
//		{
//			
//			headerController.init(self.scope, indexHeaderParams);
//			indexController.init(self.scope);
//			contactController.init($scope);
//			myCommonController.init($scope);
//			settingController.init($scope);
//		}, 1000);
		
	})
});

/**
 * 首页
 */
var allController = 
{
	//作用域
	scope : null,
	
	//登录数据模型
	allModel : 
	{
		mySwiper : null,
	},
	
	//初始化
	init : function ($scope)
	{
		this.scope = $scope;
		
		this.reloadWillAppear();
		
		this.swiperInit();
		
		this.ngClickFunction();
		
		this.showIndexPage();
	},
	
	//显示首页
	showIndexPage : function ()
	{
		mnWebMain.syncSetLocalStorage(storageKey.GESTURE_ERROR_TIME, null);
		
		setTimeout(function(){
			$(".index-right-dialog-bg").show();
			$(".index-right-dialog").show();
			
			$(".all-container").show();
		},10);
		
	},
	
	//重写，界面每次显示时和收到会话时的触发事件
	reloadWillAppear : function ()
	{
		var self = this;
		
		//收到消息时的回调
		mnWebMain.cbToRefreshConversationUi = function ()
		{
			indexController.getMessageList();
		}
		
		//界面显示时的回调
		mnWebMain.cbViewWillAppear = function ()
		{
//			indexController.setStaticBasicData();
//			indexController.resetData();
			
			if (footerController.footerModel.selectedType == footerMenuTypeAndStyle.CONTACT_TYPE)
			{
				contactController.getAllContacts();
//				contactController.init(self.scope);
			}
			else if (footerController.footerModel.selectedType == footerMenuTypeAndStyle.INDEX_TYPE)
			{
				indexController.getNoticeAndNews();
				indexController.getMessageList();
//				indexController.init(self.scope);
			}
			else if (footerController.footerModel.selectedType == footerMenuTypeAndStyle.MY_TYPE)
			{
//				myCommonController.init();
			}
			else
			{
//				settingController.init();
			}
			
//			self.mySwiper.attachEvents();
			
			
			mnWebMain.setMessageListener(function (){
			
			});
		}
		
		mnWebMain.cbViewWillDisappear = function ()
		{
			mnWebMain.removeMessageListener(function (){
				
			});
		}
	},
	
	//所有angularjs点击事件
	ngClickFunction : function ()
	{
		var self = this;
		
		
	},
	
	
	
	swiperInit : function()
	{
		var self = this;
		
		var swiper = new Swiper('.index-swiper', {
	        spaceBetween: 0,
	        resistanceRatio : 0,
	        observer:true,
	        observeParents:true,
	        autoHeight : true,
	        onSlideChangeEnd : function (swiper)
	        {
	        	var type = swiper.activeIndex;
	        	
	        	footerController.footerModel.selectedType = type;
	        	
				for (var i = 0; i < footerController.footerModel.footerMenuList.length; i ++) 
				{
					footerController.footerModel.footerMenuList[i].selected = false;
					footerController.footerModel.footerMenuList[i].active =  footerMenuTypeAndStyle.NO_SELECTED_STYLE;
					
					if (footerController.footerModel.footerMenuList[i].type == type) 
					{
						footerController.footerModel.footerMenuList[i].selected = true;
						footerController.footerModel.footerMenuList[i].active =  footerMenuTypeAndStyle.SELECTED_STYLE;
						
						footerController.scope.footerMenuList = footerController.footerModel.footerMenuList;
						
						footerController.dealShowContainer(type);
						
					}
				}
				
				setTimeout(function (){
					footerController.scope.$apply();
					swiper.container[0].style.height=swiper.slides[swiper.activeIndex].offsetHeight+'px';
				}, 10);
				

//				var H = $(".swiper-container").eq(swiper.activeIndex).height();
//				$(".swiper-slide").css('height', H + 'px');
//				$(".swiper-wrapper").css('height', H + 'px');
				
//				var h = $(".swiper-slide-active").children().height() * $(".swiper-slide-active").children().length;
//				$(".swiper-wrapper").css("height",h);
	        }
	    });
	    
	    self.allModel.mySwiper = swiper;
	}
	
}
