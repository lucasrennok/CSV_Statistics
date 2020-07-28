var element = document.querySelector('.droppable');

function callback(files) {
  console.log(files);
  let drop = document.getElementById("drop_f");
  drop.innerHTML = files.length+" Files Selected";
}

makeDroppable(element, callback);
