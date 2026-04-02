import { ICredentialType, INodeProperties } from 'n8n-workflow';

export class AcumaticaCloudERPApi implements ICredentialType {
	name = 'acumaticaCloudERPApi';

	displayName = 'Acumatica Cloud ERP API';

	documentationUrl = 'https://help.acumatica.com/';

	properties: INodeProperties[] = [
		{
			displayName: 'Tenant URL',
			name: 'tenantUrl',
			type: 'string',
			default: '',
			placeholder: 'https://your-tenant.acumatica.com',
			description: 'The base URL of your Acumatica tenant',
			required: true,
		},
		{
			displayName: 'Client ID',
			name: 'clientId',
			type: 'string',
			default: '',
			description: 'OAuth 2.0 Client ID registered in Acumatica',
			required: true,
		},
		{
			displayName: 'Client Secret',
			name: 'clientSecret',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
			description: 'OAuth 2.0 Client Secret',
			required: true,
		},
		{
			displayName: 'Endpoint Name',
			name: 'endpointName',
			type: 'string',
			default: 'Default',
			description: 'The endpoint name for API calls',
			required: true,
		},
		{
			displayName: 'Entity Version',
			name: 'entityVersion',
			type: 'string',
			default: '23.200.001',
			description: 'The entity version for API calls',
			required: true,
		},
	];
}