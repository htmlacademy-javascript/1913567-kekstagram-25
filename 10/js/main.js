import './server-data.js';
import './create-miniature.js';
import {openModal} from './show-post.js';
import './submit-form.js';
import {filters} from'./filter.js';
import { getData } from './server-data.js';
import { getFragmentPictures } from './create-miniature.js';

function init () {
  getData(getFragmentPictures)
    .then((posts) => {
      filters(posts);
      openModal(posts);
    });
}

init();
