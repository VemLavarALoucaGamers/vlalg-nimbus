(function() {
  // Creating the <link> for CSS file
  var link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = './bee-css-reset.min.css';

  // Adding the <link> element to <head> element
  document.head.appendChild(link);
})()
