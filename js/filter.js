import {getData} from './server-data.js';
import {getFragmentPictures, picturesBlock} from './create-miniature.js';
import {getRandomInt} from './util.js';

function filters (posts) {
  const blockFilters = document.querySelector('.img-filters');
  blockFilters.classList.remove('img-filters--inactive');
  const filtersButton = document.querySelectorAll('.img-filters button');
  const defaultFilterButton = document.querySelector('#filter-default');
  const randomFilterButton = document.querySelector('#filter-random');
  const discusedFilterButton = document.querySelector('#filter-discussed');
  console.log(posts);



  // filtersButton.forEach((element) => {
  //   element.classList.remove('img-filters__button--active');

  //   element.addEventListener('click', (evt) => {
  //     evt.preventDefault();
  //     const clickButton = evt.target;
  //     clickButton.classList.add('img-filters__button--active');

  //     if (clickButton === defaultFilterButton) {
  //       picturesBlock.remove(posts);
  //       picturesBlock.append(copyPosts);
  //     }

  //     if (clickButton === randomFilterButton) {

  //       console.log(posts);
  //       for (let i = 15; i < posts.length; i++) {
  //         posts[i].remove();
  //       }
  //     }


  //   });
  // });


  defaultFilterButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    const postsElement = picturesBlock.querySelectorAll('.picture');
    const postArray = Array.from(postsElement);
    postArray.forEach((element) => {
      element.remove();
    });

    defaultFilterButton.classList.add('img-filters__button--active');
    randomFilterButton.classList.remove('img-filters__button--active');
    discusedFilterButton.classList.remove('img-filters__button--active');

    getFragmentPictures(posts);
  });

  randomFilterButton.addEventListener('click', (evt) => {
    evt.preventDefault();

    defaultFilterButton.classList.remove('img-filters__button--active');
    randomFilterButton.classList.add('img-filters__button--active');
    discusedFilterButton.classList.remove('img-filters__button--active');

    const randomArray = [];
    posts.some((post) => {
      if (getRandomInt(0, 1)) {
        randomArray.push(post);
      }
      if (randomArray.length === 10) {
        return true;
      }
    });

    const postsElement = picturesBlock.querySelectorAll('.picture');
    const postArray = Array.from(postsElement);
    postArray.forEach((element) => {
      element.remove();
    });

    getFragmentPictures(randomArray);

  });

  discusedFilterButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    defaultFilterButton.classList.remove('img-filters__button--active');
    randomFilterButton.classList.remove('img-filters__button--active');
    discusedFilterButton.classList.add('img-filters__button--active');


  });

}

function shuffle(arr){
  let j, temp;
  for(let i = arr.length - 1; i > 0; i--){
    j = Math.floor(Math.random()*(i + 1));
    temp = arr[j];
    arr[j] = arr[i];
    arr[i] = temp;
  }
  return arr;
}

function compareCountComments () {

}


export {filters};
