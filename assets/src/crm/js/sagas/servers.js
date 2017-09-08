/**
 * Created by Administrator on 2016/12/23.
 */
import fetch from 'isomorphic-fetch'
import {default as _} from "lodash"

let handleRequest = (url,method,data)=> {
	let reqConfig = {};
	function fetchApi(resolve, reject) {
    reqConfig.method = config.method;
		try {
			fetch(url,reqConfig)
				.then(response => resolve(response.json()))
		}catch (err){
			reject(err)
		}
	}
	if (method&&!data&&(method.toString().toLocaleUpperCase()!=="GET"||method.toString().toLocaleUpperCase()!=="POST")){
		data=method;
		method="GET"
	}
	data = data || {};
	method = method || "GET";
	let config = {
		method:method,
		url:url
	};
	if("POST" === method || "post" === method ){
    reqConfig.body = JSON.stringify(data);
    reqConfig=Object.assign(reqConfig,{headers: {"Content-Type": "application/json"}});
	}else if("GET" === method || "get" === method){
		config.url += "?";
		_.forIn(data,(key,value)=>{
			config.url += `${key}=${value}`;
		});
	}
	return new Promise(function (resolve,reject) {
    fetchApi(resolve, reject)
  });
};

export default handleRequest;