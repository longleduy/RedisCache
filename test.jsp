<btt:form action="${context}/Request" custom="id='retailMessageBoardForm'" name="retailMessageBoardForm" errorPage="error_page.jsp">
    <div class="col-sm-offset-2 col-sm-8 tra_cuu_tkhai lapTkhai">
        <div class="col-md-3"></div>
        <div class="col-md-8">
            <h4 class="big-title">HỎI ĐÁP</h4>
        </div>
        <div class="form-group">
            <label for="" class="col-sm-3 control-label">
                <btt:label text="info.messageboard.item.taxAgencyCode" />
                <font color="red">*</font>
            </label>
            <div class="col-sm-6">
                <input readonly="readonly" type="text" id="ma_cq_thue" name="ma_cq_thue" value="${Params.ma_cq_thue }" class="textfield"
                    maxlength="100" />
            </div>
            <div class="col-sm-2">
                <input disabled="disabled" type="button" class="btn" value="<btt:label text='info.messageboard.item.select'/>" onclick="listCQT()"
                /> </div>
        </div>
        <div class="form-group">
            <label for="" class="col-sm-3 control-label">
                <btt:label text="info.messageboard.item.taxAgencyName" />
            </label>
            <div class="col-sm-8">
                <input readonly="readonly" type="text" id="ten_cq_thue" name="ten_cq_thue" value="${Params.ten_cq_thue}" class="textfield"
                    maxlength="100" />
            </div>
        </div>

        <div class="form-group">
            <label for="" class="col-sm-3 control-label">
                <btt:label text="info.messageboard.item.typeQuestion" />
            </label>
            <div class="col-sm-8">
                <select id="Taxes_Type" name="Taxes_Type" class="show-tick" data-live-search="true">
                    <option value="">
                        <btt:label text="select" />
                    </option>
                    <c:forEach items="${Params.listTaxesType }" var="list">
                        <option value="${list.ma_loaithue}" <c:if test="${Params.Taxes_Type == list.ma_loaithue }">selected</c:if>>
                            <c:out value="${list.ten_loaithue}"></c:out>
                        </option>
                    </c:forEach>
                </select>
            </div>
        </div>
        <div class="form-group">
            <label for="" class="col-sm-3 control-label">
                <btt:label text="info.messageboard.item.status" />
            </label>
            <div class="col-sm-8">
                <select name="qryStatus" class="show-tick" data-live-search="true">
                    <option value="" <c:if test="${qryStatus=='' }">selected</c:if>>
                        <btt:label text="select" />
                    </option>
                    <option value="01" <c:if test="${qryStatus=='01' }">selected</c:if>>&nbsp;
                        <btt:label text="01" />
                    </option>
                    <option value="05" <c:if test="${qryStatus=='05' }">selected</c:if>>&nbsp;
                        <btt:label text="05" />
                    </option>
                </select>
            </div>
        </div>

        <div class="form-group tu_den">
            <label for="" class="col-sm-3 control-label">Ngày tạo</label>
            <div class="input-group date myDatepicker col-sm-4" data-lich="Từ ngày">
                <input id='qryFromDate' name="qryFromDate" type="text" class="form-control" value="${Params.qryFromDate}" name="qryFromDate"
                    onkeyup="getFocus(this, document.traCuuTBaoKhaiForm.qryFromDate);" onblur="validDateFormat(this,'dd/mm/yyyy');"
                />
                <span class="input-group-addon add-on">
                    <span class="glyphicon glyphicon-calendar"></span>
                </span>
            </div>
            <div class="input-group date myDatepicker col-sm-4" data-lich="Đến ngày">
                <input id='qryToDate' name="qryToDate" type="text" class="form-control" value="${Params.qryToDate}" name="qryToDate" onblur="validDateFormat(this,'dd/mm/yyyy');"
                />
                <span class="input-group-addon add-on">
                    <span class="glyphicon glyphicon-calendar"></span>
                </span>
            </div>
        </div>
        <div class="col-sm-3"></div>
        <div class="col-sm-8">
            <div class="button_area center">
                <btt:button custom="class='btn btn-default'" value="&#xf002;&nbsp; Tra cứu" type="button" onClick="return validateForm();"
                />
                <btt:button custom="class='btn btn-default'" value="&#xf067;&nbsp; Tạo mới" type="button" onClick="return formSubmitAction(this.form,'create',false,true);"
                />
            </div>
        </div>
        <div class="col-sm-1"></div>
        <!--     Error -->
        <c:choose>
            <c:when test="${empty boardList || fn:length(boardList)<1}">
                <c:if test="${Params.isQuery=='Y' }">
                    <div class="form-group">
                        <label class="col-sm-3"></label>
                        <div class="col-sm-8">
                            <div class="app_error alert alert-danger" role="alert">
                                <strong>
                                    <btt:label text="info.title.norecords" />
                                </strong>
                            </div>
                        </div>
                    </div>
                </c:if>
            </c:when>
        </c:choose>
        <!--     Error -->
    </div>
</btt:form>
<btt:form action="Request" custom="id='retailMessageBoardForm'" errorPage="error_page.jsp"></btt:form>
<div class="col-md-12">
        <c:if test="${not empty listQ}">
                <div class="tab-content">
                        <h3>Kết quả tra cứu</h3>
                        <div class="frm_member">
                            <div class="tbl_member">
                                    <table id="data_content_onday" style="margin-left: 0" width="100%" border="0" cellspacing="0" cellpadding="0" class="md_list2">
                                            <thead style="border: 0px;">
                        
                                                <tr>
                                                    <th><btt:label text="info.messageboard.item.taxAgencyCode" /></th>
                                                    <th><btt:label text="info.messageboard.item.taxAgencyName" /></th>
                                                    <th><btt:label text="info.notificatin_service_create.item.email" /></th>
                                                    <th><btt:label text="info.messageboard.item.telephone" /></th>
                                                    <th><btt:label text="info.messageboard.item.subject" /></th>
                                                    <th><btt:label text="info.messageboard.item.questionDate" /></th>
                                                    <th><btt:label text="info.messageboard.item.answerDate" /></th>
                                                    <th><btt:label text="info.messageboard.item.status" /></th>
                                                     <td style="display:none;"></td>
                                                    <th><btt:label text="info.messageboard.item.detail" /></th>
                        
                                                </tr>
                                                </thead>
                                                <tbody id="allResultTableBody">
                                                    <tr>
                                                        <td align="right"><c:out value="${listQ.tax_org_accept}" />&nbsp;</td>
                                                        <td align="left"><c:forEach items="${Params.getListCQT }" var="listCQT" varStatus="StVs">
                                                                <c:if test="${listCQT.ma_cq_thue==listQ.tax_org_accept }">
                                                                    <c:out value="${listCQT.ten_cq_thue }" />
                                                                </c:if>
                                                            </c:forEach></td>
                                                        <td align="left"><c:out value="${listQ.email}" />&nbsp;</td>
                                                        <td align="right"><c:out value="${listQ.mobile}" />&nbsp;</td>
                                                        <td align="left"><c:out value="${listQ.title}" />&nbsp;</td>
                                                        <td align="right"><fmt:formatDate value="${listQ.createTime}" type="both" pattern="dd/MM/yyyy" />&nbsp;</td>
                                                        <td align="right"><fmt:formatDate value="${listQ.approve_time}" type="both" pattern="dd/MM/yyyy" />&nbsp;</td>
                                                        <td align="left"><btt:label text="${listQ.status}" />&nbsp;</td>
                                                        <td style="display:none;"><c:out value="${listQ.messageId}"/> </td>
                                                        <td align="left"><a href="<btt:uri action="${pageContext.request.contextPath}/Request" nextEventName="view" errorPage="error_page.jsp"></btt:uri>&currentMess=<c:out value="${listQ.messageId}"/>">Xem</a></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                            </div>
                        </div>
                    </div>
        </c:if>
    <c:when test="${empty boardList || fn:length(boardList)<1}">

    </c:when>
    <c:otherwise>
    <div class="tab-content">
        <h3>Kết quả tra cứu</h3>
        <obs:pagination dataNameForList="messageBoardPagination" dataName="messageBoardList" action="${context}/Request" nextEventName="query" errorPage="error_page.jsp"
						pageTxt1="info.pagination.txt1" pageTxt2="info.pagination.txt2" alertNotInputTxt="info.pagination.alert.inputpn"
						alertPNErrorTxt="info.pagination.alert.pnerror" leftArrowImg="${context}/static/images/pagination_left.gif"
						rightArrowImg="${context}/static/images/pagination_right.gif" gotoPageImg="${context}/static/images/pagination_go.gif" />
        <div class="frm_member">
            <div class="tbl_member">
                <table id="data_content_onday" style="margin-left: 0" width="100%" border="0" cellspacing="0" cellpadding="0" class="md_list2">
					<thead style="border: 0px;">

						<tr>
							<th width="50px;"><btt:label text="info.messageboard.item.taxAgencyCode" /></th>
							<th><btt:label text="info.messageboard.item.taxAgencyName" /></th>
							<th><btt:label text="info.notificatin_service_create.item.email" /></th>
							<th width="100px;"><btt:label text="info.messageboard.item.telephone" /></th>
							<th><btt:label text="info.messageboard.item.subject" /></th>
							<th><btt:label text="info.messageboard.item.questionDate" /></th>
							<th><btt:label text="info.messageboard.item.answerDate" /></th>
							<th width="80px;"><btt:label text="info.messageboard.item.status" /></th>
							 <td style="display:none;"></td>
							<th width="50px;"><btt:label text="info.messageboard.item.detail" /></th>

						</tr>
						</thead>
						<tbody id="allResultTableBody">
						 <c:if test="${empty _pageIndex}">
				    <c:set var="_pageIndex" value="1" scope="page"/>
				</c:if>
				<c:set var="count" value="${(pageSize*(_pageIndex-1))+1}" scope="page" />
						<c:forEach items="${boardList}" var="board" varStatus="status">
							<tr>

								<td align="right"><c:out value="${board.tax_org_accept}" />&nbsp;</td>
								<td align="left"><c:forEach items="${Params.getListCQT }" var="listCQT" varStatus="StVs">
										<c:if test="${listCQT.ma_cq_thue==board.tax_org_accept }">
											<c:out value="${listCQT.ten_cq_thue }" />
										</c:if>
									</c:forEach></td>
								<td align="left"><c:out value="${board.email}" />&nbsp;</td>
						        <td align="right"><c:out value="${board.mobile}" />&nbsp;</td>
						        <td align="left"><c:out value="${board.title}" />&nbsp;</td>
						        <td align="right"><fmt:formatDate value="${board.createTime}" type="both" pattern="dd/MM/yyyy" />&nbsp;</td>
						        <td align="right"><fmt:formatDate value="${board.approve_time}" type="both" pattern="dd/MM/yyyy" />&nbsp;</td>
						        <td align="left"><btt:label text="${board.status}" />&nbsp;</td>
						        <td style="display:none;"><c:out value="${board.messageId}"/> </td>
					            <td align="left"><a href="<btt:uri action="${pageContext.request.contextPath}/Request" nextEventName="view" errorPage="error_page.jsp"></btt:uri>&currentMess=<c:out value="${board.messageId}"/>">Xem</a></td>
							</tr>
							<c:set var="count" value="${count + 1}" scope="page"/>
						</c:forEach>
						</tbody>
					</table>
            </div>
        </div>
    </div>
    </c:otherwise>
</div> 
</btt:form>
<div id="cqt_NTDT" title="<btt:label text="info.messageboard.item.searchCQT" />">
		<table id="" width="100%" border="0" cellpadding="0" cellspacing="0" class="form_table" style="padding-bottom: 20px">
			<tr>
				<td width="40%" align="right" ><span style="color: #CB0021"></span>
					<btt:label text="info.messageboard.item.taxAgencyCode" /></td>
				<td width="5%" align="left" ><input type="text" name="_maCQTSearch"
					id="maCQTSearch" style="width:150px;" value="${_maCQTSearch}" /></td>
				<td width="40%" align="right" ><span style="color: #CB0021"></span>
					<btt:label text="info.messageboard.item.taxAgencyName" /></td>
				<td width="5%" align="left" ><input type="text"	name="_tenCQTSearch"
					id="tenCQTSearch" style="width:150px;" value="${_tenCQTSearch}" /></td>
				<td width="10%" align="left">
					<input id="submit2" type="button"  value="<btt:label text='info.messageboard.item.search'/>" onClick="javascript:searchCQT();" /></td>
			</tr>
		</table>

		<div id="divCQT" class="tbody_scroll1">
			<table id="" width="100%" border="0" cellspacing="0" cellpadding="0" class="md_list2">
				<thead>
					<tr>
						<th width="10%"><btt:label text="info.messageboard.item.select" /></th>
						<th width="10%"><btt:label text="info.messageboard.item.taxAgencyCode" /></th>
						<th width="20%"><btt:label text="info.messageboard.item.taxAgencyName" /></th>
						<th width="30%"><btt:label text="info.messageboard.item.address" /></th>
					</tr>
				</thead>
				<c:choose>
					<c:when test="${empty Params.listCQT || fn:length(Params.listCQT)<1}">
						<c:if test="${Params.plat == 'aaa'}"><div align="center" style="padding-bottom: 10px;">
							<strong><btt:label text="info.title.norecords" /> </strong>
						</div></c:if>
					</c:when>
					<c:otherwise>
						<c:set var="count" value="1" scope="page" />
						<tbody id="tbdListCQT">
						<c:forEach items="${Params.listCQT}" var="info" varStatus="status">
							<tr height="35px">
							    <td><input type="radio" id="no" class="aaaa" name="abc" value="${info.ma_cq_thue}|${info.ten_cq_thue}" /></td>
								<td><c:if test="${empty info.ma_cq_thue}">&nbsp;</c:if>${info.ma_cq_thue}</td>
								<td><c:if test="${empty info.ten_cq_thue}">&nbsp;</c:if>${info.ten_cq_thue}</td>
								<td><c:if test="${empty info.dia_chi}">&nbsp;</c:if>${info.dia_chi}</td>
							</tr>
						</c:forEach>
						</tbody>
					</c:otherwise>
				</c:choose>
			</table>
		</div>
	</div>