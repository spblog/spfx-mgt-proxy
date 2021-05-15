import * as React from 'react';
import { FC, useEffect, useState } from 'react';
import { AadHttpClient, HttpClientResponse } from '@microsoft/sp-http';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import { Spinner } from '@microsoft/office-ui-fabric-react-bundle';
import { Person, PersonViewType, Login } from '@microsoft/mgt-react';

export interface Props {
  context: WebPartContext;
}

export const MgtProxy: FC<Props> = ({ context }) => {

  const [error, setError] = useState<any>();
  const [working, setWorking] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        const client = await context.aadHttpClientFactory.getClient('14bfb200-fe7b-44ac-b19f-08d9fc2f833e');
        const result = await (await client.get('https://localhost:44320/mails', AadHttpClient.configurations.v1)).json();
        console.log(result);
      } catch (error) {
        setError(error);
      } finally {
        setWorking(false);
      }
    }

    //getData();
  }, []);

  if (error) {
    return (
      <div>
        <h3>An error occured:</h3>
        <pre><code>{error.toString()}</code></pre>
      </div>
    )
  }

  if (working) {
    return (
      <Spinner />
    )
  }

  return (
    <div>
      <Person personQuery="me" view={PersonViewType.twolines} />
    </div>
  )
}

export default MgtProxy;