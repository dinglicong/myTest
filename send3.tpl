<h2>运力信息发布</h2>
<div>
	<h3>接口介绍</h3>
	<p>创建app时候</p>
	<h3>URL</h3>
	<p>/openapi/public/v1/message/mobile/search</p>
	<h3>入参</h3>
	<table>
		<thead>
			<tr>
				<th>参数名称</th>
				<th>参数类型</th>
				<th>是否必填</th>
				<th>参数说明</th>
			</tr>
		</thead>
		<% var list = [
			['user_id', 'Int', '是', '用户id'],
			['id', 'Long', '是', '货源信息ID']
			];%>
		<tbody>
			<%for (var i = 0, iLen = list.length; i < iLen; i++){%>
				<tr>
					<%for (var j = 0, jLen = list[i].length; j < jLen; j++){%>
						<td><%=list[i][j]%></td>
					<%}%>
				</tr>
			<%}%>
		</tbody>
	</table>
	<h3>出参（json数据格式）</h3>
	<table>
		<% var dataList = [
			['status', 'String', '是', '状态（ERROR、OK）表示请求处理成功或失败'],
			['error_code', 'Int', '是', '错误码'],
			['error_msg', 'String', '是', '错误信息'],
			['content', 'String', '是', '内容']
		];%>
		<thead>
			<tr>
				<th>名称</th>
			</tr>
			<tr>
				<th>类型</th>
			</tr>
			<tr>
				<th>是否一定有</th>
			</tr>
			<tr>
				<th>说明</th>
			</tr>
		</thead>
		<tbody>
			<%for (var i = 0, iLen = list.length; i < iLen; i++){%>
				<tr>
					<%for (var j = 0, jLen = dataList[i].length; j < jLen; j++){%>
						<td><%=dataList[i][j]%></td>
					<%}%>
				</tr>
			<%}%>
		</tbody>
	</table>
	<h3>成功，返回数据示例</h3>
	<%var pre = '
		{
		    "content": {
		        "mobiles": {
		            "0": "1362147****",
		            "1": "1802636****"
		        }
		    },
		    "error_code": 0,
		    "status": "OK"
		}
	'%>
	<pre><%==pre%></pre>
	<h3>失败，返回数据示例</h3>
	<%var next = '
		{
		   "content": "3",
		   "error_code": 3,
		   "error_msg": "参数不合法",
		   "status": "ERROR"
		}
	'%>
	<pre><%==next%></pre>
</div>
			