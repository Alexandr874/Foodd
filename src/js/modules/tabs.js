

function tabs(tabsContentSelector, tabsSelector, tabsParentSelector, activClass) {
    
    const tabsContent = document.querySelectorAll(tabsContentSelector),
          tabs = document.querySelectorAll(tabsSelector),
          tabsParent = document.querySelector(tabsParentSelector);

          function hiddenTabsContent() {
            tabsContent.forEach(item => {
                item.classList.add('hide');
                item.classList.remove('show', 'fade');
            });

            tabs.forEach(item => {
                item.classList.remove(activClass);
            });
          }
          hiddenTabsContent();
          
          function showTabsContent(i = 0) {
            tabsContent[i].classList.add('show', 'fade');
            tabsContent[i].classList.remove('hide');

            tabs[i].classList.add(activClass);
          }
          showTabsContent();

          tabsParent.addEventListener('click', (e) => {
                const target = e.target;
                if (target && target.classList.contains(tabsSelector.slice(1))) {
                    tabs.forEach((item, i) => {
                        item.addEventListener('click', () => {
                            if (target === item) {
                                hiddenTabsContent();
                                showTabsContent(i);
                            }

                        });

                    });
                }

          });



}
export default tabs;