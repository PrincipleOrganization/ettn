import swal from 'sweetalert2';

import { BRAND_COLOR } from '../constants';

export const showError = (e, redirect = null) => {
  if (e) {
    for (let i = 0; i < e.length; i += 1) {
      swal({
        title: 'От халепа...',
        text: e[i].toString(),
        type: 'error',
        confirmButtonColor: BRAND_COLOR,
        preConfirm: () => (
          new Promise((resolve) => {
            if (redirect) {
              redirect();
            }
            resolve();
          })
        ),
      });
    }
    return e.length !== 0;
  }
  return false;
};

export const showQuestionDialog = (html, fn) => {
  swal({
    html,
    type: 'question',
    showCancelButton: true,
    confirmButtonText: 'Так',
    cancelButtonText: 'Ні',
    confirmButtonColor: BRAND_COLOR,
    showLoaderOnConfirm: true,
    useRejections: false,
    preConfirm: () => (
      new Promise((resolve) => {
        fn();
        resolve();
      })
    ),
  });
};

export const showOnCloseDialog = (fn) => {
  showQuestionDialog(
    'Дані було змінено. Відкинути зміни та закрити?',
    fn,
  );
};

export const showConfirmedAsyncDialog = (firstStepHtml, secondStepHtml, fn) => {
  let confirmed = false;
  swal({
    html: firstStepHtml,
    type: 'question',
    showCancelButton: true,
    confirmButtonText: 'Так',
    cancelButtonText: 'Ні',
    confirmButtonColor: BRAND_COLOR,
    showLoaderOnConfirm: true,
    useRejections: false,
    preConfirm: () => (
      new Promise(async (resolve) => {
        await fn();
        confirmed = true;
        resolve();
      })
    ),
  })
  .then(() => {
    if (confirmed) {
      swal({
        html: secondStepHtml,
        type: 'success',
        confirmButtonColor: BRAND_COLOR,
      });
    }
  });
};