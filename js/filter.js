import {getFragmentPictures, picturesBlock} from './create-miniature.js';
import {getRandomInt} from './util.js';
import { debounce } from './util.js';

const TIMEOUT_DELAY = 500;

const filtersButton = document.querySelectorAll('.img-filters button');
const defaultFilterButton = document.querySelector('#filter-default');
const randomFilterButton = document.querySelector('#filter-random');
const discusedFilterButton = document.querySelector('#filter-discussed');

function filters (posts) {
  const blockFilters = document.querySelector('.img-filters');
  blockFilters.classList.remove('img-filters--inactive');

  onDefaultButton(debounce(
    () => getFragmentPictures(posts),
    TIMEOUT_DELAY
  ));

  const randomArray = [];
  posts.some((post) => {
    if (getRandomInt(0, 1)) {
      randomArray.push(post);
    }
    if (randomArray.length === 10) {
      return true;
    }
  });

  onRandomButton(debounce(
    () => getFragmentPictures(randomArray),
    TIMEOUT_DELAY
  ));

  const descendingArray = posts.slice().sort(compareCountComments);

  onDiscusedButton(debounce(
    () => getFragmentPictures(descendingArray),
    TIMEOUT_DELAY
  ));


}

function clickButton (evt) {
  evt.preventDefault();
  filtersButton.forEach((element) => {
    element.classList.remove('img-filters__button--active');
  });

  evt.target.classList.add('img-filters__button--active');
  const postsElement = picturesBlock.querySelectorAll('.picture');
  const postArray = Array.from(postsElement);
  postArray.forEach((element) => {
    element.remove();
  });
}

function onDefaultButton (cb) {
  defaultFilterButton.addEventListener('click', (evt) => {
    clickButton(evt);
    cb();
  });
}

function onRandomButton (cb) {

  randomFilterButton.addEventListener('click', (evt) => {
    clickButton(evt);
    cb();

  });
}

function onDiscusedButton (cb) {
  discusedFilterButton.addEventListener('click', (evt) => {
    clickButton(evt);
    cb();
  });
}

function compareCountComments (commentA, commentB) {
  const countCommentA = commentA.comments.length;
  const countCommentB = commentB.comments.length;

  return countCommentB - countCommentA;
}


export {filters};
