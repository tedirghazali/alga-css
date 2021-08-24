module.exports = (calc) => {
  return calc
        .replace(',', '.')
        .replace('sub', ' - ')
        .replace('add', ' + ')
        .replace('div', ' / ')
        .replace('mul', ' * ')
        .replace('mod', ' % ')
        .replace('exp', ' ** ')
}
