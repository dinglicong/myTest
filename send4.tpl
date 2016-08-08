<h2>运力信息发布</h2>
<div>
	<h3>接口介绍</h3>
	<p>创建app时候</p>
	<h3>URL</h3>
	<p>/openapi/public/v1/message/cargo/history</p>
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
			['user_id', 'Long', '是', '用户ID'],
			['page_no', 'Int', '否', '分页页数（第几页）'],
			['page_size', 'Int', '否', '分页数量（每页多少数据，默认15条,区间1-100）']
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
	<p>备注：</p>
	<p>只查询发布中和关闭的信息（state=0或state=1）</p>
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
		      "max_id": 384298,
		      "min_id": 384298,
		      "messages": [
		         {
		            "id": 384298,
		            "user_id": 0,
		            "user_name": “张三”,
		            "user_avatar": “http://...”,
		            "user_register_time":1446715478000,
		            "company_name": "",
		            "doorplate_number": "",
		            "truck_type_name": “”,
		            "trunck_number": 0,
		            "wheel_number": 0,
		            "trunck_length_name": “9.6米”,
		            "price": 0,
		            "price_unit": “吨”,
		            "cargo_type_name": “”,
		            "contact_person": "",
		            "content": "设备7.8吨",
		            "create_time": 1446715478000,
		            "from_region_id": 410102,
		            "to_region_ids": "1201,1102",
		            "general_distance": "",
		            "highway_distance": "",
		            "load": 7.8,
		            "mobile": "182****2563",
		            "mobile1": "",
		            "mobile2": "",
		            "mobile3": "",
		            "state": 0,
		            "tel": "",
		            "qq": "",
		            "type": 1,
		            "vehicle_length": 0,
		            "weight": "7.8"
		         }
		      ]
		   },
		   "error_code": 0,
		   "error_msg": "",
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
			