import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'MgtProxyWebPartStrings';
import MgtProxy from './components/MgtProxy';
import { ProxyProvider } from '@microsoft/mgt-proxy-provider';
import { Providers } from '@microsoft/mgt-element';

export interface IMgtProxyWebPartProps {
  description: string;
}

export default class MgtProxyWebPart extends BaseClientSideWebPart<IMgtProxyWebPartProps> {

  public onInit(): Promise<void> {
    Providers.globalProvider = new ProxyProvider("https://localhost:44320/api/GraphProxy", async () => {
      const provider = await this.context.aadTokenProviderFactory.getTokenProvider();
      const token = await provider.getToken('14bfb200-fe7b-44ac-b19f-08d9fc2f833e');
      return {
        Authorization: `Bearer ${token}`,
      };
    });

    return Promise.resolve();
  }

  public render(): void {
    this.context
    const element: React.ReactElement = React.createElement(
      MgtProxy
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
