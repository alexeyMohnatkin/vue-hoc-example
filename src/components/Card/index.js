import Card from './Card';
import SimpleHoc from './SimpleHoc';
import SimpleHocJsx from './SimpleHocJsx';
import WithButtons from './WithButtons';
import Editable from './Editable';

const SimpleHocCard = SimpleHoc(Card);
const SimpleHocCardJsx = SimpleHocJsx(Card);
const CardWithButtons = WithButtons(Card);
const EditableCard = Editable(Card);
const AllTogether = WithButtons(Editable(Card));

export {
  Card,
  SimpleHocCard,
  SimpleHocCardJsx,
  CardWithButtons,
  EditableCard,
  AllTogether,
};
