(function (window) {

	/*
	*分页插件
	*page.init({
	*	totalPage: '总页数',//必传
	*	currentPage: '当前页',
	*	showNum: '中间显示页数，需是基数',//默认5
	*	$dom: '要插入分页的dom',//必传
	*	totalNumber: '总条数',
	*	callback: '分页回调函数',//必传
	*	isJudge: '是否判断，是否够分页，默认值false',//true: 不足分页则无效果
	*	isPageTips: '页数提示，默认true',
	*	isPageGo: '是否跳转具体页，默认true'
	*}, {
	*	page: '父级分页style',
	*	page_btn: '按钮style，包含：首页、上一页、1-n、下一页、尾页，go',
	*	page_tips: '左侧提示信息',
	*	active_page: '当前页',
	*	disabled_page: '按钮不可点',
	*	page_input: '直接跳转页，输入框'
	*})
	*如果totalPage,totalNumber不足分页，则不触发
	*第二个参数{styleCss}，采用+=方式
	*/


	//style css
	var style = {
		page: 'position: relative;color: #6e6e6e;font-size: 14px;',
		page_btn: 'border: 1px solid #d6d6d6;color: #6e6e6e;float:left;background-color: #f9f9f9;line-height: 23px;height: 23px;text-decoration: none;border-radius: 3px;padding: 0 10px;font-size: 14px;margin: 0 3px;',
		page_tips: 'float:left;line-height: 23px;height: 23px;',
		active_page: 'background-color: white;border-color: white;cursor: default;',
		disabled_page: 'cursor: default;color: #999;background-color:#e9eaee;',
		page_input: 'outline: none;line-height: 23px;height: 23px;width: 25px;border-radius: 3px;border: 1px solid #d6d6d6;padding: 0;text-align: center;margin-left: 10px;float:left;'
	}

	var Page = function (param) {
		this.initial = {};

		var obj = {
			totalPage: 10,//总页数
			currentPage: 1,//当前页
			showNum: 5,//显示页数
			$dom: [],
			totalNumber: 100,//总页数
			callback: '',
			isJudge: false,//是否默认判断
			isPageTips: true,//是否页数提示
			isPageGo: true
		}

		$.extend(this.initial, obj, param);

		//如果中间页超出总页数
		if (this.initial.totalPage <= this.initial.showNum) {
			this.initial.showNum = this.initial.totalPage;
		}

		if (this.initial.isJudge) {
			return false;
		}

		this._init();
	}

	//原型扩展
	$.extend(Page.prototype, {
		_init: function () {
			this._render();
			this._domEvent();
		},

		_render: function () {
			this.initial.$dom.html( this.getHtml() );
		},

		_domEvent: function () {
			var self = this;

			self.initial.$dom.off().on('click', 'a', function () {
				var $this = $(this),
					num = self.initial.currentPage;

				if ($this.hasClass('disabled_page') || $this.hasClass('active_page')) {
					return false;
				}

				if (!self.initial.totalPage || !self.initial.totalNumber) {
					return false;
				}

				if ($this.hasClass('js_page_home')) {
					self.initial.currentPage = 1;
				} else if ($this.hasClass('js_page_prev')) {
					self.initial.currentPage --;
				} else if ($this.hasClass('js_page_next')) {
					self.initial.currentPage++;
				} else if ($this.hasClass('js_page_end')) {
					self.initial.currentPage = self.initial.totalPage;
				} else if ($this.hasClass('js_page_to')) {
					num = Number( $this.siblings('.js_page_num').val() );
					if (num > self.initial.totalPage || !num) {
						alert('请输入1-'+self.initial.totalPage);
						$this.siblings('.js_page_num').val('');
						return false;
					}
					self.initial.currentPage = num;
				} else {
					self.initial.currentPage = Number( $this.text() );
				}

				if (typeof self.initial.callback == 'function') {
					self.initial.callback(self.initial.currentPage);
					self._render();
				}
			});
		},

		//中间页拼接
		getPage: function () {
			var self = this;

			var html = '',
				step = Math.floor(self.initial.showNum/2),
				start = self.initial.currentPage - step,
				end = self.initial.currentPage + step;

			if (self.initial.currentPage <= step) {
				start = 1;
				end = self.initial.showNum;
			}

			if (self.initial.currentPage >= self.initial.totalPage - step) {
				start = self.initial.totalPage - self.initial.showNum + 1;
				end = self.initial.totalPage;
			}

			if (start <= 0) {
				start = 1;
				end = self.initial.totalPage;
			}

			for (var i = start; i <= end; i++) {
				if (self.initial.currentPage == i) {
					html += '<a href="javascript:;" class="active_page" style="'+style.page_btn+style.active_page+'">'+(i)+'</a>';
				} else {
					html += '<a href="javascript:;" style="'+style.page_btn+'">'+(i)+'</a>';
				}
			}
			return html;
		},

		//
		getHtml: function () {
			var self = this;

			var html = '';
			html += ''+
				'<div class="page clearfix" style="'+style.page+'">';

				if (self.initial.isPageTips) {
				html +=	'<span style="'+style.page_tips+'">'+self.initial.totalNumber+'条</span>'+
						'<span style="'+style.page_tips+'margin: 0 10px 0 5px;">'+self.initial.totalPage+'页</span>';
				}
					

				if (self.initial.currentPage == 1) {
				html +=	'<a href="javascript:;" class="js_page_home disabled_page" style="'+style.page_btn+style.disabled_page+'">首页</a>'+
						'<a href="javascript:;" class="js_page_prev disabled_page" style="'+style.page_btn+style.disabled_page+'">上一页</a>';
				} else {
				html +=	'<a href="javascript:;" class="js_page_home" style="'+style.page_btn+'">首页</a>'+
						'<a href="javascript:;" class="js_page_prev" style="'+style.page_btn+'">上一页</a>';
				}
					
				html +=	self.getPage() + '';

				if (self.initial.currentPage == self.initial.totalPage || !self.initial.totalPage) {
				html += '<a href="javascript:;" class="js_page_next disabled_page" style="'+style.page_btn+style.disabled_page+'">下一页</a>'+
						'<a href="javascript:;" class="js_page_end disabled_page" style="'+style.page_btn+style.disabled_page+'">尾页</a>';
				} else {
				html +=	'<a href="javascript:;" class="js_page_next" style="'+style.page_btn+'">下一页</a>'+
						'<a href="javascript:;" class="js_page_end" style="'+style.page_btn+'">尾页</a>';
				}

				if (self.initial.isPageGo) {
				html += '<input type="text" class="js_page_num" style="'+style.page_input+'"/>'+
					'<a href="javascript:;" class="js_page_to" style="'+style.page_btn+'">GO</a>';
				}
					
			html += '</div>';
			return html;
		}
	});

	//对外接口
	window.PAGE = function (param, cssStyle) {
		//styleCss重置
		for (var k in cssStyle) {
			style[k] += cssStyle[k];
		}

		new Page(param);
	}
})(window)