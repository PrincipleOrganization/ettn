import { dialog } from '../../utils';

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
};