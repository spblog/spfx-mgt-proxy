import * as React from 'react';
import { FC } from 'react';
import { Person, PersonViewType, Login, PersonCardInteraction } from '@microsoft/mgt-react';

export const MgtProxy: FC = () => {
  return (
    <div>
      <Person personQuery="me" view={PersonViewType.twolines} personCardInteraction={PersonCardInteraction.hover} />
    </div>
  )
}

export default MgtProxy;