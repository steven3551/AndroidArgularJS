/**
 * 顶部栏
 */
var headerController = 
{
	//作用域
	scope : null,
	
	//静态基本数据模型
	headerModel : 
	{
		leftIcon : null,
		leftTitle : null,
		midIcon : null,
		midTitle : null,
		midSkipUrl : null,
		rightIcon : null,
		rightTitle : null,
		rightSkipUrl : null,
		showHeaderModel : {},
		headerStyle : null,
	},
	
	//初始化
	init : function ($scope, headerParams)
	{
		this.scope = $scope;
		
		this.setHeaderData(headerParams);
		
		this.ngClickFunction();
	},
	
	//所有angularjs点击事件
	ngClickFunction : function ()
	{
		var self = this;
		
		//顶部栏左侧返回
		self.scope.back = function ()
		{
			if (!isEmpty(self.headerModel.leftIcon) || !isEmpty(self.headerModel.leftTitle)) 
			{
				mnWebMain.closeSelfViewController(1);
			}
		}
		
		//顶部栏中间图片点击事件
		self.scope.midIconClick = function ()
		{
			
		}
		
		//顶部栏右侧点击事件
		self.scope.rightPartClick = function ()
		{
			if (!isEmpty(self.headerModel.rightSkipUrl))
			{
				var baseParam = {
					"url" : self.headerModel.rightSkipUrl,
					"isHideNavBar" : 1,
					"titleType" : 0,
				};
				var centerParam = [];
				var leftParam = [];
				var rightParam = [];
				
				mnWebMain.openWebViewController(baseParam, leftParam, centerParam, rightParam);
			}
		}
		
	},
	
	//初始化顶部栏数据
	setHeaderData : function (headerParams)
	{
		var self = this;
		
		//头部左侧图处理
		if(isEmpty(headerParams.LEFT_ICON))
		{
			self.headerModel.showHeaderModel.showLeftIcon = false;
		}
		else
		{
			self.headerModel.showHeaderModel.showLeftIcon = true;
			self.headerModel.leftIcon = headerParams.LEFT_ICON;
		}
		
		//头部左侧标题处理
		if(isEmpty(headerParams.LEFT_TITLE))
		{
			self.headerModel.showHeaderModel.showLeftTitle = false;
		}
		else
		{
			self.headerModel.showHeaderModel.showLeftTitle = true;
			self.headerModel.leftTitle = headerParams.LEFT_TITLE;
		}
		
		//头部中间图处理
		if(isEmpty(headerParams.MID_ICON))
		{
			self.headerModel.showHeaderModel.showMidIcon = false;
		}
		else
		{
			self.headerModel.showHeaderModel.showMidIcon = true;
			self.headerModel.midIcon = headerParams.MID_ICON;
			self.headerModel.midSkipUrl = headerParams.MID_SKIP_URL;
		}
		
		//头部中间标题处理
		if(isEmpty(headerParams.MID_TITLE))
		{
			self.headerModel.showHeaderModel.showMidTitle = false;
		}
		else
		{
			self.headerModel.showHeaderModel.showMidTitle = true;
			self.headerModel.midTitle = headerParams.MID_TITLE;
		}
		
		//头部右侧图处理
		if(isEmpty(headerParams.RIGHT_ICON))
		{
			self.headerModel.showHeaderModel.showRightIcon = false;
		}
		else
		{
			self.headerModel.showHeaderModel.showRightIcon = true;
			self.headerModel.rightIcon = headerParams.RIGHT_ICON;
			self.headerModel.rightSkipUrl = headerParams.RIGHT_SKIP_URL;
		}
		
		//头部右侧标题处理
		if(isEmpty(headerParams.RIGHT_TITLE))
		{
			self.headerModel.showHeaderModel.showRightTitle = false;
		}
		else
		{
			self.headerModel.showHeaderModel.showRightTitle = true;
			self.headerModel.rightTitle = headerParams.RIGHT_TITLE;
			self.headerModel.rightSkipUrl = headerParams.RIGHT_SKIP_URL;
		}
		
		if (!isEmpty(headerParams.HEADER_STYLE))
		{
			self.headerModel.headerStyle = headerParams.HEADER_STYLE;
		}
		
		self.scope.headerModel = self.headerModel;
//		self.scope.$apply();
	},
	
}
