var element = document.querySelector('.droppable');

function callback(files) {
  console.log(files);
}

makeDroppable(element, callback);
