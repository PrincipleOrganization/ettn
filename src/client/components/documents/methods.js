<<<<<<< HEAD
import { dialog, catalogs } from '../../utils';
=======
import { dialog } from '../../utils';
>>>>>>> 7283fdfa370d4d407c3eaed6cae66ba0b307df10

export const Types = {
  INCOME: 'income',
  OUTCOME: 'outcome',
};

export const deleteDialog = (context, id, marked, isList = true) => {
  let text = 'Ви хочете помітити на видалення?';
  if (marked) {
    text = 'Ви хочете зняти помітку на видалення?';
  }
  dialog.showQuestionDialog(
    text,
    async () => {
      await context.handleDelete(id, marked);
      if (isList) {
        context.setState({ activeRow: null });
      }
    },
  );
<<<<<<< HEAD
};

export const generateGoodsString = (catalog, goods) => {
  let goodsString = '';
  for (let i = 0; i < goods.length; i += 1) {
    if (goods[i].nomenclature) {
      goodsString += `${catalogs.getCatalogNameById(catalog, goods[i].nomenclature)}, `;
    }
  }
  if (goodsString) {
    goodsString = goodsString.substring(0, goodsString.length - 2);
  }
  return goodsString;
};
=======
};
>>>>>>> 7283fdfa370d4d407c3eaed6cae66ba0b307df10
