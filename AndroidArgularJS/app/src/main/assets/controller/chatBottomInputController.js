/**
 * 聊天底部输入框
 */
var chatBottomInputController = 
{
	//作用域
	scope : null,
	
	//静态基本数据模型
	chatBottomInputModel : 
	{
		audioStatus : 1,//1语音图标2键盘图标
		"audioIcon" : null,
		"emojiIcon" : null,
		"moreIcon" : null,
		showModel : {},
		showRecordingModel : [],//是否显示录音小图标
		recordingTimer : null,//录音定时器
		recordingIndex : 0,//录音右侧小图标下标
		recordingDirection : 1,//录音右侧小图标1向上2向下
		swiperEmojiList1 : [],
		swiperEmojiList2 : [],
		inputMsg : null,
	},
	
	//初始化
	init : function ($scope)
	{
		this.scope = $scope;
		
		this.setChatBottomInputData();
		
		this.angularjsFunction();
		
		this.ngRepeatFinish();
	},
	
	//所有angularjs事件
	angularjsFunction : function ()
	{
		var self = this;
		
		//输入框改变
		self.scope.inputChange = function (inputMsg)
		{
			if (isEmpty(inputMsg))
			{
				self.chatBottomInputModel.showModel.showMoreIcon = true;
				self.chatBottomInputModel.showModel.showSendMsgBtn = false;
			}
			else 
			{
				self.chatBottomInputModel.showModel.showMoreIcon = false;
				self.chatBottomInputModel.showModel.showSendMsgBtn = true;
			}
			
			self.scope.showModel = self.chatBottomInputModel.showModel;
		}
		
		//点击输入框
		self.scope.onClickInputText = function ()
		{
			self.hideEmojiOrMoreContainer();
		}
		
		//点击语音图标
		self.scope.onClickAudio = function ()
		{
			self.hideEmojiOrMoreContainer();
			
			if (self.chatBottomInputModel.audioStatus == 1)
			{
				self.chatBottomInputModel.audioIcon = "img/jianpan.png";
				self.scope.audioIcon = self.chatBottomInputModel.audioIcon;
				
				self.chatBottomInputModel.showModel.showClickToSpeakBtn = true;
				self.chatBottomInputModel.showModel.showInput = false;
				self.chatBottomInputModel.showModel.showEmojiIcon = true;
				
				self.scope.showModel = self.chatBottomInputModel.showModel;
				
				self.chatBottomInputModel.audioStatus = 2;
			}
			else if (self.chatBottomInputModel.audioStatus == 2)
			{
				self.chatBottomInputModel.audioIcon = "img/yuyin.png";
				self.scope.audioIcon = self.chatBottomInputModel.audioIcon;
				
				self.chatBottomInputModel.showModel.showClickToSpeakBtn = false;
				self.chatBottomInputModel.showModel.showInput = true;
				self.chatBottomInputModel.showModel.showEmojiIcon = true;
				
				self.scope.showModel = self.chatBottomInputModel.showModel;
				
				self.chatBottomInputModel.audioStatus = 1;
			}
			
		}
		
		//按住说话
		self.scope.onTouchToSpeak = function ()
		{
			self.chatBottomInputModel.showModel.showAudioContainer = true;
			self.scope.showModel = self.chatBottomInputModel.showModel;
			
			self.chatBottomInputModel.recordingTimer = setInterval(function()
			{
				if (self.chatBottomInputModel.recordingDirection == 1)
				{
					if (self.chatBottomInputModel.recordingIndex == self.chatBottomInputModel.showRecordingModel.length - 1)
					{
						self.chatBottomInputModel.recordingDirection = 2;
						self.chatBottomInputModel.recordingIndex = self.chatBottomInputModel.showRecordingModel.length - 2;
					}
					
					self.chatBottomInputModel.recordingIndex++;
				}
				else if (self.chatBottomInputModel.recordingDirection == 2)
				{
					if (self.chatBottomInputModel.recordingIndex == 1)
					{
						self.chatBottomInputModel.recordingDirection = 1;
						self.chatBottomInputModel.recordingIndex = 2;
					}
					
					self.chatBottomInputModel.recordingIndex--;
				}
				
				
				self.chatBottomInputModel.showRecordingModel[self.chatBottomInputModel.recordingIndex] = !self.chatBottomInputModel.showRecordingModel[self.chatBottomInputModel.recordingIndex];
				self.scope.showRecordingModel = self.chatBottomInputModel.showRecordingModel;
				self.scope.$apply();
			},100);
		}
		
		//取消，发送语音
		self.scope.onTouchEndSpeak = function ()
		{
			
			clearInterval(self.chatBottomInputModel.recordingTimer);
			
			self.chatBottomInputModel.showModel.showAudioContainer = false;
			self.scope.showModel = self.chatBottomInputModel.showModel;
		}
		
		//表情
		self.scope.onClickEmo = function ()
		{
			if (self.chatBottomInputModel.showModel.showEmojiContainer)
			{
				self.hideEmojiOrMoreContainer();
			}
			else
			{
				self.hideEmojiOrMoreContainer();
				
				self.chatBottomInputModel.showModel.showEmojiContainer = true;
				self.chatBottomInputModel.showModel.showCoverBg = true;
				self.scope.showModel = self.chatBottomInputModel.showModel;
			    
			}
			
		}
		
		//隐藏底部表情或更多
		self.scope.hideEmojiOrMoreContainer = function ()
		{	
			self.hideEmojiOrMoreContainer();	
		}
		
		//更多
		self.scope.onClickMore = function ()
		{
			if (self.chatBottomInputModel.showModel.showMoreContainer)
			{
				self.hideEmojiOrMoreContainer();
			}
			else 
			{
				self.hideEmojiOrMoreContainer();
				
				self.chatBottomInputModel.showModel.showMoreContainer = true;
				self.scope.showModel = self.chatBottomInputModel.showModel;
			}
		}
		
		//本地相册
		self.scope.onClickToAlbum = function ()
		{
			mnWebMain.photoPicker(1, 1, 1);
		}
		
		//拍摄
		self.scope.onClickToCamera = function ()
		{
			mnWebMain.photoPicker(1, 0, 1);
		}
		
	},
	
	//隐藏底部表情或更多
	hideEmojiOrMoreContainer : function ()
	{
		var self = this;
		
		self.chatBottomInputModel.showModel.showEmojiContainer = false;
		self.chatBottomInputModel.showModel.showMoreContainer = false;
		
		self.scope.showModel = self.chatBottomInputModel.showModel;	
	},
	
	//初始化聊天底部数据
	setChatBottomInputData : function ()
	{
		var self = this;
		
		self.chatBottomInputModel.audioStatus = 1;
		
		self.chatBottomInputModel.audioIcon = chatMsgParams.AUDIO_ICON;
		self.chatBottomInputModel.emojiIcon = chatMsgParams.EMO_ICON;
		self.chatBottomInputModel.moreIcon = chatMsgParams.MORE_ICON;
		
		self.scope.audioIcon = self.chatBottomInputModel.audioIcon;
		self.scope.emojiIcon = self.chatBottomInputModel.emojiIcon;
		self.scope.moreIcon = self.chatBottomInputModel.moreIcon;
		
		self.chatBottomInputModel.showModel.showInput = true;
		self.chatBottomInputModel.showModel.showClickToSpeakBtn = false;
		self.chatBottomInputModel.showModel.showEmojiIcon = true;
		self.chatBottomInputModel.showModel.showMoreIcon = true;
		self.chatBottomInputModel.showModel.showSendMsgBtn = false;
		self.chatBottomInputModel.showModel.showAudioContainer = false;
		self.chatBottomInputModel.showModel.showEmojiContainer = false;
		self.chatBottomInputModel.showModel.showMoreContainer = false;
		self.chatBottomInputModel.showModel.showCoverBg = false;
		
		self.scope.showModel = self.chatBottomInputModel.showModel;
		
		self.chatBottomInputModel.showRecordingModel = [true, false, false, false, false];
		
		self.scope.showRecordingModel = self.chatBottomInputModel.showRecordingModel;
		
		self.chatBottomInputModel.swiperEmojiList1 = chatEmojiParams.SWIPER_EMOJI_1;
		self.chatBottomInputModel.swiperEmojiList2 = chatEmojiParams.SWIPER_EMOJI_2;
		
		self.scope.swiperEmojiList1 = self.chatBottomInputModel.swiperEmojiList1;
		self.scope.swiperEmojiList2 = self.chatBottomInputModel.swiperEmojiList2;
		
		self.chatBottomInputModel.inputMsg = null;
		self.scope.inputMsg = self.chatBottomInputModel.inputMsg;
		
		self.scope.$apply();
		
		
	},
	
	ngRepeatFinish : function(){
    	
    	var self = this;
    	
    	//ng-repeat完成后执行的操作
		this.scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent){
			
		});
    	
    },
}
