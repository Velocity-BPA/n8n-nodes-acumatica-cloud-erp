/**
 * Copyright (c) 2026 Velocity BPA
 * 
 * Licensed under the Business Source License 1.1 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *     https://github.com/VelocityBPA/n8n-nodes-acumaticaclouderp/blob/main/LICENSE
 * 
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {
  IExecuteFunctions,
  INodeExecutionData,
  INodeType,
  INodeTypeDescription,
  NodeOperationError,
  NodeApiError,
} from 'n8n-workflow';

export class AcumaticaCloudERP implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'Acumatica Cloud ERP',
    name: 'acumaticaclouderp',
    icon: 'file:acumaticaclouderp.svg',
    group: ['transform'],
    version: 1,
    subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
    description: 'Interact with the Acumatica Cloud ERP API',
    defaults: {
      name: 'Acumatica Cloud ERP',
    },
    inputs: ['main'],
    outputs: ['main'],
    credentials: [
      {
        name: 'acumaticaclouderpApi',
        required: true,
      },
    ],
    properties: [
      {
        displayName: 'Resource',
        name: 'resource',
        type: 'options',
        noDataExpression: true,
        options: [
          {
            name: 'Customer',
            value: 'customer',
          },
          {
            name: 'Sales Order',
            value: 'salesOrder',
          },
          {
            name: 'StockItem',
            value: 'stockItem',
          },
          {
            name: 'Sales Invoice',
            value: 'salesInvoice',
          },
          {
            name: 'PurchaseOrder',
            value: 'purchaseOrder',
          },
          {
            name: 'Vendor',
            value: 'vendor',
          },
          {
            name: 'Journal Transaction',
            value: 'journalTransaction',
          }
        ],
        default: 'customer',
      },
{
  displayName: 'Operation',
  name: 'operation',
  type: 'options',
  noDataExpression: true,
  displayOptions: { show: { resource: ['customer'] } },
  options: [
    { name: 'Create', value: 'create', description: 'Create a new customer', action: 'Create a customer' },
    { name: 'Delete', value: 'delete', description: 'Delete a customer', action: 'Delete a customer' },
    { name: 'Get', value: 'get', description: 'Get a customer by ID', action: 'Get a customer' },
    { name: 'Get All', value: 'getAll', description: 'List all customers', action: 'Get all customers' },
    { name: 'Update', value: 'update', description: 'Update a customer', action: 'Update a customer' },
  ],
  default: 'getAll',
},
{
  displayName: 'Operation',
  name: 'operation',
  type: 'options',
  noDataExpression: true,
  displayOptions: { show: { resource: ['salesOrder'] } },
  options: [
    { name: 'Create', value: 'create', description: 'Create a new sales order', action: 'Create a sales order' },
    { name: 'Delete', value: 'delete', description: 'Delete a sales order', action: 'Delete a sales order' },
    { name: 'Get', value: 'get', description: 'Get a sales order by type and number', action: 'Get a sales order' },
    { name: 'Get All', value: 'getAll', description: 'List all sales orders', action: 'Get all sales orders' },
    { name: 'Update', value: 'update', description: 'Update an existing sales order', action: 'Update a sales order' },
  ],
  default: 'getAll',
},
{
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	displayOptions: {
		show: {
			resource: ['stockItem'],
		},
	},
	options: [
		{
			name: 'Create',
			value: 'create',
			description: 'Create a new stock item',
			action: 'Create a stock item',
		},
		{
			name: 'Delete',
			value: 'delete',
			description: 'Delete a stock item',
			action: 'Delete a stock item',
		},
		{
			name: 'Get',
			value: 'get',
			description: 'Get a stock item by inventory ID',
			action: 'Get a stock item',
		},
		{
			name: 'Get All',
			value: 'getAll',
			description: 'List all stock items',
			action: 'Get all stock items',
		},
		{
			name: 'Update',
			value: 'update',
			description: 'Update a stock item',
			action: 'Update a stock item',
		},
	],
	default: 'getAll',
},
{
  displayName: 'Operation',
  name: 'operation',
  type: 'options',
  noDataExpression: true,
  displayOptions: { show: { resource: ['salesInvoice'] } },
  options: [
    { name: 'Get All', value: 'getAll', description: 'List all sales invoices', action: 'Get all sales invoices' },
    { name: 'Get', value: 'get', description: 'Get sales invoice by type and reference number', action: 'Get a sales invoice' },
    { name: 'Create', value: 'create', description: 'Create new sales invoice', action: 'Create a sales invoice' },
    { name: 'Update', value: 'update', description: 'Update sales invoice', action: 'Update a sales invoice' },
    { name: 'Delete', value: 'delete', description: 'Delete sales invoice', action: 'Delete a sales invoice' }
  ],
  default: 'getAll',
},
{
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	displayOptions: {
		show: {
			resource: ['purchaseOrder'],
		},
	},
	options: [
		{
			name: 'Create',
			value: 'create',
			description: 'Create a new purchase order',
			action: 'Create a purchase order',
		},
		{
			name: 'Delete',
			value: 'delete',
			description: 'Delete a purchase order',
			action: 'Delete a purchase order',
		},
		{
			name: 'Get',
			value: 'get',
			description: 'Get a purchase order by type and number',
			action: 'Get a purchase order',
		},
		{
			name: 'Get All',
			value: 'getAll',
			description: 'List all purchase orders',
			action: 'Get all purchase orders',
		},
		{
			name: 'Update',
			value: 'update',
			description: 'Update a purchase order',
			action: 'Update a purchase order',
		},
	],
	default: 'getAll',
},
{
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	displayOptions: {
		show: {
			resource: ['vendor'],
		},
	},
	options: [
		{
			name: 'Create',
			value: 'create',
			description: 'Create a new vendor',
			action: 'Create vendor',
		},
		{
			name: 'Delete',
			value: 'delete',
			description: 'Delete a vendor',
			action: 'Delete vendor',
		},
		{
			name: 'Get',
			value: 'get',
			description: 'Get a vendor by ID',
			action: 'Get vendor',
		},
		{
			name: 'Get All',
			value: 'getAll',
			description: 'List all vendors',
			action: 'Get all vendors',
		},
		{
			name: 'Update',
			value: 'update',
			description: 'Update a vendor',
			action: 'Update vendor',
		},
	],
	default: 'getAll',
},
{
  displayName: 'Operation',
  name: 'operation',
  type: 'options',
  noDataExpression: true,
  displayOptions: { show: { resource: ['journalTransaction'] } },
  options: [
    { name: 'Get All', value: 'getAll', description: 'List all journal transactions', action: 'Get all journal transactions' },
    { name: 'Get', value: 'get', description: 'Get journal transaction by batch number', action: 'Get journal transaction' },
    { name: 'Create', value: 'create', description: 'Create new journal transaction', action: 'Create journal transaction' },
    { name: 'Update', value: 'update', description: 'Update journal transaction', action: 'Update journal transaction' },
    { name: 'Delete', value: 'delete', description: 'Delete journal transaction', action: 'Delete journal transaction' }
  ],
  default: 'getAll',
},
{
  displayName: 'Customer ID',
  name: 'customerID',
  type: 'string',
  required: true,
  displayOptions: { show: { resource: ['customer'], operation: ['get', 'update', 'delete'] } },
  default: '',
  description: 'The ID of the customer',
},
{
  displayName: 'Customer Data',
  name: 'customerData',
  type: 'json',
  required: true,
  displayOptions: { show: { resource: ['customer'], operation: ['create', 'update'] } },
  default: '{}',
  description: 'Customer data as JSON object',
},
{
  displayName: 'Filter',
  name: 'filter',
  type: 'string',
  displayOptions: { show: { resource: ['customer'], operation: ['getAll'] } },
  default: '',
  description: 'OData $filter query parameter',
},
{
  displayName: 'Top',
  name: 'top',
  type: 'number',
  displayOptions: { show: { resource: ['customer'], operation: ['getAll'] } },
  default: 100,
  description: 'OData $top query parameter - number of records to return',
},
{
  displayName: 'Skip',
  name: 'skip',
  type: 'number',
  displayOptions: { show: { resource: ['customer'], operation: ['getAll'] } },
  default: 0,
  description: 'OData $skip query parameter - number of records to skip',
},
{
  displayName: 'Expand',
  name: 'expand',
  type: 'string',
  displayOptions: { show: { resource: ['customer'], operation: ['get', 'getAll'] } },
  default: '',
  description: 'OData $expand query parameter',
},
{
  displayName: 'Order Type',
  name: 'orderType',
  type: 'string',
  required: true,
  displayOptions: { show: { resource: ['salesOrder'], operation: ['get', 'update', 'delete'] } },
  default: '',
  description: 'The type of the sales order',
},
{
  displayName: 'Order Number',
  name: 'orderNbr',
  type: 'string',
  required: true,
  displayOptions: { show: { resource: ['salesOrder'], operation: ['get', 'update', 'delete'] } },
  default: '',
  description: 'The number of the sales order',
},
{
  displayName: 'Order Data',
  name: 'orderData',
  type: 'json',
  required: true,
  displayOptions: { show: { resource: ['salesOrder'], operation: ['create', 'update'] } },
  default: '{}',
  description: 'The sales order data as JSON object',
},
{
  displayName: 'Filter',
  name: 'filter',
  type: 'string',
  displayOptions: { show: { resource: ['salesOrder'], operation: ['getAll'] } },
  default: '',
  description: 'OData filter expression to filter the results',
},
{
  displayName: 'Top',
  name: 'top',
  type: 'number',
  displayOptions: { show: { resource: ['salesOrder'], operation: ['getAll'] } },
  default: 100,
  description: 'Number of records to return',
},
{
  displayName: 'Skip',
  name: 'skip',
  type: 'number',
  displayOptions: { show: { resource: ['salesOrder'], operation: ['getAll'] } },
  default: 0,
  description: 'Number of records to skip',
},
{
  displayName: 'Expand',
  name: 'expand',
  type: 'string',
  displayOptions: { show: { resource: ['salesOrder'], operation: ['get', 'getAll'] } },
  default: '',
  description: 'Related entities to expand in the response',
},
{
	displayName: 'Inventory ID',
	name: 'inventoryID',
	type: 'string',
	required: true,
	displayOptions: {
		show: {
			resource: ['stockItem'],
			operation: ['get', 'update', 'delete'],
		},
	},
	default: '',
	description: 'The inventory ID of the stock item',
},
{
	displayName: 'Item Data',
	name: 'itemData',
	type: 'json',
	required: true,
	displayOptions: {
		show: {
			resource: ['stockItem'],
			operation: ['create', 'update'],
		},
	},
	default: '{}',
	description: 'The stock item data as JSON object',
},
{
	displayName: 'Filter',
	name: 'filter',
	type: 'string',
	displayOptions: {
		show: {
			resource: ['stockItem'],
			operation: ['getAll'],
		},
	},
	default: '',
	description: 'OData $filter parameter for filtering results',
},
{
	displayName: 'Top',
	name: 'top',
	type: 'number',
	displayOptions: {
		show: {
			resource: ['stockItem'],
			operation: ['getAll'],
		},
	},
	default: 100,
	description: 'OData $top parameter for limiting number of results',
},
{
	displayName: 'Skip',
	name: 'skip',
	type: 'number',
	displayOptions: {
		show: {
			resource: ['stockItem'],
			operation: ['getAll'],
		},
	},
	default: 0,
	description: 'OData $skip parameter for pagination',
},
{
	displayName: 'Expand',
	name: 'expand',
	type: 'string',
	displayOptions: {
		show: {
			resource: ['stockItem'],
			operation: ['get', 'getAll'],
		},
	},
	default: '',
	description: 'OData $expand parameter for including related entities',
},
{
  displayName: 'Filter',
  name: 'filter',
  type: 'string',
  displayOptions: { show: { resource: ['salesInvoice'], operation: ['getAll'] } },
  default: '',
  description: 'OData filter expression to filter the results',
},
{
  displayName: 'Top',
  name: 'top',
  type: 'number',
  displayOptions: { show: { resource: ['salesInvoice'], operation: ['getAll'] } },
  default: 100,
  description: 'Number of records to return (max 100)',
},
{
  displayName: 'Skip',
  name: 'skip',
  type: 'number',
  displayOptions: { show: { resource: ['salesInvoice'], operation: ['getAll'] } },
  default: 0,
  description: 'Number of records to skip for pagination',
},
{
  displayName: 'Expand',
  name: 'expand',
  type: 'string',
  displayOptions: { show: { resource: ['salesInvoice'], operation: ['getAll', 'get'] } },
  default: '',
  description: 'Comma-separated list of related entities to expand',
},
{
  displayName: 'Type',
  name: 'type',
  type: 'string',
  required: true,
  displayOptions: { show: { resource: ['salesInvoice'], operation: ['get', 'update', 'delete'] } },
  default: '',
  description: 'Sales invoice type',
},
{
  displayName: 'Reference Number',
  name: 'referenceNbr',
  type: 'string',
  required: true,
  displayOptions: { show: { resource: ['salesInvoice'], operation: ['get', 'update', 'delete'] } },
  default: '',
  description: 'Sales invoice reference number',
},
{
  displayName: 'Invoice Data',
  name: 'invoiceData',
  type: 'json',
  required: true,
  displayOptions: { show: { resource: ['salesInvoice'], operation: ['create', 'update'] } },
  default: '{}',
  description: 'Sales invoice data as JSON object',
},
{
	displayName: 'Order Type',
	name: 'orderType',
	type: 'string',
	required: true,
	displayOptions: {
		show: {
			resource: ['purchaseOrder'],
			operation: ['get', 'update', 'delete'],
		},
	},
	default: '',
	description: 'The type of the purchase order',
},
{
	displayName: 'Order Number',
	name: 'orderNbr',
	type: 'string',
	required: true,
	displayOptions: {
		show: {
			resource: ['purchaseOrder'],
			operation: ['get', 'update', 'delete'],
		},
	},
	default: '',
	description: 'The number of the purchase order',
},
{
	displayName: 'Order Data',
	name: 'orderData',
	type: 'json',
	required: true,
	displayOptions: {
		show: {
			resource: ['purchaseOrder'],
			operation: ['create', 'update'],
		},
	},
	default: '{}',
	description: 'The purchase order data as JSON object',
},
{
	displayName: 'Filter',
	name: 'filter',
	type: 'string',
	displayOptions: {
		show: {
			resource: ['purchaseOrder'],
			operation: ['getAll'],
		},
	},
	default: '',
	description: 'OData $filter parameter for filtering results',
},
{
	displayName: 'Top',
	name: 'top',
	type: 'number',
	displayOptions: {
		show: {
			resource: ['purchaseOrder'],
			operation: ['getAll'],
		},
	},
	default: 100,
	description: 'OData $top parameter for limiting number of results',
},
{
	displayName: 'Skip',
	name: 'skip',
	type: 'number',
	displayOptions: {
		show: {
			resource: ['purchaseOrder'],
			operation: ['getAll'],
		},
	},
	default: 0,
	description: 'OData $skip parameter for pagination',
},
{
	displayName: 'Expand',
	name: 'expand',
	type: 'string',
	displayOptions: {
		show: {
			resource: ['purchaseOrder'],
			operation: ['getAll', 'get'],
		},
	},
	default: '',
	description: 'OData $expand parameter for including related data',
},
{
	displayName: 'Vendor ID',
	name: 'vendorID',
	type: 'string',
	required: true,
	displayOptions: {
		show: {
			resource: ['vendor'],
			operation: ['get', 'update', 'delete'],
		},
	},
	default: '',
	description: 'The ID of the vendor',
},
{
	displayName: 'Vendor Data',
	name: 'vendorData',
	type: 'json',
	required: true,
	displayOptions: {
		show: {
			resource: ['vendor'],
			operation: ['create', 'update'],
		},
	},
	default: '{}',
	description: 'The vendor data as JSON object',
},
{
	displayName: 'Filter',
	name: 'filter',
	type: 'string',
	displayOptions: {
		show: {
			resource: ['vendor'],
			operation: ['getAll'],
		},
	},
	default: '',
	description: 'OData filter expression',
},
{
	displayName: 'Top',
	name: 'top',
	type: 'number',
	displayOptions: {
		show: {
			resource: ['vendor'],
			operation: ['getAll'],
		},
	},
	default: 100,
	description: 'Number of records to return',
},
{
	displayName: 'Skip',
	name: 'skip',
	type: 'number',
	displayOptions: {
		show: {
			resource: ['vendor'],
			operation: ['getAll'],
		},
	},
	default: 0,
	description: 'Number of records to skip',
},
{
	displayName: 'Expand',
	name: 'expand',
	type: 'string',
	displayOptions: {
		show: {
			resource: ['vendor'],
			operation: ['getAll', 'get'],
		},
	},
	default: '',
	description: 'Related entities to expand',
},
{
  displayName: 'Batch Number',
  name: 'batchNbr',
  type: 'string',
  required: true,
  displayOptions: { show: { resource: ['journalTransaction'], operation: ['get', 'update', 'delete'] } },
  default: '',
  description: 'The batch number of the journal transaction',
},
{
  displayName: 'Filter',
  name: 'filter',
  type: 'string',
  displayOptions: { show: { resource: ['journalTransaction'], operation: ['getAll'] } },
  default: '',
  description: 'OData filter expression to filter the results',
},
{
  displayName: 'Top',
  name: 'top',
  type: 'number',
  displayOptions: { show: { resource: ['journalTransaction'], operation: ['getAll'] } },
  default: 100,
  description: 'Number of records to return (max 100)',
},
{
  displayName: 'Skip',
  name: 'skip',
  type: 'number',
  displayOptions: { show: { resource: ['journalTransaction'], operation: ['getAll'] } },
  default: 0,
  description: 'Number of records to skip',
},
{
  displayName: 'Expand',
  name: 'expand',
  type: 'string',
  displayOptions: { show: { resource: ['journalTransaction'], operation: ['getAll', 'get'] } },
  default: '',
  description: 'Related entities to expand in the response',
},
{
  displayName: 'Transaction Data',
  name: 'transactionData',
  type: 'json',
  required: true,
  displayOptions: { show: { resource: ['journalTransaction'], operation: ['create', 'update'] } },
  default: '{}',
  description: 'Journal transaction data as JSON object',
},
    ],
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const items = this.getInputData();
    const resource = this.getNodeParameter('resource', 0) as string;

    switch (resource) {
      case 'customer':
        return [await executeCustomerOperations.call(this, items)];
      case 'salesOrder':
        return [await executeSalesOrderOperations.call(this, items)];
      case 'stockItem':
        return [await executeStockItemOperations.call(this, items)];
      case 'salesInvoice':
        return [await executeSalesInvoiceOperations.call(this, items)];
      case 'purchaseOrder':
        return [await executePurchaseOrderOperations.call(this, items)];
      case 'vendor':
        return [await executeVendorOperations.call(this, items)];
      case 'journalTransaction':
        return [await executeJournalTransactionOperations.call(this, items)];
      default:
        throw new NodeOperationError(this.getNode(), `The resource "${resource}" is not supported`);
    }
  }
}

// ============================================================
// Resource Handler Functions
// ============================================================

async function executeCustomerOperations(
  this: IExecuteFunctions,
  items: INodeExecutionData[],
): Promise<INodeExecutionData[]> {
  const returnData: INodeExecutionData[] = [];
  const operation = this.getNodeParameter('operation', 0) as string;
  const credentials = await this.getCredentials('acumaticaclouderpApi') as any;

  for (let i = 0; i < items.length; i++) {
    try {
      let result: any;

      switch (operation) {
        case 'create': {
          const customerData = this.getNodeParameter('customerData', i) as any;
          const options: any = {
            method: 'POST',
            url: `${credentials.baseUrl}/Customer`,
            headers: {
              'Authorization': `Bearer ${credentials.accessToken}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(customerData),
            json: true,
          };
          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'get': {
          const customerID = this.getNodeParameter('customerID', i) as string;
          const expand = this.getNodeParameter('expand', i) as string;
          
          const queryParams = new URLSearchParams();
          if (expand) queryParams.append('$expand', expand);
          
          const options: any = {
            method: 'GET',
            url: `${credentials.baseUrl}/Customer/${encodeURIComponent(customerID)}${queryParams.toString() ? '?' + queryParams.toString() : ''}`,
            headers: {
              'Authorization': `Bearer ${credentials.accessToken}`,
              'Content-Type': 'application/json',
            },
            json: true,
          };
          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'getAll': {
          const filter = this.getNodeParameter('filter', i) as string;
          const top = this.getNodeParameter('top', i) as number;
          const skip = this.getNodeParameter('skip', i) as number;
          const expand = this.getNodeParameter('expand', i) as string;

          const queryParams = new URLSearchParams();
          if (filter) queryParams.append('$filter', filter);
          if (top) queryParams.append('$top', top.toString());
          if (skip) queryParams.append('$skip', skip.toString());
          if (expand) queryParams.append('$expand', expand);

          const options: any = {
            method: 'GET',
            url: `${credentials.baseUrl}/Customer${queryParams.toString() ? '?' + queryParams.toString() : ''}`,
            headers: {
              'Authorization': `Bearer ${credentials.accessToken}`,
              'Content-Type': 'application/json',
            },
            json: true,
          };
          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'update': {
          const customerID = this.getNodeParameter('customerID', i) as string;
          const customerData = this.getNodeParameter('customerData', i) as any;

          const options: any = {
            method: 'PUT',
            url: `${credentials.baseUrl}/Customer/${encodeURIComponent(customerID)}`,
            headers: {
              'Authorization': `Bearer ${credentials.accessToken}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(customerData),
            json: true,
          };
          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'delete': {
          const customerID = this.getNodeParameter('customerID', i) as string;

          const options: any = {
            method: 'DELETE',
            url: `${credentials.baseUrl}/Customer/${encodeURIComponent(customerID)}`,
            headers: {
              'Authorization': `Bearer ${credentials.accessToken}`,
              'Content-Type': 'application/json',
            },
            json: true,
          };
          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        default:
          throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
      }

      returnData.push({ json: result, pairedItem: { item: i } });
    } catch (error: any) {
      if (this.continueOnFail()) {
        returnData.push({ json: { error: error.message }, pairedItem: { item: i } });
      } else {
        throw error;
      }
    }
  }

  return returnData;
}

async function executeSalesOrderOperations(
  this: IExecuteFunctions,
  items: INodeExecutionData[],
): Promise<INodeExecutionData[]> {
  const returnData: INodeExecutionData[] = [];
  const operation = this.getNodeParameter('operation', 0) as string;
  const credentials = await this.getCredentials('acumaticaclouderpApi') as any;

  for (let i = 0; i < items.length; i++) {
    try {
      let result: any;
      const baseUrl = `${credentials.baseUrl}/SalesOrder`;

      switch (operation) {
        case 'getAll': {
          const filter = this.getNodeParameter('filter', i, '') as string;
          const top = this.getNodeParameter('top', i, 100) as number;
          const skip = this.getNodeParameter('skip', i, 0) as number;
          const expand = this.getNodeParameter('expand', i, '') as string;

          const queryParams: any = {};
          if (filter) queryParams.$filter = filter;
          if (top) queryParams.$top = top;
          if (skip) queryParams.$skip = skip;
          if (expand) queryParams.$expand = expand;

          const queryString = new URLSearchParams(queryParams).toString();
          const url = queryString ? `${baseUrl}?${queryString}` : baseUrl;

          const options: any = {
            method: 'GET',
            url,
            headers: {
              'Authorization': `Bearer ${credentials.accessToken}`,
              'Content-Type': 'application/json',
            },
            json: true,
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'get': {
          const orderType = this.getNodeParameter('orderType', i) as string;
          const orderNbr = this.getNodeParameter('orderNbr', i) as string;
          const expand = this.getNodeParameter('expand', i, '') as string;

          let url = `${baseUrl}/${encodeURIComponent(orderType)}/${encodeURIComponent(orderNbr)}`;
          if (expand) {
            url += `?$expand=${encodeURIComponent(expand)}`;
          }

          const options: any = {
            method: 'GET',
            url,
            headers: {
              'Authorization': `Bearer ${credentials.accessToken}`,
              'Content-Type': 'application/json',
            },
            json: true,
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'create': {
          const orderData = this.getNodeParameter('orderData', i) as any;

          const options: any = {
            method: 'POST',
            url: baseUrl,
            headers: {
              'Authorization': `Bearer ${credentials.accessToken}`,
              'Content-Type': 'application/json',
            },
            body: orderData,
            json: true,
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'update': {
          const orderType = this.getNodeParameter('orderType', i) as string;
          const orderNbr = this.getNodeParameter('orderNbr', i) as string;
          const orderData = this.getNodeParameter('orderData', i) as any;

          const options: any = {
            method: 'PUT',
            url: `${baseUrl}/${encodeURIComponent(orderType)}/${encodeURIComponent(orderNbr)}`,
            headers: {
              'Authorization': `Bearer ${credentials.accessToken}`,
              'Content-Type': 'application/json',
            },
            body: orderData,
            json: true,
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'delete': {
          const orderType = this.getNodeParameter('orderType', i) as string;
          const orderNbr = this.getNodeParameter('orderNbr', i) as string;

          const options: any = {
            method: 'DELETE',
            url: `${baseUrl}/${encodeURIComponent(orderType)}/${encodeURIComponent(orderNbr)}`,
            headers: {
              'Authorization': `Bearer ${credentials.accessToken}`,
              'Content-Type': 'application/json',
            },
            json: true,
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        default:
          throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
      }

      returnData.push({ json: result, pairedItem: { item: i } });
    } catch (error: any) {
      if (this.continueOnFail()) {
        returnData.push({ json: { error: error.message }, pairedItem: { item: i } });
      } else {
        throw error;
      }
    }
  }

  return returnData;
}

async function executeStockItemOperations(
	this: IExecuteFunctions,
	items: INodeExecutionData[],
): Promise<INodeExecutionData[]> {
	const returnData: INodeExecutionData[] = [];
	const operation = this.getNodeParameter('operation', 0) as string;
	const credentials = await this.getCredentials('acumaticaclouderpApi') as any;

	for (let i = 0; i < items.length; i++) {
		try {
			let result: any;
			const baseUrl = `${credentials.baseUrl}/entity/Default/23.200.001/StockItem`;

			switch (operation) {
				case 'getAll': {
					const filter = this.getNodeParameter('filter', i) as string;
					const top = this.getNodeParameter('top', i) as number;
					const skip = this.getNodeParameter('skip', i) as number;
					const expand = this.getNodeParameter('expand', i) as string;

					const queryParams = new URLSearchParams();
					if (filter) queryParams.append('$filter', filter);
					if (top) queryParams.append('$top', top.toString());
					if (skip) queryParams.append('$skip', skip.toString());
					if (expand) queryParams.append('$expand', expand);

					const url = queryParams.toString() ? `${baseUrl}?${queryParams.toString()}` : baseUrl;

					const options: any = {
						method: 'GET',
						url,
						headers: {
							'Authorization': `Bearer ${credentials.accessToken}`,
							'Content-Type': 'application/json',
						},
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'get': {
					const inventoryID = this.getNodeParameter('inventoryID', i) as string;
					const expand = this.getNodeParameter('expand', i) as string;

					let url = `${baseUrl}/${encodeURIComponent(inventoryID)}`;
					if (expand) {
						url += `?$expand=${encodeURIComponent(expand)}`;
					}

					const options: any = {
						method: 'GET',
						url,
						headers: {
							'Authorization': `Bearer ${credentials.accessToken}`,
							'Content-Type': 'application/json',
						},
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'create': {
					const itemData = this.getNodeParameter('itemData', i) as object;

					const options: any = {
						method: 'POST',
						url: baseUrl,
						headers: {
							'Authorization': `Bearer ${credentials.accessToken}`,
							'Content-Type': 'application/json',
						},
						body: itemData,
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'update': {
					const inventoryID = this.getNodeParameter('inventoryID', i) as string;
					const itemData = this.getNodeParameter('itemData', i) as object;

					const options: any = {
						method: 'PUT',
						url: `${baseUrl}/${encodeURIComponent(inventoryID)}`,
						headers: {
							'Authorization': `Bearer ${credentials.accessToken}`,
							'Content-Type': 'application/json',
						},
						body: itemData,
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'delete': {
					const inventoryID = this.getNodeParameter('inventoryID', i) as string;

					const options: any = {
						method: 'DELETE',
						url: `${baseUrl}/${encodeURIComponent(inventoryID)}`,
						headers: {
							'Authorization': `Bearer ${credentials.accessToken}`,
							'Content-Type': 'application/json',
						},
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				default:
					throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
			}

			returnData.push({ json: result, pairedItem: { item: i } });
		} catch (error: any) {
			if (this.continueOnFail()) {
				returnData.push({ json: { error: error.message }, pairedItem: { item: i } });
			} else {
				throw error;
			}
		}
	}

	return returnData;
}

async function executeSalesInvoiceOperations(
  this: IExecuteFunctions,
  items: INodeExecutionData[],
): Promise<INodeExecutionData[]> {
  const returnData: INodeExecutionData[] = [];
  const operation = this.getNodeParameter('operation', 0) as string;
  const credentials = await this.getCredentials('acumaticaclouderpApi') as any;

  for (let i = 0; i < items.length; i++) {
    try {
      let result: any;
      const baseUrl = `${credentials.baseUrl}/SalesInvoice`;

      switch (operation) {
        case 'getAll': {
          const filter = this.getNodeParameter('filter', i) as string;
          const top = this.getNodeParameter('top', i) as number;
          const skip = this.getNodeParameter('skip', i) as number;
          const expand = this.getNodeParameter('expand', i) as string;

          const queryParams = new URLSearchParams();
          if (filter) queryParams.append('$filter', filter);
          if (top) queryParams.append('$top', top.toString());
          if (skip) queryParams.append('$skip', skip.toString());
          if (expand) queryParams.append('$expand', expand);

          const url = queryParams.toString() ? `${baseUrl}?${queryParams.toString()}` : baseUrl;

          const options: any = {
            method: 'GET',
            url,
            headers: {
              'Authorization': `Bearer ${credentials.accessToken}`,
              'Content-Type': 'application/json',
            },
            json: true,
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'get': {
          const type = this.getNodeParameter('type', i) as string;
          const referenceNbr = this.getNodeParameter('referenceNbr', i) as string;
          const expand = this.getNodeParameter('expand', i) as string;

          const queryParams = new URLSearchParams();
          if (expand) queryParams.append('$expand', expand);

          const url = queryParams.toString() 
            ? `${baseUrl}/${encodeURIComponent(type)}/${encodeURIComponent(referenceNbr)}?${queryParams.toString()}`
            : `${baseUrl}/${encodeURIComponent(type)}/${encodeURIComponent(referenceNbr)}`;

          const options: any = {
            method: 'GET',
            url,
            headers: {
              'Authorization': `Bearer ${credentials.accessToken}`,
              'Content-Type': 'application/json',
            },
            json: true,
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'create': {
          const invoiceData = this.getNodeParameter('invoiceData', i) as any;

          const options: any = {
            method: 'POST',
            url: baseUrl,
            headers: {
              'Authorization': `Bearer ${credentials.accessToken}`,
              'Content-Type': 'application/json',
            },
            body: typeof invoiceData === 'string' ? JSON.parse(invoiceData) : invoiceData,
            json: true,
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'update': {
          const type = this.getNodeParameter('type', i) as string;
          const referenceNbr = this.getNodeParameter('referenceNbr', i) as string;
          const invoiceData = this.getNodeParameter('invoiceData', i) as any;

          const url = `${baseUrl}/${encodeURIComponent(type)}/${encodeURIComponent(referenceNbr)}`;

          const options: any = {
            method: 'PUT',
            url,
            headers: {
              'Authorization': `Bearer ${credentials.accessToken}`,
              'Content-Type': 'application/json',
            },
            body: typeof invoiceData === 'string' ? JSON.parse(invoiceData) : invoiceData,
            json: true,
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'delete': {
          const type = this.getNodeParameter('type', i) as string;
          const referenceNbr = this.getNodeParameter('referenceNbr', i) as string;

          const url = `${baseUrl}/${encodeURIComponent(type)}/${encodeURIComponent(referenceNbr)}`;

          const options: any = {
            method: 'DELETE',
            url,
            headers: {
              'Authorization': `Bearer ${credentials.accessToken}`,
              'Content-Type': 'application/json',
            },
            json: true,
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        default:
          throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
      }

      returnData.push({ json: result, pairedItem: { item: i } });
    } catch (error: any) {
      if (this.continueOnFail()) {
        returnData.push({ json: { error: error.message }, pairedItem: { item: i } });
      } else {
        throw error;
      }
    }
  }

  return returnData;
}

async function executePurchaseOrderOperations(
	this: IExecuteFunctions,
	items: INodeExecutionData[],
): Promise<INodeExecutionData[]> {
	const returnData: INodeExecutionData[] = [];
	const operation = this.getNodeParameter('operation', 0) as string;
	const credentials = await this.getCredentials('acumaticaclouderpApi') as any;

	for (let i = 0; i < items.length; i++) {
		try {
			let result: any;

			switch (operation) {
				case 'getAll': {
					const filter = this.getNodeParameter('filter', i) as string;
					const top = this.getNodeParameter('top', i) as number;
					const skip = this.getNodeParameter('skip', i) as number;
					const expand = this.getNodeParameter('expand', i) as string;

					const queryParams: string[] = [];
					if (filter) queryParams.push(`$filter=${encodeURIComponent(filter)}`);
					if (top) queryParams.push(`$top=${top}`);
					if (skip) queryParams.push(`$skip=${skip}`);
					if (expand) queryParams.push(`$expand=${encodeURIComponent(expand)}`);

					const queryString = queryParams.length > 0 ? `?${queryParams.join('&')}` : '';
					const url = `${credentials.baseUrl}/PurchaseOrder${queryString}`;

					const options: any = {
						method: 'GET',
						url,
						headers: {
							'Authorization': `Bearer ${credentials.accessToken}`,
							'Content-Type': 'application/json',
						},
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'get': {
					const orderType = this.getNodeParameter('orderType', i) as string;
					const orderNbr = this.getNodeParameter('orderNbr', i) as string;
					const expand = this.getNodeParameter('expand', i) as string;

					const queryString = expand ? `?$expand=${encodeURIComponent(expand)}` : '';
					const url = `${credentials.baseUrl}/PurchaseOrder/${encodeURIComponent(orderType)}/${encodeURIComponent(orderNbr)}${queryString}`;

					const options: any = {
						method: 'GET',
						url,
						headers: {
							'Authorization': `Bearer ${credentials.accessToken}`,
							'Content-Type': 'application/json',
						},
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'create': {
					const orderData = this.getNodeParameter('orderData', i) as object;

					const options: any = {
						method: 'POST',
						url: `${credentials.baseUrl}/PurchaseOrder`,
						headers: {
							'Authorization': `Bearer ${credentials.accessToken}`,
							'Content-Type': 'application/json',
						},
						json: true,
						body: orderData,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'update': {
					const orderType = this.getNodeParameter('orderType', i) as string;
					const orderNbr = this.getNodeParameter('orderNbr', i) as string;
					const orderData = this.getNodeParameter('orderData', i) as object;

					const url = `${credentials.baseUrl}/PurchaseOrder/${encodeURIComponent(orderType)}/${encodeURIComponent(orderNbr)}`;

					const options: any = {
						method: 'PUT',
						url,
						headers: {
							'Authorization': `Bearer ${credentials.accessToken}`,
							'Content-Type': 'application/json',
						},
						json: true,
						body: orderData,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'delete': {
					const orderType = this.getNodeParameter('orderType', i) as string;
					const orderNbr = this.getNodeParameter('orderNbr', i) as string;

					const url = `${credentials.baseUrl}/PurchaseOrder/${encodeURIComponent(orderType)}/${encodeURIComponent(orderNbr)}`;

					const options: any = {
						method: 'DELETE',
						url,
						headers: {
							'Authorization': `Bearer ${credentials.accessToken}`,
							'Content-Type': 'application/json',
						},
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				default:
					throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
			}

			returnData.push({
				json: result,
				pairedItem: { item: i },
			});
		} catch (error: any) {
			if (this.continueOnFail()) {
				returnData.push({
					json: { error: error.message },
					pairedItem: { item: i },
				});
			} else {
				throw error;
			}
		}
	}

	return returnData;
}

async function executeVendorOperations(
	this: IExecuteFunctions,
	items: INodeExecutionData[],
): Promise<INodeExecutionData[]> {
	const returnData: INodeExecutionData[] = [];
	const operation = this.getNodeParameter('operation', 0) as string;
	const credentials = await this.getCredentials('acumaticaclouderpApi') as any;

	for (let i = 0; i < items.length; i++) {
		try {
			let result: any;

			switch (operation) {
				case 'getAll': {
					const filter = this.getNodeParameter('filter', i) as string;
					const top = this.getNodeParameter('top', i) as number;
					const skip = this.getNodeParameter('skip', i) as number;
					const expand = this.getNodeParameter('expand', i) as string;

					const queryParams: string[] = [];
					if (filter) queryParams.push(`$filter=${encodeURIComponent(filter)}`);
					if (top) queryParams.push(`$top=${top}`);
					if (skip) queryParams.push(`$skip=${skip}`);
					if (expand) queryParams.push(`$expand=${encodeURIComponent(expand)}`);

					const queryString = queryParams.length ? `?${queryParams.join('&')}` : '';

					const options: any = {
						method: 'GET',
						url: `${credentials.baseUrl}/Vendor${queryString}`,
						headers: {
							'Authorization': `Bearer ${credentials.accessToken}`,
							'Content-Type': 'application/json',
						},
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'get': {
					const vendorID = this.getNodeParameter('vendorID', i) as string;
					const expand = this.getNodeParameter('expand', i) as string;

					let url = `${credentials.baseUrl}/Vendor/${encodeURIComponent(vendorID)}`;
					if (expand) {
						url += `?$expand=${encodeURIComponent(expand)}`;
					}

					const options: any = {
						method: 'GET',
						url,
						headers: {
							'Authorization': `Bearer ${credentials.accessToken}`,
							'Content-Type': 'application/json',
						},
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'create': {
					const vendorData = this.getNodeParameter('vendorData', i) as string;
					let parsedData: any;

					try {
						parsedData = typeof vendorData === 'string' ? JSON.parse(vendorData) : vendorData;
					} catch (parseError: any) {
						throw new NodeOperationError(this.getNode(), `Invalid JSON in vendor data: ${parseError.message}`);
					}

					const options: any = {
						method: 'POST',
						url: `${credentials.baseUrl}/Vendor`,
						headers: {
							'Authorization': `Bearer ${credentials.accessToken}`,
							'Content-Type': 'application/json',
						},
						body: parsedData,
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'update': {
					const vendorID = this.getNodeParameter('vendorID', i) as string;
					const vendorData = this.getNodeParameter('vendorData', i) as string;
					let parsedData: any;

					try {
						parsedData = typeof vendorData === 'string' ? JSON.parse(vendorData) : vendorData;
					} catch (parseError: any) {
						throw new NodeOperationError(this.getNode(), `Invalid JSON in vendor data: ${parseError.message}`);
					}

					const options: any = {
						method: 'PUT',
						url: `${credentials.baseUrl}/Vendor/${encodeURIComponent(vendorID)}`,
						headers: {
							'Authorization': `Bearer ${credentials.accessToken}`,
							'Content-Type': 'application/json',
						},
						body: parsedData,
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'delete': {
					const vendorID = this.getNodeParameter('vendorID', i) as string;

					const options: any = {
						method: 'DELETE',
						url: `${credentials.baseUrl}/Vendor/${encodeURIComponent(vendorID)}`,
						headers: {
							'Authorization': `Bearer ${credentials.accessToken}`,
							'Content-Type': 'application/json',
						},
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				default:
					throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
			}

			returnData.push({
				json: result,
				pairedItem: { item: i },
			});
		} catch (error: any) {
			if (this.continueOnFail()) {
				returnData.push({
					json: { error: error.message },
					pairedItem: { item: i },
				});
			} else {
				throw error;
			}
		}
	}

	return returnData;
}

async function executeJournalTransactionOperations(
  this: IExecuteFunctions,
  items: INodeExecutionData[],
): Promise<INodeExecutionData[]> {
  const returnData: INodeExecutionData[] = [];
  const operation = this.getNodeParameter('operation', 0) as string;
  const credentials = await this.getCredentials('acumaticaclouderpApi') as any;

  for (let i = 0; i < items.length; i++) {
    try {
      let result: any;
      const baseUrl = `${credentials.baseUrl}/entity/Default/23.200.001/JournalTransaction`;

      switch (operation) {
        case 'getAll': {
          const filter = this.getNodeParameter('filter', i) as string;
          const top = this.getNodeParameter('top', i) as number;
          const skip = this.getNodeParameter('skip', i) as number;
          const expand = this.getNodeParameter('expand', i) as string;

          const queryParams = new URLSearchParams();
          if (filter) queryParams.append('$filter', filter);
          if (top) queryParams.append('$top', top.toString());
          if (skip) queryParams.append('$skip', skip.toString());
          if (expand) queryParams.append('$expand', expand);

          const url = queryParams.toString() ? `${baseUrl}?${queryParams.toString()}` : baseUrl;

          const options: any = {
            method: 'GET',
            url,
            headers: {
              'Authorization': `Bearer ${credentials.accessToken}`,
              'Content-Type': 'application/json',
            },
            json: true,
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'get': {
          const batchNbr = this.getNodeParameter('batchNbr', i) as string;
          const expand = this.getNodeParameter('expand', i) as string;

          const queryParams = new URLSearchParams();
          if (expand) queryParams.append('$expand', expand);

          const url = queryParams.toString() ? `${baseUrl}/${encodeURIComponent(batchNbr)}?${queryParams.toString()}` : `${baseUrl}/${encodeURIComponent(batchNbr)}`;

          const options: any = {
            method: 'GET',
            url,
            headers: {
              'Authorization': `Bearer ${credentials.accessToken}`,
              'Content-Type': 'application/json',
            },
            json: true,
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'create': {
          const transactionData = this.getNodeParameter('transactionData', i) as string;

          const options: any = {
            method: 'POST',
            url: baseUrl,
            headers: {
              'Authorization': `Bearer ${credentials.accessToken}`,
              'Content-Type': 'application/json',
            },
            body: JSON.parse(transactionData),
            json: true,
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'update': {
          const batchNbr = this.getNodeParameter('batchNbr', i) as string;
          const transactionData = this.getNodeParameter('transactionData', i) as string;

          const options: any = {
            method: 'PUT',
            url: `${baseUrl}/${encodeURIComponent(batchNbr)}`,
            headers: {
              'Authorization': `Bearer ${credentials.accessToken}`,
              'Content-Type': 'application/json',
            },
            body: JSON.parse(transactionData),
            json: true,
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'delete': {
          const batchNbr = this.getNodeParameter('batchNbr', i) as string;

          const options: any = {
            method: 'DELETE',
            url: `${baseUrl}/${encodeURIComponent(batchNbr)}`,
            headers: {
              'Authorization': `Bearer ${credentials.accessToken}`,
              'Content-Type': 'application/json',
            },
            json: true,
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        default:
          throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
      }

      returnData.push({ json: result, pairedItem: { item: i } });
    } catch (error: any) {
      if (this.continueOnFail()) {
        returnData.push({ json: { error: error.message }, pairedItem: { item: i } });
      } else {
        throw error;
      }
    }
  }

  return returnData;
}
