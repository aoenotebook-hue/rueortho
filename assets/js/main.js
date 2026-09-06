// Mobile navigation toggle
(function () {
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('primary-nav');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', function () {
    var open = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(open));
  });
})();

// Condition search filter (homepage only)
(function () {
  var input = document.getElementById('condition-filter');
  var grid = document.getElementById('condition-grid');
  if (!input || !grid) return;

  var cards = Array.prototype.slice.call(grid.querySelectorAll('[data-keywords]'));
  var empty = document.getElementById('condition-empty');

  input.addEventListener('input', function () {
    var q = input.value.trim().toLowerCase();
    var shown = 0;

    cards.forEach(function (card) {
      var match = q === '' || card.dataset.keywords.toLowerCase().indexOf(q) !== -1;
      card.hidden = !match;
      if (match) shown++;
    });

    if (empty) empty.hidden = shown !== 0;
  });
})();
