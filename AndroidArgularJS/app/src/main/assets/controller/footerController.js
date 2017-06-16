/**
 * 顶部栏
 */
var footerController = 
{
	//作用域
	scope : null,
	
	//静态基本数据模型
	footerModel : 
	{
		footerMenuList : [],
		selectedType : null,
		showIndexContainer : true,
		showContactContainer : true,
		showMyCommonContainer : true,
		showSettingContainer : true,
		mySwiper : null,
	},
	
	//初始化
	init : function ($scope, type)
	{
		this.scope = $scope;
		
//		this.initSwiper();
		
		this.setFooterData(type);
		
		this.ngClickFunction();
	},
	
	//初始化swiper
//	initSwiper : function ()
//	{
//		var self = this;
//		
//		var swiper = new Swiper('.swiper-container', {
//	        spaceBetween: 0,
//	        resistanceRatio : 0,
//	        onSlideChangeEnd : function (swiper)
//	        {
//				
//	        }
//	    });
//		
//		self.footerModel.mySwiper = swiper;
//	},
	
	//所有angularjs点击事件
	ngClickFunction : function ()
	{
		var self = this;
		
		self.scope.onClickFooterMenu = function (type)
		{
			if (self.footerModel.selectedType != type)
			{
				self.footerModel.selectedType = type;
				
				for (var i = 0; i < self.footerModel.footerMenuList.length; i ++) 
				{
					self.footerModel.footerMenuList[i].selected = false;
					self.footerModel.footerMenuList[i].active =  footerMenuTypeAndStyle.NO_SELECTED_STYLE;
					
					if (self.footerModel.footerMenuList[i].type == type) 
					{
						allController.allModel.mySwiper.slideTo(type, 0, false);
						
						self.footerModel.footerMenuList[i].selected = true;
						self.footerModel.footerMenuList[i].active =  footerMenuTypeAndStyle.SELECTED_STYLE;
						
						self.scope.footerMenuList = self.footerModel.footerMenuList;
						
						self.dealShowContainer(type);
						
					}
				}
				
				setTimeout(function(){
//					self.scope.$apply();
//					allController.allModel.mySwiper.container[0].style.height=allController.allModel.mySwiper.slides[allController.allModel.mySwiper.activeIndex].offsetHeight+'px';
				}, 0);
				
				
			} 
		}
		
	},
	
	dealShowContainer : function (type)
	{
		var self = this;
		
		if (type == footerMenuTypeAndStyle.INDEX_TYPE) 
		{
//			self.footerModel.showIndexContainer = true;
//			self.scope.showIndexContainer = self.footerModel.showIndexContainer;
//			
//			self.footerModel.showContactContainer = false;
//			self.scope.showContactContainer = self.footerModel.showContactContainer;
//			
//			self.footerModel.showMyCommonContainer = false;
//			self.scope.showMyCommonContainer = self.footerModel.showMyCommonContainer;
//			
//			self.footerModel.showSettingContainer = false;
//			self.scope.showSettingContainer = self.footerModel.showSettingContainer;
			
//			self.footerModel.mySwiper.slideTo(type, 200, false);
			
//			setTimeout(function (){
				headerController.init(self.scope, indexHeaderParams);
				indexController.init(self.scope);
//				indexController.resetIndexHeight();
//				indexController.getNoticeAndNews();
//				indexController.getMessageList();
//				indexController.ngClickFunction();
//			}, 10);
//				setTimeout(function(){
//					allController.allModel.mySwiper.container[0].style.height=allController.allModel.mySwiper.slides[allController.allModel.mySwiper.activeIndex].offsetHeight+'px';
//				}, 10);
			
		}
		else if (type == footerMenuTypeAndStyle.CONTACT_TYPE)
		{
//			self.footerModel.showIndexContainer = false;
//			self.scope.showIndexContainer = self.footerModel.showIndexContainer;
//			
//			self.footerModel.showContactContainer = true;
//			self.scope.showContactContainer = self.footerModel.showContactContainer;
//			
//			self.footerModel.showMyCommonContainer = false;
//			self.scope.showMyCommonContainer = self.footerModel.showMyCommonContainer;
//			
//			self.footerModel.showSettingContainer = false;
//			self.scope.showSettingContainer = self.footerModel.showSettingContainer;
			
//			self.footerModel.mySwiper.slideTo(type, 200, false);
//			setTimeout(function (){
				headerController.init(self.scope, contactHeaderParams);
				contactController.init(self.scope);
//				contactController.resetTheHeight();
//				contactController.getAllContacts();
//				contactController.ngClickFunction();
//			}, 10);
		}
		else if (type == footerMenuTypeAndStyle.MY_TYPE)
		{
//			self.footerModel.showIndexContainer = false;
//			self.scope.showIndexContainer = self.footerModel.showIndexContainer;
//			
//			self.footerModel.showContactContainer = false;
//			self.scope.showContactContainer = self.footerModel.showContactContainer;
//			
//			self.footerModel.showMyCommonContainer = true;
//			self.scope.showMyCommonContainer = self.footerModel.showMyCommonContainer;
//			
//			self.footerModel.showSettingContainer = false;
//			self.scope.showSettingContainer = self.footerModel.showSettingContainer;
			
//			self.footerModel.mySwiper.slideTo(type, 200, false);
//			setTimeout(function (){
				headerController.init(self.scope, myCommonHeaderParams);
				myCommonController.init(self.scope);
//				myCommonController.resetPageHeight();
//			}, 10);
			
		}
		else if (type == footerMenuTypeAndStyle.SETTING_TYPE)
		{
//			self.footerModel.showIndexContainer = false;
//			self.scope.showIndexContainer = self.footerModel.showIndexContainer;
//			
//			self.footerModel.showContactContainer = false;
//			self.scope.showContactContainer = self.footerModel.showContactContainer;
//			
//			self.footerModel.showMyCommonContainer = false;
//			self.scope.showMyCommonContainer = self.footerModel.showMyCommonContainer;
//			
//			self.footerModel.showSettingContainer = true;
//			self.scope.showSettingContainer = self.footerModel.showSettingContainer;
			
//			self.footerModel.mySwiper.slideTo(type, 200, false);
//			setTimeout(function (){
				headerController.init(self.scope, settingHeaderParams);
				settingController.init(self.scope);
//				settingController.resetPageHeight();
//			}, 10);
			
		}
	},
	
	//初始化顶部栏数据
	setFooterData : function (type)
	{
		var self = this;
		
		self.footerModel.footerMenuList = footerParams.FOOTER_MENU_LIST;
//		indexController.init(self.scope);
		self.footerModel.selectedType = type;
		
		self.dealShowContainer(self.footerModel.selectedType);
		
//		for (var i = 0; i < self.footerModel.footerMenuList.length; i ++) 
//		{
//			self.footerModel.footerMenuList[i].selected = false;
//			self.footerModel.footerMenuList[i].active =  footerMenuTypeAndStyle.NO_SELECTED_STYLE;
//			
//			if (self.footerModel.footerMenuList[i].type == type) 
//			{
//				self.footerModel.footerMenuList[i].selected = true;
//				self.footerModel.footerMenuList[i].active =  footerMenuTypeAndStyle.SELECTED_STYLE;
//				
//				self.dealShowContainer(type);
//			}
//		}
		
		self.footerModel.showIndexContainer = true;
		self.scope.showIndexContainer = self.footerModel.showIndexContainer;
		
		self.footerModel.showContactContainer = true;
		self.scope.showContactContainer = self.footerModel.showContactContainer;
		
		self.footerModel.showMyCommonContainer = true;
		self.scope.showMyCommonContainer = self.footerModel.showMyCommonContainer;
		
		self.footerModel.showSettingContainer = true;
		self.scope.showSettingContainer = self.footerModel.showSettingContainer;
		
		self.scope.footerMenuList = self.footerModel.footerMenuList;
		self.scope.$apply();
	},
	
}
