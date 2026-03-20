import { Flexbox, SortableList } from '@lobehub/ui';
import { type AiProviderModelListItem } from 'model-bank';
import { memo } from 'react';

import PicturaModelIcon from '@/components/PicturaModelIcon';

const ListItem = memo<AiProviderModelListItem>(({ id, displayName }) => {
  return (
    <>
      <Flexbox horizontal gap={8}>
        <PicturaModelIcon model={id} size={24} />
        {displayName || id}
      </Flexbox>
      <SortableList.DragHandle />
    </>
  );
});

export default ListItem;
