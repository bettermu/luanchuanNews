//动态添加SEO信息
export function addSeo(key, des) {

  let flag = true

  let metaDoms = document.getElementsByTagName('meta')
  for (let i = 0; i < metaDoms.length; i++) {
    if (metaDoms[i].name === 'keywords' || metaDoms[i].name === 'description') {
      flag = false
      return
    }
  }
  if (flag) {
    let keyMeta = document.createElement('meta')
    let DesMeta = document.createElement('meta')
    let headDom = document.getElementsByTagName('head')[0]
    keyMeta.name = 'keywords'
    keyMeta.content = key
    DesMeta.name = 'description'
    DesMeta.content = des
    headDom.insertBefore(keyMeta, headDom.children[3])
    headDom.insertBefore(DesMeta, headDom.children[3])
  }
}