module.exports = {
  ucFirst($text) {
    const ucfirst = $text
      .replace('_', ' ')
      .toLowerCase()
      .split(' ')
      .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
      .join(' ')
    return ucfirst
  },
}
