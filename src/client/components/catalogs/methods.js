import { dialog } from '../../utils';

export const deleteDialog = (context, marked, isList = true) => {
  let text = 'Ви хочете помітити на видалення?';
  if (marked) {
    text = 'Ви хочете зняти помітку на видалення?';
  }
  dialog.showQuestionDialog(
    text,
    async () => {
      await context.handleDelete();
      if (isList) {
        context.setState({ activeRow: null });
      }
    },
  );
};