const UTENSEAL_BUTTON_CONTENT = '🦭';
const UTENSEAL_BUTTON_CLASS = 'refresh-button';
const UTENSEAL_BUTTON_ROTATE_CLASS = 'rotate-once';
const CONTENT_IDS = {
  teaser: ["article-content-head.subtitle", "teaser-text.teaserText"],
  title: ["article-content-head.title", "teaser-title.teaserTitle"],
};

const suggest = (contentType) => {};

function addutensealButtons(contentIds) {

  Object.keys(contentIds).forEach((contentType) => {
    contentIds[contentType].forEach((contentId) => {
      const element = document.getElementById(contentId);
      if (element) {
        const utensealButton = document.createElement('div');
        utensealButton.innerText = UTENSEAL_BUTTON_CONTENT;
        utensealButton.className = UTENSEAL_BUTTON_CLASS;
        utensealButton.addEventListener('click', () => {
          
          // chrome.runtime.sendMessage({ method: "suggest", contentType });
          suggest(contentType);
          utensealButton.classList.add(UTENSEAL_BUTTON_ROTATE_CLASS);
          utensealButton.addEventListener('animationend', function () {
            utensealButton.classList.remove(UTENSEAL_BUTTON_ROTATE_CLASS);
          }, { once: true });
        });

        if (!element.nextElementSibling || element.nextElementSibling.innerText !== UTENSEAL_BUTTON_CONTENT) {
          element.after(utensealButton);
        }
      }
    });
  });
}

const observer = new MutationObserver((_, observer) => {
  if (document.getElementById('editable-body')) {
    checkForNewArticle();
    // chrome.runtime.sendMessage('get-content-ids', (contentIds) => {
    //   addutensealButtons(contentIds);
    // });
    addutensealButtons(CONTENT_IDS);
  }
});

observer.observe(document.body, { childList: true, subtree: true });

const checkForNewArticle = () => {
  const articleId = document.body.dataset.uniqueid;
  // chrome.storage.session.get('articleId', function (result) {
  //   if (result.articleId && result.articleId !== articleId) {
  //     chrome.storage.session.clear();
  //     chrome.runtime.sendMessage({ method: "clear-panel" });
  //   }
  //   chrome.storage.session.set({ articleId });
  // });
  console.log("TODO: Implement checkForNewArticle");
}
