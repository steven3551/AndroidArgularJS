/*
 *公用确认框 
 * 
 * 
 */

var $codesDialog = {
	
	body : $("body"),
	
	show : function(callback){
		
		var html = '';
		html += '<div class="popUp-bg"></div>';
		html += '<div class="popUp-container2">';
		html += '<div class="popUp-top">提示</div>';
		html += '<div class="popUp-tip2">查询工资，需要进行验证，请输入您手机收到的验证码</div>';
		html += '<input class="popUp-codes" type="text" placeholder="请输入验证码"/>';
		html += '<div class="popUp-confirm-codes-container">';
		html += '<a class="popUp-confirm-codes-cancel">取消</a>';
		html += '<a class="popUp-confirm-codes-sure">确定</a>';
		html += '</div>';
		html += '</div>';
		
		this.body.append(html);
		
		$(".popUp-confirm-codes-cancel").on("click",function(){
			$codesDialog.hide();
		});
		
		$(".popUp-bg").on("click",function(){
			$codesDialog.hide();
		});
		
		$(".popUp-confirm-codes-sure").on("click",function(){
			callback();
			$codesDialog.hide();
		});
		
	},
	
	hide : function(){
		
		$(".popUp-bg").remove();
		$(".popUp-container2").remove();
		
	}
	
}
