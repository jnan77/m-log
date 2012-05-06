/**
 * 
 */
package org.mspring.platform.dao.query;

import java.util.Map;

import org.mspring.platform.web.xwork.interceptor.QueryParameterAware;

/**
 * @author Gao Youbo
 * @since Mar 21, 2012
 */
public class QueryContext {
    private QueryParameterAware action;
    private Map requestParams;

    public QueryContext(QueryParameterAware action, Map requestParams) {
        this.action = action;
        this.requestParams = requestParams;
    }

    public QueryParameterAware getAction() {
        return this.action;
    }

    public Map getRequestParams() {
        return this.requestParams;
    }

    public String toString() {
        return "QueryContext[action=" + this.action + ", requestParams=" + this.requestParams + "]";
    }
}
