/* eslint-env browser */

const print = document.getElementById('print');
if (print) print.addEventListener('click', () => window.print());

const toast = document.getElementById('toast');
if (toast)
  document.getElementsByClassName('toast__button--close')[0].onclick =
    function closeToast() {
      toast.style.display = 'none';
    };

const inputs = document.querySelectorAll('.file-input');

function deleteTodo(el) {
  
}

function updateTodo() {
  
}

function paginate() {
  
}
/*
aa() {
  // Check if site's storage has been marked as persistent
  if (navigator.storage && navigator.storage.persist) {
    const isPersisted = await navigator.storage.persisted();
    console.log(`Persisted storage granted: ${isPersisted}`);
    // Request persistent storage for site
    const isPersist = await navigator.storage.persist();
    console.log(`Persisted storage granted: ${isPersist}`);
  }
} */

// make the whole serviceworker process into a promise so later on we can
// listen to it and in case new content is available a toast will be shown
window.isUpdateAvailable = new Promise((resolve, reject) => {
  // lazy way of disabling service workers while developing
  if (
    'serviceWorker' in navigator &&
    ['localhost', '127'].indexOf(window.location.hostname) === -1
  ) {
    // register service worker file
    navigator.serviceWorker
      .register('service-worker.js')
      .then(reg => {
        reg.onupdatefound = () => {
          const installingWorker = reg.installing;
          installingWorker.onstatechange = () => {
            if (installingWorker.state === 'installed') {
              if (navigator.serviceWorker.controller) {
                // new update available
                resolve(true);
              } else {
                // no update available
                reject();
              }
            }
          };
        };
      })
      .catch(err => {
        console.error('[SW ERROR]', err);
        reject();
      });
  }
});
