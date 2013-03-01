
		<#if (posts?exists && posts?size > 0)>
			<#list posts as post>
				<li>
					<a href="<@postUrl post="post" />" target="_blank" style="boder-botton:solid 1px;" title="${post.title}">
						<span class="label label-success">${post_index + 1}</span>
						<@m.substring str="${post.title}" endIndex=24 />
						<span style="float:right;">${post.createTime?string("yyyy-MM-dd")}</span>
					</a>
				</li>
			</#list>
		</#if>
