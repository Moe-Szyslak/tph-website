var showText = function (target, message, index, interval) {   
    if (index < message.length) {
      $(target).append(message[index++]);
      setTimeout(function () { showText(target, message, index, interval); }, interval);
    }
  }

  document.querySelector('body').addEventListener('click', function() {
    document.querySelector('body').classList.add("open");
  });