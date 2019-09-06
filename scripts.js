console.log('hello world');

function getUrlParams(url) {
  var queryString = url ? url.split('?')[1] : window.location.search.slice(1);
  var obj = {};

  if (queryString) {
    queryString = queryString.split('#')[0];
    var arr = queryString.split('&');

    for (var i = 0; i < arr.length; i++) {
      var a = arr[i].split('=');
      var paramName = a[0];
      var paramValue = typeof a[1] === 'undefined' ? true : a[1];

      paramName = paramName.toLowerCase();
      if (typeof paramValue === 'string') paramValue = paramValue.toLowerCase();

      if (paramName.match(/\[(\d+)?\]$/)) {
        var key = paramName.replace(/\[(\d+)?\]/, '');
        if (!obj[key]) obj[key] = [];

        if (paramName.match(/\[\d+\]$/)) {
          var index = /\[(\d+)\]/.exec(paramName)[1];
          obj[key][index] = paramValue;
        } else {
          obj[key].push(paramValue);
        }
      } else {
        if (!obj[paramName]) {
          obj[paramName] = paramValue;
        } else if (obj[paramName] && typeof obj[paramName] === 'string') {
          obj[paramName] = [obj[paramName]];
          obj[paramName].push(paramValue);
        } else {
          obj[paramName].push(paramValue);
        }
      }
    }
  }

  return obj;
}
let params = getUrlParams();

const mcintireLogo =
  'https://s3-us-west-2.amazonaws.com/s.cdpn.io/674055/logo-uvaMcIntire.svg';
const dardenLogo =
  'https://s3-us-west-2.amazonaws.com/s.cdpn.io/674055/logo-darden-mcintire.svg';
const anchor = document.querySelector('.logo-wrap');
const logo = anchor.children[0];

if (params.program == 'msba') {
  anchor.href = 'https://msba.virginia.edu';
  logo.src = dardenLogo;
} else {
  anchor.href = 'https://commerce.virginia.edu';
  logo.src = mcintireLogo;
}
