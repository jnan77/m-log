<#include "inc/header.ftl" />
<div>
	<table class="infotable">
		<tr>
			<td colspan="2" class="partition">关于M-LOG</td>
		</tr>
		<tr>
			<td style="width:120px;">应用名称:</td>
			<td>${app.productName}</td>
		</tr>
		<tr>
			<td>版本号:</td>
			<td>${app.version}</td>
		</tr>
		<tr>
			<td>LICENSE:</td>
			<td><a href="http://www.apache.org/licenses/LICENSE-2.0.html" target="_blank">${app.license}</a></td>
		</tr>
		<tr>
			<td>官网地址:</td>
			<td><a href="http://www.mspring.org" target="_blank">${app.homePage}</a></td>
		</tr>
		<tr>
			<td colspan="2"><a href="https://me.alipay.com/gaoyoubo" target="_blank"><img src="${base}/images/alipay-me.png"></a></td>
		</tr>
	</table>
	<table class="infotable">
		<tr>
			<td colspan="2" class="partition">系统状态</td>
		</tr>
		<tr>
			<td style="width:120px;">服务器名:</td>
			<td>${serverName}(${remoteAddr})</td>
		</tr>
		<tr>
			<td>内存消耗:</td>
			<td>
				${fUsedMemory/1024/1024}M / ${fTotalMemory/1024/1024}M
				<div style="width:200px; height:10px; background:#f00; font-size:1px">
					<div style="float:right; background:#0f0; width:${fPercent*2}px; font-size:1px; height:10px"></div>
				</div>
			</td>
		</tr>
		<tr>
			<td style="width:120px;">操作系统:</td>
			<td>${os}</td>
		</tr>
		<tr>
			<td style="width:120px;">JDK版本:</td>
			<td>${javaVersion}</td>
		</tr>
	</table>
</div>
<script type="text/javascript">
	$(document).ready(function(){
		//斑马线
		var tables=document.getElementsByTagName("table");
		var b=false;
		for (var j = 0; j < tables.length; j++){
			var cells = tables[j].getElementsByTagName("tr");
			//cells[0].className="color3";
			b=false;
			for (var i = 0; i < cells.length; i++){
				if(b){
					cells[i].className="color2";
					b=false;
				}
				else{
					cells[i].className="color3";
					b=true;
				};
			};
		}
	});
	
	/*
	exec_api(
		'team_members', 
		[{name: 'token', value: '8m3qt7i1ja22gm9c87inhgnl41'}], 
		function(data){
			alert(data.length);
		}
	);
	
	function exec_api(action, params, callback){
		var url = 'http://team.mspring.org/?c=api';
		if(!action){
			return;
		}
		var api_url = url + '&a=' + action;
		for(var i = 0; i < params.length; i++){
			api_url += '&' + params[i].name + '=' + params[i].value;
		}
		mlog.utils.loader.loadJavaScript(api_url, function(){
			alert(err_code);
		});
	}
	*/
</script>
<#include "inc/footer.ftl" />