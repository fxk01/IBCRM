/**
 * Created by
 */

window._paq = [];

export function sendPageInfo(user_id) {
	_paq.push(['setUserId', user_id]);
  (function() {
    let u = "http://168.61.2.107/crm/";                // 采集项目地址
    _paq.push(['setTrackerUrl', u + 'piwik.php']);
    _paq.push([ 'setSiteId',8]);    // 设置网站系统编号，PC为7，铃客为8
		let d = document, g = d.createElement('script'), s = d
      .getElementsByTagName('script')[0];
    g.type = 'text/javascript';
    g.async = true;
    g.defer = true;
    g.src = u + 'piwik.js';
    s.parentNode.insertBefore(g, s);
  })();
}

export function sendPageMessage(nav_1st_name,nav_2nd_name) {
	_paq.push(["setDomains", ["http://192.168.55.21:1500"]]);               //设置为测试环境金融资讯中心域名;例：http://192.168.55.104
	_paq.push(['setCustomVariable','1','nav_1st',nav_1st_name]);            //nav_1st_name为一级菜单名称，为变量，需传入
	_paq.push(['setCustomVariable','2','nav_2nd',nav_2nd_name]);             //nav_2nd_name为二级级菜单名称，为变量，需传入
	_paq.push(['trackPageView']);
	_paq.push(['enableLinkTracking']);
}