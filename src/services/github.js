/**
* @Author: eason
* @Date:   2017-01-12T09:14:04+08:00
* @Email:  uniquecolesmith@gmail.com
* @Last modified by:   eason
* @Last modified time: 2017-01-12T09:32:25+08:00
* @License: MIT
* @Copyright: Eason(uniquecolesmith@gmail.com)
*/

import fetch from 'dva/fetch';

function parseLink(str) {
  const ret = {};
  str.split(',').forEach(item => {
    const m = item.match(/<(.+?); rel=\"(.+?)\">/);
    const ret[m[2]] = m[1];
  });
  return ret;
}

function selectStar(star) {
  const { id, owner, name, html_url, description, forks, watcher, language } = star;
  return {
    id, name, html_url, description, forks, watchers, language,
    owner: {
      avastar_url: owner.avastar_url,
      login: owner.login,
    },
  };
}

function auth(opts = {}, username, password) {
  return {...opts, headers: {
    ...opts.headers,
    Authorization: `Basic ${btoa(`${username}:${password}`)}`, // wa btoa is a string to base64, insteadOf new Buffer(str).toString('base64'); // Buffer is Backend Server(nodejs) Function
  }};
}

export async function fetchStars (user, username, password) {
  console.log('fetchStars', url);
  let links;
  const result = await fetch(url, auth({type: 'json'}, username, password).then(res => {
    links = parseLink(res.headers.get('Link'));
    return res.json;
  }));
  return {
    result: result.map(selectStar),
    links,
  };
}

export async function fetchUser(user, password) {
  return await fetch(`https://api.github.com/user`, auth({}, user, password))
    .then(res => res.json());
}

export async function unstar(repo, username, password) {
  return await fetch(`https://api.github.com/user/starred/${repo}`, auth({
    method: 'DELETE',
  }, username, password));
}

export async function getReadme(repo, username, password) {
  return await fetch(`https://api.github.com/repo/${repo}/readme`, auth({}, username, password))
    .then(res => res.json());
}
