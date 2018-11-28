let diff = [];
export default function recurseDiff(olds, news, path = '') {
  //if both old and new node are (real) objects/arrays with items to iterate over
  if (
    (typeof olds === 'object' && olds !== null) &&
    (typeof news === 'object' && news !== null) &&
    (Object.keys(olds).length > 0 || olds.length > 0) &&
    (Object.keys(news).length > 0 || news.length > 0)
  ) {

    for (let key in olds) {
      // if two sub-items aren't the same and they are both objects with stuff to iterate over

      if (JSON.stringify(olds[key]) !== JSON.stringify(news[key])) {
        if (
          (typeof olds[key] === 'object' && olds[key] !== null) &&
          (typeof news[key] === 'object' && news[key] !== null) &&
          (Object.keys(olds).length > 0 || olds.length > 0) &&
          (Object.keys(news).length > 0 || news.length > 0)
        ) {
          //console.log('*no match, recurse objects!', olds[key], news[key])
          // keep track of which component we're in
          let breadcrumb;
          (olds.name === undefined && news.name === undefined) ?
            breadcrumb = '' :
            breadcrumb = olds.name + '/' + key + '>>';
          // recurse on the item
          recurseDiff(olds[key], news[key], path += breadcrumb)
        } else {
          // push the old vs new items into the diff array
          let obj = {
            component: path,
            oldState: olds,
            newState: news
          };

          diff.unshift(obj)
        }

      }
    }
    return diff;
  }
}