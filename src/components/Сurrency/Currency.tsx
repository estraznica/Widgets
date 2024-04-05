import './currency.css';

import { WidgetSettings } from '../../types';
interface Props {
  settings: WidgetSettings;
}

export default function CurencyWidget(props: Props) {
  const { settings } = props;
  return (
    <>
      <div className="currency"></div>
    </>
  );
}
