/*
 *公用确认框 
 * 
 * 
 */

var $callServiceDialog = {
	
	body : $("body"),
	
	show : function(callback){
		
		var html = '';
		html += '<div class="popUp-bg"></div>';
		html += '<div class="popUp-container3">';
		html += '<div class="popUp-tip3">027-3594111</div>';
		html += '<div class="popUp-call-container">';
		html += '<p class="popUp-call-cancel">取消</p>';
		html += '<p class="popUp-call-sure">呼叫</p>';
		html += '</div>';
		html += '</div>';
		
		this.body.append(html);
		
		$(".popUp-call-cancel").on("click",function(){
			$callServiceDialog.hide();
		});
		
		$(".popUp-bg").on("click",function(){
			$callServiceDialog.hide();
		});
		
		$(".popUp-call-sure").on("click",function(){
			callback();
			$callServiceDialog.hide();
		});
		
	},
	
	hide : function(){
		
		$(".popUp-bg").remove();
		$(".popUp-container3").remove();
		
	}
	
}
