/*
 *公用确认框 
 * 
 * 
 */

var $cameraDialog = {
	
	body : $("body"),
	
	show : function(callback1, callback2){
		
		var html = '';
		html += '<div class="popUp-bg"></div>';
		html += '<div class="popUp-container">';
		html += '<div class="popUp-top">换头像</div>';
//		html += '<div class="popUp-camera-x"><img src="img/camera_x.png"/></div>';
		html += '<div class="popUp-camera-shot">立即拍摄</div>';
		html += '<div class="popUp-local-album">本地相册</div>';
		html += '<div class="popUp-confirm-container2">';
		html += '<p class="popUp-camera-cancel">取消</p>';
		html += '</div>';
		html += '</div>';
		
		this.body.append(html);
		
		$(".popUp-bg").on("click",function(){
			$cameraDialog.hide();
		});
		
		$(".popUp-camera-x").on("click",function(){
			$cameraDialog.hide();
		});
		
		$(".popUp-camera-cancel").on("click",function(){
			$cameraDialog.hide();
		});
		
		$(".popUp-camera-shot").on("click",function(){
			callback1();
			$cameraDialog.hide();
		});
		
		$(".popUp-local-album").on("click",function(){
			callback2();
			$cameraDialog.hide();
		});
		
	},
	
	hide : function(){
		
		$(".popUp-bg").remove();
		$(".popUp-container").remove();
		
	}
	
}
