/**
 * @author GaoYoubo
 * @since 2012-09-25
 * formԪ�صĲ����ʹ���
 */
if(typeof(mlog) === "undefined"){var mlog = function(){}};
mlog.form = {};
$.extend(mlog.form, {
	
   /**
	 * ѡ��ѡ������checkbox
	 */
	checkAll : function(_this, cbName) {
		var array = document.getElementsByName(cbName);
		for ( var i = 0; i < array.length; i++) {
			array[i].checked = _this.checked;
		}
	},

	/**
	 * ��ֻѡ��ǰcheckboxʱ�� ���ص�ǰcheckbox��ֵ
	 */
	checkThis : function(_this, cbName) {
		var array = document.getElementsByName(cbName);
		var count = 0;
		for ( var i = 0; i < array.length; i++) {
			if (array[i].checked) {
				count++;
			}
			if (count >= 2) {
				return;
			}
		}
		return _this.value;
	}, 
	
	/**
	 * �ύform
	 * @param {} formId
	 * @param {} action
	 */
	submitForm : function(formId, action){
		var form = document.getElementById(formId);
		if (action) {
			form.action = action;
		}
		form.submit();
	},
	
	confirmSubmit : function(formId, action, msg) {
		var default_msg = 'ȷ��ɾ��ѡ������';
		if (msg) {
			default_msg = msg;
		}
		if (confirm(default_msg)) {
			mlog.form.submitForm(formId, action);
		}
	},
	
	validateForm : function(formId, callback) {
		var form = document.getElementById(formId);
		if (form) {
			$.metadata.setType("attr", "validate");
			/**
			 * �Զ���check����,�÷���������ajax���
			 * @param value ��ǰ��֤��Ԫ�ص�ֵ
			 * @param element ��ǰ��֤��Ԫ��
			 * @param param ��ǰ��֤���ݵĲ���
			 */
			$.validator.addMethod("ajaxCheck", function(value, element, param) {
				try{
					if (param.length == 0) {
						return true;
					}
					var url = param[0];
					var param_name = param[1];
					if (param_name) {
						url += "?" + param_name + "=" + value;
					}
					var text = $.ajax({
						url : url,
						async : false
					}).responseText;
					
					var validationResult = eval('('+text+')');
					$.validator.messages["ajaxCheck"] = validationResult.message != undefined ? validationResult.message : $.validator.messages["ajaxCheck"];
					var result = false;
					if(validationResult.result === true){
						result = true;
					}
					return result;
				}
				catch(e){
					mspring.tip("<font color='red'>Validator error:" + e.message + "</font>");
				}
			});
			$(form).validate({
				success : callback,
				/* ��д������ʾ��Ϣ����,��alert��ʽ����������Ϣ */
				showErrors : function(errorMap, errorList) {
	
					/* ����������ʽ */
					for ( var i = 0; this.errorList[i]; i++) {
						var error = this.errorList[i];
						this.settings.highlight && this.settings.highlight.call( this, error.element, this.settings.errorClass, this.settings.validClass);
						// this.showLabel(error.element,error.message);
					}
					if (this.errorList.length) {
						this.toShow = this.toShow.add(this.containers);
					}
					if (this.settings.success) {
						for ( var i = 0; this.successList[i]; i++) {
							this.showLabel(this.successList[i]);
						}
					}
					if (this.settings.unhighlight) {
						for ( var i = 0, elements = this.validElements(); elements[i]; i++) {
							this.settings.unhighlight.call(this,
									elements[i],
									this.settings.errorClass,
									this.settings.validClass);
						}
					}
					this.toHide = this.toHide.not(this.toShow);
					this.hideErrors();
					this.addWrapper(this.toShow).show();
					/* end ����������ʽ */
	
					var msg = "";
					$.each(errorList, function(i, v) {
						// v.element.style =
						msg += (v.message + "<br />");
					});
					if (msg) {
						mspring.tip("<font color='red'>" + msg + "</font>");
					}
				},
				// ʧȥ����ʱ����֤
				onfocusout : false,
				// ����ʱ����֤
				onkeyup : false,
				// ���ʱ����֤
				onclick : false
			});
		}
	}
});
