/**
 * 页面初始化时调用
 */
function init() {
	LoadRememberInfo();
}

window.onload = init;


/**
 * 设置cookie
 * 
 * @param {}
 *            sName 名称
 * @param {}
 *            sValue Cookie值
 * @param {}
 *            iExpireDays 保存天数
 */
function SetCookie(sName, sValue, iExpireDays) {
	if (iExpireDays) {
		var dExpire = new Date();
		dExpire.setTime(dExpire.getTime()
				+ parseInt(iExpireDays * 24 * 60 * 60 * 1000));
		document.cookie = sName + "=" + escape(sValue) + "; expires="
				+ dExpire.toGMTString() + "; path=/";
	} else {
		document.cookie = sName + "=" + escape(sValue) + "; path=/";
	}
}

/**
 * 获取Cookie
 * 
 * @param {}
 *            sName Cookie名称
 * @return {} Cookie值
 */
function GetCookie(sName) {
	var arr = document.cookie.match(new RegExp("(^| )" + sName
			+ "=([^;]*)(;|$)"));
	if (arr != null) {
		return unescape(arr[2])
	};
	return null;
}

/**
 * 加载信息
 */
function LoadRememberInfo() {
	var authorObj = document.getElementById("comment_author");
	var emailObj = document.getElementById("comment_email");
	var homePageObj = document.getElementById("comment_homePage");

	var cookie_author = GetCookie("mspring_cookie_comment_author");
	var cookie_email = GetCookie("mspring_cookie_comment_email");
	var cookie_homepage = GetCookie("mspring_cookie_comment_homePage");

	if (authorObj && cookie_author) {
		authorObj.value = cookie_author;
	}
	if (emailObj && cookie_email) {
		emailObj.value = cookie_email;
	}
	if (homePageObj && cookie_homepage) {
		homePageObj.value = cookie_homepage;
	}
}

/**
 * 保存信息
 */
function SaveRememberInfo() {
	var author = document.getElementById("comment_author").value;
	var email = document.getElementById("comment_email").value;
	var homePage = document.getElementById("comment_homePage").value;

	SetCookie("mspring_cookie_comment_author", author, 365);
	SetCookie("mspring_cookie_comment_email", email, 365);
	SetCookie("mspring_cookie_comment_homePage", homePage, 365);
}

/**
 * 文章统计
 * 
 * @param {}
 *            articleId
 */
function singleStatistic(articleId) {
	$.ajax({
				type : "GET",
				url : "singleStatistic.action?articleId=" + articleId,
				async : true
			});
}

/**
 * 网站访问量统计
 */
function visitStatistic() {
	$.ajax({
				type : "GET",
				url : "visitStatistic.action",
				async : true
			});
}

function setSessionAttribute(key, value) {
	var url = "admin/setSessionAttribute.action?key=" + key + "&value=" + value;
	$.post(url, function(data) {
			});
}

function getSessionAttribute(key) {
	var url = "admin/setSessionAttribute.action?key=" + key;
	$.post(url, function(data) {
			});
}

/**
 * 发表评论
 */
function submitComment() {
	$("#comment-form").submit();
	SaveRememberInfo();
}


//图片旋转
function rotate(id,angle,whence) {
	var p = document.getElementById(id);

	// we store the angle inside the image tag for persistence
	if (!whence) {
		p.angle = ((p.angle==undefined?0:p.angle) + angle) % 360;
	} else {
		p.angle = angle;
	}

	if (p.angle >= 0) {
		var rotation = Math.PI * p.angle / 180;
	} else {
		var rotation = Math.PI * (360+p.angle) / 180;
	}
	var costheta = Math.cos(rotation);
	var sintheta = Math.sin(rotation);

	if (document.all && !window.opera) {
		var canvas = document.createElement('img');

		canvas.src = p.src;
		canvas.height = p.height;
		canvas.width = p.width;

		canvas.style.filter = "progid:DXImageTransform.Microsoft.Matrix(M11="+costheta+",M12="+(-sintheta)+",M21="+sintheta+",M22="+costheta+",SizingMethod='auto expand')";
	} else {
		var canvas = document.createElement('canvas');
		if (!p.oImage) {
			canvas.oImage = new Image();
			canvas.oImage.src = p.src;
		} else {
			canvas.oImage = p.oImage;
		}

		canvas.style.width = canvas.width = Math.abs(costheta*canvas.oImage.width) + Math.abs(sintheta*canvas.oImage.height);
		canvas.style.height = canvas.height = Math.abs(costheta*canvas.oImage.height) + Math.abs(sintheta*canvas.oImage.width);

		var context = canvas.getContext('2d');
		context.save();
		if (rotation <= Math.PI/2) {
			context.translate(sintheta*canvas.oImage.height,0);
		} else if (rotation <= Math.PI) {
			context.translate(canvas.width,-costheta*canvas.oImage.height);
		} else if (rotation <= 1.5*Math.PI) {
			context.translate(-costheta*canvas.oImage.width,canvas.height);
		} else {
			context.translate(0,-sintheta*canvas.oImage.width);
		}
		context.rotate(rotation);
		context.drawImage(canvas.oImage, 0, 0, canvas.oImage.width, canvas.oImage.height);
		context.restore();
	}
	canvas.id = p.id;
	canvas.angle = p.angle;
	p.parentNode.replaceChild(canvas, p);
}

//图片向右旋转
function rotateRight(id,angle) {
	rotate(id,angle==undefined?90:angle);
}

//图片向左旋转
function rotateLeft(id,angle) {
	rotate(id,angle==undefined?-90:-angle);
}
